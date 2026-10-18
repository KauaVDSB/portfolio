/**
 * Dados estruturados dos Projetos e Cases de Sucesso
 * Projetados para fácil escalabilidade e futura integração com API / Supabase
 */

export const casesData = [
  {
    id: "oftalmope-tech",
    category: "Automação Hospitalar & Engenharia RPA",
    title: "OftalmoPE Tech • Blindagem do Faturamento SUS & Esteira RPA Hospitalar",
    subtitle: "Ecossistema proprietário de robôs operando em produção no Hospital de Olhos OftalmoPE (Garanhuns / SUS), convertendo dias de digitação manual em milissegundos auditados com governança estrita e LGPD.",
    featured: true,
    client: "Hospital de Olhos OftalmoPE & Axymos Tecnologia",
    period: "2025 - Presente",
    badges: ["Em Produção Real", "Impacto SUS", "Zero PII em Nuvem", "ROI Comprovado"],
    bigNumbers: [
      {
        value: "+100h",
        label: "Horas Úteis Salvas/Mês",
        subtext: "> 12 dias de trabalho braçal devolvidos à gestão"
      },
      {
        value: "0,65s",
        label: "FinalizaMV",
        subtext: "Baixa cirúrgica no MV Soul (130x mais veloz que os 85s manuais)"
      },
      {
        value: "1,10s",
        label: "SolicitaAPAC",
        subtext: "Emissão auditada na SES-PE com validação prévia de glosas"
      },
      {
        value: "> R$ 2.501",
        label: "ROI Direto de Folha/Mês",
        subtext: "Base conservadora R$ 25/h (BPO de mercado: R$ 6k a 9k/mês)"
      },
      {
        value: "> R$ 1,2 Mi",
        label: "Capital SUS Blindado/Mês",
        subtext: "Faturamento mensal do hospital protegido contra atrasos e erros"
      }
    ],
    robots: [
      {
        name: "FinalizaMV",
        badge: "Bloco Cirúrgico / MV Soul",
        speed: "0,65s por cirurgia (antes: 85s)",
        volume: "1.440 cirurgias/mês",
        desc: "Automatiza a finalização de guias cirúrgicas no MV Soul, eliminando pilhas de prontuários em papel e riscos de LER/DORT."
      },
      {
        name: "SolicitaAPAC",
        badge: "SES-PE / Faturamento SUS",
        speed: "1,10s por emissão (antes: 80s)",
        volume: "1.315 laudos/mês",
        desc: "Emissão automatizada junto à SES-PE com checagem rigorosa de regras de negócio antes do envio para eliminar glosas."
      },
      {
        name: "SolicitaMV",
        badge: "Ambulatório & Consultas",
        speed: "Processamento em Lote",
        volume: "1.666 solicitações/mês",
        desc: "Abertura antecipada e integrada de guias ambulatoriais, eliminando o cadastramento individual manual."
      },
      {
        name: "OpenLEA",
        badge: "Exames & Biometrias",
        speed: "Rotina Assistida",
        volume: "1.350 laudos/mês",
        desc: "Auxilia na indexação de laudos e biometrias monoculares, garantindo ergonomia biomecânica aos operadores."
      },
      {
        name: "Sentinel Hub",
        badge: "Governança & LGPD",
        speed: "Auditoria em Tempo Real",
        volume: "100% Local / Zero Nuvem",
        desc: "Painel de controle local com rastreabilidade detalhada de lotes, auditoria com carimbo de tempo e bloqueio antifurto remoto."
      }
    ],
    technologies: ["Python", "PyAutoGUI", "Selenium", "MV Soul ERP", "APACnet / SES-PE", "SQLite", "Electron / GUI"]
  },
  {
    id: "apadrinhamento-ufape",
    category: "Engenharia Web & Impacto Social",
    title: "Sistema de Apadrinhamento de Calouros • UFAPE ADM",
    subtitle: "Plataforma pública open-source para conectar calouros do curso de Administração da Universidade Federal do Agreste de Pernambuco (UFAPE) a veteranos mentores, combatendo a evasão e integrando a vida acadêmica.",
    featured: false,
    client: "Universidade Federal do Agreste de Pernambuco (UFAPE)",
    period: "2025",
    badges: ["Open Source", "Impacto Acadêmico", "GitHub Público"],
    githubUrl: "https://github.com/KauaVDSB/sistema-apadrinhamento-ufape-adm",
    bigNumbers: [
      {
        value: "100%",
        label: "Código Aberto",
        subtext: "Repositório público com arquitetura limpa"
      },
      {
        value: "UFAPE",
        label: "Instituição Atendida",
        subtext: "Curso de Bacharelado em Administração"
      }
    ],
    technologies: ["JavaScript", "HTML5 Semântico", "CSS3 Moderno", "Git / GitHub", "Vercel"]
  },
  {
    id: "douglas-blog",
    category: "Web Platform & Educação",
    title: "DouglasBlog • Plataforma de Física e Ensino",
    subtitle: "Primeiro projeto web freelance entregue no início de 2025: plataforma de conteúdo e artigos científicos voltada para um professor de física, com publicação dinâmica e design responsivo.",
    featured: false,
    client: "Docência de Física",
    period: "Início de 2025",
    badges: ["Freelance", "Educação", "Plataforma Web"],
    bigNumbers: [
      {
        value: "1º",
        label: "Freelance Entregue",
        subtext: "Início da atuação profissional autônoma web"
      }
    ],
    technologies: ["JavaScript", "CSS3", "CMS / Blog", "UX Design"]
  }
];
