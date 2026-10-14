import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMascot } from '../../context/MascotContext';

interface Particle {
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  rot: THREE.Euler;
  rotVel: THREE.Vector3;
  scale: number;
  life: number;
  maxLife: number;
  color: THREE.Color;
  type: number; // 0: heart/seed, 1: star/sparkle, 2: gem
}

export const MicroInteractionBurst: React.FC = () => {
  const { burstTrigger } = useMascot();
  const instancedRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const MAX_PARTICLES = 40;
  const particles = useRef<Particle[]>([]);

  // Brand colors: Yellow, Purple, Blue, Red
  const palette = useMemo(() => [
    new THREE.Color('#FFCC00'), // Yellow
    new THREE.Color('#8B5CF6'), // Purple
    new THREE.Color('#2563EB'), // Blue
    new THREE.Color('#EF4444'), // Red
    new THREE.Color('#FFE266'), // Soft Gold
  ], []);

  // Trigger new burst on click
  useEffect(() => {
    if (!burstTrigger) return;

    // Spawn 25-35 particles from hamster center
    const count = 30;
    const newParticles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const elevation = (Math.random() - 0.2) * Math.PI;
      const speed = 2.5 + Math.random() * 3.5;

      newParticles.push({
        pos: new THREE.Vector3(
          (Math.random() - 0.5) * 0.4,
          0.8 + (Math.random() - 0.5) * 0.4,
          (Math.random() - 0.5) * 0.4
        ),
        vel: new THREE.Vector3(
          Math.cos(angle) * Math.cos(elevation) * speed,
          Math.sin(elevation) * speed + 2.0, // Initial upward pop
          Math.sin(angle) * Math.cos(elevation) * speed
        ),
        rot: new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, 0),
        rotVel: new THREE.Vector3(
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 8
        ),
        scale: 0.12 + Math.random() * 0.14,
        life: 0,
        maxLife: 1.2 + Math.random() * 0.8,
        color: palette[Math.floor(Math.random() * palette.length)],
        type: Math.floor(Math.random() * 3)
      });
    }

    particles.current = newParticles;
  }, [burstTrigger, palette]);

  useFrame((_, delta) => {
    if (!instancedRef.current) return;

    let activeCount = 0;
    const currentParticles = particles.current;

    for (let i = 0; i < currentParticles.length; i++) {
      const p = currentParticles[i];
      p.life += delta;

      if (p.life < p.maxLife) {
        // Physics update: gravity + drag
        p.vel.y -= 7.5 * delta;
        p.pos.addScaledVector(p.vel, delta);

        p.rot.x += p.rotVel.x * delta;
        p.rot.y += p.rotVel.y * delta;
        p.rot.z += p.rotVel.z * delta;

        // Scale fade out
        const progress = p.life / p.maxLife;
        const currentScale = p.scale * (1.0 - Math.pow(progress, 2.5));

        dummy.position.copy(p.pos);
        dummy.rotation.copy(p.rot);
        dummy.scale.setScalar(Math.max(0, currentScale));
        dummy.updateMatrix();

        instancedRef.current.setMatrixAt(activeCount, dummy.matrix);
        instancedRef.current.setColorAt(activeCount, p.color);
        activeCount++;
      }
    }

    // Hide remainder instances
    for (let i = activeCount; i < MAX_PARTICLES; i++) {
      dummy.scale.set(0, 0, 0);
      dummy.updateMatrix();
      instancedRef.current.setMatrixAt(i, dummy.matrix);
    }

    instancedRef.current.instanceMatrix.needsUpdate = true;
    if (instancedRef.current.instanceColor) {
      instancedRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <instancedMesh
      ref={instancedRef}
      args={[undefined, undefined, MAX_PARTICLES]}
      frustumCulled={false}
    >
      <octahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        roughness={0.2}
        metalness={0.8}
        emissive="#FFE266"
        emissiveIntensity={0.6}
        toneMapped={false}
      />
    </instancedMesh>
  );
};
