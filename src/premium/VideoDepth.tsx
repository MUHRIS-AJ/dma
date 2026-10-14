import { useEffect, useRef, type RefObject } from 'react';

type VideoDepthProps = {
  videoRef: RefObject<HTMLVideoElement>;
  disabled: boolean;
};

/** Progressive enhancement: the ordinary video stays underneath as the fallback. */
export default function VideoDepth({ videoRef, disabled }: VideoDepthProps) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const video = videoRef.current;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (disabled || !host || !video || reducedMotion.matches) return;

    let disposed = false;
    let teardown: (() => void) | undefined;
    const onMotionChange = () => {
      if (reducedMotion.matches) teardown?.();
    };
    reducedMotion.addEventListener('change', onMotionChange);

    void import('three').then((THREE) => {
      if (disposed || reducedMotion.matches) return;
      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false, powerPreference: 'low-power' });
      } catch {
        return; // WebGL unavailable: keep the primary HTML video visible.
      }

      const canvas = renderer.domElement;
      canvas.style.cssText = 'display:block;width:100%;height:100%;opacity:0;transition:opacity 350ms ease;';
      canvas.setAttribute('aria-hidden', 'true');
      host.appendChild(canvas);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
      camera.position.z = 2;
      const texture = new THREE.VideoTexture(video);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;
      const uniforms = {
        uVideo: { value: texture },
        uCover: { value: new THREE.Vector2(1, 1) },
        uPointer: { value: new THREE.Vector2() },
        uEffects: { value: 1 },
      };
      const geometry = new THREE.PlaneGeometry(2.08, 2.08);
      const material = new THREE.ShaderMaterial({
        uniforms,
        depthTest: false,
        depthWrite: false,
        toneMapped: false,
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        // Luminance is an artistic pseudo-depth proxy, not an inferred or learned depth map.
        // The three taps approximate a highlight glow and very subtle color separation;
        // they are not an expensive full-resolution bloom postprocessing chain.
        fragmentShader: `
          uniform sampler2D uVideo;
          uniform vec2 uCover;
          uniform vec2 uPointer;
          uniform float uEffects;
          varying vec2 vUv;
          void main() {
            vec2 uv = (vUv - 0.5) * uCover + 0.5;
            vec3 base = texture2D(uVideo, uv).rgb;
            float depth = dot(base, vec3(0.2126, 0.7152, 0.0722));
            uv += uPointer * (depth - 0.5) * 0.009 * uEffects;
            vec3 color = texture2D(uVideo, clamp(uv, 0.001, 0.999)).rgb;
            if (uEffects > 0.5) {
              vec2 split = (vUv - 0.5) * 0.0012;
              vec3 a = texture2D(uVideo, clamp(uv + split, 0.001, 0.999)).rgb;
              vec3 b = texture2D(uVideo, clamp(uv - split, 0.001, 0.999)).rgb;
              color.r = mix(color.r, a.r, 0.45);
              color.b = mix(color.b, b.b, 0.45);
              color += max((a + b) * 0.5 - 0.72, 0.0) * 0.055;
            }
            float vignette = 1.0 - smoothstep(0.20, 0.73, distance(vUv, vec2(0.5))) * 0.19;
            gl_FragColor = vec4(color * vignette, 1.0);
            #include <colorspace_fragment>
          }
        `,
      });
      scene.add(new THREE.Mesh(geometry, material));
      const target = new THREE.Vector2();
      let intersecting = false;
      let frame = 0;
      let stopped = false;
      let sampleStart = 0;
      let sampleFrames = 0;
      let previousTime = 0;
      let lowFpsMs = 0;

      const resize = () => {
        const width = host.clientWidth;
        const height = host.clientHeight;
        if (!width || !height) return;
        renderer.setSize(width, height, false);
        const mediaAspect = (video.videoWidth || 1920) / (video.videoHeight || 1080);
        const displayAspect = width / height;
        uniforms.uCover.value.set(Math.min(displayAspect / mediaAspect, 1), Math.min(mediaAspect / displayAspect, 1));
      };
      const canRender = () => !stopped && !disposed && intersecting && !document.hidden && !reducedMotion.matches;
      const render = (time: number) => {
        frame = 0;
        if (!canRender()) return;
        if (video.readyState >= 2) {
          const delta = previousTime ? Math.min((time - previousTime) / 1000, 0.1) : 1 / 60;
          previousTime = time;
          uniforms.uPointer.value.lerp(target, 1 - Math.exp(-5 * delta));
          camera.position.x = uniforms.uPointer.value.x * 0.012;
          camera.position.y = uniforms.uPointer.value.y * 0.012;
          try {
            renderer.render(scene, camera);
            canvas.style.opacity = '1';
          } catch {
            cleanup();
            return;
          }
          if (!sampleStart) sampleStart = time;
          sampleFrames++;
          const elapsed = time - sampleStart;
          if (elapsed >= 1000) {
            const fps = sampleFrames * 1000 / elapsed;
            lowFpsMs = fps < 50 ? lowFpsMs + elapsed : 0;
            if (lowFpsMs >= 2000 && uniforms.uEffects.value) {
              uniforms.uEffects.value = 0;
              renderer.setPixelRatio(1);
              resize();
            }
            sampleStart = time;
            sampleFrames = 0;
          }
        }
        frame = requestAnimationFrame(render);
      };
      const sync = () => {
        if (canRender() && !frame) frame = requestAnimationFrame(render);
        else if (!canRender()) {
          cancelAnimationFrame(frame);
          frame = 0;
          sampleStart = 0;
          sampleFrames = 0;
          previousTime = 0;
          lowFpsMs = 0;
        }
      };
      const pointer = (event: PointerEvent) => {
        if (event.pointerType !== 'mouse' || !intersecting) return;
        const bounds = host.getBoundingClientRect();
        target.set(
          THREE.MathUtils.clamp((event.clientX - bounds.left) / bounds.width * 2 - 1, -1, 1),
          THREE.MathUtils.clamp(1 - (event.clientY - bounds.top) / bounds.height * 2, -1, 1),
        );
      };
      const observer = new IntersectionObserver(([entry]) => {
        intersecting = entry.isIntersecting;
        sync();
      });
      const sizeObserver = new ResizeObserver(resize);
      const contextLost = (event: Event) => {
        event.preventDefault();
        cleanup();
      };
      function cleanup() {
        if (stopped) return;
        stopped = true;
        cancelAnimationFrame(frame);
        observer.disconnect();
        sizeObserver.disconnect();
        document.removeEventListener('visibilitychange', sync);
        window.removeEventListener('pointermove', pointer);
        video!.removeEventListener('loadedmetadata', resize);
        canvas.removeEventListener('webglcontextlost', contextLost);
        geometry.dispose();
        material.dispose();
        texture.dispose();
        renderer.dispose();
        canvas.remove();
      }
      teardown = cleanup;
      observer.observe(host);
      sizeObserver.observe(host);
      video.addEventListener('loadedmetadata', resize);
      document.addEventListener('visibilitychange', sync);
      window.addEventListener('pointermove', pointer, { passive: true });
      canvas.addEventListener('webglcontextlost', contextLost);
      resize();
    }).catch(() => {
      teardown?.(); // Failed optional chunk: native video remains functional.
    });

    return () => {
      disposed = true;
      reducedMotion.removeEventListener('change', onMotionChange);
      teardown?.();
    };
  }, [disabled, videoRef]);

  if (disabled) return null;
  return <div ref={hostRef} aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', overflow: 'hidden' }} />;
}
