/**
 * Orquestrador Central da Aplicação
 * Inicializa Preloader Cheshire, Partículas Bioluminescentes, Cursor & Lupa Minh Pham e Design Lab
 */

import { ThemeManager } from './modules/theme.js';
import { ParticleNetwork } from './modules/particles.js';
import { CursorLupaEngine } from './modules/cursor-lupa.js';
import { DesignLab } from './modules/design-lab.js';
import { CurriculumViewer } from './modules/curriculum.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Controle do Preloader do Gato Risonho (Cheshire Amigável)
  const preloader = document.getElementById('cheshirePreloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('loaded');
    }, 2650);

    // Permite clicar para avançar caso deseje pular
    preloader.addEventListener('click', () => {
      preloader.classList.add('loaded');
    });
  }

  // 2. Inicializa Temas e Paletas (Padrão: Dark + PAL-01 Minh Pham)
  const themeManager = new ThemeManager();

  // 3. Inicializa Partículas Flutuantes Bioluminescentes (PART-01)
  const particleNetwork = new ParticleNetwork();

  // 4. Inicializa Bolinha Perseguidora + Lupa Reveladora (LUPA-MD)
  const cursorLupa = new CursorLupaEngine();

  // 5. Inicializa Painel de Edição Ao Vivo com IDs (Design Lab)
  const designLab = new DesignLab(themeManager, particleNetwork, cursorLupa);

  // 6. Inicializa Visualizador de Currículo
  const curriculumViewer = new CurriculumViewer();

  // 7. Acordeões Expansíveis da OftalmoPE Tech ("Como 4 ferramentas salvaram o faturamento")
  const expandTriggers = document.querySelectorAll('[data-toggle-oftalmo]');
  expandTriggers.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetId = btn.getAttribute('data-toggle-oftalmo');
      const drawer = document.getElementById(targetId);
      if (drawer) {
        const isOpen = drawer.classList.toggle('open');
        btn.classList.toggle('expanded', isOpen);
      }
    });
  });

  // 8. Clique no emblema do Gato no canto superior esquerdo (Reproduz sorriso / Abre Lab)
  const catBrand = document.getElementById('cheshireBrandBtn');
  if (catBrand) {
    catBrand.addEventListener('click', () => {
      designLab.replayPreloader();
    });
  }
});
