import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture, PerspectiveCamera, Text, Image } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion-3d";
import { Project } from "./ProjectCard";

interface CardProps {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  project: Project;
  index: number;
  totalCards: number;
  active: number;
  setActive: (index: number) => void;
}

const Card = ({ position, rotation, scale, project, index, totalCards, active, setActive }: CardProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const isActive = active === index;
  
  // Load texture
  const texture = useTexture(project.image);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Subtle floating animation
    const t = state.clock.getElapsedTime() * 0.4 + index;
    meshRef.current.position.y = position[1] + Math.sin(t) * 0.05;
    
    // Smooth rotation based on mouse position if active
    if (isActive) {
      const x = (state.mouse.x * 0.5) * Math.PI / 8;
      const y = (state.mouse.y * 0.5) * Math.PI / 8;
      
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        rotation[0] - y,
        0.1
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        rotation[1] + x,
        0.1
      );
    }
  });
  
  return (
    <group
      position={[position[0], position[1], position[2]]}
      scale={[scale, scale, scale]}
      onClick={() => {
        if (!isActive) {
          setActive(index);
        }
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh
        ref={meshRef}
        rotation={rotation}
        castShadow
        receiveShadow
      >
        <planeGeometry args={[3, 2, 1]} />
        <meshStandardMaterial
          map={texture}
          transparent
          opacity={isActive ? 1 : 0.7}
          color={hovered && !isActive ? new THREE.Color(0xf0f0f0) : new THREE.Color(0xffffff)}
        />
      </mesh>
    </group>
  );
};

interface CardStack3DProps {
  projects: Project[];
}

export const CardStack3D = ({ projects }: CardStack3DProps) => {
  const [active, setActive] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setActive((prev) => (prev > 0 ? prev - 1 : projects.length - 1));
      } else if (e.key === "ArrowRight") {
        setActive((prev) => (prev < projects.length - 1 ? prev + 1 : 0));
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [projects.length]);
  
  const Scene = () => {
    const { viewport } = useThree();
    const isMobile = viewport.width < 5;
    
    return (
      <>
        <PerspectiveCamera
          makeDefault
          position={[0, 0, 6]}
          fov={45}
        />
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 10]}
          intensity={1.5}
          castShadow
        />
        <directionalLight
          position={[-10, -10, -10]}
          intensity={0.5}
        />
        
        {projects.map((project, i) => {
          const isActive = i === active;
          const basePosition: [number, number, number] = [0, 0, 0];
          const baseRotation: [number, number, number] = [0, 0, 0];
          
          // Calculate position based on index and active state
          const offset = isMobile ? 1.5 : 2.5;
          let xPos = isActive ? 0 : offset * (i - active);
          
          // If not active, adjust depth
          const zPos = isActive ? 0 : -Math.abs(i - active) * 0.5;
          
          // Scale based on distance from active
          const distance = Math.abs(i - active);
          const scale = isActive ? 1 : Math.max(0.7 - distance * 0.1, 0.5);
          
          // Add slight rotation for non-active cards
          const rotation: [number, number, number] = [
            baseRotation[0],
            baseRotation[1] + (!isActive ? (i < active ? 0.2 : -0.2) : 0),
            baseRotation[2],
          ];
          
          return (
            <Card
              key={project.id}
              position={[xPos, basePosition[1], zPos]}
              rotation={rotation}
              scale={scale}
              project={project}
              index={i}
              totalCards={projects.length}
              active={active}
              setActive={setActive}
            />
          );
        })}
      </>
    );
  };
  
  return (
    <div className="relative h-[500px] md:h-[600px] w-full my-20 card-stack-container">
      <Canvas ref={canvasRef} shadows dpr={[1, 2]} className="card-stack-scene">
        <Scene />
      </Canvas>
      
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {projects.map((project, i) => (
          <button
            key={project.id}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              active === i
                ? "bg-primary w-6"
                : "bg-muted hover:bg-primary/50"
            }`}
            onClick={() => setActive(i)}
            aria-label={`View project ${project.title}`}
          />
        ))}
      </div>
      
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-center">
        <h3 className="text-xl font-medium">{projects[active].title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{projects[active].category}</p>
      </div>
    </div>
  );
};
