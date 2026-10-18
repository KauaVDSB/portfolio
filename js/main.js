/**
 * Main Application Orchestrator
 * Arquitetura ES Modules limpa, modular e orientada a componentes
 */

import { ThemeManager } from './modules/theme.js';
import { DesignLab } from './modules/design-lab.js';
import { CurriculumViewer } from './modules/curriculum.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Inicializa o Gerenciador de Temas e Paletas
  const themeManager = new ThemeManager();

  // 2. Inicializa o Painel Interativo de Design Lab
  const designLab = new DesignLab(themeManager);

  // 3. Inicializa o Visualizador e Exportador de Currículo
  const curriculumViewer = new CurriculumViewer();

  // 4. Header com efeito ao rolar a página
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // 5. Menu Mobile
  const mobileToggle = document.getElementById('mobileNavToggle');
  const navLinks = document.getElementById('navLinks');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    // Fecha ao clicar em um link
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // 6. Easter Egg: Sorriso do Cheshire ao clicar no avatar/logo do Hero
  const cheshireTrigger = document.getElementById('cheshireEasterEgg');
  if (cheshireTrigger) {
    cheshireTrigger.addEventListener('click', () => {
      designLab.showCheshireToast();
    });
  }

  console.log('⚡ Kauã Barbosa Portfolio loaded successfully with ES Modules architecture.');
});
