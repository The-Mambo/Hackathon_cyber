import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { GlitchEffect } from './lib/LightningEffect.js';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Global variables
let canvas, scene, camera, renderer, glitchEffect;
let isLoaded = false;
let bootingText = ["INITIALIZING", "SYSTEM", "BOOT", "SEQUENCE", "LOADING", "FILES", "CONNECTING", "TO", "NETWORK", "ESTABLISHING", "SECURE", "CONNECTION"];
let bootIndex = 0;
let activeGlitchTimer;
const loginCommands = ['help', 'login', 'access', 'password', 'bolt'];
const loginResponses = {
  help: 'Available commands: login, access, password, bolt',
  login: 'User credentials required. Try "access [username]"',
  access: 'Password required. Try "password [code]"',
  password: 'Invalid credentials. Try "BOLT"',
  bolt: 'TYPE "BOLT" AND PRESS ENTER TO BEGIN'
};

// Initialize the application
function init() {
  setupLoading();
  setupThreeJS();
  setupGlitchEffect();
  setupEventListeners();
  setupAnimations();
  setupLoginPopup();
  handleImageLoading();
  animate();
}

// Loading screen animation
function setupLoading() {
  const loadingBar = document.querySelector('.loading-bar');
  const loadingText = document.querySelector('.loading-text');
  const loadingScreen = document.querySelector('.loading-screen');
  
  // Change loading text periodically
  const textInterval = setInterval(() => {
    loadingText.textContent = bootingText[bootIndex] + "...";
    bootIndex = (bootIndex + 1) % bootingText.length;
  }, 800);
  
  // Simulate loading progress in chunks
  let progress = 0;
  const interval = setInterval(() => {
    const increment = Math.floor(Math.random() * 5) + 1; // 1-5% at a time
    progress += increment;
    
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      clearInterval(textInterval);
      
      loadingText.textContent = "ACCESS GRANTED";
      
      // Complete loading
      setTimeout(() => {
        gsap.to(loadingScreen, {
          opacity: 0,
          duration: 0.8,
          onComplete: () => {
            loadingScreen.classList.add('hidden');
            isLoaded = true;
            
            // Animate hero content with typewriter effect
            const heroContent = document.querySelector('.hero-content');
            heroContent.classList.add('visible');
            
            // Trigger glitch animation
            glitchEffect.triggerGlitch();
            
            // Typewriter effect for title
            const title = document.querySelector('.title');
            typewriterEffect(title, 50);
            
            // Then typewriter effect for tagline
            setTimeout(() => {
              const tagline = document.querySelector('.tagline');
              typewriterEffect(tagline, 30);
            }, 1500);
          }
        });
      }, 1000);
    }
    
    // Update loading bar with "stepped" progress
    loadingBar.style.width = `${progress}%`;
  }, 200);
}

// Typewriter effect
function typewriterEffect(element, speed) {
  const text = element.textContent;
  element.textContent = '';
  element.style.visibility = 'visible';
  
  let i = 0;
  const timer = setInterval(() => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(timer);
      // Add blinking cursor at the end
      const cursor = document.createElement('span');
      cursor.classList.add('cursor');
      cursor.textContent = '█';
      element.appendChild(cursor);
      
      // Remove cursor after a while
      setTimeout(() => {
        cursor.remove();
      }, 3000);
    }
  }, speed);
}

// Set up Three.js scene
function setupThreeJS() {
  // Canvas setup
  canvas = document.querySelector('.webgl');
  
  // Scene setup
  scene = new THREE.Scene();
  scene.background = new THREE.Color('#121212');
  
  // Camera setup
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
  };
  
  camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
  camera.position.z = 5;
  scene.add(camera);
  
  // Renderer setup
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  
  // Handle resize
  window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    
    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    
    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });
  
  // Add ambient light
  const ambientLight = new THREE.AmbientLight(0x404040, 1);
  scene.add(ambientLight);
}

// Set up the glitch effect
function setupGlitchEffect() {
  const container = document.getElementById('backgroundCanvas');
  glitchEffect = new GlitchEffect(container);
  
  // Random glitch effect every 6-15 seconds
  function scheduleRandomGlitch() {
    const randomTime = Math.floor(Math.random() * 9000) + 6000; // 6-15 seconds
    
    activeGlitchTimer = setTimeout(() => {
      glitchEffect.triggerGlitch();
      scheduleRandomGlitch();
    }, randomTime);
  }
  
  scheduleRandomGlitch();
  
  // Store in window for other functions to access
  window.glitchEffect = glitchEffect;
}

// Set up event listeners
function setupEventListeners() {
  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      
      // Trigger glitch effect on menu toggle
      if (glitchEffect) {
        glitchEffect.triggerGlitch(0.8);
      }
    });
  }
  
  // CTA button interactions
  const ctaButtons = document.querySelectorAll('.cta-button');
  ctaButtons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      if (glitchEffect) {
        glitchEffect.triggerGlitch(0.5);
      }
    });
  });
}

// Set up scroll and reveal animations
function setupAnimations() {
  // Animate sections on scroll
  const sections = document.querySelectorAll('section:not(.hero)');
  sections.forEach(section => {
    gsap.from(section, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          if (Math.random() > 0.5 && isLoaded) {
            glitchEffect.triggerGlitch();
            
            // Typewriter effect for section titles
            const sectionTitle = section.querySelector('.section-title');
            if (sectionTitle) {
              sectionTitle.style.visibility = 'hidden';
              setTimeout(() => {
                typewriterEffect(sectionTitle, 30);
              }, 300);
            }
          }
        }
      }
    });
  });
  
  // Detail cards animation
  const detailCards = document.querySelectorAll('.detail-card');
  detailCards.forEach((card, index) => {
    gsap.from(card, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      delay: index * 0.15,
      scrollTrigger: {
        trigger: '.detail-cards',
        start: 'top 80%',
        once: true
      }
    });
  });
  
  // Sponsor cards animation
  const sponsorCards = document.querySelectorAll('.sponsor-card');
  sponsorCards.forEach((card, index) => {
    gsap.from(card, {
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
      delay: index * 0.1,
      scrollTrigger: {
        trigger: '.sponsors-grid',
        start: 'top 80%',
        once: true
      }
    });
    
    // Add glitch effect to sponsor cards on hover
    card.addEventListener('mouseenter', () => {
      card.classList.add('glitch-text');
    });
    
    card.addEventListener('mouseleave', () => {
      card.classList.remove('glitch-text');
    });
  });
  
  // Host section animation
  const hostContainer = document.querySelector('.host-container');
  if (hostContainer) {
    gsap.from('.host-image', {
      opacity: 0,
      x: -50,
      duration: 0.8,
      scrollTrigger: {
        trigger: '.host-container',
        start: 'top 80%',
        once: true
      }
    });
    
    gsap.from('.host-info', {
      opacity: 0,
      x: 50,
      duration: 0.8,
      delay: 0.2,
      scrollTrigger: {
        trigger: '.host-container',
        start: 'top 80%',
        once: true
      }
    });
  }
  
  // Judge cards animation
  const judgeCards = document.querySelectorAll('.judge-card');
  judgeCards.forEach((card, index) => {
    gsap.from(card, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      delay: index * 0.1,
      scrollTrigger: {
        trigger: '.judges-grid',
        start: 'top 80%',
        once: true
      }
    });
  });
}

// Fix for image loading
function handleImageLoading() {
  // Preload sponsor images
  const sponsorImages = document.querySelectorAll('.sponsor-image');
  sponsorImages.forEach(img => {
    // Add placeholder if image fails to load (already handled by onerror)
    img.addEventListener('load', () => {
      const placeholder = img.parentNode.querySelector('.sponsor-placeholder');
      if (placeholder) {
        placeholder.style.marginBottom = '0.5rem';
      }
    });
  });
  
  // Preload judge images
  const judgeImages = document.querySelectorAll('.judge-image img');
  judgeImages.forEach(img => {
    // onerror already handled in HTML
    img.addEventListener('load', () => {
      img.style.opacity = '1';
    });
  });
  
  // Preload host image
  const hostImage = document.querySelector('.host-image img');
  if (hostImage) {
    hostImage.addEventListener('error', () => {
      const hostImageContainer = hostImage.parentNode;
      hostImageContainer.innerHTML = '<div class="host-placeholder"></div>';
    });
  }
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  
  // Update glitch effect
  if (glitchEffect) {
    glitchEffect.update();
  }
  
  // Render scene
  renderer.render(scene, camera);
}

// Login popup functionality
function setupLoginPopup() {
  const loginPopup = document.getElementById('loginPopup');
  const commandInput = document.getElementById('commandInput');
  const loginStatus = document.getElementById('loginStatus');
  const sendCommand = document.getElementById('sendCommand');
  const commandForm = document.getElementById('commandForm');
  
  if (!loginPopup || !commandInput || !loginStatus || !sendCommand || !commandForm) {
    console.error('Login popup elements not found!');
    return;
  }
  
  // Initially hide popup
  loginPopup.style.display = 'none';
  
  // Process command function - define globally to be accessible from HTML
  window.processCommand = function() {
    console.log('Processing command:', commandInput.value);
    const command = commandInput.value.trim().toLowerCase();
    
    if (command === '') return false;
    
    // Process command
    let commandFound = false;
    for (const cmd of loginCommands) {
      if (command.startsWith(cmd)) {
        loginStatus.textContent = loginResponses[cmd];
        loginStatus.style.visibility = 'visible';
        commandFound = true;
        
        if (cmd === 'bolt') {
          // Successful login
          if (window.glitchEffect) {
            window.glitchEffect.triggerGlitch(2);
          }
          
          setTimeout(() => {
            loginPopup.style.opacity = 0;
            setTimeout(() => {
              loginPopup.style.display = 'none';
            }, 500);
            
            // Show success message or redirect
            alert('BOLT HACKATHON');
          }, 2000);
        }
        
        break;
      }
    }
    
    // If no command matches
    if (!commandFound && command.length > 0) {
      loginStatus.textContent = 'UNKNOWN COMMAND. TYPE "BOLT" TO BEGIN';
      loginStatus.style.visibility = 'visible';
    }
    
    // Clear input after processing
    commandInput.value = '';
    return false; // Prevent form submission
  };
  
  // Handle Enter key directly on the input
  commandInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      console.log('Enter key pressed on input');
      window.processCommand();
      return false;
    }
  });
  
  // Handle form submission
  commandForm.addEventListener('submit', function(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('Form submitted');
    window.processCommand();
    return false;
  });
  
  // Handle button click
  sendCommand.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('Send button clicked');
    window.processCommand();
    return false;
  });
  
  // Expose function to global scope for direct HTML access
  window.showLoginPopup = showLoginPopup;
}

function showLoginPopup() {
  const loginPopup = document.getElementById('loginPopup');
  const loginStatus = document.getElementById('loginStatus');
  const commandInput = document.getElementById('commandInput');
  
  if (!loginPopup || !commandInput || !loginStatus) {
    console.error('Login popup elements not found!');
    return;
  }
  
  // Reset the input
  commandInput.value = '';
  loginPopup.style.display = 'flex';
  loginPopup.style.opacity = 1;
  loginStatus.style.visibility = 'hidden';
  
  // Add glitch effect when showing popup
  if (window.glitchEffect) {
    window.glitchEffect.triggerGlitch(1);
  }
  
  // Focus the input field after a short delay to ensure the popup is fully displayed
  setTimeout(() => {
    try {
      commandInput.focus();
      console.log('Input focused on popup show');
    } catch (e) {
      console.error('Error focusing on input:', e);
    }
  }, 300);
  
  // Add a click handler for closing/focusing
  loginPopup.onclick = function(e) {
    if (e.target === loginPopup) {
      // If clicking outside the login box, close the popup
      loginPopup.style.opacity = 0;
      setTimeout(() => {
        loginPopup.style.display = 'none';
      }, 500);
    } else {
      // If clicking inside, make sure we focus on the input
      setTimeout(() => commandInput.focus(), 50);
    }
  };
}

// Cleanup function for page unload
window.addEventListener('beforeunload', () => {
  if (activeGlitchTimer) {
    clearTimeout(activeGlitchTimer);
  }
});

// Initialize when DOM is loaded
window.addEventListener('DOMContentLoaded', init); 