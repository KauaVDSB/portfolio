/**
 * Módulo de Gerenciamento de Temas e Paletas (PAL-01 a PAL-04)
 * Padrão inicial: Modo Escuro de Alto Contraste + PAL-01 (Minh Pham Signature)
 */

const STORAGE_THEME_KEY = 'kaua_portfolio_theme_v2';
const STORAGE_PALETTE_KEY = 'kaua_portfolio_palette_v2';

export class ThemeManager {
  constructor() {
    this.currentTheme = localStorage.getItem(STORAGE_THEME_KEY) || 'dark';
    this.currentPalette = localStorage.getItem(STORAGE_PALETTE_KEY) || 'PAL-01';
    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    this.init();
  }

  init() {
    this.applyTheme(this.currentTheme);
    this.applyPalette(this.currentPalette);

    this.mediaQuery.addEventListener('change', (e) => {
      if (this.currentTheme === 'system') {
        document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      }
    });
  }

  setTheme(theme) {
    this.currentTheme = theme;
    localStorage.setItem(STORAGE_THEME_KEY, theme);
    this.applyTheme(theme);
    this.notifyChange();
  }

  applyTheme(theme) {
    const root = document.documentElement;
    if (theme === 'system') {
      root.setAttribute('data-theme', this.mediaQuery.matches ? 'dark' : 'light');
    } else {
      root.setAttribute('data-theme', theme);
    }
  }

  setPalette(paletteId) {
    this.currentPalette = paletteId;
    localStorage.setItem(STORAGE_PALETTE_KEY, paletteId);
    this.applyPalette(paletteId);
    this.notifyChange();
  }

  applyPalette(paletteId) {
    document.documentElement.setAttribute('data-palette', paletteId);
  }

  notifyChange() {
    window.dispatchEvent(new CustomEvent('portfolio:theme-changed', {
      detail: {
        theme: this.currentTheme,
        palette: this.currentPalette
      }
    }));
  }
}
