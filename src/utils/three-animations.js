import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Creates a floating 3D cube animation
 * @param {string} containerId - The ID of the container element
 * @param {Object} options - Configuration options
 */
export function createFloatingCube(containerId, options = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Default options
  const config = {
    size: options.size || 1,
    color: options.color || 0x044b89, // primary-800
    rotationSpeed: options.rotationSpeed || 0.01,
    floatAmplitude: options.floatAmplitude || 0.1,
    floatSpeed: options.floatSpeed || 1,
    ...options
  };

  // Create scene
  const scene = new THREE.Scene();

  // Create camera
  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  // Create renderer
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  // Create cube
  const geometry = new THREE.BoxGeometry(config.size, config.size, config.size);
  const material = new THREE.MeshStandardMaterial({
    color: config.color,
    metalness: 0.5,
    roughness: 0.5,
  });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // Add lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  // Animation loop
  let time = 0;
  function animate() {
    requestAnimationFrame(animate);

    time += 0.01;

    // Rotation
    cube.rotation.x += config.rotationSpeed;
    cube.rotation.y += config.rotationSpeed * 0.8;

    // Floating effect
    cube.position.y = Math.sin(time * config.floatSpeed) * config.floatAmplitude;

    renderer.render(scene, camera);
  }

  // Handle window resize
  function handleResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }

  window.addEventListener('resize', handleResize);

  // Start animation
  animate();

  // Return cleanup function
  return () => {
    window.removeEventListener('resize', handleResize);
    container.removeChild(renderer.domElement);
    geometry.dispose();
    material.dispose();
    renderer.dispose();
  };
}

/**
 * Creates a 3D particle field animation
 * @param {string} containerId - The ID of the container element
 * @param {Object} options - Configuration options
 */
export function createParticleField(containerId, options = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Default options
  const config = {
    particleCount: options.particleCount || 500,
    particleSize: options.particleSize || 0.05,
    particleColor: options.particleColor || 0xffffff,
    depth: options.depth || 50,
    speed: options.speed || 0.1,
    ...options
  };

  // Create scene
  const scene = new THREE.Scene();

  // Create camera
  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  // Create renderer
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  // Create particles
  const particles = new THREE.BufferGeometry();
  const positions = [];
  const velocities = [];

  for (let i = 0; i < config.particleCount; i++) {
    // Position
    positions.push(
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * config.depth
    );

    // Velocity
    velocities.push(
      (Math.random() - 0.5) * 0.01,
      (Math.random() - 0.5) * 0.01,
      (Math.random() - 0.5) * 0.01
    );
  }

  particles.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

  // Create material
  const material = new THREE.PointsMaterial({
    color: config.particleColor,
    size: config.particleSize,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true
  });

  // Create points
  const particleSystem = new THREE.Points(particles, material);
  scene.add(particleSystem);

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);

    const positions = particles.attributes.position.array;

    for (let i = 0; i < positions.length; i += 3) {
      // Update position based on velocity
      positions[i] += velocities[i] * config.speed;
      positions[i + 1] += velocities[i + 1] * config.speed;
      positions[i + 2] += velocities[i + 2] * config.speed;

      // Reset if particle goes out of bounds
      if (positions[i] < -5 || positions[i] > 5) velocities[i] *= -1;
      if (positions[i + 1] < -5 || positions[i + 1] > 5) velocities[i + 1] *= -1;
      if (positions[i + 2] < -config.depth/2 || positions[i + 2] > config.depth/2) velocities[i + 2] *= -1;
    }

    particles.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  }

  // Handle window resize
  function handleResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }

  window.addEventListener('resize', handleResize);

  // Start animation
  animate();

  // Return cleanup function
  return () => {
    window.removeEventListener('resize', handleResize);
    container.removeChild(renderer.domElement);
    particles.dispose();
    material.dispose();
    renderer.dispose();
  };
}

/**
 * Creates a rotating 3D gear animation
 * @param {string} containerId - The ID of the container element
 * @param {Object} options - Configuration options
 */
export function createRotatingGear(containerId, options = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Default options
  const config = {
    radius: options.radius || 1,
    thickness: options.thickness || 0.2,
    teeth: options.teeth || 12,
    color: options.color || 0x044b89, // primary-800
    rotationSpeed: options.rotationSpeed || 0.01,
    ...options
  };

  // Create scene
  const scene = new THREE.Scene();

  // Create camera
  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  // Create renderer
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  // Create gear
  const gearGeometry = new THREE.CylinderGeometry(
    config.radius,
    config.radius,
    config.thickness,
    config.teeth * 2,
    1
  );

  // Add teeth to the gear
  const teethPositions = [];
  for (let i = 0; i < config.teeth; i++) {
    const angle = (i / config.teeth) * Math.PI * 2;
    const x = Math.cos(angle) * config.radius;
    const y = Math.sin(angle) * config.radius;
    teethPositions.push(new THREE.Vector3(x, 0, y));
  }

  // Create material
  const material = new THREE.MeshStandardMaterial({
    color: config.color,
    metalness: 0.8,
    roughness: 0.2,
  });

  const gear = new THREE.Mesh(gearGeometry, material);
  scene.add(gear);

  // Add lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);

    // Rotation
    gear.rotation.z += config.rotationSpeed;

    renderer.render(scene, camera);
  }

  // Handle window resize
  function handleResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }

  window.addEventListener('resize', handleResize);

  // Start animation
  animate();

  // Return cleanup function
  return () => {
    window.removeEventListener('resize', handleResize);
    container.removeChild(renderer.domElement);
    gearGeometry.dispose();
    material.dispose();
    renderer.dispose();
  };
}

/**
 * Adds scroll-triggered animations to elements
 * @param {string} selector - CSS selector for target elements
 */
export function addScrollAnimations(selector) {
  const elements = document.querySelectorAll(selector);

  elements.forEach((element, index) => {
    gsap.fromTo(
      element,
      {
        y: 50,
        opacity: 0,
        rotationX: 10,
        scale: 0.95
      },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
        delay: index * 0.1,
        scrollTrigger: {
          trigger: element,
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        }
      }
    );
  });
}
