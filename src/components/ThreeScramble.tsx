import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Particles component
function Particles({ count = 3000 }) {
  const { viewport } = useThree();
  const ref = useRef<THREE.Points>(null!);
  
  // Generate random positions for particles
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * viewport.width * 2;
      const y = (Math.random() - 0.5) * viewport.height * 2;
      const z = (Math.random() - 0.5) * 50;
      temp.push({ x, y, z });
    }
    return temp;
  }, [count, viewport]);
  
  // Convert particles to a Float32Array
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    particles.forEach(({ x, y, z }, i) => {
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    });
    return positions;
  }, [particles, count]);
  
  // Animate particles
  useFrame((state) => {
    const { clock } = state;
    if (ref.current) {
      ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.05) * 0.1;
      ref.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.05) * 0.1;
    }
  });
  
  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.2}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.5}
      />
    </Points>
  );
}

// Mouse follower light
function MovingLight() {
  const light = useRef<THREE.PointLight>(null!);
  const { viewport } = useThree();
  const [x, y] = useMousePosition();
  
  useFrame(() => {
    if (light.current) {
      light.current.position.x = THREE.MathUtils.lerp(
        light.current.position.x,
        (x / window.innerWidth) * viewport.width - viewport.width / 2,
        0.1
      );
      light.current.position.y = THREE.MathUtils.lerp(
        light.current.position.y,
        -(y / window.innerHeight) * viewport.height + viewport.height / 2,
        0.1
      );
    }
  });
  
  return (
    <pointLight
      ref={light}
      distance={15}
      intensity={5}
      color="#0EA5E9"
      position={[0, 0, 5]}
    />
  );
}

// Hook to get mouse position
function useMousePosition() {
  const [mousePosition, setMousePosition] = useState<[number, number]>([0, 0]);
  
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition([e.clientX, e.clientY]);
    };
    
    window.addEventListener('mousemove', updateMousePosition);
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);
  
  return mousePosition;
}

// Main component
export const ThreeBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <Particles />
        <MovingLight />
      </Canvas>
    </div>
  );
};

export default ThreeBackground;