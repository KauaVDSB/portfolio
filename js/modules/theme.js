/**
 * Módulo de Gerenciamento de Temas e Paletas
 * Suporta Modos Claro/Escuro/Sistema e Paletas Curadas com persistência em localStorage
 */

const STORAGE_THEME_KEY = 'kaua_portfolio_theme';
const STORAGE_PALETTE_KEY = 'kaua_portfolio_palette';

export class ThemeManager {
  constructor() {
    this.currentTheme = localStorage.getItem(STORAGE_THEME_KEY) || 'system';
    this.currentPalette = localStorage.getItem(STORAGE_PALETTE_KEY) || 'editorial';
    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    this.init();
  }

  init() {
    this.applyTheme(this.currentTheme);
    this.applyPalette(this.currentPalette);

    // Escuta mudanças de tema no sistema operacional
    this.mediaQuery.addEventListener('change', (e) => {
      if (this.currentTheme === 'system') {
        this.updateSystemTheme(e.matches);
      }
    });
  }

  setTheme(theme) {
    this.currentTheme = theme;
    localStorage.setItem(STORAGE_THEME_KEY, theme);
    this.applyTheme(theme);
    this.notifyThemeChange();
  }

  applyTheme(theme) {
    const root = document.documentElement;
    if (theme === 'system') {
      const isDark = this.mediaQuery.matches;
      root.setAttribute('data-theme', isDark ? 'dark' : 'light');
    } else {
      root.setAttribute('data-theme', theme);
    }
  }

  updateSystemTheme(isDark) {
    const root = document.documentElement;
    root.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }

  setPalette(palette) {
    this.currentPalette = palette;
    localStorage.setItem(STORAGE_PALETTE_KEY, palette);
    this.applyPalette(palette);
    this.notifyThemeChange();
  }

  applyPalette(palette) {
    const root = document.documentElement;
    root.setAttribute('data-palette', palette);
  }

  getEffectiveTheme() {
    if (this.currentTheme === 'system') {
      return this.mediaQuery.matches ? 'dark' : 'light';
    }
    return this.currentTheme;
  }

  notifyThemeChange() {
    window.dispatchEvent(new CustomEvent('portfolio:theme-changed', {
      detail: {
        theme: this.currentTheme,
        effectiveTheme: this.getEffectiveTheme(),
        palette: this.currentPalette
      }
    }));
  }
}
