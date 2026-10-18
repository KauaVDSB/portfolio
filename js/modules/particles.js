/**
 * Módulo de Partículas Flutuantes & Bioluminescência (Canvas 60fps)
 * Suporta 3 modos em tempo real:
 * - PART-01: Vagalumes / Orbes Flutuantes Bioluminescentes (Cheshire / Misterioso)
 * - PART-02: Constelação Neural & Malha Magnética
 * - PART-03: Desativado
 */

export class ParticleNetwork {
  constructor(canvasId = 'bgCanvas') {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) {
      this.createCanvas(canvasId);
    }
    this.ctx = this.canvas.getContext('2d');
    this.mode = localStorage.getItem('kaua_particle_mode') || 'PART-01';
    this.particles = [];
    this.mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2, active: false };
    this.animationFrameId = null;
    this.isRunning = false;
    this.time = 0;

    this.init();
  }

  createCanvas(canvasId) {
    this.canvas = document.createElement('canvas');
    this.canvas.id = canvasId;
    this.canvas.style.cssText = `
      position: fixed;
      inset: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 2;
      opacity: 0.92;
      transition: opacity 0.4s ease;
    `;
    document.body.prepend(this.canvas);
  }

  init() {
    this.resize();
    this.createParticles();
    this.bindEvents();
    this.start();
  }

  setMode(modeId) {
    this.mode = modeId;
    localStorage.setItem('kaua_particle_mode', modeId);
    if (modeId === 'PART-03') {
      this.canvas.style.opacity = '0';
    } else {
      this.canvas.style.opacity = '0.92';
      this.createParticles();
    }
  }

  getColors() {
    const computed = getComputedStyle(document.documentElement);
    const primary = computed.getPropertyValue('--accent-color').trim() || '#eb5939';
    const secondary = computed.getPropertyValue('--text-main').trim() || '#b7ab98';
    return {
      primary: this.hexToRgb(primary),
      secondary: this.hexToRgb(secondary)
    };
  }

  hexToRgb(hex) {
    hex = hex.replace('#', '').trim();
    if (hex.length === 3) {
      hex = hex.split('').map(c => c + c).join('');
    }
    const num = parseInt(hex, 16) || 0xeb5939;
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255
    };
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  createParticles() {
    this.particles = [];
    const density = this.mode === 'PART-01' ? 48 : 62;
    const count = Math.min(density, Math.max(28, Math.floor((this.width * this.height) / 20000)));

    for (let i = 0; i < count; i++) {
      const isAccent = Math.random() > 0.38;
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: this.mode === 'PART-01' ? -(Math.random() * 0.45 + 0.15) : (Math.random() - 0.5) * 0.55,
        radius: this.mode === 'PART-01' ? (Math.random() * 3.8 + 1.8) : (Math.random() * 2.2 + 1.4),
        phase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.025 + 0.01,
        swayAmp: Math.random() * 0.6 + 0.2,
        isAccent
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.createParticles();
    }, { passive: true });

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.mouse.active = true;
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        this.mouse.x = e.touches[0].clientX;
        this.mouse.y = e.touches[0].clientY;
        this.mouse.active = true;
      }
    }, { passive: true });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.stop();
      } else {
        this.start();
      }
    });
  }

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.animate();
    }
  }

  stop() {
    this.isRunning = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  animate() {
    if (!this.isRunning) return;

    this.ctx.clearRect(0, 0, this.width, this.height);

    if (this.mode !== 'PART-03') {
      this.time += 1;
      const colors = this.getColors();

      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];
        p.phase += p.pulseSpeed;

        if (this.mode === 'PART-01') {
          // Movimento de levitação misteriosa (sobe suavemente com oscilação senoidal)
          p.x += Math.sin(p.phase) * p.swayAmp + p.vx;
          p.y += p.vy;
        } else {
          p.x += p.vx;
          p.y += p.vy;
        }

        // Wrap around nas bordas da tela
        if (p.x < -20) p.x = this.width + 20;
        if (p.x > this.width + 20) p.x = -20;
        if (p.y < -20) p.y = this.height + 20;
        if (p.y > this.height + 20) p.y = -20;

        // Interação com a bolinha do cursor
        if (this.mouse.active) {
          const dx = this.mouse.x - p.x;
          const dy = this.mouse.y - p.y;
          const dist = Math.hypot(dx, dy);
          const interactRadius = 170;

          if (dist < interactRadius && dist > 1) {
            const force = (1 - dist / interactRadius) * 1.1;
            p.x -= (dx / dist) * force;
            p.y -= (dy / dist) * force;
          }
        }

        const c = p.isAccent ? colors.primary : colors.secondary;
        const alpha = 0.35 + Math.sin(p.phase) * 0.28;

        if (this.mode === 'PART-01') {
          // Desenha Orbe Bioluminescente com Halo Difuso (bem visível e elegante)
          const glowRadius = p.radius * 4.2;
          const grad = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowRadius);
          grad.addColorStop(0, `rgba(${c.r}, ${c.g}, ${c.b}, ${Math.min(0.95, alpha + 0.3)})`);
          grad.addColorStop(0.35, `rgba(${c.r}, ${c.g}, ${c.b}, ${alpha * 0.55})`);
          grad.addColorStop(1, `rgba(${c.r}, ${c.g}, ${c.b}, 0)`);

          this.ctx.beginPath();
          this.ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
          this.ctx.fillStyle = grad;
          this.ctx.fill();
        } else {
          // Modo PART-02: Constelação Neural
          this.ctx.beginPath();
          this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          this.ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${alpha + 0.25})`;
          this.ctx.fill();

          // Conexões entre nós próximos
          for (let j = i + 1; j < this.particles.length; j++) {
            const p2 = this.particles[j];
            const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (dist < 145) {
              const lineAlpha = (1 - dist / 145) * 0.28;
              this.ctx.beginPath();
              this.ctx.moveTo(p.x, p.y);
              this.ctx.lineTo(p2.x, p2.y);
              this.ctx.strokeStyle = `rgba(${colors.primary.r}, ${colors.primary.g}, ${colors.primary.b}, ${lineAlpha})`;
              this.ctx.lineWidth = 1;
              this.ctx.stroke();
            }
          }
        }
      }
    }

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }
}
