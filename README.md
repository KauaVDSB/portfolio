# Portfólio & Currículo Interativo • Kauã Barbosa

> Engenharia de Software, Automação Hospitalar (SUS) & Ciência da Computação (UPE).  
> Arquitetura moderna, modular, acessível e orientada a componentes.

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Vercel Deployment](https://img.shields.io/badge/deployed%20on-Vercel-black?logo=vercel)](https://vercel.com)
[![Status](https://img.shields.io/badge/status-Milestone%201%20MVP-success)](#)

---

## 🧭 Visão Geral

Este repositório contém o portfólio pessoal e currículo interativo de **Kauã Vinicius dos Santos Barbosa**, estudante de Bacharelado em Ciência da Computação na Universidade de Pernambuco (UPE), monitor acadêmico e desenvolvedor de automações hospitalares.

O projeto une:
- **Elegância Editorial & Rigor Técnico:** Estrutura sóbria, dados auditados de produção e métricas reais de ROI.
- **Alter Ego Inusitado (Cheshire Cat):** Toques de perspicácia criativa, microinterações e raciocínio fora da caixa.
- **Design & Personality Lab:** Painel em tempo real permitindo a seleção livre de temas (Claro/Escuro/Sistema), 4 paletas curadas (`#F0EDE8 Editorial`, `Cheshire Wonderland`, `Healthtech & SUS`, `Tons Terrosos & Pastéis`) e color pickers customizados.
- **Currículo Pronto para Impressão:** Modal interativo e rota dedicada `/cv.html` com suporte nativo a `@media print` para exportação direta em PDF A4.

---

## 🏛️ Arquitetura & Decisões de Engenharia

### Por que NÃO usar um arquivo monolítico?
1. **Separação de Responsabilidades (SoC):** Cada camada (design tokens, layout base, componentes e seções) possui seu próprio arquivo isolado em `css/sections/`. Isso evita conflitos e permite manutenção pontual sem efeitos colaterais.
2. **ES Modules Nativos:** Sem a sobrecarga ou dependência de bundlers pesados para desenvolvimento rápido, compatível nativamente com qualquer navegador moderno e com deploy instantâneo na Vercel ou GitHub Pages.
3. **Escalabilidade para Backend:** Os dados de projetos e métricas estão centralizados em `js/modules/data/projects-data.js`, viabilizando integração futura direta com Supabase sem precisar reescrever o layout HTML.

### Estrutura de Diretórios
```text
.
├── index.html                 # Shell semântico com Hero e Seção de Cases
├── cv.html                    # Currículo autônomo formatado para A4/PDF
├── vercel.json                # Configurações de deploy, clean URLs e headers
├── .gitignore
├── css/
│   ├── variables.css          # Design tokens (4 paletas, temas dark/light/system)
│   ├── base.css               # Reset moderno, tipografia fluida clamp()
│   ├── components.css         # Botões, badges, cards, modais e navbar
│   ├── lab-theme-panel.css    # Painel interativo do Design Lab
│   └── sections/
│       ├── hero.css           # Estilo da Seção Hero & Big Numbers
│       └── cases.css          # Estilo da Seção de Cases Reais (OftalmoPE & UFAPE)
└── js/
    ├── main.js                # Orquestrador central
    └── modules/
        ├── theme.js           # Gerenciador de Tema e Paletas
        ├── design-lab.js      # Painel de Customização em Tempo Real
        ├── curriculum.js      # Controle do Modal e Impressão de CV
        └── data/
            └── projects-data.js # Dados auditados dos cases
```

---

## 🚀 Como Testar Localmente

Como o projeto utiliza **ES Modules** nativos do JavaScript, basta servi-lo através de qualquer servidor HTTP estático local (como o do Python ou extensão Live Server):

```bash
# 1. Inicie o servidor local na pasta do projeto:
python3 -m http.server 8080

# 2. Acesse no navegador:
http://localhost:8080/
```

### O que validar nesta 1ª Entrega (Milestone 1):
1. **Hero Section:**
   - Badge de disponibilidade ativo com pulso de live.
   - Apresentação marcante com o alter ego Cheshire (`Kauã Barbosa^`).
   - Grid com os 4 Big Numbers (`+100h`, `130x`, `> R$ 1,2 Mi`, `4º/13º UPE`).
2. **Cases de Sucesso:**
   - **Case OftalmoPE Tech:** Métricas auditadas em produção (`FinalizaMV` 0,65s, `SolicitaAPAC` 1,10s, ROI de folha `R$ 2.501,75/mês`, `> R$ 1,2 milhão/mês` blindados e a suíte com Sentinel Hub 100% LGPD local).
   - **Case UFAPE ADM:** Card com link público para o repositório no GitHub.
   - **Case DouglasBlog:** Primeiro freelance educacional.
3. **Design & Personality Lab (Atalho: Tecla `D` ou `L`):**
   - Clique no botão flutuante inferior direito ou aperte `D`/`L`.
   - Alterne entre os modos Claro, Escuro e Sistema.
   - Teste as 4 paletas curadas (`#F0EDE8 Editorial`, `Cheshire`, `Healthtech`, `Tons Terrosos`).
   - Use os Color Pickers manuais para ver a cor de fundo e destaque mudar instantaneamente na tela!
4. **Currículo:**
   - Clique em "Ver Currículo" para abrir o modal.
   - Clique em "Abrir Versão Imprimível / PDF" para abrir `/cv.html` e conferir a diagramação A4 limpa.

---

## 🗺️ Roadmap de Milestones no GitHub

- [x] **v1.0 - MVP: Hero, Cases de Sucesso & Design Lab** (Entrega Atual)
- [ ] **v2.0 - Trajetória Acadêmica, Monitoria UPE & Arsenal Técnico**
- [ ] **v3.0 - Sobre Mim, Alter Ego & Interações Cheshire**
- [ ] **v4.0 - Currículo Interativo & Formulário de Contato**
- [ ] **v5.0 - Painel Admin & Integração Supabase (CRUD de Projetos/Blog)**

---

## ☁️ Deploy na Vercel

O projeto está 100% pronto para importação na [Vercel](https://vercel.com):
- Framework Preset: `Other` (Static HTML)
- Root Directory: `./`
- Configuração automática via `vercel.json` (inclui clean URLs e headers de segurança HTTP).
