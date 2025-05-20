import { createFloatingCube, createParticleField, createRotatingGear, addScrollAnimations } from '../utils/three-animations';

// Initialize animations when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize hero section animations
  initHeroAnimations();

  // Initialize scroll animations for service cards
  initServiceCardAnimations();

  // Initialize header background animations
  initHeaderAnimations();

  // Initialize service page animations
  initServicePageAnimations();

  // Initialize partners section animation
  initPartnersAnimation();
});

/**
 * Initialize animations for the hero section
 */
function initHeroAnimations() {
  // Check if hero animation container exists
  const heroAnimationContainer = document.getElementById('hero-animation');
  if (heroAnimationContainer) {
    // Create floating 3D cube in hero section
    createFloatingCube('hero-animation', {
      size: 1.5,
      color: 0xff7b10, // accent-500
      rotationSpeed: 0.005,
      floatAmplitude: 0.2,
      floatSpeed: 0.8
    });
  }

  // Check if hero particle container exists
  const heroParticleContainer = document.getElementById('hero-particles');
  if (heroParticleContainer) {
    // Create particle field in hero section
    createParticleField('hero-particles', {
      particleCount: 300,
      particleSize: 0.03,
      particleColor: 0xffffff,
      depth: 30,
      speed: 0.05
    });
  }
}

/**
 * Initialize animations for service cards
 */
function initServiceCardAnimations() {
  // Add scroll animations to service cards
  addScrollAnimations('.service-card');

  // Add hover animations to service cards
  const serviceCards = document.querySelectorAll('.service-card');

  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        scale: 1.03,
        rotationY: 5,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        scale: 1,
        rotationY: 0,
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
}

/**
 * Initialize animations for page headers
 */
function initHeaderAnimations() {
  // Check if header animation container exists
  const headerAnimationContainer = document.getElementById('header-animation');
  if (headerAnimationContainer) {
    // Create particle field in header
    createParticleField('header-animation', {
      particleCount: 100,
      particleSize: 0.02,
      particleColor: 0xffffff,
      depth: 10,
      speed: 0.02
    });
  }

  // Add animations to header text
  const headerTitle = document.querySelector('.header-title');
  if (headerTitle) {
    gsap.from(headerTitle, {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 0.2
    });
  }

  const headerDescription = document.querySelector('.header-description');
  if (headerDescription) {
    gsap.from(headerDescription, {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 0.4
    });
  }
}

/**
 * Initialize animations for the services page
 */
function initServicePageAnimations() {
  // Service-specific animations
  initServiceAnimation('electrical-panels', {
    type: 'particles',
    particleCount: 80,
    particleSize: 0.02,
    particleColor: 0x3498db, // Blue for electrical
    depth: 5,
    speed: 0.03
  });

  initServiceAnimation('automation', {
    type: 'gear',
    radius: 1.2,
    thickness: 0.2,
    teeth: 16,
    color: 0xe74c3c, // Red for automation
    rotationSpeed: 0.01
  });

  initServiceAnimation('engineering', {
    type: 'particles',
    particleCount: 60,
    particleSize: 0.015,
    particleColor: 0x2ecc71, // Green for engineering
    depth: 8,
    speed: 0.02
  });

  initServiceAnimation('material-handling', {
    type: 'cube',
    size: 0.7,
    color: 0xf39c12, // Orange for material handling
    rotationSpeed: 0.008,
    floatAmplitude: 0.15,
    floatSpeed: 0.4
  });

  initServiceAnimation('weighing', {
    type: 'particles',
    particleCount: 50,
    particleSize: 0.01,
    particleColor: 0x9b59b6, // Purple for weighing
    depth: 6,
    speed: 0.025
  });
}

/**
 * Initialize animation for a specific service
 * @param {string} serviceId - The ID of the service
 * @param {Object} options - Animation options
 */
function initServiceAnimation(serviceId, options) {
  const animationContainer = document.getElementById(`service-animation-${serviceId}`);
  if (!animationContainer) return;

  if (options.type === 'cube') {
    createFloatingCube(`service-animation-${serviceId}`, options);
  } else if (options.type === 'particles') {
    createParticleField(`service-animation-${serviceId}`, options);
  } else if (options.type === 'gear') {
    createRotatingGear(`service-animation-${serviceId}`, options);
  }
}

/**
 * Initialize animation for the partners section
 */
function initPartnersAnimation() {
  const partnersAnimationContainer = document.getElementById('partners-animation');
  if (!partnersAnimationContainer) return;

  // Create a subtle particle field for the partners section
  createParticleField('partners-animation', {
    particleCount: 150,
    particleSize: 0.01,
    particleColor: 0x044b89, // primary-800
    depth: 15,
    speed: 0.01
  });
}
