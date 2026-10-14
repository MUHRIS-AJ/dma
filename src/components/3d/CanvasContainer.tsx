import React, { useState, Suspense, ErrorInfo } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, AdaptiveEvents, PerformanceMonitor } from '@react-three/drei';
import * as THREE from 'three';
import { Scene } from './Scene';

class WebGLErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('WebGL Rendering Error caught by Boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export const CanvasContainer: React.FC = () => {
  const [dpr, setDpr] = useState<number>(1.5);
  const [highQuality, setHighQuality] = useState<boolean>(true);

  const fallbackUI = (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0A0D14] z-0 p-6 text-center">
      <div className="glass-card max-w-md p-8 rounded-2xl border border-brand-yellow/30">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-brand-yellow/20 flex items-center justify-center text-4xl">
          🐹
        </div>
        <h3 className="text-xl font-bold text-white mb-2 font-display">
          Digitalmod 3D Experience Fallback
        </h3>
        <p className="text-slate-400 text-sm">
          WebGL acceleration is disabled or unsupported on this device. The interactive website features remain fully operational!
        </p>
      </div>
    </div>
  );

  return (
    <WebGLErrorBoundary fallback={fallbackUI}>
      <div className="fixed inset-0 z-0 pointer-events-auto overflow-hidden">
        <Canvas
          shadows
          camera={{ position: [0.85, 1.1, 4.0], fov: 42, near: 0.1, far: 40 }}
          dpr={dpr}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.1,
          }}
        >
          <PerformanceMonitor
            onIncline={() => {
              setDpr(2);
              setHighQuality(true);
            }}
            onDecline={() => {
              setDpr(1);
              setHighQuality(false);
            }}
          />
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />

          <Suspense fallback={null}>
            <Scene highQuality={highQuality} />
          </Suspense>
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  );
};
