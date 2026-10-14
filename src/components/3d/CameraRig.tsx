import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useMascot } from '../../context/MascotContext';

export const CameraRig: React.FC = () => {
  const { activeSection } = useMascot();
  const { viewport } = useThree();
  const isMobile = viewport.width < 5.5;

  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    // Dynamic cinematic camera position
    let targetCamPos = new THREE.Vector3(0, 0, 4.5);
    let targetLookAt = new THREE.Vector3(0, 0, 0);

    if (isMobile) {
      switch (activeSection) {
        case 'hero':
          targetCamPos.set(0, 0.2, 5.0);
          targetLookAt.set(0, 0, 0);
          break;
        case 'courses':
          targetCamPos.set(0, 0.4, 4.8);
          targetLookAt.set(0, 0.1, 0);
          break;
        case 'approvals':
          targetCamPos.set(0, 0.3, 4.7);
          targetLookAt.set(0, 0, 0);
          break;
        case 'contact':
          targetCamPos.set(0, 0.2, 4.9);
          targetLookAt.set(0, 0, 0);
          break;
        default:
          targetCamPos.set(0, 0.3, 4.8);
          targetLookAt.set(0, 0, 0);
          break;
      }
    } else {
      switch (activeSection) {
        case 'hero':
          targetCamPos.set(0.6, 0.3, 4.2);
          targetLookAt.set(0.1, 0.1, 0);
          break;
        case 'courses':
          targetCamPos.set(-0.5, 0.4, 4.4);
          targetLookAt.set(-0.1, 0.1, 0);
          break;
        case 'approvals':
          targetCamPos.set(0.4, 0.2, 4.1);
          targetLookAt.set(0, 0, 0);
          break;
        case 'contact':
          targetCamPos.set(-0.4, 0.3, 4.3);
          targetLookAt.set(0, 0, 0);
          break;
        default:
          targetCamPos.set(0, 0.3, 4.3);
          targetLookAt.set(0, 0, 0);
          break;
      }
    }

    // Add delicate mouse parallax offset
    const parallaxX = state.pointer.x * 0.25;
    const parallaxY = state.pointer.y * 0.18;

    targetCamPos.x += parallaxX;
    targetCamPos.y += parallaxY;

    // Smooth lerp camera position
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, targetCamPos.x, 3.0, delta);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, targetCamPos.y, 3.0, delta);
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, targetCamPos.z, 3.0, delta);

    // Smooth lerp lookAt point
    currentLookAt.current.x = THREE.MathUtils.damp(currentLookAt.current.x, targetLookAt.x, 3.5, delta);
    currentLookAt.current.y = THREE.MathUtils.damp(currentLookAt.current.y, targetLookAt.y, 3.5, delta);
    currentLookAt.current.z = THREE.MathUtils.damp(currentLookAt.current.z, targetLookAt.z, 3.5, delta);

    state.camera.lookAt(currentLookAt.current);
  });

  return null;
};
