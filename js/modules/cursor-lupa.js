/**
 * Motor da Bolinha Perseguidora Suave + Lupa Reveladora (Estilo minhpham.design)
 * Física de interpolação linear (lerp) a 60fps para movimento orgânico
 */

export class CursorLupaEngine {
  constructor() {
    this.mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.lerpFactor = 0.18;

    // Raios da Lupa (metade do diâmetro)
    this.radiusMap = {
      'LUPA-SM': 115,
      'LUPA-MD': 165,
      'LUPA-LG': 225
    };
    this.currentSizeId = localStorage.getItem('kaua_lupa_size') || 'LUPA-MD';
    this.targetRadius = this.radiusMap[this.currentSizeId] || 165;

    this.containers = [];
    this.activeContainer = null;
    this.touchInspectMode = false;

    this.init();
  }

  init() {
    this.collectContainers();
    this.bindEvents();
    this.loop();
  }

  collectContainers() {
    const els = document.querySelectorAll('.mask-reveal-container');
    this.containers = Array.from(els).map((el) => ({
      el,
      maskLayer: el.querySelector('.secret-mask-layer'),
      currentRadius: 0,
      isHovered: false
    }));
  }

  setLupaSize(sizeId) {
    this.currentSizeId = sizeId;
    this.targetRadius = this.radiusMap[sizeId] || 165;
    localStorage.setItem('kaua_lupa_size', sizeId);
  }

  bindEvents() {
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    }, { passive: true });

    // Eventos de hover em cada área revelável
    this.containers.forEach((item) => {
      item.el.addEventListener('mouseenter', () => {
        item.isHovered = true;
        document.body.classList.add('is-mask-hovering');
      });

      item.el.addEventListener('mouseleave', () => {
        item.isHovered = false;
        if (!this.containers.some(c => c.isHovered)) {
          document.body.classList.remove('is-mask-hovering');
        }
      });

      // Suporte para toque no celular / tablet
      item.el.addEventListener('touchstart', (e) => {
        if (e.touches.length > 0) {
          this.mouse.x = e.touches[0].clientX;
          this.mouse.y = e.touches[0].clientY;
          this.pos.x = this.mouse.x;
          this.pos.y = this.mouse.y;
          item.isHovered = true;
          document.body.classList.add('is-mask-hovering');
        }
      }, { passive: true });

      item.el.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
          this.mouse.x = e.touches[0].clientX;
          this.mouse.y = e.touches[0].clientY;
        }
      }, { passive: true });

      item.el.addEventListener('touchend', () => {
        if (!this.touchInspectMode) {
          setTimeout(() => {
            item.isHovered = false;
            document.body.classList.remove('is-mask-hovering');
          }, 1200);
        }
      }, { passive: true });
    });

    // Botão de demonstração automática da Lupa (ótimo para testar ou ver no mobile)
    const demoBtn = document.getElementById('toggleLupaDemoBtn');
    if (demoBtn) {
      demoBtn.addEventListener('click', () => {
        this.triggerAutoScan();
      });
    }
  }

  triggerAutoScan() {
    const heroBox = this.containers[0];
    if (!heroBox) return;

    const rect = heroBox.el.getBoundingClientRect();
    heroBox.isHovered = true;
    document.body.classList.add('is-mask-hovering');

    let angle = 0;
    const scanInterval = setInterval(() => {
      angle += 0.06;
      const cx = rect.left + rect.width / 2 + Math.cos(angle) * (rect.width * 0.25);
      const cy = rect.top + rect.height / 2 + Math.sin(angle * 1.5) * (rect.height * 0.22);
      this.mouse.x = cx;
      this.mouse.y = cy;

      if (angle > Math.PI * 2) {
        clearInterval(scanInterval);
        heroBox.isHovered = false;
        document.body.classList.remove('is-mask-hovering');
      }
    }, 16);
  }

  loop() {
    // Interpolação suave (lerp) da bolinha perseguidora
    this.pos.x += (this.mouse.x - this.pos.x) * this.lerpFactor;
    this.pos.y += (this.mouse.y - this.pos.y) * this.lerpFactor;

    document.documentElement.style.setProperty('--cursor-x', `${this.pos.x.toFixed(1)}px`);
    document.documentElement.style.setProperty('--cursor-y', `${this.pos.y.toFixed(1)}px`);

    // Atualiza cada camada de máscara reveladora ativa
    for (let i = 0; i < this.containers.length; i++) {
      const item = this.containers[i];
      if (!item.maskLayer) continue;

      const goalRadius = item.isHovered ? this.targetRadius : 0;
      item.currentRadius += (goalRadius - item.currentRadius) * 0.16;

      if (item.currentRadius > 0.5 || item.isHovered) {
        const rect = item.el.getBoundingClientRect();
        const localX = this.pos.x - rect.left;
        const localY = this.pos.y - rect.top;

        item.maskLayer.style.setProperty('--local-x', `${localX.toFixed(1)}px`);
        item.maskLayer.style.setProperty('--local-y', `${localY.toFixed(1)}px`);
        item.maskLayer.style.setProperty('--local-mask-size', `${item.currentRadius.toFixed(1)}px`);
      } else if (item.currentRadius <= 0.5 && item.currentRadius !== 0) {
        item.currentRadius = 0;
        item.maskLayer.style.setProperty('--local-mask-size', '0px');
      }
    }

    requestAnimationFrame(() => this.loop());
  }
}
