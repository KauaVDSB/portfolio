/**
 * Design & Experiment Lab (Painel de Edição Ao Vivo com IDs de Opções)
 * Permite ao Kauã testar variações e copiar os IDs favoritos (PAL, TXT, CASE, PART, LUPA)
 */

const HERO_PHRASES = {
  'TXT-01': {
    publicLines: ['CRIANDO', '<span class="line-accent">SISTEMAS</span>', '<span class="line-accent">REAIS</span>', 'COM IMPACTO', 'REAL'],
    secretLines: ['ACHANDO', 'ATALHOS', 'ONDE SÓ', 'VIAM O', 'CAOS']
  },
  'TXT-02': {
    publicLines: ['ENGENHARIA', '<span class="line-accent">SÓBRIA</span>', '<span class="line-accent">& CÓDIGO</span>', 'LIMPO', 'EM PRODUÇÃO'],
    secretLines: ['UM GATO', 'RISONHO', 'HACKEANDO', 'TODA A', 'OPERAÇÃO']
  },
  'TXT-03': {
    publicLines: ['CONVERTENDO', '<span class="line-accent">HORAS</span>', '<span class="line-accent">BRUTAS</span>', 'EM PUROS', 'SEGUNDOS'],
    secretLines: ['PORQUE', 'DIGITAÇÃO', 'BRAÇAL', 'FICOU EM', '2010']
  },
  'TXT-04': {
    publicLines: ['CIÊNCIA DA', '<span class="line-accent">COMPUTAÇÃO</span>', '<span class="line-accent">& VISÃO</span>', 'DE PRODUTO', 'UFAPE'],
    secretLines: ['NEM TODO', 'QUEM', 'VAGUEIA', 'ESTÁ', 'PERDIDO']
  }
};

export class DesignLab {
  constructor(themeManager, particleNetwork, cursorLupa) {
    this.themeManager = themeManager;
    this.particleNetwork = particleNetwork;
    this.cursorLupa = cursorLupa;

    this.isOpen = false;
    this.selectedTxt = localStorage.getItem('kaua_txt_id') || 'TXT-01';
    this.selectedCase = localStorage.getItem('kaua_case_id') || 'CASE-01';

    this.initDOM();
    this.applyHeroPhrase(this.selectedTxt);
    this.applyCasesLayout(this.selectedCase);
    this.bindEvents();
    this.syncUI();
  }

  initDOM() {
    this.triggerBtn = document.getElementById('labTrigger');
    this.drawer = document.getElementById('labDrawer');
    this.overlay = document.getElementById('labOverlay');
    this.closeBtn = document.getElementById('labCloseBtn');
    this.resetBtn = document.getElementById('labResetBtn');
    this.replayLoaderBtn = document.getElementById('replayLoaderBtn');
    this.copyIdsBtn = document.getElementById('copyActiveIdsBtn');
    this.activeIdsLabel = document.getElementById('activeIdsCode');

    this.modeBtns = document.querySelectorAll('[data-lab-mode]');
    this.paletteBtns = document.querySelectorAll('[data-lab-palette]');
    this.txtBtns = document.querySelectorAll('[data-lab-txt]');
    this.caseBtns = document.querySelectorAll('[data-lab-case]');
    this.partBtns = document.querySelectorAll('[data-lab-part]');
    this.lupaBtns = document.querySelectorAll('[data-lab-lupa]');

    this.bgColorPicker = document.getElementById('labBgColor');
    this.accentColorPicker = document.getElementById('labAccentColor');
  }

  bindEvents() {
    this.triggerBtn?.addEventListener('click', () => this.toggleDrawer());
    document.getElementById('hudOpenLab')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggleDrawer();
    });

    this.closeBtn?.addEventListener('click', () => this.closeDrawer());
    this.overlay?.addEventListener('click', () => this.closeDrawer());

    document.addEventListener('keydown', (e) => {
      if ((e.key === 'd' || e.key === 'D' || e.key === 'l' || e.key === 'L') &&
          !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        this.toggleDrawer();
      }
      if (e.key === 'Escape' && this.isOpen) {
        this.closeDrawer();
      }
    });

    // Modos Claro / Escuro / Sistema
    this.modeBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.clearCustomColors();
        this.themeManager.setTheme(btn.getAttribute('data-lab-mode'));
        this.syncUI();
      });
    });

    // Paletas (PAL-01 a PAL-04)
    this.paletteBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.clearCustomColors();
        this.themeManager.setPalette(btn.getAttribute('data-lab-palette'));
        this.syncUI();
      });
    });

    // Frases da Lupa no Hero (TXT-01 a TXT-04)
    this.txtBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const txtId = btn.getAttribute('data-lab-txt');
        this.selectedTxt = txtId;
        localStorage.setItem('kaua_txt_id', txtId);
        this.applyHeroPhrase(txtId);
        this.syncUI();
      });
    });

    // Layout da Seção de Cases (CASE-01 vs CASE-02)
    this.caseBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const caseId = btn.getAttribute('data-lab-case');
        this.selectedCase = caseId;
        localStorage.setItem('kaua_case_id', caseId);
        this.applyCasesLayout(caseId);
        this.syncUI();
      });
    });

    // Estilo das Partículas (PART-01 a PART-03)
    this.partBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const partId = btn.getAttribute('data-lab-part');
        this.particleNetwork?.setMode(partId);
        this.syncUI();
      });
    });

    // Tamanho da Lupa (LUPA-SM, LUPA-MD, LUPA-LG)
    this.lupaBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const lupaId = btn.getAttribute('data-lab-lupa');
        this.cursorLupa?.setLupaSize(lupaId);
        this.syncUI();
      });
    });

    // Color Pickers Livres
    this.bgColorPicker?.addEventListener('input', (e) => {
      document.documentElement.style.setProperty('--bg-color', e.target.value);
    });

    this.accentColorPicker?.addEventListener('input', (e) => {
      document.documentElement.style.setProperty('--accent-color', e.target.value);
      document.documentElement.style.setProperty('--mask-bg', e.target.value);
      document.documentElement.style.setProperty('--accent-glow', `${e.target.value}44`);
    });

    // Reproduzir Animação de Entrada do Gato de Cheshire
    this.replayLoaderBtn?.addEventListener('click', () => {
      this.closeDrawer();
      this.replayPreloader();
    });

    // Copiar IDs Ativos
    this.copyIdsBtn?.addEventListener('click', () => {
      const code = this.getActiveIdsString();
      navigator.clipboard?.writeText(code);
      const orig = this.copyIdsBtn.textContent;
      this.copyIdsBtn.textContent = '✓ Copiado!';
      setTimeout(() => {
        this.copyIdsBtn.textContent = orig;
      }, 1800);
    });

    // Restaurar Padrões
    this.resetBtn?.addEventListener('click', () => {
      this.clearCustomColors();
      this.themeManager.setTheme('dark');
      this.themeManager.setPalette('PAL-01');
      this.selectedTxt = 'TXT-01';
      this.selectedCase = 'CASE-01';
      localStorage.setItem('kaua_txt_id', 'TXT-01');
      localStorage.setItem('kaua_case_id', 'CASE-01');
      this.applyHeroPhrase('TXT-01');
      this.applyCasesLayout('CASE-01');
      this.particleNetwork?.setMode('PART-01');
      this.cursorLupa?.setLupaSize('LUPA-MD');
      this.syncUI();
    });
  }

  applyHeroPhrase(txtId) {
    const data = HERO_PHRASES[txtId] || HERO_PHRASES['TXT-01'];
    const pubEl = document.getElementById('heroPublicTitle');
    const secEl = document.getElementById('heroSecretTitle');

    if (pubEl) {
      pubEl.innerHTML = data.publicLines.map(line => `<span>${line}</span>`).join('');
    }
    if (secEl) {
      secEl.innerHTML = data.secretLines.map(line => `<span>${line}</span>`).join('');
    }
  }

  applyCasesLayout(caseId) {
    document.body.setAttribute('data-cases-layout', caseId);
    // Re-coleta containers de máscara caso o layout mude
    setTimeout(() => this.cursorLupa?.collectContainers(), 50);
  }

  replayPreloader() {
    const preloader = document.getElementById('cheshirePreloader');
    if (!preloader) return;

    // Clona o estágio SVG para reiniciar as animações CSS do zero
    const stage = preloader.querySelector('.cheshire-loader-stage');
    if (stage) {
      const clone = stage.cloneNode(true);
      stage.parentNode.replaceChild(clone, stage);
    }

    preloader.classList.remove('loaded');
    setTimeout(() => {
      preloader.classList.add('loaded');
    }, 2800);
  }

  getActiveIdsString() {
    const pal = this.themeManager.currentPalette;
    const mode = this.themeManager.currentTheme.toUpperCase();
    const txt = this.selectedTxt;
    const cs = this.selectedCase;
    const part = this.particleNetwork?.mode || 'PART-01';
    const lupa = this.cursorLupa?.currentSizeId || 'LUPA-MD';
    return `${pal} | ${mode} | ${txt} | ${cs} | ${part} | ${lupa}`;
  }

  syncUI() {
    const curTheme = this.themeManager.currentTheme;
    const curPalette = this.themeManager.currentPalette;
    const curPart = this.particleNetwork?.mode || 'PART-01';
    const curLupa = this.cursorLupa?.currentSizeId || 'LUPA-MD';

    this.modeBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-lab-mode') === curTheme));
    this.paletteBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-lab-palette') === curPalette));
    this.txtBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-lab-txt') === this.selectedTxt));
    this.caseBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-lab-case') === this.selectedCase));
    this.partBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-lab-part') === curPart));
    this.lupaBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-lab-lupa') === curLupa));

    if (this.activeIdsLabel) {
      this.activeIdsLabel.textContent = this.getActiveIdsString();
    }
  }

  clearCustomColors() {
    document.documentElement.style.removeProperty('--bg-color');
    document.documentElement.style.removeProperty('--accent-color');
    document.documentElement.style.removeProperty('--mask-bg');
    document.documentElement.style.removeProperty('--accent-glow');
  }

  toggleDrawer() {
    this.isOpen = !this.isOpen;
    this.drawer?.classList.toggle('open', this.isOpen);
    this.overlay?.classList.toggle('active', this.isOpen);
  }

  closeDrawer() {
    this.isOpen = false;
    this.drawer?.classList.remove('open');
    this.overlay?.classList.remove('active');
  }
}
