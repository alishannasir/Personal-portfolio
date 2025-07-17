import * as THREE from 'three';
import { useEffect, useRef } from 'react';

const FloatingObjects = () => {
  const mountRef = useRef(null);
  
  useEffect(() => {
    let scene, camera, renderer;
    let objects = [];
    let mouse = new THREE.Vector2(0, 0);
    let frameId;
    
    // Scene setup
    const init = () => {
      // Create scene
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000000);
      scene.background.alpha = 0; // Transparent background
      
      // Camera setup
      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 15;
      
      // Renderer setup
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0); // Transparent background
      mountRef.current.appendChild(renderer.domElement);
      
      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);
      
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);
      
      // Create objects
      createObjects();
      
      // Event listeners
      window.addEventListener('resize', handleResize);
      window.addEventListener('mousemove', handleMouseMove);
    };
    
    // Create different 3D objects
    const createObjects = () => {
      // Object 1: Cube
      const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
      const cubeMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x6366f1,
        specular: 0x333333,
        shininess: 30
      });
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cube.position.set(4, 2, 0);
      scene.add(cube);
      objects.push({
        mesh: cube,
        initialPosition: cube.position.clone(),
        rotationSpeed: { x: 0.01, y: 0.01, z: 0.003 },
        floatSpeed: 0.003,
        floatHeight: 0.5,
        floatOffset: 0
      });
      
      // Object 2: Sphere
      const sphereGeometry = new THREE.SphereGeometry(1.5, 32, 32);
      const sphereMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xef4444,
        specular: 0x333333,
        shininess: 30
      });
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.position.set(-4, -2, 2);
      scene.add(sphere);
      objects.push({
        mesh: sphere,
        initialPosition: sphere.position.clone(),
        rotationSpeed: { x: 0.005, y: 0.007, z: 0.002 },
        floatSpeed: 0.005,
        floatHeight: 0.7,
        floatOffset: Math.PI / 3
      });
      
      // Object 3: Torus (Donut)
      const torusGeometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
      const torusMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x10b981,
        specular: 0x333333,
        shininess: 30
      });
      const torus = new THREE.Mesh(torusGeometry, torusMaterial);
      torus.position.set(0, 4, -2);
      scene.add(torus);
      objects.push({
        mesh: torus,
        initialPosition: torus.position.clone(),
        rotationSpeed: { x: 0.013, y: 0.004, z: 0.01 },
        floatSpeed: 0.004,
        floatHeight: 0.6,
        floatOffset: Math.PI / 2
      });
      
      // Object 4: Cone
      const coneGeometry = new THREE.ConeGeometry(1.2, 2.5, 16);
      const coneMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xf59e0b,
        specular: 0x333333,
        shininess: 30
      });
      const cone = new THREE.Mesh(coneGeometry, coneMaterial);
      cone.position.set(-3, 3, -3);
      scene.add(cone);
      objects.push({
        mesh: cone,
        initialPosition: cone.position.clone(),
        rotationSpeed: { x: 0.007, y: 0.012, z: 0.004 },
        floatSpeed: 0.006,
        floatHeight: 0.8,
        floatOffset: Math.PI
      });
      
      // Object 5: Octahedron
      const octaGeometry = new THREE.OctahedronGeometry(1.5, 0);
      const octaMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x8b5cf6,
        specular: 0x333333,
        shininess: 30
      });
      const octahedron = new THREE.Mesh(octaGeometry, octaMaterial);
      octahedron.position.set(5, -3, 1);
      scene.add(octahedron);
      objects.push({
        mesh: octahedron,
        initialPosition: octahedron.position.clone(),
        rotationSpeed: { x: 0.01, y: 0.01, z: 0.01 },
        floatSpeed: 0.0045,
        floatHeight: 0.5,
        floatOffset: Math.PI / 4
      });
      
      // Object 6: Tetrahedron
      const tetraGeometry = new THREE.TetrahedronGeometry(1.2, 0);
      const tetraMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xec4899,
        specular: 0x333333,
        shininess: 30
      });
      const tetrahedron = new THREE.Mesh(tetraGeometry, tetraMaterial);
      tetrahedron.position.set(0, -4, -1);
      scene.add(tetrahedron);
      objects.push({
        mesh: tetrahedron,
        initialPosition: tetrahedron.position.clone(),
        rotationSpeed: { x: 0.009, y: 0.015, z: 0.007 },
        floatSpeed: 0.0055,
        floatHeight: 0.65,
        floatOffset: Math.PI * 1.5
      });
      
      // Object 7: Icosahedron
      const icosaGeometry = new THREE.IcosahedronGeometry(1, 0);
      const icosaMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x0ea5e9,
        specular: 0x333333,
        shininess: 30
      });
      const icosahedron = new THREE.Mesh(icosaGeometry, icosaMaterial);
      icosahedron.position.set(3, -1, -4);
      scene.add(icosahedron);
      objects.push({
        mesh: icosahedron,
        initialPosition: icosahedron.position.clone(),
        rotationSpeed: { x: 0.008, y: 0.006, z: 0.009 },
        floatSpeed: 0.005,
        floatHeight: 0.7,
        floatOffset: Math.PI / 6
      });
    };
    
    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    
    // Handle mouse movement
    const handleMouseMove = (event) => {
      // Convert mouse position to normalized device coordinates (-1 to +1)
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    // Animation loop
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      
      // Update objects
      const time = Date.now() * 0.001; // Current time in seconds
      
      objects.forEach(obj => {
        // Rotate objects
        obj.mesh.rotation.x += obj.rotationSpeed.x;
        obj.mesh.rotation.y += obj.rotationSpeed.y;
        obj.mesh.rotation.z += obj.rotationSpeed.z;
        
        // Make objects float up and down
        const floatY = Math.sin(time * obj.floatSpeed + obj.floatOffset) * obj.floatHeight;
        obj.mesh.position.y = obj.initialPosition.y + floatY;
        
        // Apply mouse influence (objects slightly follow mouse)
        const targetX = obj.initialPosition.x + mouse.x * 2;
        const targetZ = obj.initialPosition.z - mouse.y * 2;
        
        // Smooth transition to target position
        obj.mesh.position.x += (targetX - obj.mesh.position.x) * 0.02;
        obj.mesh.position.z += (targetZ - obj.mesh.position.z) * 0.02;
      });
      
      renderer.render(scene, camera);
    };
    
    // Initialize and start animation
    init();
    animate();
    
    // Cleanup function
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);
  
  return <div ref={mountRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }} />;
};

export default FloatingObjects;