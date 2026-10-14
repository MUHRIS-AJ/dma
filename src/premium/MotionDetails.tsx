import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './motion-details.css';

/** Progressive decoration. Native pointers, touch behavior and content never depend on it. */
export default function MotionDetails() {
  const depthRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const desktop = window.matchMedia('(min-width: 960px) and (pointer: fine)');
    let cleanup = () => {};
    const configure = () => {
      cleanup();
      if (reduce.matches) return;
      const disposers: Array<() => void> = [];
      gsap.registerPlugin(ScrollTrigger);
      const context = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>('.mentor-art').forEach(art => {
          gsap.fromTo(art, { clipPath: 'inset(12% 0 12% 0 round 20px)' }, {
            clipPath: 'inset(0% 0 0% 0 round 20px)', duration: 1.15, ease: 'power3.out',
            scrollTrigger: { trigger: art, start: 'top 90%', once: true },
          });
        });
      });
      disposers.push(() => context.revert());
      if (desktop.matches) {
        const cursor = cursorRef.current;
        if (cursor) {
          const xTo = gsap.quickTo(cursor, 'x', { duration: 0.35, ease: 'power3.out' });
          const yTo = gsap.quickTo(cursor, 'y', { duration: 0.35, ease: 'power3.out' });
          const move = (event: PointerEvent) => {
            if (event.pointerType === 'touch') return;
            cursor.classList.add('is-visible');
            xTo(event.clientX); yTo(event.clientY);
            cursor.classList.toggle('is-interactive', !!(event.target as Element)?.closest('a,button,input,select,summary'));
          };
          const leave = () => cursor.classList.remove('is-visible');
          document.addEventListener('pointermove', move, { passive: true });
          document.addEventListener('pointerleave', leave);
          window.addEventListener('blur', leave);
          disposers.push(() => {
            document.removeEventListener('pointermove', move);
            document.removeEventListener('pointerleave', leave);
            window.removeEventListener('blur', leave);
            gsap.killTweensOf(cursor);
            cursor.classList.remove('is-visible', 'is-interactive');
          });
        }
        document.querySelectorAll<HTMLElement>('.magnetic').forEach(button => {
          const xTo = gsap.quickTo(button, 'x', { duration: 0.4, ease: 'power3.out' });
          const yTo = gsap.quickTo(button, 'y', { duration: 0.4, ease: 'power3.out' });
          const move = (event: PointerEvent) => {
            const rect = button.getBoundingClientRect();
            xTo(Math.max(-7, Math.min(7, (event.clientX - rect.left - rect.width / 2) * 0.09)));
            yTo(Math.max(-5, Math.min(5, (event.clientY - rect.top - rect.height / 2) * 0.12)));
          };
          const reset = () => { xTo(0); yTo(0); };
          button.addEventListener('pointermove', move, { passive: true });
          button.addEventListener('pointerleave', reset);
          button.addEventListener('blur', reset);
          disposers.push(() => {
            button.removeEventListener('pointermove', move);
            button.removeEventListener('pointerleave', reset);
            button.removeEventListener('blur', reset);
            gsap.killTweensOf(button);
            gsap.set(button, { clearProps: 'transform' });
          });
        });
        if (depthRef.current) disposers.push(mountDepth(depthRef.current));
      }
      cleanup = () => disposers.forEach(dispose => dispose());
    };
    configure();
    reduce.addEventListener('change', configure);
    desktop.addEventListener('change', configure);
    return () => {
      cleanup();
      reduce.removeEventListener('change', configure);
      desktop.removeEventListener('change', configure);
    };
  }, []);

  return <>
    <div className="motion-depth" ref={depthRef} aria-hidden="true" />
    {typeof document !== 'undefined' && createPortal(<div className="motion-cursor" ref={cursorRef} aria-hidden="true"><span /></div>, document.body)}
  </>;
}

function mountDepth(host: HTMLDivElement) {
  let disposed = false;
  let visible = false;
  let started = false;
  let frame = 0;
  let releaseScene = () => {};
  let resume = () => {};
  let timer: ReturnType<typeof setTimeout> | undefined;
  const observer = new IntersectionObserver(entries => {
    visible = entries[0]?.isIntersecting ?? false;
    if (visible && !started) {
      started = true;
      // Delay the optional chunk until critical hero content has had time to paint.
      timer = setTimeout(() => { void initialize(); }, 1400);
    }
    if (visible) resume();
    else { cancelAnimationFrame(frame); frame = 0; }
  }, { threshold: 0.01 });
  observer.observe(host);

  async function initialize() {
    try {
      const THREE = await import('three');
      if (disposed) return;
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
      renderer.setClearColor(0x000000, 0);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 20);
      camera.position.z = 6;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(40 * 3);
      for (let i = 0; i < 40; i++) {
        // Deterministic scattered points; right-biased to protect the headline.
        positions[i * 3] = Math.sin(i * 8.137) * 4.2 + 1.2;
        positions[i * 3 + 1] = Math.cos(i * 5.713) * 2.8;
        positions[i * 3 + 2] = Math.sin(i * 3.471) * 2;
      }
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const material = new THREE.ShaderMaterial({
        transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
        uniforms: { time: { value: 0 }, pixelRatio: { value: Math.min(window.devicePixelRatio, 1.25) } },
        vertexShader: `uniform float time; uniform float pixelRatio; varying float opacity;
          void main() { vec3 p = position; p.y += sin(time * 0.24 + p.x) * 0.12;
            p.x += cos(time * 0.17 + p.z) * 0.07; vec4 mv = modelViewMatrix * vec4(p, 1.0);
            gl_Position = projectionMatrix * mv; gl_PointSize = clamp(10.0 / -mv.z, 1.2, 3.0) * pixelRatio;
            opacity = 0.19 + 0.15 * sin(time * 0.4 + p.x * 2.0); }`,
        fragmentShader: `varying float opacity; void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          float glow = smoothstep(0.5, 0.02, d); gl_FragColor = vec4(1.0, 0.80, 0.28, glow * opacity); }`,
      });
      const points = new THREE.Points(geometry, material);
      scene.add(points);
      host.appendChild(renderer.domElement);
      const resize = () => {
        const { width, height } = host.getBoundingClientRect();
        renderer.setSize(Math.max(1, width), Math.max(1, height));
        camera.aspect = Math.max(1, width) / Math.max(1, height);
        camera.updateProjectionMatrix();
      };
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(host);
      resize();
      const render = (now: number) => {
        frame = 0;
        if (disposed || !visible || document.hidden) return;
        material.uniforms.time.value = now * 0.001;
        renderer.render(scene, camera);
        frame = requestAnimationFrame(render);
      };
      resume = () => { if (!frame && !disposed && visible && !document.hidden) frame = requestAnimationFrame(render); };
      const visibility = () => {
        if (document.hidden) { cancelAnimationFrame(frame); frame = 0; }
        else resume();
      };
      const contextLost = (event: Event) => { event.preventDefault(); cancelAnimationFrame(frame); frame = 0; host.style.visibility = 'hidden'; };
      renderer.domElement.addEventListener('webglcontextlost', contextLost);
      document.addEventListener('visibilitychange', visibility);
      releaseScene = () => {
        document.removeEventListener('visibilitychange', visibility);
        renderer.domElement.removeEventListener('webglcontextlost', contextLost);
        resizeObserver.disconnect();
        geometry.dispose(); material.dispose(); renderer.dispose();
        renderer.domElement.remove();
      };
      resume();
    } catch {
      // Failed or disabled WebGL never changes the usable static hero.
    }
  }
  return () => {
    disposed = true;
    clearTimeout(timer);
    observer.disconnect();
    cancelAnimationFrame(frame);
    releaseScene();
  };
}
