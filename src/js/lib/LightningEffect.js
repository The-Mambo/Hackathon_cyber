import * as THREE from 'three';

export class GlitchEffect {
  constructor(container) {
    this.container = container;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    
    // Glitch properties
    this.isGlitching = false;
    this.glitchIntensity = 0;
    this.glitchTime = 0;
    this.glitchDuration = 0;
    this.messages = [
      'SYSTEM BREACH',
      'ACCESS GRANTED',
      'DATA CORRUPTED',
      'FIREWALL BYPASSED',
      'SECURITY COMPROMISED',
      'ENCRYPTION FAILED',
      'SYSTEM OVERRIDE',
      'NEURAL INTERFACE',
      'CONNECTION LOST',
      'MEMORY DUMP'
    ];
    
    this.init();
  }
  
  init() {
    // Create scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x121212);
    
    // Create camera
    this.camera = new THREE.PerspectiveCamera(70, this.width / this.height, 0.1, 1000);
    this.camera.position.z = 5;
    
    // Create renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.container.appendChild(this.renderer.domElement);
    
    // Handle window resize
    window.addEventListener('resize', () => this.handleResize());
    
    // Create elements
    this.setupGrid();
    this.setupParticles();
    this.setupCubes();
    
    // Start animation loop
    this.animate();
  }
  
  setupGrid() {
    // Create grid material
    const gridMaterial = new THREE.LineBasicMaterial({ 
      color: 0x39ff14,
      opacity: 0.3,
      transparent: true
    });
    
    // Create horizontal grid
    const hGridGeometry = new THREE.BufferGeometry();
    const hGridVertices = [];
    
    for (let i = -50; i <= 50; i += 2) {
      hGridVertices.push(-50, 0, i);
      hGridVertices.push(50, 0, i);
    }
    
    hGridGeometry.setAttribute('position', new THREE.Float32BufferAttribute(hGridVertices, 3));
    const hGrid = new THREE.LineSegments(hGridGeometry, gridMaterial);
    
    // Create vertical grid
    const vGridGeometry = new THREE.BufferGeometry();
    const vGridVertices = [];
    
    for (let i = -50; i <= 50; i += 2) {
      vGridVertices.push(i, 0, -50);
      vGridVertices.push(i, 0, 50);
    }
    
    vGridGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vGridVertices, 3));
    const vGrid = new THREE.LineSegments(vGridGeometry, gridMaterial);
    
    // Add grid to scene
    const gridGroup = new THREE.Group();
    gridGroup.add(hGrid);
    gridGroup.add(vGrid);
    gridGroup.rotation.x = Math.PI / 2;
    gridGroup.position.y = -10;
    
    this.scene.add(gridGroup);
    this.grid = gridGroup;
  }
  
  setupParticles() {
    // Create particles
    const particleCount = 500;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      particlePositions[i3] = (Math.random() - 0.5) * 50;
      particlePositions[i3 + 1] = (Math.random() - 0.5) * 50;
      particlePositions[i3 + 2] = (Math.random() - 0.5) * 50;
      
      particleSizes[i] = Math.random() * 2;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));
    
    // Create particle material
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x39ff14,
      size: 0.1,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending
    });
    
    // Create particle system
    this.particles = new THREE.Points(particleGeometry, particleMaterial);
    this.scene.add(this.particles);
    
    // Store original positions for animation
    this.particlePositions = particlePositions;
  }
  
  setupCubes() {
    // Create cube grid
    this.cubes = new THREE.Group();
    
    const size = 0.4;
    const gap = 2;
    const cubeGeometry = new THREE.BoxGeometry(size, size, size);
    const cubeMaterial = new THREE.MeshBasicMaterial({
      color: 0x39ff14,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    
    for (let x = -2; x <= 2; x++) {
      for (let y = -2; y <= 2; y++) {
        for (let z = -2; z <= 2; z++) {
          // Only create cubes on the outer layer
          if (Math.abs(x) === 2 || Math.abs(y) === 2 || Math.abs(z) === 2) {
            const cube = new THREE.Mesh(cubeGeometry, cubeMaterial.clone());
            cube.position.set(x * gap, y * gap, z * gap);
            cube.originalOpacity = cubeMaterial.opacity;
            this.cubes.add(cube);
          }
        }
      }
    }
    
    this.scene.add(this.cubes);
  }
  
  createTextEffect() {
    // Select random glitch message
    const message = this.messages[Math.floor(Math.random() * this.messages.length)];
    
    // Create text canvas
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    canvas.width = 512;
    canvas.height = 128;
    
    // Draw text onto canvas
    context.fillStyle = 'rgba(0, 0, 0, 0)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    context.font = 'bold 72px VT323, monospace';
    context.fillStyle = '#39ff14';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(message, canvas.width / 2, canvas.height / 2);
    
    // Create texture from canvas
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    
    // Create material with texture
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide
    });
    
    // Create plane geometry
    const geometry = new THREE.PlaneGeometry(10, 2.5);
    
    // Create mesh
    const textMesh = new THREE.Mesh(geometry, material);
    textMesh.position.z = -2;
    textMesh.position.y = 0.5;
    
    this.scene.add(textMesh);
    
    // Animate text
    const fadeIn = () => {
      if (material.opacity < 1) {
        material.opacity += 0.05;
        requestAnimationFrame(fadeIn);
      } else {
        setTimeout(() => {
          const fadeOut = () => {
            if (material.opacity > 0) {
              material.opacity -= 0.05;
              requestAnimationFrame(fadeOut);
            } else {
              this.scene.remove(textMesh);
            }
          };
          fadeOut();
        }, 1500);
      }
    };
    
    fadeIn();
  }
  
  triggerGlitch(duration = 1.0) {
    if (!this.isGlitching) {
      this.isGlitching = true;
      this.glitchTime = 0;
      this.glitchDuration = duration;
      this.glitchIntensity = 1.0;
      
      // Show glitch text 50% of the time
      if (Math.random() > 0.5) {
        this.createTextEffect();
      }
      
      // Activate random elements
      this.activateRandomPixels();
      this.activateParticles();
    }
  }
  
  activateRandomPixels() {
    // Make cubes flash randomly
    this.cubes.children.forEach(cube => {
      if (Math.random() > 0.7) {
        cube.material.opacity = Math.random() * 0.8 + 0.2;
        cube.material.color.setHSL(Math.random() * 0.1 + 0.5, 1, 0.5);
      }
    });
  }
  
  activateParticles() {
    // Move particles randomly
    for (let i = 0; i < this.particlePositions.length; i += 3) {
      if (Math.random() > 0.93) {
        this.particlePositions[i] = (Math.random() - 0.5) * 50;
        this.particlePositions[i + 1] = (Math.random() - 0.5) * 50;
        this.particlePositions[i + 2] = (Math.random() - 0.5) * 50;
      }
    }
    
    this.particles.geometry.attributes.position.needsUpdate = true;
  }
  
  handleResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    
    this.renderer.setSize(this.width, this.height);
  }
  
  update() {
    // Update glitch effect
    if (this.isGlitching) {
      this.glitchTime += 0.016; // Approximately 60fps
      
      // Fade out glitch intensity
      this.glitchIntensity = 1.0 - (this.glitchTime / this.glitchDuration);
      
      if (this.glitchTime >= this.glitchDuration) {
        this.isGlitching = false;
        
        // Reset cubes
        this.cubes.children.forEach(cube => {
          cube.material.opacity = cube.originalOpacity;
          cube.material.color.set(0x39ff14);
        });
      } else {
        // Continue random glitches
        if (Math.random() > 0.7) {
          this.activateRandomPixels();
        }
      }
    }
    
    // Rotate cubes
    if (this.cubes) {
      this.cubes.rotation.x += 0.003;
      this.cubes.rotation.y += 0.002;
    }
    
    // Rotate grid
    if (this.grid) {
      this.grid.rotation.z += 0.001;
    }
    
    // Rotate particles
    if (this.particles) {
      this.particles.rotation.y += 0.0005;
    }
    
    // Render scene
    this.renderer.render(this.scene, this.camera);
  }
  
  animate() {
    requestAnimationFrame(() => this.animate());
    this.update();
  }
} 