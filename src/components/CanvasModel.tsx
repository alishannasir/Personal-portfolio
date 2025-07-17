
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function ThreeDBlob() {
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Variables for the scene
    let composer;
    let body_01_mixer, eyes_01_mixer;
    let theta1 = 0;
    let animationFrameId;
    let controls; // Add controls variable

    // Set up renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });
    renderer.setClearColor(0x11151c);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Set up clock
    const clock = new THREE.Clock();

    // Create scene
    const scene = new THREE.Scene();

    // Create camera
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 20;
    camera.position.y = 40;

    // Load modules dynamically
    const loadModules = async () => {
      try {
        // Dynamic imports for Three.js modules
        const RGBELoaderModule = await import('three/addons/loaders/RGBELoader.js');
        const EffectComposerModule = await import('three/addons/postprocessing/EffectComposer.js');
        const RenderPassModule = await import('three/addons/postprocessing/RenderPass.js');
        const AfterimagePassModule = await import('three/addons/postprocessing/AfterimagePass.js');
        const UnrealBloomPassModule = await import('three/addons/postprocessing/UnrealBloomPass.js');
        const FBXLoaderModule = await import('three/addons/loaders/FBXLoader.js');
        // Add OrbitControls dynamic import
        const OrbitControlsModule = await import('three/addons/controls/OrbitControls.js');
        const OrbitControls = OrbitControlsModule.OrbitControls;

        const RGBELoader = RGBELoaderModule.RGBELoader;
        const EffectComposer = EffectComposerModule.EffectComposer;
        const RenderPass = RenderPassModule.RenderPass;
        const AfterimagePass = AfterimagePassModule.AfterimagePass;
        const UnrealBloomPass = UnrealBloomPassModule.UnrealBloomPass;
        const FBXLoader = FBXLoaderModule.FBXLoader;

        // Initialize OrbitControls (after camera and renderer are created)
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.minDistance = 10;
        controls.maxDistance = 100;
        controls.target.set(0, 5, 0);
        controls.update();

        // Add fog
        scene.fog = new THREE.FogExp2(0x11151c, 0.015);

        // Load HDR environment
        const hdrLoader = new RGBELoader();
        const hdrEquirect = await hdrLoader.loadAsync(
          "https://miroleon.github.io/daily-assets/gradient.hdr"
        );
        hdrEquirect.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = hdrEquirect;

        // Create materials
        const blob_mat = new THREE.MeshPhysicalMaterial({
          color: 0xffffff,
          roughness: 0.3,
          metalness: 0,
          envMap: hdrEquirect,
          envMapIntensity: 0.5,
        });

        const uni_mat = new THREE.MeshPhysicalMaterial({
          envMap: hdrEquirect,
          envMapIntensity: 0,
          emissive: 0x11151c,
        });

        // Set scale for imported objects
        const scale = 0.03;

        // Load the blob
        const loader = new FBXLoader();
        
        // Load body
        const body_01 = await loader.loadAsync("/models/body_03.fbx");
        body_01_mixer = new THREE.AnimationMixer(body_01);
        const body_01_action = body_01_mixer.clipAction(body_01.animations[0]);
        body_01_action.play();

        body_01.traverse(function (child) {
          if (child instanceof THREE.Mesh) {
            child.material = blob_mat;
          }
        });

        body_01.position.set(0, -5, 0);
        body_01.scale.setScalar(scale);
        scene.add(body_01);

        // Load eyes
        const eyes_01 = await loader.loadAsync(
          "https://miroleon.github.io/daily-assets/eyes_03.fbx"
        );
        eyes_01_mixer = new THREE.AnimationMixer(eyes_01);
        const eyes_01_action = eyes_01_mixer.clipAction(eyes_01.animations[0]);
        eyes_01_action.play();

        eyes_01.traverse(function (child) {
          if (child instanceof THREE.Mesh) {
            child.material = uni_mat;
          }
        });

        eyes_01.position.set(0, -5, 0);
        eyes_01.scale.setScalar(scale);
        scene.add(eyes_01);

        // Set up post-processing
        const renderScene = new RenderPass(scene, camera);
        
        const afterimagePass = new AfterimagePass();
        afterimagePass.uniforms["damp"].value = 0.85;

        const bloomParams = {
          bloomStrength: 1.35,
          bloomThreshold: 0.1,
          bloomRadius: 1,
        };

        const bloomPass = new UnrealBloomPass(
          new THREE.Vector2(window.innerWidth, window.innerHeight),
          bloomParams.bloomStrength,
          bloomParams.bloomRadius,
          bloomParams.bloomThreshold
        );
        bloomPass.threshold = bloomParams.bloomThreshold;
        bloomPass.strength = bloomParams.bloomStrength;
        bloomPass.radius = bloomParams.bloomRadius;

        composer = new EffectComposer(renderer);
        composer.addPass(renderScene);
        composer.addPass(afterimagePass);
        composer.addPass(bloomPass);

        setLoading(false);
      } catch (error) {
        console.error("Error loading 3D scene:", error);
        setError("Failed to load 3D assets. Please check console for details.");
        setLoading(false);
      }
    };

    // Handle window resize
    const handleResize = () => {
      if (canvasRef.current) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        if (composer) {
          composer.setSize(window.innerWidth, window.innerHeight);
        }
        if (controls) {
          controls.update();
        }
      }
    };

    // Update function for animation
    const update = () => {
      theta1 += 0.005;
      
      camera.position.x = -Math.sin(theta1 + 1) * 45;
      camera.position.z = -Math.cos(theta1 + 1) * 45;
      camera.position.y = 20 * Math.cos(theta1 + 1) + 20;
      
      camera.lookAt(0, 5, 0);
    };

    // Animation loop
    const animate = () => {
      const delta = clock.getDelta();
      
      if (body_01_mixer) body_01_mixer.update(delta / 2);
      if (eyes_01_mixer) eyes_01_mixer.update(delta / 2);
      
      update();
      if (controls) controls.update(); // Update controls
      
      if (composer) {
        composer.render();
      } else {
        renderer.render(scene, camera);
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    // Set up event listeners and start everything
    window.addEventListener("resize", handleResize);
    loadModules().then(() => {
      animate();
    });

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      
      // Dispose of Three.js resources
      if (composer) {
        composer.dispose();
      }
      if (controls) controls.dispose(); // Dispose controls
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div className="relative w-full h-full bg-transparent overflow-hidden">
      {/* Left-side text overlay */}
      <div className="absolute left-0 top-0 h-full flex items-center z-20 pointer-events-none">
    
      </div>
      {/* Text overlay container */}
      <div className="fixed flex flex-col justify-between items-center  h-[100%] w-full z-10">
      
      {/* Loading indicator */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center text-white/70">
          Loading 3D Model...
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center text-red-500">
          {error}
        </div>
      )}

      {/* Canvas */}
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
    </div>
  );
}