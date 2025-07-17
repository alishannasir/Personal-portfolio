import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

interface CanvasModelProps {
  className?: string;
}

export const CanvasModel = ({ className = "" }: CanvasModelProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    let animationFrameId: number;
    
    // Set up scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
    });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    
    // Create a particle system
    const particleCount = 5000;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    const color = new THREE.Color();
    
    for (let i = 0; i < particleCount * 3; i += 3) {
      // Create a sphere of particles
      const radius = 2;
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.random() * Math.PI;
      
      positions[i] = radius * Math.sin(theta) * Math.cos(phi);
      positions[i + 1] = radius * Math.sin(theta) * Math.sin(phi);
      positions[i + 2] = radius * Math.cos(theta);
      
      // Set colors (white with slight variations)
      const shade = 0.7 + Math.random() * 0.3;
      color.setRGB(shade, shade, shade);
      colors[i] = color.r;
      colors[i + 1] = color.g;
      colors[i + 2] = color.b;
    }
    
    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    // Material with custom shader
    const material = new THREE.PointsMaterial({
      size: 0.03,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    });
    
    const particleSystem = new THREE.Points(particles, material);
    scene.add(particleSystem);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 2, 5);
    scene.add(directionalLight);
    
    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    
    // Create a wireframe sphere
    const geometry = new THREE.SphereGeometry(1.9, 32, 32);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.1
    });
    const wireframeSphere = new THREE.Mesh(geometry, wireframeMaterial);
    scene.add(wireframeSphere);
    
    // Mouse control variables
    const mouse = new THREE.Vector2();
    const targetRotation = new THREE.Vector2();
    const currentRotation = new THREE.Vector2();
    let isMouseMoving = false;
    let mouseTimeout: ReturnType<typeof setTimeout>;
    
    // Mouse movement handler
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;
      
      // Calculate normalized mouse position (-1 to 1)
      const rect = containerRef.current.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / containerRef.current.clientWidth) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / containerRef.current.clientHeight) * 2 + 1;
      
      // Set target rotation based on mouse position
      targetRotation.x = mouse.y * 0.5; // Tilt up/down
      targetRotation.y = mouse.x * 0.5; // Rotate left/right
      
      // Set flag for mouse movement
      isMouseMoving = true;
      
      // Clear previous timeout
      clearTimeout(mouseTimeout);
      
      // Set timeout to detect when mouse stops moving
      mouseTimeout = setTimeout(() => {
        isMouseMoving = false;
      }, 2000);
    };
    
    // Add mouse movement event listener
    window.addEventListener('mousemove', handleMouseMove);
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      
      renderer.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight
      );
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation function
    const animate = () => {
      // Update orbit controls
      controls.update();
      
      // Handle sphere rotation based on mouse movement
      if (isMouseMoving) {
        // Disable auto-rotation when mouse is moving
        controls.autoRotate = false;
        
        // Smoothly interpolate current rotation toward target rotation
        currentRotation.x += (targetRotation.x - currentRotation.x) * 0.05;
        currentRotation.y += (targetRotation.y - currentRotation.y) * 0.05;
        
        // Apply rotation to wireframe sphere
        wireframeSphere.rotation.x = currentRotation.x;
        wireframeSphere.rotation.y = currentRotation.y;
        
        // Also rotate the particle system in the same way
        particleSystem.rotation.x = currentRotation.x * 0.7;
        particleSystem.rotation.y = currentRotation.y * 0.7;
      } else {
        // Re-enable auto-rotation when mouse stops moving
        controls.autoRotate = true;
        
        // Continue slight rotation when no mouse movement
        particleSystem.rotation.y += 0.0005;
        wireframeSphere.rotation.y -= 0.0003;
      }
      
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Clean up
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      clearTimeout(mouseTimeout);
      cancelAnimationFrame(animationFrameId);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);
  
  return <div ref={containerRef} className={className} />;
};


// import { useEffect, useRef, useState } from "react";
// import * as THREE from "three";

// export default function ThreeDBlob() {
//   const canvasRef = useRef(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!canvasRef.current) return;

//     // Variables for the scene
//     let composer;
//     let body_01_mixer, eyes_01_mixer;
//     let theta1 = 0;
//     let animationFrameId;

//     // Set up renderer
//     const renderer = new THREE.WebGLRenderer({
//       canvas: canvasRef.current,
//       antialias: true,
//     });
//     renderer.setClearColor(0x11151c);
//     renderer.setPixelRatio(window.devicePixelRatio);
//     renderer.setSize(window.innerWidth, window.innerHeight);

//     // Set up clock
//     const clock = new THREE.Clock();

//     // Create scene
//     const scene = new THREE.Scene();

//     // Create camera
//     const camera = new THREE.PerspectiveCamera(
//       45,
//       window.innerWidth / window.innerHeight,
//       0.1,
//       1000
//     );
//     camera.position.z = 20;
//     camera.position.y = 40;

//     // Add fog
//     scene.fog = new THREE.FogExp2(0x11151c, 0.015);

//     // Load modules dynamically
//     const loadModules = async () => {
//       try {
//         // Dynamic imports for Three.js modules
//         const RGBELoaderModule = await import('three/addons/loaders/RGBELoader.js');
//         const EffectComposerModule = await import('three/addons/postprocessing/EffectComposer.js');
//         const RenderPassModule = await import('three/addons/postprocessing/RenderPass.js');
//         const AfterimagePassModule = await import('three/addons/postprocessing/AfterimagePass.js');
//         const UnrealBloomPassModule = await import('three/addons/postprocessing/UnrealBloomPass.js');
//         const FBXLoaderModule = await import('three/addons/loaders/FBXLoader.js');

//         const RGBELoader = RGBELoaderModule.RGBELoader;
//         const EffectComposer = EffectComposerModule.EffectComposer;
//         const RenderPass = RenderPassModule.RenderPass;
//         const AfterimagePass = AfterimagePassModule.AfterimagePass;
//         const UnrealBloomPass = UnrealBloomPassModule.UnrealBloomPass;
//         const FBXLoader = FBXLoaderModule.FBXLoader;

//         // Load HDR environment
//         const hdrLoader = new RGBELoader();
//         const hdrEquirect = await hdrLoader.loadAsync(
//           "https://miroleon.github.io/daily-assets/gradient.hdr"
//         );
//         hdrEquirect.mapping = THREE.EquirectangularReflectionMapping;
//         scene.environment = hdrEquirect;

//         // Create materials
//         const blob_mat = new THREE.MeshPhysicalMaterial({
//           color: 0xffffff,
//           roughness: 0.3,
//           metalness: 0,
//           envMap: hdrEquirect,
//           envMapIntensity: 0.5,
//         });

//         const uni_mat = new THREE.MeshPhysicalMaterial({
//           envMap: hdrEquirect,
//           envMapIntensity: 0,
//           emissive: 0x11151c,
//         });

//         // Set scale for imported objects
//         const scale = 0.03;

//         // Load the blob
//         const loader = new FBXLoader();
        
//         // Load body
//         const body_01 = await loader.loadAsync("/models/body_03.fbx");
//         body_01_mixer = new THREE.AnimationMixer(body_01);
//         const body_01_action = body_01_mixer.clipAction(body_01.animations[0]);
//         body_01_action.play();

//         body_01.traverse(function (child) {
//           if (child instanceof THREE.Mesh) {
//             child.material = blob_mat;
//           }
//         });

//         body_01.position.set(0, -5, 0);
//         body_01.scale.setScalar(scale);
//         scene.add(body_01);

//         // Load eyes
//         const eyes_01 = await loader.loadAsync(
//           "https://miroleon.github.io/daily-assets/eyes_03.fbx"
//         );
//         eyes_01_mixer = new THREE.AnimationMixer(eyes_01);
//         const eyes_01_action = eyes_01_mixer.clipAction(eyes_01.animations[0]);
//         eyes_01_action.play();

//         eyes_01.traverse(function (child) {
//           if (child instanceof THREE.Mesh) {
//             child.material = uni_mat;
//           }
//         });

//         eyes_01.position.set(0, -5, 0);
//         eyes_01.scale.setScalar(scale);
//         scene.add(eyes_01);

//         // Set up post-processing
//         const renderScene = new RenderPass(scene, camera);
        
//         const afterimagePass = new AfterimagePass();
//         afterimagePass.uniforms["damp"].value = 0.85;

//         const bloomParams = {
//           bloomStrength: 1.35,
//           bloomThreshold: 0.1,
//           bloomRadius: 1,
//         };

//         const bloomPass = new UnrealBloomPass(
//           new THREE.Vector2(window.innerWidth, window.innerHeight),
//           bloomParams.bloomStrength,
//           bloomParams.bloomRadius,
//           bloomParams.bloomThreshold
//         );
//         bloomPass.threshold = bloomParams.bloomThreshold;
//         bloomPass.strength = bloomParams.bloomStrength;
//         bloomPass.radius = bloomParams.bloomRadius;

//         composer = new EffectComposer(renderer);
//         composer.addPass(renderScene);
//         composer.addPass(afterimagePass);
//         composer.addPass(bloomPass);

//         setLoading(false);
//       } catch (error) {
//         console.error("Error loading 3D scene:", error);
//         setError("Failed to load 3D assets. Please check console for details.");
//         setLoading(false);
//       }
//     };

//     // Handle window resize
//     const handleResize = () => {
//       if (canvasRef.current) {
//         camera.aspect = window.innerWidth / window.innerHeight;
//         camera.updateProjectionMatrix();
//         renderer.setSize(window.innerWidth, window.innerHeight);
//         if (composer) {
//           composer.setSize(window.innerWidth, window.innerHeight);
//         }
//       }
//     };

//     // Update function for animation
//     const update = () => {
//       theta1 += 0.005;
      
//       camera.position.x = -Math.sin(theta1 + 1) * 45;
//       camera.position.z = -Math.cos(theta1 + 1) * 45;
//       camera.position.y = 20 * Math.cos(theta1 + 1) + 20;
      
//       camera.lookAt(0, 5, 0);
//     };

//     // Animation loop
//     const animate = () => {
//       const delta = clock.getDelta();
      
//       if (body_01_mixer) body_01_mixer.update(delta / 2);
//       if (eyes_01_mixer) eyes_01_mixer.update(delta / 2);
      
//       update();
      
//       if (composer) {
//         composer.render();
//       } else {
//         renderer.render(scene, camera);
//       }
      
//       animationFrameId = requestAnimationFrame(animate);
//     };

//     // Set up event listeners and start everything
//     window.addEventListener("resize", handleResize);
//     loadModules().then(() => {
//       animate();
//     });

//     // Cleanup function
//     return () => {
//       window.removeEventListener("resize", handleResize);
//       if (animationFrameId) {
//         cancelAnimationFrame(animationFrameId);
//       }
      
//       // Dispose of Three.js resources
//       if (composer) {
//         composer.dispose();
//       }
//       renderer.dispose();
//       scene.clear();
//     };
//   }, []);

//   return (
//     <div className="relative w-full h-screen bg-transparent overflow-hidden">
//       {/* Text overlay container */}
//       <div className="fixed flex flex-col justify-between items-center top-[10%] h-[80%] w-full z-10">
      
//       {/* Loading indicator */}
//       {loading && (
//         <div className="absolute inset-0 flex items-center justify-center text-white/70">
//           Loading 3D Model...
//         </div>
//       )}

//       {/* Error message */}
//       {error && (
//         <div className="absolute inset-0 flex items-center justify-center text-red-500">
//           {error}
//         </div>
//       )}

//       {/* Canvas */}
//       <canvas ref={canvasRef} className="w-full h-full" />
//     </div>
//     </div>
//   );
// }