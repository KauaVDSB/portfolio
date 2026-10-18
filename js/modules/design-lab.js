/**
 * Design & Personality Lab (Painel Interativo em Tempo Real)
 * Permite ao usuário escolher e testar paletas, modos e cores em tempo real
 */

export class DesignLab {
  constructor(themeManager) {
    this.themeManager = themeManager;
    this.isOpen = false;
    this.cheshireMode = localStorage.getItem('kaua_cheshire_mode') === 'true';

    this.initDOM();
    this.bindEvents();
    this.syncUI();
  }

  initDOM() {
    this.triggerBtn = document.getElementById('labTrigger');
    this.drawer = document.getElementById('labDrawer');
    this.overlay = document.getElementById('labOverlay');
    this.closeBtn = document.getElementById('labCloseBtn');
    this.resetBtn = document.getElementById('labResetBtn');

    this.modeBtns = document.querySelectorAll('[data-lab-mode]');
    this.paletteCards = document.querySelectorAll('[data-lab-palette]');

    this.bgColorPicker = document.getElementById('labBgColor');
    this.accentColorPicker = document.getElementById('labAccentColor');
    this.cheshireToggle = document.getElementById('labCheshireToggle');

    if (this.cheshireToggle) {
      this.cheshireToggle.checked = this.cheshireMode;
      document.body.classList.toggle('cheshire-mode-active', this.cheshireMode);
    }
  }

  bindEvents() {
    if (this.triggerBtn) {
      this.triggerBtn.addEventListener('click', () => this.toggleDrawer());
    }

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.closeDrawer());
    }

    if (this.overlay) {
      this.overlay.addEventListener('click', () => this.closeDrawer());
    }

    // Atalho de teclado: tecla "L" ou "D" para abrir o Lab
    document.addEventListener('keydown', (e) => {
      if ((e.key === 'l' || e.key === 'L' || e.key === 'd' || e.key === 'D') && 
          !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        this.toggleDrawer();
      }
      if (e.key === 'Escape' && this.isOpen) {
        this.closeDrawer();
      }
    });

    // Seletor de Modo (Light, Dark, System)
    this.modeBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const mode = btn.getAttribute('data-lab-mode');
        this.themeManager.setTheme(mode);
        this.clearCustomStyles();
        this.syncUI();
      });
    });

    // Seletor de Paletas Curadas
    this.paletteCards.forEach((card) => {
      card.addEventListener('click', () => {
        const palette = card.getAttribute('data-lab-palette');
        this.themeManager.setPalette(palette);
        this.clearCustomStyles();
        this.syncUI();
      });
    });

    // Custom Pickers em Tempo Real
    if (this.bgColorPicker) {
      this.bgColorPicker.addEventListener('input', (e) => {
        document.documentElement.style.setProperty('--bg-color', e.target.value);
        const label = document.getElementById('labBgColorVal');
        if (label) label.textContent = e.target.value.toUpperCase();
      });
    }

    if (this.accentColorPicker) {
      this.accentColorPicker.addEventListener('input', (e) => {
        document.documentElement.style.setProperty('--accent-color', e.target.value);
        document.documentElement.style.setProperty('--accent-glow', `${e.target.value}33`);
        const label = document.getElementById('labAccentColorVal');
        if (label) label.textContent = e.target.value.toUpperCase();
      });
    }

    // Toggle de Modo Cheshire
    if (this.cheshireToggle) {
      this.cheshireToggle.addEventListener('change', (e) => {
        this.cheshireMode = e.target.checked;
        localStorage.setItem('kaua_cheshire_mode', this.cheshireMode);
        document.body.classList.toggle('cheshire-mode-active', this.cheshireMode);
        this.showCheshireToast();
      });
    }

    // Resetar
    if (this.resetBtn) {
      this.resetBtn.addEventListener('click', () => {
        this.clearCustomStyles();
        this.themeManager.setTheme('system');
        this.themeManager.setPalette('editorial');
        this.cheshireMode = false;
        if (this.cheshireToggle) this.cheshireToggle.checked = false;
        document.body.classList.remove('cheshire-mode-active');
        localStorage.removeItem('kaua_cheshire_mode');
        this.syncUI();
      });
    }

    window.addEventListener('portfolio:theme-changed', () => this.syncUI());
  }

  toggleDrawer() {
    this.isOpen = !this.isOpen;
    if (this.drawer) this.drawer.classList.toggle('open', this.isOpen);
    if (this.overlay) this.overlay.classList.toggle('active', this.isOpen);
  }

  closeDrawer() {
    this.isOpen = false;
    if (this.drawer) this.drawer.classList.remove('open');
    if (this.overlay) this.overlay.classList.remove('active');
  }

  syncUI() {
    const curTheme = this.themeManager.currentTheme;
    const curPalette = this.themeManager.currentPalette;

    this.modeBtns.forEach((btn) => {
      const mode = btn.getAttribute('data-lab-mode');
      btn.classList.toggle('active', mode === curTheme);
    });

    this.paletteCards.forEach((card) => {
      const palette = card.getAttribute('data-lab-palette');
      card.classList.toggle('active', palette === curPalette);
    });

    // Atualiza os valores visuais dos pickers
    const computedStyles = getComputedStyle(document.documentElement);
    const bgVal = computedStyles.getPropertyValue('--bg-color').trim();
    const accentVal = computedStyles.getPropertyValue('--accent-color').trim();

    if (this.bgColorPicker && bgVal.startsWith('#')) {
      this.bgColorPicker.value = bgVal;
      const bgLbl = document.getElementById('labBgColorVal');
      if (bgLbl) bgLbl.textContent = bgVal.toUpperCase();
    }

    if (this.accentColorPicker && accentVal.startsWith('#')) {
      this.accentColorPicker.value = accentVal;
      const accLbl = document.getElementById('labAccentColorVal');
      if (accLbl) accLbl.textContent = accentVal.toUpperCase();
    }
  }

  clearCustomStyles() {
    document.documentElement.style.removeProperty('--bg-color');
    document.documentElement.style.removeProperty('--accent-color');
    document.documentElement.style.removeProperty('--accent-glow');
  }

  showCheshireToast() {
    const quotes = [
      "\"Não importa muito para onde você vai, desde que chegue a algum lugar.\" — Gato de Cheshire",
      "\"A imaginação é a única arma na guerra contra a realidade.\" — Lewis Carroll",
      "\"Perspicácia é encontrar padrões onde os outros só veem o caos.\""
    ];
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    
    // Pequeno toast animado
    let toast = document.getElementById('cheshireToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'cheshireToast';
      toast.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 24px;
        background: var(--surface-color);
        color: var(--text-main);
        border: 1.5px solid var(--accent-color);
        padding: 12px 18px;
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        z-index: 1700;
        max-width: 340px;
        font-size: 0.84rem;
        line-height: 1.45;
        font-style: italic;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        transform: translateY(20px);
        opacity: 0;
      `;
      document.body.appendChild(toast);
    }
    toast.textContent = quote;
    requestAnimationFrame(() => {
      toast.style.transform = 'translateY(0)';
      toast.style.opacity = '1';
    });
    setTimeout(() => {
      toast.style.transform = 'translateY(20px)';
      toast.style.opacity = '0';
    }, 4000);
  }
}
