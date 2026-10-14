import React from 'react';
import { ContactShadows, Environment } from '@react-three/drei';
import { CameraRig } from './CameraRig';
import { FloatingElements } from './FloatingElements';
import { MicroInteractionBurst } from './MicroInteractionBurst';
import { PostProcessingEffects } from './PostProcessingEffects';

interface SceneProps {
  highQuality?: boolean;
}

export const Scene: React.FC<SceneProps> = ({ highQuality = true }) => {
  return (
    <>
      {/* --- STUDIO LIGHTING RIG --- */}
      {/* Soft Ambient Foundation */}
      <ambientLight intensity={0.75} color="#F3F4F6" />

      {/* Main Key Light */}
      <directionalLight
        position={[4, 6, 4]}
        intensity={1.8}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={15}
        shadow-camera-left={-3}
        shadow-camera-right={3}
        shadow-camera-top={3}
        shadow-camera-bottom={-3}
        shadow-bias={-0.0001}
        color="#FFF6E5"
      />

      {/* Warm Fill Light */}
      <directionalLight
        position={[-4, 3, 2]}
        intensity={0.8}
        color="#E0E7FF"
      />

      {/* Brand Rim Light 1: Electric Yellow / Gold */}
      <pointLight
        position={[3, 2, -3]}
        intensity={2.2}
        distance={8}
        color="#FFCC00"
      />

      {/* Brand Rim Light 2: Deep Cyber Violet */}
      <pointLight
        position={[-3, 2.5, -2.5]}
        intensity={2.5}
        distance={8}
        color="#8B5CF6"
      />

      {/* Under-glow Accent: Electric Cyan/Blue */}
      <pointLight
        position={[0, -1.2, 1.5]}
        intensity={0.6}
        distance={5}
        color="#00D2FF"
      />

      {/* HDRI Studio Environment Reflections */}
      <Environment preset="city" environmentIntensity={0.6} />

      {/* --- 3D SCENE OBJECTS --- */}
      <FloatingElements />
      <MicroInteractionBurst />

      {/* Soft Ground Contact Shadow */}
      <ContactShadows
        position={[0, -0.25, 0]}
        opacity={0.7}
        scale={6}
        blur={2.5}
        far={3.5}
        resolution={1024}
        color="#05070D"
      />

      {/* Dynamic Camera Animation Rig */}
      <CameraRig />

      {/* Postprocessing Pipeline */}
      <PostProcessingEffects enabled={highQuality} />
    </>
  );
};
