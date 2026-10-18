/**
 * Módulo de Currículo Interativo
 * Controla o Modal de visualização do CV e acionamento de download/impressão
 */

export class CurriculumViewer {
  constructor() {
    this.modal = document.getElementById('resumeModal');
    this.openBtns = document.querySelectorAll('[data-action="open-resume"]');
    this.closeBtn = document.getElementById('closeResumeModal');
    this.printBtn = document.getElementById('printResumeBtn');

    this.bindEvents();
  }

  bindEvents() {
    this.openBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.open();
      });
    });

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) this.close();
      });
    }

    if (this.printBtn) {
      this.printBtn.addEventListener('click', () => {
        window.open('/cv.html', '_blank');
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal && this.modal.classList.contains('active')) {
        this.close();
      }
    });
  }

  open() {
    if (this.modal) {
      this.modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  close() {
    if (this.modal) {
      this.modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
}
