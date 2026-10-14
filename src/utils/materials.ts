import * as THREE from 'three';

/**
 * Custom Fur Fresnel Shader Material.
 * Produces a soft, fuzzy peach-golden fur appearance with brand-responsive rim lighting.
 */
export function createHamsterFurMaterial(baseColor = '#FFAA55', rimColor = '#FFDD88') {
  const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color(baseColor),
    roughness: 0.85,
    metalness: 0.05,
    bumpScale: 0.04,
  });

  // Inject custom shader chunk for velvety Fresnel rim lighting
  material.onBeforeCompile = (shader: any) => {
    shader.uniforms.uRimColor = { value: new THREE.Color(rimColor) };
    shader.uniforms.uRimPower = { value: 2.2 };

    shader.vertexShader = shader.vertexShader.replace(
      '#include <common>',
      `
      #include <common>
      varying vec3 vCustomNormal;
      varying vec3 vCustomViewDir;
      `
    );

    shader.vertexShader = shader.vertexShader.replace(
      '#include <beginnormal_vertex>',
      `
      #include <beginnormal_vertex>
      vCustomNormal = normalize(normalMatrix * objectNormal);
      vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
      vCustomViewDir = normalize(-mvPosition.xyz);
      `
    );

    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <common>',
      `
      #include <common>
      uniform vec3 uRimColor;
      uniform float uRimPower;
      varying vec3 vCustomNormal;
      varying vec3 vCustomViewDir;
      `
    );

    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <dithering_fragment>',
      `
      #include <dithering_fragment>
      float fresnel = 1.0 - max(dot(normalize(vCustomViewDir), normalize(vCustomNormal)), 0.0);
      fresnel = pow(fresnel, uRimPower);
      gl_FragColor.rgb += uRimColor * fresnel * 0.45;
      `
    );
  };

  return material;
}

/**
 * Expressive glossy eye material with deep specular reflection
 */
export function createEyeMaterial() {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#0A0D14'),
    roughness: 0.05,
    metalness: 0.1,
    clearcoat: 1.0,
    clearcoatRoughness: 0.03,
    reflectivity: 0.9,
  });
}
