import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingItem {
  basePos: [number, number, number];
  rotationSpeed: [number, number, number];
  phase: number;
  scale: number;
  color: string;
  type: 'seed' | 'cube' | 'bubble';
}

export const FloatingElements: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  // Generate 24 floating elements with varied depth and colors
  const items = useMemo<FloatingItem[]>(() => {
    const list: FloatingItem[] = [];
    const colors = ['#FFCC00', '#8B5CF6', '#2563EB', '#EF4444', '#00A3FF', '#FFE266'];

    for (let i = 0; i < 22; i++) {
      const angle = (i / 22) * Math.PI * 2;
      const radius = 2.4 + Math.random() * 2.8;
      const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 1.5;
      const y = -1.5 + Math.random() * 4.5;
      const z = -1.5 + Math.sin(angle) * 2.0 + (Math.random() - 0.5);

      const types: ('seed' | 'cube' | 'bubble')[] = ['seed', 'cube', 'bubble'];
      const type = types[i % 3];

      list.push({
        basePos: [x, y, z],
        rotationSpeed: [
          (Math.random() - 0.5) * 1.2,
          (Math.random() - 0.5) * 1.5,
          (Math.random() - 0.5) * 1.0,
        ],
        phase: Math.random() * Math.PI * 2,
        scale: 0.12 + Math.random() * 0.18,
        color: colors[i % colors.length],
        type,
      });
    }
    return list;
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Mouse parallax tilt
    const targetX = state.pointer.x * 0.4;
    const targetY = state.pointer.y * 0.3;
    groupRef.current.position.x = THREE.MathUtils.damp(groupRef.current.position.x, targetX, 2.5, delta);
    groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, targetY, 2.5, delta);

    // Animate children
    groupRef.current.children.forEach((child, index) => {
      const item = items[index];
      if (!item) return;

      // Bobbing motion
      child.position.y = item.basePos[1] + Math.sin(t * 1.2 + item.phase) * 0.25;
      child.position.x = item.basePos[0] + Math.cos(t * 0.8 + item.phase) * 0.15;
      child.position.z = item.basePos[2];

      // Rotation
      child.rotation.x += item.rotationSpeed[0] * delta;
      child.rotation.y += item.rotationSpeed[1] * delta;
      child.rotation.z += item.rotationSpeed[2] * delta;
    });
  });

  return (
    <group ref={groupRef}>
      {items.map((item, i) => (
        <group key={i} position={item.basePos} scale={item.scale}>
          {item.type === 'seed' && (
            // Sunflower seed shape (stretched teardrop)
            <mesh castShadow>
              <coneGeometry args={[0.5, 1.4, 16]} />
              <meshStandardMaterial
                color="#5C3B1E"
                roughness={0.6}
                metalness={0.2}
              />
            </mesh>
          )}

          {item.type === 'cube' && (
            // Tech Academy Data Cube
            <mesh castShadow>
              <boxGeometry args={[0.8, 0.8, 0.8]} />
              <meshStandardMaterial
                color={item.color}
                roughness={0.2}
                metalness={0.8}
                emissive={item.color}
                emissiveIntensity={0.5}
              />
            </mesh>
          )}

          {item.type === 'bubble' && (
            // Glowing translucent sphere
            <mesh>
              <sphereGeometry args={[0.6, 24, 24]} />
              <meshPhysicalMaterial
                color={item.color}
                roughness={0.1}
                transmission={0.8}
                thickness={0.5}
                ior={1.4}
                reflectivity={0.6}
              />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
};
