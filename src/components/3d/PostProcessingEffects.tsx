import React from 'react';
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import * as THREE from 'three';

interface PostProcessingProps {
  enabled?: boolean;
}

export const PostProcessingEffects: React.FC<PostProcessingProps> = ({ enabled = true }) => {
  if (!enabled) return null;

  const Composer = EffectComposer as any;

  return (
    <Composer multisampling={4} disableNormalPass>
      <Bloom
        luminanceThreshold={0.75}
        luminanceSmoothing={0.3}
        intensity={0.45}
        mipmapBlur
      />
      <Vignette
        eskil={false}
        offset={0.25}
        darkness={0.7}
      />
      <ChromaticAberration
        offset={new THREE.Vector2(0.0008, 0.0008)}
        radialModulation={true}
        modulationOffset={0.35}
      />
    </Composer>
  );
};
