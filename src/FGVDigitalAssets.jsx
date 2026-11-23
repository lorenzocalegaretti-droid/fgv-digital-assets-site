/* ============================================================================
 * FGV DIGITAL ASSETS — Site institucional (antiga FGV Crypto)
 * ----------------------------------------------------------------------------
 * Stack: React + Tailwind CSS + lucide-react
 *
 * Página inicial (abertura inspirada na Cambridge Blockchain Society):
 *   Navbar → Abertura (foto do Viaduto do Chá + uma frase) → Sobre nós → Números
 *   → Células → Research em destaque → Últimos eventos → Depoimentos
 *   → Faixa do Processo Seletivo → Parceiros → Newsletter → Rodapé
 *   Células, Research e Eventos da página inicial reaproveitam o conteúdo das abas.
 * Abas (uma página por item do menu, rota "#/nome"):
 *   #/sobre · #/nucleos · #/research · #/competicoes · #/eventos · #/membros
 *   · #/alumni · #/processo-seletivo · #/contato   (#/equipe redireciona para Sobre)
 *   O conteúdo de cada aba fica em SITE_DATA.pages.
 *
 * COMO EDITAR
 *   • Todo o conteúdo visível está em SITE_DATA (logo abaixo).
 *   • SITE_DATA.showPlaceholders:
 *       true  → mostra os espaços reservados (fotos, logos, nomes entre [colchetes])
 *               para a equipe visualizar onde cada conteúdo entra;
 *       false → versão pública: tudo que ainda não foi preenchido fica oculto.
 *   • Um campo conta como "preenchido" quando não está vazio, não é "#",
 *     não começa com "[" e não contém "seudominio".
 *   • Foto da abertura: salve o arquivo em public/img/viaduto-do-cha.jpg
 *     (ou troque o caminho em SITE_DATA.hero.backgroundImage). Se a imagem não
 *     existir, a abertura usa um fundo escuro neutro.
 * ========================================================================== */

import React, { useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  ArrowRight,
  ArrowUpRight,
  ArrowUp,
  Users,
  Mail,
  MapPin,
  CheckCircle2,
  Loader2,
} from "lucide-react";

/* ============================================================================
 * SITE_DATA — CONTEÚDO CENTRALIZADO (edite aqui)
 * ========================================================================== */
const SITE_DATA = {
  // ⚠️ true durante a edição; false para publicar (oculta tudo que não foi preenchido).
  showPlaceholders: false,

  brand: {
    name: "FGV Digital Assets",
    formerName: "antiga FGV Crypto",
    institution: "FGV EAESP",
    email: "", // ⚠️ e-mail oficial da entidade (usado em "Proponha um projeto", rodapé e newsletter)
  },

  /* --- Navbar ------------------------------------------------------------ */
  nav: {
    // Cada aba é uma página própria (rota "#/nome"). "Início" volta para a página inicial.
    links: [
      { label: "Início", href: "#inicio" },
      { label: "Sobre", href: "#/sobre" },
      { label: "Células", href: "#/nucleos" },
      { label: "Research", href: "#/research" },
      { label: "Competições", href: "#/competicoes" },
      { label: "Eventos", href: "#/eventos" },
      { label: "Membros", href: "#/membros" },
      { label: "Alumni", href: "#/alumni" },
      { label: "Processo Seletivo", href: "#/processo-seletivo" },
      { label: "Contato", href: "#/contato" },
    ],
    // Botão destacado à direita do menu. Só aparece quando a newsletter consegue enviar
    // (newsletter.endpoint ou brand.email preenchidos).
    newsletterButton: { label: "Newsletter", href: "#newsletter" },
    selection: {
      open: false, // ⚠️ true durante as inscrições (a faixa da página inicial mostra "Inscrições abertas")
      period: "", // ex.: "até 15 de março"
      url: "", // ⚠️ link do edital/formulário (botões "Inscreva-se")
    },
    institutionLogo: "", // ⚠️ logo da FGV EAESP em branco (~30px de altura); aparece ao lado da marca
    // Só aparecem os canais com endereço preenchido (ids: youtube, linkedin, instagram, x)
    socials: [
      { id: "linkedin", label: "LinkedIn", href: "" },
      { id: "instagram", label: "Instagram", href: "" },
      { id: "youtube", label: "YouTube", href: "" },
      { id: "x", label: "X (Twitter)", href: "" },
    ],
  },

  /* --- Abertura ----------------------------------------------------------- */
  hero: {
    // Foto horizontal do Viaduto do Chá com o Anhangabaú e o Centro ao fundo.
    // Sugestão (CC0, domínio público): https://commons.wikimedia.org/wiki/File:Viaduto_do_Ch%C3%A1_in_S%C3%A3o_Paulo.jpg
    backgroundImage: "/img/viaduto-do-cha.jpg",
    // Mantenha o viaduto em um dos terços laterais: "left center", "right center", "30% 50%"…
    backgroundPosition: "center",
    credit: { text: "Foto: Wilfredor / Wikimedia Commons (CC0)", href: "https://commons.wikimedia.org/wiki/File:Viaduto_do_Ch%C3%A1_in_S%C3%A3o_Paulo.jpg" },
    logo: "", // ⚠️ logo principal em branco (~250px). Vazio = logo SVG padrão.
    // Uma frase curta abaixo do logo. As três frases sobre o Viaduto do Chá estão
    // no início da aba Sobre (pages.about.opening).
    tagline: "A liga de ativos digitais da FGV EAESP",
    buttons: [
      { label: "Conheça a entidade", href: "#quem-somos" },
      { label: "Participar do processo seletivo", href: "#/processo-seletivo" },
    ],
  },

  /* --- Sobre nós (versão curta da página inicial) ------------------------- */
  // O botão "Apresentação institucional (PDF)" usa pages.about.deck e só aparece com o PDF preenchido.
  about: {
    title: "Sobre nós",
    lead: "Estudantes da FGV EAESP pesquisando a nova infraestrutura financeira.",
    text:
      "Somos a FGV Digital Assets, entidade estudantil e grupo de pesquisa da FGV EAESP. Estudamos ativos digitais e a infraestrutura financeira que eles estão criando, em projetos que reúnem alunos, professores e profissionais do mercado.",
    photo: "", // ⚠️ foto real do grupo (proporção 3:2)
    link: { label: "Conheça a nossa história", href: "#/sobre" },
  },

  /* --- Números ---------------------------------------------------------------
   * `value` preenchido (ex.: "330+") tem prioridade. Sem `value`, os itens com `auto`
   * contam o que já está cadastrado nas abas (membros, nucleos, estudos, eventos, alumni).
   * Itens sem valor e sem contagem ficam ocultos.
   * ----------------------------------------------------------------------- */
  stats: {
    title: "A entidade em números",
    items: [
      { label: "membros", auto: "membros", value: "" },
      { label: "células técnicas", auto: "nucleos", value: "" },
      { label: "estudos publicados", auto: "estudos", value: "" },
      { label: "eventos realizados", auto: "eventos", value: "" },
      { label: "alumni no mercado", auto: "alumni", value: "" },
      { label: "inscritos no último processo seletivo", value: "" }, // ⚠️ ex.: "330+"
    ],
  },

  /* --- Destaques da página inicial (o conteúdo vem das abas) ----------------
   * Células: pages.nucleos.technical · Research: os primeiros estudos de
   * pages.research (o semestre mais recente fica no topo) · Eventos: os mais recentes.
   * ----------------------------------------------------------------------- */
  highlights: {
    nucleos: {
      title: "Células",
      text: "Cada célula técnica desenvolve um projeto por semestre, com entregas semanais e um estudo ao final.",
      kicker: "Célula técnica",
      button: "Conheça as células",
    },
    research: { title: "Research em destaque", count: 3, button: "Ver todos os estudos" },
    events: { title: "Últimos eventos", count: 3, button: "Ver todos os eventos" },
  },

  /* --- Depoimentos -----------------------------------------------------------
   * Só aparecem os depoimentos com nome e texto preenchidos (sem [colchetes]).
   * photo: foto quadrada do rosto; vazia = iniciais. role/company: cargo e empresa atuais.
   * ----------------------------------------------------------------------- */
  testimonials: {
    title: "Depoimentos",
    items: [
      { quote: "[Depoimento de um professor da FGV EAESP sobre o trabalho da entidade.]", name: "[Nome do Professor]", role: "Professor", company: "FGV EAESP", photo: "" },
      { quote: "[Depoimento de um parceiro sobre um projeto ou evento feito com a entidade.]", name: "[Nome do Parceiro]", role: "[Cargo]", company: "[Empresa]", photo: "" },
      { quote: "[Depoimento de um alumni sobre o que aprendeu na entidade.]", name: "[Nome do Alumni]", role: "[Cargo atual]", company: "[Empresa atual]", photo: "" },
    ],
  },

  /* --- Faixa do Processo Seletivo (status vem de nav.selection) -------------- */
  selectionBand: {
    title: "Processo Seletivo",
    openLabel: "Inscrições abertas",
    closedLabel: "Inscrições encerradas",
    openText: "Buscamos alunos de qualquer curso e semestre da FGV interessados em ativos digitais. Não é preciso experiência prévia.",
    closedText: "A próxima seleção abre no início do semestre. Veja as etapas e as perguntas frequentes.",
    applyLabel: "Inscreva-se",
    moreLabel: "Como funciona",
    notifyLabel: "Receber o aviso",
  },

  /* --- Parceiros (só aparecem logos com nome ou imagem preenchidos) ----------
   * Item preenchido: { name: "Nome", logo: "/img/parceiros/nome.svg", url: "https://..." }
   * Todos os logos ficam com a mesma altura, em caixas brancas sobre a faixa escura.
   * ----------------------------------------------------------------------- */
  sponsors: {
    title: "Parceiros",
    subtitle: "Organizações que viabilizam nossa pesquisa, nossos eventos e a formação de novos membros.",
    tiers: [
      { id: "gold", label: "Patrocinador principal", items: [{ name: "[LOGO PARCEIRO 01]", logo: "", url: "" }] },
      {
        id: "silver",
        label: "Apoiadores",
        items: [
          { name: "[LOGO PARCEIRO 02]", logo: "", url: "" },
          { name: "[LOGO PARCEIRO 03]", logo: "", url: "" },
          { name: "[LOGO PARCEIRO 04]", logo: "", url: "" },
        ],
      },
      {
        id: "bronze",
        label: "Comunidade",
        items: [
          { name: "[LOGO PARCEIRO 05]", logo: "", url: "" },
          { name: "[LOGO PARCEIRO 06]", logo: "", url: "" },
          { name: "[LOGO PARCEIRO 07]", logo: "", url: "" },
          { name: "[LOGO PARCEIRO 08]", logo: "", url: "" },
        ],
      },
    ],
    invite: {
      title: "Proponha um projeto à entidade",
      text: "Estudos, painéis e projetos aplicados com estudantes da FGV EAESP. Conte o tema e entramos em contato.",
      label: "Fale conosco",
      href: "#/contato",
    },
  },

  /* --- Colaborações anteriores (lista na faixa de Parceiros) -----------------
   * `note` descreve a colaboração (ex.: "Painel sobre tokenização").
   * ----------------------------------------------------------------------- */
  ecosystem: {
    title: "Também já trabalhamos com",
    items: [
      { name: "[Gestora 01]", note: "[Painel sobre tokenização]" },
      { name: "[Iniciativa Acadêmica 02]", note: "[Projeto de pesquisa]" },
      { name: "[Protocolo 03]", note: "[Workshop técnico]" },
      { name: "[Liga Estudantil 04]", note: "[Evento conjunto]" },
      { name: "[Exchange 05]", note: "[Palestra]" },
      { name: "[Centro de Pesquisa 06]", note: "[Estudo conjunto]" },
      { name: "[Custodiante 07]", note: "[Case aplicado]" },
      { name: "[Escritório 08]", note: "[Debate sobre regulação]" },
    ],
  },

  /* --- Newsletter -----------------------------------------------------------
   * Envio: se `endpoint` estiver preenchido, faz POST JSON { email }.
   * Sem endpoint mas com brand.email, abre o e-mail do visitante para concluir.
   * Sem nenhum dos dois, a seção só aparece com showPlaceholders = true (modo demonstração).
   * ----------------------------------------------------------------------- */
  newsletter: {
    title: "Receba nossas publicações",
    text: "Estudos, eventos e o aviso de abertura do Processo Seletivo.",
    label: "Seu e-mail",
    placeholder: "nome@dominio.com",
    button: "Inscrever-se",
    loading: "Enviando…",
    invalid: "Insira um e-mail válido (ex.: nome@dominio.com).",
    error: "Não foi possível concluir a inscrição agora. Tente novamente em instantes.",
    privacy: "Você pode cancelar a inscrição a qualquer momento.", // exibido só com endpoint real
    successTitle: "Inscrição confirmada",
    successText: "Enviaremos a próxima edição para",
    mailtoTitle: "Falta um passo",
    mailtoText: "Abrimos seu aplicativo de e-mail com o pedido de inscrição. É só enviar a mensagem.",
    demoNote: "Modo de demonstração: nenhum e-mail é enviado. Configure newsletter.endpoint antes de publicar.",
    successReset: "Inscrever outro e-mail",
    endpoint: "", // ⚠️ ex.: "https://seu-provedor.com/api/subscribe"
  },

  /* --- Rodapé -------------------------------------------------------------- */
  footer: {
    description:
      "Entidade estudantil e grupo de pesquisa da FGV EAESP dedicada a ativos digitais e infraestrutura financeira.",
    location: "São Paulo • FGV EAESP",
    address: "Av. 9 de Julho, 2029 — Bela Vista",
    legal:
      "Entidade estudantil vinculada à FGV EAESP. Conteúdo de caráter educacional e acadêmico; não constitui recomendação de investimento.",
    privacy: { label: "Política de privacidade", href: "" }, // ⚠️ link da política; aparece quando preenchido
  },

  /* ==========================================================================
   * PÁGINAS INTERNAS (#/membros, #/alumni, #/processo-seletivo, #/eventos)
   * Layout copiado de fgvrealestate.com com as cores da FGV Digital Assets.
   * Informações genéricas: substitua nomes, fotos, links e textos.
   * Fotos: coloque os arquivos em public/img/... e informe o caminho em `photo`.
   * Links (linkedin, email) vazios deixam o ícone visível, mas sem clique.
   * ⚠️ Em Membros, `email` deve ser sempre o institucional (da FGV ou da entidade),
   *    nunca o e-mail pessoal do aluno. Na dúvida, deixe só o LinkedIn.
   * ======================================================================== */
  pages: {
    /* --- Sobre (#/sobre) ------------------------------------------------------
     * Substitui a antiga página "Equipe e história" (#/equipe continua funcionando).
     * ⚠️ Missão, visão e valores são rascunhos: revisem com a diretoria.
     * ----------------------------------------------------------------------- */
    about: {
      title: "Sobre",
      text: "Entidade estudantil e grupo de pesquisa da FGV EAESP dedicado aos ativos digitais e à nova infraestrutura financeira.",
      // Abertura do texto (antes ficava na tela inicial, sobre a foto do Viaduto do Chá)
      opening: [
        "O Viaduto do Chá aproximou dois lados de São Paulo.",
        "Hoje, o que muda quando um pagamento atravessa fronteiras ou um título passa a ser negociado em blockchain?",
        "Na FGV EAESP, estudamos essas mudanças com dados, modelos e pesquisa aplicada.",
      ],
      sectionTitle: "Quem somos",
      photo: "", // ⚠️ foto do grupo (proporção 3:2)
      paragraphs: [
        "A FGV Digital Assets é a entidade estudantil e o grupo de pesquisa da FGV EAESP dedicados aos ativos digitais. Estudamos como blockchain, tokenização, stablecoins e novas formas de pagamento mudam a infraestrutura do mercado financeiro.",
        "Começamos como FGV Crypto, com foco em criptoativos. O novo nome acompanha uma agenda mais ampla, que hoje inclui tokenização, stablecoins, pagamentos e regulação.",
        "Nossos membros se organizam em células, desenvolvem projetos ao longo do semestre e publicam estudos abertos à comunidade.",
      ],
      deck: { label: "Apresentação institucional (PDF)", href: "" }, // ⚠️ caminho do PDF, ex.: "/docs/apresentacao.pdf"
      pillars: [
        { title: "Missão", text: "Formar estudantes capazes de analisar ativos digitais com rigor, unindo pesquisa acadêmica e prática de mercado." },
        { title: "Visão", text: "Ser a referência universitária no Brasil em pesquisa sobre ativos digitais e infraestrutura financeira." },
        { title: "Valores", list: ["Rigor", "Transparência", "Curiosidade", "Colaboração"] },
      ],
      timelineTitle: "Trajetória",
      // ⚠️ Preencha `date` com marcos que vocês consigam datar (ex.: "2021").
      timeline: [
        { date: "", title: "FGV Crypto", text: "Grupo de estudos formado por alunos interessados em blockchain, criptoativos e seus fundamentos econômicos." },
        { date: "", title: "Pesquisa e mercado", text: "Criação de células internas, primeiros relatórios e aproximação com gestoras, exchanges e escritórios." },
        { date: "", title: "FGV Digital Assets", text: "Agenda ampliada para tokenização, stablecoins, pagamentos e regulação." },
      ],
      next: [
        { label: "Conheça as células", href: "#/nucleos" },
        { label: "Conheça os membros", href: "#/membros" },
        { label: "Leia nossos estudos", href: "#/research" },
      ],
    },

    /* --- Células (#/nucleos) -------------------------------------------------- */
    nucleos: {
      title: "Células",
      text: "Os membros se dividem em células técnicas e áreas de gestão. Cada célula desenvolve um projeto por semestre.",
      intro:
        "As células são o centro do trabalho da FGV Digital Assets. A cada semestre, os membros desenvolvem um projeto com entregas semanais, que termina em um estudo publicado ou em uma apresentação para parceiros.",
      cycleTitle: "Como funciona o semestre",
      cycle: [
        { title: "Trainee", text: "Os aprovados no processo seletivo passam por uma trilha de formação em blockchain e finanças." },
        { title: "Alocação", text: "Cada membro entra em uma célula técnica de acordo com seu interesse." },
        { title: "Projeto", text: "A célula desenvolve um estudo ou modelo ao longo do semestre, com entregas semanais." },
        { title: "Apresentação", text: "O trabalho é apresentado à comunidade ou a parceiros e publicado na aba Research." },
      ],
      technicalTitle: "Células técnicas",
      technical: [
        {
          name: "Research",
          photo: "",
          description: "Acompanha o mercado de ativos digitais e produz relatórios sobre setores, protocolos e regulação.",
          deliverables: ["Relatórios setoriais", "Análises de protocolos", "Acompanhamento regulatório"],
        },
        {
          name: "DeFi e Protocolos",
          photo: "",
          description: "Estuda protocolos de finanças descentralizadas, como crédito, liquidez e derivativos, e os riscos de cada desenho.",
          deliverables: ["Modelos de risco e retorno", "Painéis de dados on-chain", "Estudos de caso de protocolos"],
        },
        {
          name: "Tokenização",
          photo: "",
          description: "Investiga a emissão e a negociação de ativos tokenizados, de títulos a recebíveis, e o que muda para emissores e investidores.",
          deliverables: ["Estudos de estrutura de emissão", "Comparação com o mercado tradicional", "Análise de custos e prazos"],
        },
      ],
      deliverablesLabel: "O que a célula produz",
      researchLink: "Ver estudos da célula",
      areasTitle: "Áreas de gestão",
      areas: [
        { name: "Educação", description: "Organiza a trilha de trainees, as aulas internas e os workshops abertos." },
        { name: "Eventos", description: "Planeja palestras, painéis e visitas técnicas com profissionais do mercado." },
        { name: "Institucional", description: "Cuida das parcerias, da comunicação e do relacionamento com a FGV EAESP." },
      ],
    },

    /* --- Research (#/research) -------------------------------------------------
     * Um item por estudo. `nucleo` precisa ter o mesmo nome usado em Células.
     * `href`: link do PDF ou da página do estudo. `cover`: imagem da capa (4:3).
     * ⚠️ Títulos e perguntas abaixo são exemplos.
     * ----------------------------------------------------------------------- */
    research: {
      title: "Research",
      text: "Estudos produzidos pelas células. Cada estudo apresenta a pergunta investigada, os dados usados e os limites da análise.",
      questionLabel: "Pergunta",
      linkLabel: "Ler o estudo",
      allLabel: "Todos",
      disclaimer: "Conteúdo de caráter educacional e acadêmico. Não constitui recomendação de investimento.",
      groups: [
        {
          semester: "2026.2",
          items: [
            {
              title: "Stablecoins em pagamentos internacionais",
              nucleo: "Research",
              question: "O que muda em custo e prazo quando uma remessa internacional usa stablecoins?",
              authors: ["Nome Sobrenome", "Nome Sobrenome", "Nome Sobrenome"],
              cover: "",
              href: "",
            },
            {
              title: "Risco de liquidação em protocolos de crédito",
              nucleo: "DeFi e Protocolos",
              question: "Como a volatilidade do colateral afeta as liquidações em protocolos de empréstimo?",
              authors: ["Nome Sobrenome", "Nome Sobrenome"],
              cover: "",
              href: "",
            },
            {
              title: "Tokenização de recebíveis no Brasil",
              nucleo: "Tokenização",
              question: "Em que etapas a tokenização reduz custos na emissão de recebíveis?",
              authors: ["Nome Sobrenome", "Nome Sobrenome", "Nome Sobrenome"],
              cover: "",
              href: "",
            },
          ],
        },
        {
          semester: "2026.1",
          items: [
            {
              title: "Panorama regulatório dos ativos virtuais",
              nucleo: "Research",
              question: "Quais obrigações as novas regras impõem às prestadoras de serviços de ativos virtuais?",
              authors: ["Nome Sobrenome", "Nome Sobrenome"],
              cover: "",
              href: "",
            },
            {
              title: "Formadores de mercado automatizados",
              nucleo: "DeFi e Protocolos",
              question: "Quando o retorno das taxas compensa a perda impermanente para quem provê liquidez?",
              authors: ["Nome Sobrenome", "Nome Sobrenome", "Nome Sobrenome"],
              cover: "",
              href: "",
            },
          ],
        },
      ],
    },

    /* --- Competições (#/competicoes) ------------------------------------------ */
    competitions: {
      title: "Competições",
      text: "Desafios universitários, hackathons e competições de análise com participação dos nossos membros.",
      intro:
        "Competições aproximam os membros de problemas reais do mercado. Em poucas semanas, cada equipe precisa formular uma tese, testar hipóteses e defendê-la diante de profissionais.",
      items: [
        {
          name: "[Nome da Competição]",
          organizer: "[Organizador]",
          photo: "",
          description: "Competição universitária em que as equipes desenvolvem uma tese sobre [tema] e apresentam o trabalho a uma banca de profissionais.",
          results: [
            { year: "2026", result: "[Resultado: campeões, finalistas…]", team: "Nome Sobrenome, Nome Sobrenome e Nome Sobrenome" },
            { year: "2025", result: "[Resultado]", team: "Nome Sobrenome e Nome Sobrenome" },
          ],
        },
        {
          name: "[Nome do Hackathon]",
          organizer: "[Organizador]",
          photo: "",
          description: "Hackathon em que as equipes constroem, em poucos dias, um protótipo de [produto] usando blockchain.",
          results: [{ year: "2025", result: "[Resultado]", team: "Nome Sobrenome, Nome Sobrenome e Nome Sobrenome" }],
        },
      ],
    },

    /* --- Contato (#/contato) ----------------------------------------------------
     * Envio do formulário: se `endpoint` estiver preenchido, faz POST JSON
     * { nome, email, assunto, mensagem }. Sem endpoint, usa brand.email (abre o
     * e-mail do visitante). Sem nenhum dos dois, o formulário fica oculto.
     * ----------------------------------------------------------------------- */
    contact: {
      title: "Contato",
      text: "Fale com a FGV Digital Assets sobre parcerias, eventos, imprensa ou processo seletivo.",
      endpoint: "",
      infoTitle: "Onde nos encontrar",
      formTitle: "Envie uma mensagem",
      subjects: ["Parcerias e projetos", "Eventos e palestras", "Processo seletivo", "Imprensa", "Outros"],
      partnersTitle: "Para empresas",
      partnersText: "Quer propor um estudo, painel ou projeto aplicado com estudantes da FGV EAESP? Entre em contato e conte o tema.",
      sent: "Mensagem enviada. Responderemos pelo e-mail informado.",
      mailtoSent: "Abrimos seu aplicativo de e-mail com a mensagem pronta. É só enviar.",
      error: "Não foi possível enviar agora. Tente novamente em instantes.",
      demoNote: "Modo de demonstração: nenhuma mensagem é enviada. Preencha brand.email ou contact.endpoint antes de publicar.",
    },

    /* --- Membros ----------------------------------------------------------- */
    members: {
      title: "Membros",
      text: "Conheça os alunos que fazem a FGV Digital Assets acontecer: a diretoria e os membros de cada um das nossas células.",
      // size: "lg" (até 4 por linha, cards maiores) | "md" (5 por linha) | "sm" (6 por linha)
      groups: [
        {
          title: "Presidência",
          size: "lg",
          people: [
            { name: "Nome Sobrenome", role: "Presidente", course: "Xº semestre Administração", photo: "", linkedin: "", email: "" },
            { name: "Nome Sobrenome", role: "Vice-Presidente", course: "Xº semestre Economia", photo: "", linkedin: "", email: "" },
          ],
        },
        {
          title: "Diretores",
          size: "lg",
          people: [
            { name: "Nome Sobrenome", role: "Diretor(a) Acadêmico(a)", course: "Xº semestre Economia", photo: "", linkedin: "", email: "" },
            { name: "Nome Sobrenome", role: "Diretor(a) Institucional", course: "Xº semestre Administração", photo: "", linkedin: "", email: "" },
          ],
        },
        {
          title: "Heads",
          size: "md",
          people: [
            { name: "Nome Sobrenome", role: "Head de Research", course: "Xº semestre Economia", photo: "", linkedin: "", email: "" },
            { name: "Nome Sobrenome", role: "Head de DeFi e Protocolos", course: "Xº semestre Economia", photo: "", linkedin: "", email: "" },
            { name: "Nome Sobrenome", role: "Head de Tokenização", course: "Xº semestre Administração", photo: "", linkedin: "", email: "" },
            { name: "Nome Sobrenome", role: "Head de Educação", course: "Xº semestre Administração", photo: "", linkedin: "", email: "" },
            { name: "Nome Sobrenome", role: "Head de Eventos", course: "Xº semestre Direito", photo: "", linkedin: "", email: "" },
          ],
        },
        {
          title: "Membros",
          size: "sm",
          people: [
            { name: "Nome Sobrenome", role: "Research", course: "Xº semestre Administração", photo: "", linkedin: "", email: "" },
            { name: "Nome Sobrenome", role: "DeFi e Protocolos", course: "Xº semestre Economia", photo: "", linkedin: "", email: "" },
            { name: "Nome Sobrenome", role: "Tokenização", course: "Xº semestre Administração", photo: "", linkedin: "", email: "" },
            { name: "Nome Sobrenome", role: "Educação", course: "Xº semestre Economia", photo: "", linkedin: "", email: "" },
            { name: "Nome Sobrenome", role: "Eventos", course: "Xº semestre Administração", photo: "", linkedin: "", email: "" },
            { name: "Nome Sobrenome", role: "Institucional e Research", course: "Xº semestre Direito", photo: "", linkedin: "", email: "" },
            { name: "Nome Sobrenome", role: "Research", course: "Xº semestre Economia", photo: "", linkedin: "", email: "" },
            { name: "Nome Sobrenome", role: "DeFi e Protocolos", course: "Xº semestre Administração", photo: "", linkedin: "", email: "" },
            { name: "Nome Sobrenome", role: "Tokenização", course: "Xº semestre Economia", photo: "", linkedin: "", email: "" },
            { name: "Nome Sobrenome", role: "Acadêmico e Educação", course: "Xº semestre Administração", photo: "", linkedin: "", email: "" },
            { name: "Nome Sobrenome", role: "Eventos", course: "Xº semestre Economia", photo: "", linkedin: "", email: "" },
            { name: "Nome Sobrenome", role: "Institucional e Tokenização", course: "Xº semestre Administração", photo: "", linkedin: "", email: "" },
          ],
        },
      ],
    },

    /* --- Alumni ------------------------------------------------------------- */
    // A lista de empresas e o resumo "X alumni em Y empresas" são calculados automaticamente.
    alumni: {
      title: "Alumni",
      text: "Nossos ex-membros estão em instituições de referência no país, atuando em diversas áreas e contribuindo para a evolução do mercado financeiro e de ativos digitais.",
      sectionTitle: "Onde nossos alumni estão",
      people: [
        { name: "Nome Sobrenome", company: "Gestora A", linkedin: "" },
        { name: "Nome Sobrenome", company: "Banco B", linkedin: "" },
        { name: "Nome Sobrenome", company: "Exchange C", linkedin: "" },
        { name: "Nome Sobrenome", company: "Gestora A", linkedin: "" },
        { name: "Nome Sobrenome", company: "Escritório D", linkedin: "" },
        { name: "Nome Sobrenome", company: "Fintech E", linkedin: "" },
        { name: "Nome Sobrenome", company: "Banco B", linkedin: "" },
        { name: "Nome Sobrenome", company: "Custodiante F", linkedin: "" },
        { name: "Nome Sobrenome", company: "Gestora A", linkedin: "" },
        { name: "Nome Sobrenome", company: "Consultoria G", linkedin: "" },
        { name: "Nome Sobrenome", company: "Protocolo H", linkedin: "" },
        { name: "Nome Sobrenome", company: "Banco I", linkedin: "" },
        { name: "Nome Sobrenome", company: "Exchange C", linkedin: "" },
        { name: "Nome Sobrenome", company: "Tokenizadora J", linkedin: "" },
        { name: "Nome Sobrenome", company: "Escritório D", linkedin: "" },
        { name: "Nome Sobrenome", company: "Fundo K", linkedin: "" },
        { name: "Nome Sobrenome", company: "Fintech L", linkedin: "" },
        { name: "Nome Sobrenome", company: "Banco B", linkedin: "" },
      ],
    },

    /* --- Processo Seletivo ---------------------------------------------------- */
    selection: {
      title: "Processo Seletivo",
      text: "Para se tornar membro da entidade é preciso passar pelo nosso processo seletivo, composto por 4 fases. Por meio dele, buscamos alunos engajados e com vontade de aprender.",
      // Faixa de status logo abaixo da abertura. Aberto/encerrado vem de nav.selection
      // (open, period, url); os rótulos vêm de selectionBand.
      closedNote: "A próxima seleção abre no início do semestre.",
      notifyLabel: "Receber o aviso por e-mail", // aparece quando a newsletter está ativa
      steps: [
        {
          label: "Prova objetiva",
          text: "O candidato realiza uma prova objetiva com questões de lógica, atualidades e fundamentos de economia e finanças.",
        },
        {
          label: "Dinâmica em Grupo",
          text: "Os candidatos são divididos em grupos para participar de uma dinâmica sobre um caso do mercado de ativos digitais.",
        },
        {
          label: "Entrevista Técnica e Perfil",
          text: "Esta etapa consiste na apresentação de um estudo de caso sobre um dos temas da entidade, seguida de uma entrevista de perfil. O objetivo é avaliar a base técnica do candidato e o alinhamento de seus valores com os da entidade.",
        },
        {
          label: "Programa Trainee",
          text: "Os aprovados entram no programa trainee: um semestre de aulas, capacitações e eventos, acompanhado pelas células, até a efetivação como membro.",
        },
      ],
      cta: "Clique aqui para se inscrever!", // aparece no meio e no fim da página quando nav.selection.open = true e há url
      faqTitle: "Perguntas frequentes:",
      faq: [
        {
          q: "Preciso de conhecimentos prévios para prestar o PS?",
          a: "Conhecimentos prévios são bem-vindos, mas não são necessários para a aprovação no processo seletivo.",
        },
        {
          q: "Até que semestre posso prestar o PS?",
          a: "Não há restrição. Alunos de qualquer semestre podem participar do processo seletivo.",
        },
        {
          q: "Como funciona o programa de trainee?",
          a: "Os aprovados participam de aulas, capacitações e eventos para aprofundar seus conhecimentos. Ao longo do semestre, o desenvolvimento de cada trainee é acompanhado pelas células até a efetivação como membro.",
        },
      ],
    },

    /* --- Eventos -------------------------------------------------------------- */
    // date no formato AAAA-MM-DD; text é uma lista de parágrafos.
    events: {
      title: "Eventos",
      text: "Palestras, visitas técnicas e encontros com profissionais do mercado de ativos digitais, organizados pela FGV Digital Assets.",
      groups: [
        {
          semester: "2026.2",
          items: [
            {
              date: "2026-11-10",
              title: "Encontro com [Nome do Convidado]",
              photo: "",
              text: [
                "Recebemos [Nome do Convidado], [cargo] da [Empresa], para uma conversa sobre carreira, mercado e perspectivas para o setor.",
                "Sua trajetória em [instituições] resultou em uma discussão inspiradora para os nossos membros.",
              ],
            },
            {
              date: "2026-11-03",
              title: "Visita à [Gestora]",
              photo: "",
              text: [
                "A célula de Tokenização foi convidado pela [Gestora] para uma palestra sobre emissão de ativos tokenizados, a partir de um estudo de caso real da equipe.",
                "Agradecemos aos profissionais [Nomes] pela oportunidade e pelo conhecimento compartilhado.",
              ],
            },
            {
              date: "2026-10-20",
              title: "[Nome do Encontro de Entidades]",
              photo: "",
              text: [
                "Entidades estudantis de finanças e ativos digitais se reuniram para a primeira edição do encontro. Os convidados [Nomes] falaram sobre carreira, regulação e tendências do mercado.",
              ],
            },
          ],
        },
        {
          semester: "2026.1",
          items: [
            {
              date: "2026-05-28",
              title: "Workshop: [Tema]",
              photo: "",
              text: [
                "Workshop prático conduzido por [Nome do Convidado], da [Empresa], sobre [tema], com exercícios aplicados para os membros da entidade.",
              ],
            },
            {
              date: "2026-04-15",
              title: "Painel sobre [Tema]",
              photo: "",
              text: [
                "Painel aberto à comunidade da FGV com [Nomes], discutindo [tema] e seus impactos no mercado brasileiro.",
              ],
            },
          ],
        },
      ],
    },
  },
};

/* ============================================================================
 * CONSTANTES (as cores ficam em PAGE_COLORS, logo abaixo)
 * ========================================================================== */
const CONTAINER = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SHOW_PLACEHOLDERS = SITE_DATA.showPlaceholders;

/* Campo preenchido = texto real (não vazio, não "#", não "[placeholder]", não "seudominio") */
const isSet = (v) => {
  if (typeof v !== "string") return false;
  const t = v.trim();
  return t !== "" && t !== "#" && !t.startsWith("[") && !t.includes("seudominio");
};
const isExternal = (href) => typeof href === "string" && /^https?:\/\//.test(href);

/* ============================================================================
 * ESTILOS DAS PÁGINAS INTERNAS (medidas de fgvrealestate.com; base 18px)
 * Cores da referência → FGV Digital Assets:
 *   #071F28 / #0A1F2C (azul-petróleo) → #0A1A36 (navy)
 *   #104C66 (botão e destaques)       → #1D4ED8 (azul)
 *   #DFDFE3 (fundo do FAQ)            → #E1E6EF
 * ========================================================================== */
// Paleta única: navy (barra, aberturas, faixas escuras), navyDeep (rodapé), azul (botões e destaques)
const PAGE_COLORS = { navy: "#0A1A36", navyDeep: "#050E1F", navyRgb: "10, 26, 54", accent: "#1D4ED8", accentHover: "#2563EB", photo: "#E6EAF1", faq: "#E1E6EF" };
const PAGES_CSS = `
  .pg { font-family: 'Source Sans 3', 'Source Sans Pro', ui-sans-serif, system-ui, sans-serif; font-size: 18px; line-height: 27px; color: ${PAGE_COLORS.navy}; }
  .pg h1, .pg h2, .pg h3, .pg p, .pg ul { margin: 0; }
  .pg-heading { font-family: 'Montserrat', sans-serif; font-weight: 400; }

  /* Abertura das páginas: foto com camada navy a 77% */
  .pg-hero { position: relative; display: flex; align-items: center; justify-content: center; min-height: max(480px, 74vh); padding: 104px 16px 40px; text-align: center; color: #fff; background-color: ${PAGE_COLORS.navy}; background-size: cover; background-position: center; }
  .pg-hero::before { content: ""; position: absolute; inset: 0; background: ${PAGE_COLORS.navy}; opacity: 0.77; }
  .pg-hero > div { position: relative; }
  .pg-hero h1 { font-family: 'Montserrat', sans-serif; font-weight: 400; font-size: clamp(42px, 4.85vw, 69.84px); line-height: 1.056; letter-spacing: -0.02em; }
  .pg-hero p { max-width: 429px; margin: 29px auto 0; font-size: 18px; line-height: 27px; text-align: justify; }

  .pg-section { background: #fff; padding: max(2.7vw, 24px) 0 calc(max(2.7vw, 24px) + 4vw); }

  /* --- Membros --- */
  .re-members-group { max-width: 1120px; margin: 0 auto; padding: 0 4vw; }
  .re-members-group + .re-members-group { margin-top: clamp(40.5px, 4vw, 63px); }
  .re-members-title { text-align: center; margin: 0 0 31.5px !important; font-size: clamp(28.8px, 3vw, 41.4px); line-height: 1.1136; letter-spacing: 0.01em; }
  .re-members-marca { display: flex; align-items: center; justify-content: center; gap: 13.5px; margin-top: 16.2px; color: ${PAGE_COLORS.navy}; }
  .re-members-marca::before, .re-members-marca::after { content: ""; width: 32px; height: 1px; background: currentColor; opacity: 0.25; }
  .re-members-grid { --cols: 6; --gap: clamp(18px, 2.4vw, 36px); display: flex; flex-wrap: wrap; justify-content: center; gap: 45px var(--gap); }
  .re-members-grid--lg { --cols: 4; }
  .re-members-grid--md { --cols: 5; }
  .re-members-grid > .re-member { flex: 0 0 calc((100% - (var(--cols) - 1) * var(--gap)) / var(--cols)); }
  .re-members-grid--lg > .re-member { max-width: 225px; }
  .re-member { min-width: 0; text-align: center; }
  .re-member-photo { position: relative; aspect-ratio: 4 / 5; overflow: hidden; border-radius: 3px; background: ${PAGE_COLORS.photo}; display: grid; place-items: center; }
  .re-member-photo img { width: 100%; height: 100%; object-fit: cover; object-position: 50% 30%; display: block; filter: saturate(0.9); transition: transform .5s, filter .5s; }
  .re-member:hover .re-member-photo img { transform: scale(1.03); filter: saturate(1); }
  .re-member-initials { font-size: 36px; font-weight: 600; letter-spacing: 0.04em; color: #7A8597; }
  .re-member-selo { position: absolute; left: 0; bottom: 0; width: 30px; height: 30px; display: grid; place-items: center; background: ${PAGE_COLORS.navy}; color: #fff; border-top-right-radius: 3px; }
  .re-member-selo svg { width: 17px; height: 17px; }
  .re-members-grid--lg .re-member-selo { width: 34px; height: 34px; }
  .re-members-grid--lg .re-member-selo svg { width: 19px; height: 19px; }
  .re-member-info { padding-top: 18px; display: flex; flex-direction: column; align-items: center; gap: 6.3px; }
  .re-member-name { font-size: 18.9px; font-weight: 700; line-height: 1.25; letter-spacing: -0.02em; color: ${PAGE_COLORS.navy}; }
  .re-members-grid--lg .re-member-name { font-size: 20.7px; }
  .re-member-cargo { font-size: 16.2px; line-height: 1.4; color: ${PAGE_COLORS.navy}; opacity: 0.72; }
  .re-members-grid--lg .re-member-cargo { font-size: 17.1px; line-height: 1.2; }
  .re-member-curso { font-size: 15.3px; line-height: 1.2; opacity: 0.65; }
  .re-member-links { display: flex; justify-content: center; gap: 9px; margin-top: 5.4px; }
  .re-icon-btn { width: 30px; height: 30px; display: grid; place-items: center; border-radius: 50%; color: ${PAGE_COLORS.navy}; border: 1px solid rgba(${PAGE_COLORS.navyRgb}, 0.18); transition: color .2s, border-color .2s, background .2s; flex: 0 0 auto; }
  .re-icon-btn svg { width: 14px; height: 14px; }
  a.re-icon-btn:hover { color: #fff; background: ${PAGE_COLORS.navy}; border-color: ${PAGE_COLORS.navy}; }
  @media (max-width: 1023px) {
    .re-members-grid--sm { --cols: 4; } .re-members-grid--md { --cols: 3; } .re-members-grid--lg { --cols: 3; }
  }
  @media (max-width: 767px) {
    .re-members-grid, .re-members-grid--md, .re-members-grid--sm, .re-members-grid--lg { --cols: 2; row-gap: 31.5px; }
    .re-member-info { padding-top: 13.5px; }
    .re-member-name { font-size: 17.1px; } .re-members-grid--lg .re-member-name { font-size: 18.9px; }
    .re-member-cargo, .re-members-grid--lg .re-member-cargo { font-size: 14.76px; }
    .re-member-selo, .re-members-grid--lg .re-member-selo { width: 26px; height: 26px; }
    .re-member-selo svg, .re-members-grid--lg .re-member-selo svg { width: 14px; height: 14px; }
  }

  /* --- Alumni --- */
  .re-alumni { max-width: 1120px; margin: 0 auto; padding: 0 4vw; color: ${PAGE_COLORS.navy}; }
  .re-alumni-onde { display: flex; flex-direction: column; align-items: center; gap: 16.2px; text-align: center; padding: 0 0 49.5px; margin-bottom: 45px; border-bottom: 1px solid rgba(${PAGE_COLORS.navyRgb}, 0.14); }
  .re-alumni-titulo { line-height: 1.2; font-size: clamp(27px, 2.8vw, 37.8px); letter-spacing: 0.01em; }
  .re-alumni-resumo { margin: 0 0 18px !important; line-height: 1.4; font-size: 18px; opacity: 0.7; }
  .re-alumni-empresas { list-style: none; margin: 0 auto; padding: 0; max-width: 980px; display: flex; flex-wrap: wrap; justify-content: center; gap: 18px 40.5px; }
  .re-alumni-empresas li { font-size: 18px; font-weight: 600; line-height: 1.3; opacity: 0.85; }
  .re-alumni-lista { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); column-gap: 45px; }
  .re-alumnus { display: flex; align-items: center; gap: 16.2px; padding: 17.1px 0; border-bottom: 1px solid rgba(${PAGE_COLORS.navyRgb}, 0.1); }
  .re-alumnus-info { flex: 1 1 0%; min-width: 0; }
  .re-alumnus-nome { font-size: 18px; font-weight: 700; line-height: 1.3; }
  .re-alumnus-empresa { margin-top: 1.8px !important; font-size: 16.2px; line-height: 1.35; opacity: 0.72; }
  @media (max-width: 1023px) { .re-alumni-lista { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  @media (max-width: 600px) { .re-alumni-lista { grid-template-columns: minmax(0, 1fr); } }

  /* --- Processo Seletivo --- */
  .ps-wrap { max-width: 649px; margin: 0 auto; padding: 0 16px; box-sizing: content-box; }
  .ps-steps { padding: 61px 0 0; }
  .ps-step { display: grid; grid-template-columns: 99px minmax(0, 484px); column-gap: 11px; align-items: center; }
  .ps-step + .ps-step { margin-top: 12px; }
  .ps-num { display: flex; align-items: center; justify-content: flex-end; gap: 7px; color: ${PAGE_COLORS.navy}; }
  .ps-num span { font-family: 'Montserrat', sans-serif; font-weight: 300; font-size: 58px; line-height: 1; }
  .ps-num sup { font-family: 'Montserrat', sans-serif; font-weight: 300; font-size: 30px; top: -0.75em; }
  .ps-num i { display: block; width: 2px; height: 58px; background: ${PAGE_COLORS.navy}; }
  .ps-step p { text-align: justify; }
  .ps-step strong { color: ${PAGE_COLORS.accent}; font-weight: 700; }
  .ps-cta-row { display: flex; justify-content: center; padding: 24px 0 35px; }
  .ps-cta { display: inline-block; font-family: 'Montserrat', sans-serif; font-weight: 300; font-size: 22.32px; line-height: 27px; color: #fff; background: ${PAGE_COLORS.accent}; border-radius: 300px; padding: 27px 39.6px; transition: background .2s; }
  .ps-cta:hover { background: ${PAGE_COLORS.accentHover}; }
  .ps-steps--end { padding-bottom: 56px; }
  .ps-cta-end .ps-cta-row { padding: 40px 0 0; }
  .ps-status { background: #EEF2FA; border-bottom: 1px solid rgba(${PAGE_COLORS.navyRgb}, 0.08); }
  .ps-status-inner { max-width: 1120px; margin: 0 auto; padding: 16px 4vw; display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 10px 24px; text-align: center; }
  .ps-status-text { display: inline-flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 4px 10px; font-size: 17px; line-height: 1.4; }
  .ps-status-text i { flex: 0 0 10px; width: 10px; height: 10px; border-radius: 50%; background: #94A3B8; }
  .ps-status.is-open .ps-status-text i { background: #22C55E; box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.2); }
  .ps-status .pg-btn { padding: 10px 20px; font-size: 15.3px; }
  .ps-faq { background: ${PAGE_COLORS.faq}; padding: 60px 0 72px; }
  .ps-faq h3 { font-size: clamp(30px, 2.69vw, 38.736px); line-height: 1.1424; letter-spacing: -0.02em; margin-bottom: 23px !important; }
  .ps-acc-item { border-top: 2px solid rgba(${PAGE_COLORS.navyRgb}, 0.61); }
  .ps-acc-item:last-child { border-bottom: 2px solid rgba(${PAGE_COLORS.navyRgb}, 0.61); }
  .ps-acc-btn { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 20px; padding: 30px 0; text-align: left; font-family: inherit; font-size: clamp(20px, 1.73vw, 24.912px); line-height: 1.3; color: ${PAGE_COLORS.navy}; background: none; border: 0; cursor: pointer; }
  .ps-plus { position: relative; flex: 0 0 20px; width: 20px; height: 20px; }
  .ps-plus::before, .ps-plus::after { content: ""; position: absolute; left: 0; top: 9px; width: 20px; height: 2px; background: ${PAGE_COLORS.navy}; transition: transform .25s ease; }
  .ps-plus::after { transform: rotate(90deg); }
  .ps-acc-item.is-open .ps-plus::after { transform: rotate(0deg); }
  .ps-acc-panel { padding: 0 40px 30px 0; }
  @media (max-width: 640px) {
    .ps-step { grid-template-columns: 64px minmax(0, 1fr); }
    .ps-num span { font-size: 42px; } .ps-num sup { font-size: 22px; } .ps-num i { height: 44px; }
    .ps-step p { text-align: left; }
    .ps-cta { font-size: 19px; padding: 20px 30px; }
  }

  /* --- Eventos --- */
  .re-eventos { max-width: 1360px; margin: 0 auto; padding: 0 clamp(16px, 3vw, 48px); color: ${PAGE_COLORS.navy}; }
  .re-eventos-grupo + .re-eventos-grupo { margin-top: clamp(49.5px, 4.5vw, 72px); }
  .re-eventos-semestre { display: flex; align-items: center; gap: 18px; margin: 0 0 clamp(22.5px, 2.5vw, 31.5px) !important; font-size: 18px; font-weight: 600; line-height: 1.2; letter-spacing: 0.02em; }
  .re-eventos-semestre::after { content: ""; flex: 1 1 0%; height: 1px; background: rgba(${PAGE_COLORS.navyRgb}, 0.14); }
  .re-eventos-lista { display: flex; flex-direction: column; gap: clamp(31.5px, 3vw, 45px); }
  .re-evento { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: clamp(27px, 3vw, 45px); align-items: center; }
  .re-evento-foto { position: relative; aspect-ratio: 3 / 2; overflow: hidden; border-radius: 3px; background: ${PAGE_COLORS.photo}; display: grid; place-items: center; }
  .re-evento-foto img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .5s; }
  .re-evento:hover .re-evento-foto img { transform: scale(1.03); }
  .re-evento-sem-foto { color: ${PAGE_COLORS.navy}; opacity: 0.22; }
  .re-evento-sem-foto svg { width: 48px; height: 48px; }
  .re-evento-info { display: flex; gap: 22.5px; min-width: 0; }
  .re-evento-dia { display: flex; flex: 0 0 auto; flex-direction: column; align-items: center; justify-content: center; width: 60px; height: 68px; background: ${PAGE_COLORS.navy}; color: #fff; border-radius: 2px; line-height: 1; }
  .re-evento-dia strong { font-size: 27px; font-weight: 600; }
  .re-evento-dia span { margin-top: 5.4px; font-size: 14.76px; opacity: 0.8; }
  .re-evento-corpo { flex: 1 1 0%; min-width: 0; display: flex; flex-direction: column; gap: 9.9px; }
  .re-evento-quando { font-size: 16.2px; font-weight: 600; line-height: 1.4; opacity: 0.7; }
  .re-evento-titulo { font-size: clamp(23.4px, 2vw, 28.8px); line-height: 1.2; color: ${PAGE_COLORS.navy}; }
  .re-evento-texto { display: flex; flex-direction: column; gap: 0.75em; }
  .re-evento-texto p { font-size: 18px; line-height: 1.6; opacity: 0.9; }
  @media (max-width: 767px) {
    .re-evento { grid-template-columns: minmax(0, 1fr); gap: 19.8px; }
    .re-evento-dia { width: 52px; height: 60px; }
    .re-evento-dia strong { font-size: 24.3px; }
  }

  /* --- Blocos comuns das abas novas (Sobre, Células, Research, Competições, Contato) --- */
  .pg-block { padding: clamp(48px, 6vw, 88px) 0; background: #fff; }
  .pg-band { background: #F3F5F8; }
  .pg-container { max-width: 1120px; margin: 0 auto; padding: 0 4vw; }
  .pg-lead { max-width: 760px; margin: 0 auto !important; text-align: center; font-size: 19px; line-height: 1.6; opacity: 0.9; }
  .pg-btn { display: inline-flex; align-items: center; gap: 8px; font-weight: 600; font-size: 16px; line-height: 1.2; color: #fff; background: ${PAGE_COLORS.accent}; border-radius: 300px; padding: 14px 26px; transition: background .2s; }
  .pg-btn:hover { background: ${PAGE_COLORS.accentHover}; }
  .pg-textlink { display: inline-flex; align-items: center; gap: 6px; font-weight: 600; color: ${PAGE_COLORS.accent}; }
  .pg-textlink:hover { text-decoration: underline; }
  .pg-row-title { font-size: clamp(26px, 2.4vw, 34px); line-height: 1.2; }
  .pg-kicker { font-size: 15.3px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; opacity: 0.7; }

  /* Sobre */
  .ab-grid { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: clamp(27px, 4vw, 56px); align-items: center; }
  .ab-text { display: flex; flex-direction: column; gap: 16px; }
  .ab-text p { line-height: 1.65; }
  .ab-mvv { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: clamp(24px, 3vw, 45px); }
  .ab-mvv article { border-top: 2px solid ${PAGE_COLORS.navy}; padding-top: 22px; }
  .ab-mvv h3 { font-size: 24px; line-height: 1.2; margin-bottom: 12px !important; }
  .ab-mvv p { line-height: 1.6; opacity: 0.9; }
  .ab-values { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 8px; }
  .ab-values li { font-weight: 600; }
  .ab-values li::before { content: ""; display: inline-block; width: 8px; height: 8px; margin-right: 12px; background: ${PAGE_COLORS.accent}; vertical-align: middle; }
  .ab-timeline { list-style: none; padding: 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: clamp(24px, 3vw, 45px); }
  .ab-step { position: relative; padding-top: 30px; border-top: 1px solid rgba(${PAGE_COLORS.navyRgb}, 0.2); }
  .ab-step::before { content: ""; position: absolute; top: -8px; left: 0; width: 15px; height: 15px; border-radius: 50%; background: #fff; border: 2px solid ${PAGE_COLORS.accent}; }
  .ab-step:last-child::before { background: ${PAGE_COLORS.accent}; }
  .ab-step-date { font-size: 15.3px; font-weight: 600; color: ${PAGE_COLORS.accent}; }
  .ab-step h3 { font-size: 20.7px; font-weight: 700; line-height: 1.25; margin: 4px 0 8px !important; }
  .ab-step p { font-size: 17px; line-height: 1.55; opacity: 0.85; }
  .pg-links { display: flex; flex-wrap: wrap; justify-content: center; gap: 14px; }
  .pg-link-pill { display: inline-flex; align-items: center; gap: 8px; font-weight: 600; font-size: 16px; color: ${PAGE_COLORS.navy}; border: 1px solid rgba(${PAGE_COLORS.navyRgb}, 0.25); border-radius: 300px; padding: 12px 24px; transition: background .2s, color .2s; }
  .pg-link-pill:hover { background: ${PAGE_COLORS.navy}; color: #fff; }

  /* Células */
  .nu-cycle { list-style: none; padding: 0; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: clamp(20px, 2.4vw, 36px); counter-reset: nu; }
  .nu-cycle li { counter-increment: nu; }
  .nu-cycle li::before { content: counter(nu); display: grid; place-items: center; width: 44px; height: 44px; margin-bottom: 16px; border-radius: 50%; background: ${PAGE_COLORS.navy}; color: #fff; font-family: 'Montserrat', sans-serif; font-size: 20px; }
  .nu-cycle h3 { font-size: 19px; font-weight: 700; margin-bottom: 6px !important; }
  .nu-cycle p { font-size: 17px; line-height: 1.55; opacity: 0.85; }
  .nu-rows { display: flex; flex-direction: column; gap: clamp(40px, 5vw, 72px); }
  .nu-row .re-evento-corpo { gap: 14px; }
  .nu-list { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 8px; }
  .nu-list li { position: relative; padding-left: 22px; }
  .nu-list li::before { content: ""; position: absolute; left: 0; top: 10px; width: 8px; height: 8px; background: ${PAGE_COLORS.accent}; }
  @media (min-width: 768px) { .nu-row:nth-child(even) .re-evento-foto { order: 2; } }
  .nu-areas { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: clamp(18px, 2.4vw, 32px); }
  .nu-areas article { background: #fff; border: 1px solid rgba(${PAGE_COLORS.navyRgb}, 0.12); border-radius: 3px; padding: 28px; }
  .nu-areas h3 { font-size: 20.7px; font-weight: 700; margin-bottom: 8px !important; }
  .nu-areas p { font-size: 17px; line-height: 1.55; opacity: 0.85; }

  /* Research */
  .rs-chips { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-bottom: clamp(32px, 4vw, 48px); }
  .rs-chip { font-family: inherit; font-size: 16px; font-weight: 600; color: ${PAGE_COLORS.navy}; background: #fff; border: 1px solid rgba(${PAGE_COLORS.navyRgb}, 0.25); border-radius: 300px; padding: 8px 18px; cursor: pointer; transition: background .2s, color .2s; }
  .rs-chip:hover { border-color: ${PAGE_COLORS.navy}; }
  .rs-chip[aria-pressed="true"] { background: ${PAGE_COLORS.navy}; border-color: ${PAGE_COLORS.navy}; color: #fff; }
  .rs-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 32px; }
  .rs-card { display: flex; flex-direction: column; border: 1px solid rgba(${PAGE_COLORS.navyRgb}, 0.12); border-radius: 14px; overflow: hidden; background: #fff; }
  .rs-cover { position: relative; aspect-ratio: 16 / 10; background: linear-gradient(150deg, ${PAGE_COLORS.navy} 0%, #16306B 100%); color: #fff; display: grid; place-items: center; overflow: hidden; }
  .rs-cover img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .rs-cover svg { width: 56px; height: 56px; opacity: 0.55; }
  .rs-cover span { position: absolute; left: 18px; bottom: 14px; font-size: 14px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; opacity: 0.8; }
  .rs-body { padding: 20px 22px 24px; display: flex; flex-direction: column; gap: 10px; flex: 1 1 0%; }
  .rs-kicker { font-size: 15.3px; font-weight: 600; color: ${PAGE_COLORS.accent}; }
  .rs-title { font-size: 23px; line-height: 1.25; }
  .rs-question { font-size: 17px; line-height: 1.5; opacity: 0.9; }
  .rs-authors { font-size: 15.3px; line-height: 1.4; opacity: 0.65; }
  .rs-body .pg-textlink { margin-top: auto; padding-top: 6px; }
  .rs-empty { text-align: center; opacity: 0.7; padding: 32px 0; }
  .rs-disclaimer { max-width: 760px; margin: clamp(40px, 5vw, 64px) auto 0 !important; padding-top: 20px; border-top: 1px solid rgba(${PAGE_COLORS.navyRgb}, 0.14); text-align: center; font-size: 15.3px; opacity: 0.65; }

  /* Competições */
  .cp-results { list-style: none; padding: 0; margin-top: 6px; }
  .cp-results li { display: flex; gap: 16px; align-items: center; padding: 14px 0; border-top: 1px solid rgba(${PAGE_COLORS.navyRgb}, 0.12); }
  .cp-year { flex: 0 0 auto; display: grid; place-items: center; width: 64px; height: 40px; background: ${PAGE_COLORS.navy}; color: #fff; border-radius: 2px; font-weight: 600; font-size: 17px; }
  .cp-result { font-weight: 700; line-height: 1.3; }
  .cp-team { font-size: 15.3px; line-height: 1.4; opacity: 0.7; }

  /* Contato */
  .ct-grid { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: clamp(32px, 5vw, 72px); align-items: start; }
  .ct-grid--single { grid-template-columns: minmax(0, 1fr); max-width: 640px; margin: 0 auto; }
  .ct-title { font-size: clamp(26px, 2.4vw, 32px); line-height: 1.2; margin-bottom: 24px !important; }
  .ct-info { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 20px; }
  .ct-info li { display: flex; gap: 16px; align-items: flex-start; }
  .ct-info .re-icon-btn { width: 40px; height: 40px; }
  .ct-info .re-icon-btn svg { width: 17px; height: 17px; }
  .ct-label { font-size: 15.3px; font-weight: 600; opacity: 0.7; }
  .ct-socials { display: flex; gap: 10px; margin-top: 6px; }
  .ct-box { margin-top: 32px; background: #F3F5F8; border-radius: 16px; padding: 24px 26px; }
  .ct-box h3 { font-size: 20.7px; font-weight: 700; margin-bottom: 8px !important; }
  .ct-box p { font-size: 17px; line-height: 1.55; opacity: 0.85; }
  .ct-form { background: #fff; border: 1px solid rgba(${PAGE_COLORS.navyRgb}, 0.12); border-radius: 16px; padding: clamp(22px, 3vw, 36px); box-shadow: 0 12px 32px -18px rgba(${PAGE_COLORS.navyRgb}, 0.35); }
  .ct-fields { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
  .ct-field { display: flex; flex-direction: column; gap: 6px; }
  .ct-field--full { grid-column: 1 / -1; }
  .ct-field label { font-size: 16px; font-weight: 600; }
  .ct-field input, .ct-field select, .ct-field textarea { font-family: inherit; font-size: 17px; color: ${PAGE_COLORS.navy}; background: #fff; border: 1px solid #C9D0D8; border-radius: 10px; padding: 12px 14px; outline: none; transition: border-color .2s, box-shadow .2s; }
  .ct-field textarea { resize: vertical; min-height: 140px; }
  .ct-field input:focus, .ct-field select:focus, .ct-field textarea:focus { border-color: ${PAGE_COLORS.accent}; box-shadow: 0 0 0 3px rgba(29, 78, 216, 0.15); }
  .ct-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 16px; margin-top: 22px; }
  .ct-actions .pg-btn { border: 0; cursor: pointer; font-family: inherit; }
  .ct-actions .pg-btn:disabled { opacity: 0.6; cursor: progress; }
  .ct-msg { font-size: 16px; line-height: 1.4; }
  .ct-msg.is-ok { color: #1F7A45; }
  .ct-msg.is-error { color: #B3261E; }
  .ct-demo { margin-top: 14px !important; font-size: 14px; color: #92400E; }

  /* Sobre: frases de abertura (vieram da tela inicial) */
  .ab-opening { max-width: 820px; margin: 0 auto clamp(48px, 6vw, 72px); display: flex; flex-direction: column; gap: 14px; text-align: center; font-family: 'Montserrat', sans-serif; font-weight: 300; font-size: clamp(20px, 1.8vw, 24px); line-height: 1.5; }

  /* --- Página inicial: blocos que resumem as abas --- */
  .pg-btn--light { background: #fff; color: ${PAGE_COLORS.navy}; }
  .pg-btn--light:hover { background: ${PAGE_COLORS.photo}; }
  .pg-btn--ghost { background: transparent; color: #fff; box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.6); }
  .pg-btn--ghost:hover { background: rgba(255, 255, 255, 0.12); }
  .hm-intro { margin-bottom: clamp(32px, 4vw, 48px); }
  .hm-more { display: flex; flex-wrap: wrap; justify-content: center; gap: 14px; margin-top: clamp(32px, 4vw, 48px); }
  .hm-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 14px 26px; margin-top: 6px; }
  .hm-about-lead { font-size: clamp(24px, 2.2vw, 30px); line-height: 1.25; }

  .hm-stats-band { background: ${PAGE_COLORS.navy}; color: #fff; padding: clamp(44px, 5vw, 72px) 0; }
  .hm-stats-title { text-align: center; font-size: 15.3px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.7; margin-bottom: clamp(24px, 3vw, 36px) !important; }
  .hm-stats { list-style: none; padding: 0; display: flex; flex-wrap: wrap; justify-content: center; row-gap: 28px; }
  .hm-stat { flex: 1 1 0%; min-width: 0; padding: 4px 16px; text-align: center; }
  .hm-stat strong { display: block; font-family: 'Montserrat', sans-serif; font-weight: 300; font-size: clamp(40px, 4.2vw, 58px); line-height: 1; letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }
  .hm-stat > span { display: block; margin-top: 10px; font-size: 16.2px; line-height: 1.3; opacity: 0.78; }
  @media (min-width: 1024px) { .hm-stat + .hm-stat { border-left: 1px solid rgba(255, 255, 255, 0.16); } }

  .hm-cards { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: clamp(18px, 2.4vw, 32px); }
  .hm-card { display: flex; flex-direction: column; gap: 10px; background: #fff; border: 1px solid rgba(${PAGE_COLORS.navyRgb}, 0.12); border-radius: 14px; padding: 28px; }
  .hm-card h3 { font-size: 23px; line-height: 1.25; }
  .hm-card p { font-size: 17px; line-height: 1.55; opacity: 0.88; }
  .hm-card .rs-kicker { opacity: 1; }
  .hm-card .pg-textlink { margin-top: auto; padding-top: 6px; }
  .hm-excerpt { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }

  .hm-quote { margin: 0; display: flex; flex-direction: column; gap: 22px; background: #fff; border: 1px solid rgba(${PAGE_COLORS.navyRgb}, 0.12); border-radius: 14px; padding: 30px 28px 26px; }
  .hm-quote blockquote { margin: 0; font-size: 18px; line-height: 1.6; }
  .hm-quote blockquote::before { content: "“"; display: block; height: 30px; font-family: 'Montserrat', sans-serif; font-size: 64px; line-height: 1; color: ${PAGE_COLORS.accent}; }
  .hm-quote figcaption { margin-top: auto; display: flex; align-items: center; gap: 14px; }
  .hm-avatar { flex: 0 0 56px; width: 56px; height: 56px; border-radius: 50%; overflow: hidden; display: grid; place-items: center; background: ${PAGE_COLORS.photo}; color: #7A8597; font-weight: 600; }
  .hm-avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .hm-quote-name { display: block; font-weight: 700; line-height: 1.3; }
  .hm-quote-role { display: block; font-size: 15.3px; line-height: 1.35; opacity: 0.7; }

  .hm-ps { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 28px 40px; background: ${PAGE_COLORS.accent}; color: #fff; border-radius: 18px; padding: clamp(28px, 4vw, 52px); }
  .hm-ps-status { display: inline-flex; align-items: center; gap: 9px; font-size: 14px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; background: rgba(255, 255, 255, 0.14); border-radius: 300px; padding: 6px 14px; }
  .hm-ps-status i { flex: 0 0 8px; width: 8px; height: 8px; border-radius: 50%; background: #CBD5E1; }
  .hm-ps-status.is-open i { background: #4ADE80; box-shadow: 0 0 0 4px rgba(74, 222, 128, 0.25); }
  .hm-ps h2 { font-size: clamp(30px, 3vw, 41.4px); line-height: 1.1; margin: 16px 0 10px !important; }
  .hm-ps-text { max-width: 560px; line-height: 1.55; opacity: 0.92; }
  .hm-ps-actions { display: flex; flex-wrap: wrap; gap: 12px; }

  .hm-dark { background: ${PAGE_COLORS.navy}; color: #fff; }
  .hm-dark .re-members-marca { color: #fff; }
  .hm-tier + .hm-tier { margin-top: 36px; }
  .hm-label { text-align: center; font-size: 15.3px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.65; margin-bottom: 16px !important; }
  .hm-logos { list-style: none; padding: 0; display: flex; flex-wrap: wrap; justify-content: center; gap: 16px; }
  .hm-logos > li { width: 200px; }
  .hm-logo { width: 100%; height: 92px; display: grid; place-items: center; padding: 18px 22px; background: #fff; border-radius: 10px; color: ${PAGE_COLORS.navy}; font-size: 16px; font-weight: 600; line-height: 1.25; text-align: center; transition: transform .2s; }
  a.hm-logo:hover { transform: translateY(-2px); }
  .hm-logo img { max-width: 100%; max-height: 100%; object-fit: contain; display: block; }
  .hm-collabs-wrap { max-width: 1000px; margin: clamp(40px, 5vw, 56px) auto 0; }
  .hm-collabs-wrap:first-child { margin-top: 0; }
  .hm-collabs { list-style: none; padding: 0; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); column-gap: 32px; }
  .hm-collabs li { padding: 14px 0; border-top: 1px solid rgba(255, 255, 255, 0.14); }
  .hm-collabs strong { display: block; font-weight: 600; line-height: 1.3; }
  .hm-collabs span { display: block; margin-top: 2px; font-size: 15.3px; line-height: 1.35; opacity: 0.65; }
  .hm-invite { max-width: 1000px; margin: clamp(40px, 5vw, 64px) auto 0; padding-top: clamp(28px, 3vw, 40px); border-top: 1px solid rgba(255, 255, 255, 0.16); display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 20px 32px; }
  .hm-invite--solo { margin-top: 0; padding-top: 0; border-top: 0; }
  .hm-invite h3 { font-size: 24px; line-height: 1.25; }
  .hm-invite p { max-width: 560px; margin-top: 6px !important; font-size: 17px; line-height: 1.55; opacity: 0.8; }

  .hm-news { background: #F3F5F8; padding: clamp(48px, 6vw, 80px) 0; }
  .hm-news-grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: clamp(24px, 4vw, 56px); align-items: center; }
  .hm-news h2 { font-size: clamp(28.8px, 3vw, 41.4px); line-height: 1.11; }
  .hm-news-text { margin-top: 12px !important; line-height: 1.55; opacity: 0.85; }
  .hm-news-form { display: flex; gap: 12px; }
  .hm-news-form input { flex: 1 1 0%; min-width: 0; font-family: inherit; font-size: 17px; color: ${PAGE_COLORS.navy}; background: #fff; border: 1px solid #C9D0D8; border-radius: 300px; padding: 13px 20px; outline: none; transition: border-color .2s, box-shadow .2s; }
  .hm-news-form input:focus { border-color: ${PAGE_COLORS.accent}; box-shadow: 0 0 0 3px rgba(29, 78, 216, 0.15); }
  .hm-news-form input[aria-invalid="true"] { border-color: #B3261E; }
  .hm-news-form .pg-btn { border: 0; cursor: pointer; font-family: inherit; justify-content: center; }
  .hm-news-form .pg-btn:disabled { opacity: 0.6; cursor: progress; }
  .hm-news-note { min-height: 24px; margin-top: 10px !important; font-size: 15.3px; line-height: 1.4; color: #B3261E; }
  .hm-news-small { font-size: 14px; opacity: 0.7; }
  .hm-news-ok { display: flex; align-items: flex-start; gap: 16px; }
  .hm-news-icon { flex: 0 0 48px; width: 48px; height: 48px; display: grid; place-items: center; border-radius: 50%; background: #1F7A45; color: #fff; }
  .hm-news-ok-title { font-family: 'Montserrat', sans-serif; font-size: 24px; line-height: 1.25; margin-bottom: 6px !important; }
  .hm-linkbtn { margin-top: 12px; padding: 0; background: none; border: 0; cursor: pointer; font-family: inherit; font-size: inherit; }

  @media (max-width: 1023px) {
    .nu-cycle { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .hm-stat { flex: 0 0 33.333%; }
    .hm-cards { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .hm-collabs { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  }
  @media (max-width: 767px) {
    .hm-stat { flex: 0 0 50%; }
    .hm-cards, .hm-news-grid { grid-template-columns: minmax(0, 1fr); }
    .hm-collabs { grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: 20px; }
    .hm-logos > li { width: calc(50% - 8px); }
    .hm-logo { height: 80px; padding: 14px 16px; }
    .hm-ps-status { font-size: 12.5px; letter-spacing: 0.04em; padding: 6px 12px; }
    .hm-news-form { flex-direction: column; }
  }
  @media (max-width: 767px) {
    .ab-grid, .ab-mvv, .ab-timeline, .nu-areas, .ct-grid { grid-template-columns: minmax(0, 1fr); }
    .ab-timeline { gap: 36px; }
    .ct-fields { grid-template-columns: minmax(0, 1fr); }
    .pg-lead { font-size: 18px; }
  }
  @media (max-width: 480px) {
    .nu-cycle { grid-template-columns: minmax(0, 1fr); }
  }
`;

/* ============================================================================
 * ESTILOS GLOBAIS
 * ========================================================================== */
function GlobalStyles() {
  return (
    <style>{`
      /* Duas famílias no site inteiro: Montserrat (títulos, menu, abertura) e Source Sans 3 (texto) */
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Source+Sans+3:wght@400;600;700&display=swap');

      html { scroll-behavior: smooth; }
      .fgv-root { font-family: 'Source Sans 3', 'Source Sans Pro', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; color: ${PAGE_COLORS.navy}; -webkit-font-smoothing: antialiased; }
      .fgv-root ::selection { background: #BFDBFE; color: ${PAGE_COLORS.navy}; }

      /* --- Navbar (navy) e botões de destaque (azul) --- */
      .fgv-nav-link { font-family: 'Montserrat', sans-serif; font-size: 15px; font-weight: 300; line-height: 25.6px; padding: 8px 7px; color: #fff; }
      /* Menu de desktop: espaço entre as abas cresce com a largura da tela */
      @media (min-width: 1280px) { .fgv-nav-desk .fgv-nav-link { padding: 8px clamp(7px, calc((100vw - 1180px) / 22), 20px); } }
      .fgv-nav-cta { background: ${PAGE_COLORS.accent}; transition: background .2s; }
      .fgv-nav-cta:hover { background: ${PAGE_COLORS.accentHover}; }
      .fgv-to-top { background: ${PAGE_COLORS.accent}; }
      .fgv-to-top:hover { background: ${PAGE_COLORS.accentHover}; }

      /* --- Rodapé --- */
      .ft { color: rgba(255, 255, 255, 0.68); }
      .ft-label { font-size: 13.5px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(255, 255, 255, 0.5); }
      .ft a { transition: color .2s; }
      .ft a:hover { color: #fff; }
      .ft-strong { color: rgba(255, 255, 255, 0.9); }
      .ft-icon { color: rgba(255, 255, 255, 0.5); }
      .ft-social { border: 1px solid rgba(255, 255, 255, 0.2); color: rgba(255, 255, 255, 0.85); transition: border-color .2s, color .2s; }
      .ft-social:hover { border-color: #fff; }
      .ft-divider { border-color: rgba(255, 255, 255, 0.12); }

      /* --- Abertura (medidas da referência) --- */
      .fgv-hero-text { font-family: 'Montserrat', sans-serif; font-size: 20px; font-weight: 300; line-height: 26px; color: #fff; text-shadow: 0 1px 12px rgba(0,0,0,0.45); }
      .fgv-hero-btn {
        font-family: 'Montserrat', sans-serif;
        display: inline-block; margin: 8px; padding: 8px 22px 6px;
        border: 1.6px solid #fbfbfb; border-radius: 4px; color: #fbfbfb;
        font-size: 12px; font-weight: 400; line-height: 18px; text-transform: uppercase;
        transition: background-color .15s ease, box-shadow .15s ease;
      }
      .fgv-hero-btn:hover { background-color: rgba(255,255,255,0.12); box-shadow: 0 8px 9px -4px rgba(0,0,0,0.15), 0 4px 18px 0 rgba(0,0,0,0.1); }
      .fgv-hero-btn:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
      /* Altura da abertura: tela cheia, conteúdo centrado na área abaixo da navbar */
      .fgv-hero { height: 100vh; min-height: 620px; padding-top: 64px; }

      ${PAGES_CSS}

      @keyframes fgv-fade-in { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
      .fgv-fade-in { animation: fgv-fade-in .45s ease both; }

      @media (prefers-reduced-motion: reduce) {
        html { scroll-behavior: auto; }
        .fgv-fade-in { animation: none !important; }
      }
    `}</style>
  );
}

/* ============================================================================
 * HOOKS UTILITÁRIOS
 * ========================================================================== */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return undefined;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    if (mq.addEventListener) mq.addEventListener("change", update);
    else mq.addListener(update);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", update);
      else mq.removeListener(update);
    };
  }, []);
  return reduced;
}

/* Verifica se uma imagem existe antes de usá-la (evita fundo quebrado) */
function useImageAvailable(src) {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    if (!src) {
      setOk(false);
      return undefined;
    }
    let alive = true;
    const img = new Image();
    img.onload = () => alive && setOk(true);
    img.onerror = () => alive && setOk(false);
    img.src = src;
    return () => {
      alive = false;
    };
  }, [src]);
  return ok;
}

/* Rota simples por hash: cada aba é "#/nome". "#/equipe" (antiga página) leva a "Sobre". */
const ROUTES = ["sobre", "nucleos", "research", "competicoes", "eventos", "membros", "alumni", "processo-seletivo", "contato"];
const ROUTE_ALIASES = { equipe: "sobre" };
function useRoute() {
  const read = () => {
    if (typeof window === "undefined") return "home";
    const m = window.location.hash.match(/^#\/([\w-]+)/);
    if (!m) return "home";
    const name = ROUTE_ALIASES[m[1]] || m[1];
    return ROUTES.includes(name) ? name : "home";
  };
  const [route, setRoute] = useState(read);
  useEffect(() => {
    const onHash = () => setRoute(read());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return route;
}

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

/* ============================================================================
 * COMPONENTES DE MARCA E UI
 * ========================================================================== */

/* Símbolo: ponte em arco formada por nós de rede */
function BrandMark({ className = "h-9 w-9" }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 30 L10 18 L20 12 L30 18 L36 30" />
        <path d="M4 30 H36" />
        <path d="M10 18 V30 M20 12 V30 M30 18 V30" opacity="0.55" />
        <path d="M10 18 L20 30 L30 18" opacity="0.35" />
      </g>
      <g fill="currentColor">
        <circle cx="4" cy="30" r="2.2" />
        <circle cx="10" cy="18" r="2.2" />
        <circle cx="30" cy="18" r="2.2" />
        <circle cx="36" cy="30" r="2.2" />
        <circle cx="10" cy="30" r="1.6" />
        <circle cx="20" cy="30" r="1.6" />
        <circle cx="30" cy="30" r="1.6" />
      </g>
      <circle cx="20" cy="12" r="3" fill="#60A5FA" />
    </svg>
  );
}

/* Rede de partículas da abertura (comportamento da referência: nós brancos,
 * linhas entre nós próximos, repulsão ao mouse, +4 nós por clique).
 * Linhas e nós ficam mais fracos na região central, atrás da marca e do texto. */
function ParticleNetwork({ animate, subtle }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas ? canvas.parentElement : null;
    const ctx = canvas ? canvas.getContext("2d") : null;
    if (!canvas || !host || !ctx) return undefined;

    const CFG = {
      count: subtle ? 22 : 30,
      maxCount: 70,
      maxSize: 5,
      maxOpacity: 0.5,
      linkDistance: 330,
      linkOpacity: subtle ? 0.2 : 0.28,
      linkWidth: 1,
      speed: 6,
      repulseRadius: 80,
      refArea: 1440 * 900,
    };
    let width = 0;
    let height = 0;
    let rafId = 0;
    let running = false;
    let particles = [];
    const mouse = { x: null, y: null };

    const makeParticle = (x, y) => ({
      x: x != null ? x : Math.random() * width,
      y: y != null ? y : Math.random() * height,
      vx: Math.random() - 0.5,
      vy: Math.random() - 0.5,
      r: Math.max(1, Math.random() * CFG.maxSize),
      o: Math.max(0.1, Math.random() * CFG.maxOpacity),
    });

    // 0 no centro do bloco de texto → 1 fora dele (atenua o que passa atrás das letras)
    const centerFade = (x, y) => {
      const cx = width / 2;
      const cy = 64 + (height - 64) / 2;
      const rx = Math.min(560, width * 0.46);
      const ry = Math.min(300, height * 0.36);
      const d = Math.sqrt(((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2);
      return Math.min(1, Math.max(0.08, (d - 0.55) / 0.6));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = host.clientWidth;
      height = host.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = CFG.linkWidth;
      const linkDistance = Math.min(CFG.linkDistance, width * 0.8);
      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const a = particles[i];
          const b = particles[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < linkDistance) {
            const fade = centerFade((a.x + b.x) / 2, (a.y + b.y) / 2);
            const op = (CFG.linkOpacity - (dist / linkDistance) * CFG.linkOpacity) * fade;
            ctx.strokeStyle = `rgba(255, 255, 255, ${op})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      particles.forEach((p) => {
        ctx.fillStyle = `rgba(255, 255, 255, ${p.o * centerFade(p.x, p.y)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const step = () => {
      const ms = CFG.speed / 2;
      particles.forEach((p) => {
        p.x += p.vx * ms;
        p.y += p.vy * ms;
        if (p.x - p.r < 0 || p.x + p.r > width) {
          p.vx = -p.vx;
          p.x = Math.min(Math.max(p.x, p.r), width - p.r);
        }
        if (p.y - p.r < 0 || p.y + p.r > height) {
          p.vy = -p.vy;
          p.y = Math.min(Math.max(p.y, p.r), height - p.r);
        }
        if (mouse.x != null) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.hypot(dx, dy) || 1;
          if (dist < CFG.repulseRadius) {
            const push = (CFG.repulseRadius - dist) * 0.2;
            p.x += (dx / dist) * push;
            p.y += (dy / dist) * push;
          }
        }
      });
      draw();
      rafId = window.requestAnimationFrame(step);
    };

    const start = () => {
      if (running || !animate) return;
      running = true;
      rafId = window.requestAnimationFrame(step);
    };
    const stop = () => {
      running = false;
      window.cancelAnimationFrame(rafId);
    };

    const localPoint = (e) => {
      const rect = host.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMove = (e) => {
      const pt = localPoint(e);
      mouse.x = pt.x;
      mouse.y = pt.y;
    };
    const onLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };
    const onClick = (e) => {
      if (e.target.closest && e.target.closest("a, button")) return;
      const pt = localPoint(e);
      for (let k = 0; k < 4; k += 1) particles.push(makeParticle(pt.x, pt.y));
      if (particles.length > CFG.maxCount) particles = particles.slice(-CFG.maxCount);
      if (!animate) draw();
    };

    resize();
    // densidade proporcional à área (~30 no desktop, ~8 no celular)
    const initialCount = Math.max(6, Math.min(CFG.count, Math.round((CFG.count * width * height) / CFG.refArea)));
    particles = Array.from({ length: initialCount }, () => makeParticle());
    draw();
    start();

    const onResize = () => {
      resize();
      draw();
    };
    window.addEventListener("resize", onResize);
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    host.addEventListener("click", onClick);

    let io = null;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
      io.observe(host);
    }

    return () => {
      stop();
      if (io) io.disconnect();
      window.removeEventListener("resize", onResize);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("click", onClick);
    };
  }, [animate, subtle]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}

/* Logo principal da abertura (~250px, branco). Substituível por imagem em SITE_DATA.hero.logo */
function HeroLogo({ src, alt }) {
  if (isSet(src)) return <img src={src} alt={alt} width="250" className="mx-auto block" />;
  const arch = [
    [35, 88], [62, 54], [94, 32], [125, 24], [156, 32], [188, 54], [215, 88],
  ];
  return (
    <svg viewBox="0 0 250 154" width="250" className="mx-auto block max-w-full" role="img" aria-label={alt}>
      <g stroke="#fff" strokeWidth="1.4" strokeLinecap="round" fill="none">
        <path d={arch.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ")} strokeOpacity="0.95" />
        <path d="M20 88 H230" strokeOpacity="0.95" />
        {arch.slice(1, -1).map(([x, y]) => (
          <line key={`h${x}`} x1={x} y1={y} x2={x} y2={88} strokeOpacity="0.5" />
        ))}
        {arch.slice(0, -1).map(([x, y], i) => (
          <line key={`d${x}`} x1={x} y1={y} x2={arch[i + 1][0]} y2={88} strokeOpacity="0.3" />
        ))}
      </g>
      <g fill="#fff">
        {arch.map(([x, y]) => (
          <circle key={`n${x}`} cx={x} cy={y} r={x === 125 ? 4.5 : 3.2} />
        ))}
        {arch.slice(1, -1).map(([x]) => (
          <circle key={`b${x}`} cx={x} cy={88} r="2" />
        ))}
      </g>
      <text x="125" y="124" textAnchor="middle" fill="#fff" fontFamily="Montserrat, sans-serif" fontWeight="300" fontSize="30" letterSpacing="9">
        FGV
      </text>
      <text x="125" y="146" textAnchor="middle" fill="#fff" fontFamily="Montserrat, sans-serif" fontWeight="300" fontSize="11" letterSpacing="4.5">
        DIGITAL ASSETS
      </text>
    </svg>
  );
}

/* Logo de parceiro: caixa branca de altura fixa (o nome aparece enquanto não há imagem) */
function PartnerLogo({ item }) {
  const linked = isSet(item.url);
  const ext = isExternal(item.url);
  const Tag = linked ? "a" : "div";
  return (
    <Tag
      className="hm-logo"
      title={item.name}
      {...(linked ? { href: item.url, ...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {}) } : {})}
    >
      {isSet(item.logo) ? <img src={item.logo} alt={item.name} loading="lazy" /> : <span>{item.name}</span>}
    </Tag>
  );
}

/* Número que conta de 0 até o valor quando aparece na tela ("330+" mantém o "+") */
function CountUp({ value, animate }) {
  const [ref, visible] = useReveal();
  const m = String(value).match(/^(\D*)(\d+)(.*)$/);
  const target = m ? parseInt(m[2], 10) : null;
  const [n, setN] = useState(animate ? 0 : target);
  useEffect(() => {
    if (target === null) return undefined;
    if (!animate) {
      setN(target);
      return undefined;
    }
    if (!visible) return undefined;
    let raf;
    const start = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - start) / 1200);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, animate, target]);
  if (target === null) return <span>{value}</span>;
  return (
    <span ref={ref}>
      <span aria-hidden="true">
        {m[1]}
        {n}
        {m[3]}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}

/* Ícones de redes sociais (SVG inline) */
function SocialIcon({ id, className = "h-4 w-4" }) {
  if (id === "email") return <Mail className={className} aria-hidden="true" />;
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };
  if (id === "youtube")
    return (
      <svg {...common}>
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
        <path d="m10 15 5-3-5-3z" />
      </svg>
    );
  if (id === "linkedin")
    return (
      <svg {...common}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    );
  if (id === "instagram")
    return (
      <svg {...common}>
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <path d="M17.5 6.5h.01" />
      </svg>
    );
  if (id === "x")
    return (
      <svg {...common}>
        <path d="M4 4l11.7 16H20L8.3 4z" />
        <path d="M4 20l6.8-6.8M13.2 10.8L20 4" />
      </svg>
    );
  return null;
}

/* ============================================================================
 * PÁGINAS INTERNAS (layout de fgvrealestate.com)
 * ========================================================================== */
const MONTHS = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
const parseDate = (iso) => {
  const [y, m, d] = String(iso).split("-").map(Number);
  return { y, m, d, short: MONTHS[m - 1].slice(0, 3), long: `${d} de ${MONTHS[m - 1]} de ${y}` };
};
const initials = (name) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

/* Botão redondo de ícone: vira link só quando há endereço real */
function IconButton({ href, label, children }) {
  if (isSet(href)) {
    const ext = isExternal(href);
    return (
      <a className="re-icon-btn" href={href} aria-label={label} title={label} {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
      </a>
    );
  }
  return (
    <span className="re-icon-btn" aria-hidden="true">
      {children}
    </span>
  );
}

/* Abertura das páginas internas: título Montserrat e texto justificado sobre foto escurecida */
function PageHero({ title, text, photo }) {
  return (
    <section className="pg-hero" style={photo ? { backgroundImage: `url("${photo}")` } : undefined}>
      <div>
        <h1>{title}</h1>
        {text && <p>{text}</p>}
      </div>
    </section>
  );
}

/* --- Membros --- */
function MembersPage({ data, photo }) {
  return (
    <main className="pg">
      <PageHero title={data.title} text={data.text} photo={photo} />
      <section className="pg-section">
        {data.groups.map((group) => (
          <div key={group.title} className="re-members-group">
            <h2 className="re-members-title pg-heading">
              {group.title}
              <span className="re-members-marca" aria-hidden="true">
                <BrandMark className="h-5 w-5" />
              </span>
            </h2>
            <div className={`re-members-grid re-members-grid--${group.size || "sm"}`}>
              {group.people.map((p, i) => (
                <article key={`${p.role}-${i}`} className="re-member">
                  <div className="re-member-photo">
                    {isSet(p.photo) ? (
                      <img src={p.photo} alt={p.name} loading="lazy" />
                    ) : (
                      <span className="re-member-initials">{initials(p.name)}</span>
                    )}
                    <span className="re-member-selo" aria-hidden="true">
                      <BrandMark />
                    </span>
                  </div>
                  <div className="re-member-info">
                    <h3 className="re-member-name">{p.name}</h3>
                    <p className="re-member-cargo">{p.role}</p>
                    <p className="re-member-curso">{p.course}</p>
                    <div className="re-member-links">
                      <IconButton href={p.linkedin} label={`LinkedIn de ${p.name}`}>
                        <LinkedInIcon />
                      </IconButton>
                      <IconButton href={isSet(p.email) ? `mailto:${p.email}` : ""} label={`E-mail de ${p.name}`}>
                        <Mail strokeWidth={2} />
                      </IconButton>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

/* --- Alumni --- */
function AlumniPage({ data, photo }) {
  // empresas ordenadas por número de alumni e depois em ordem alfabética
  const counts = data.people.reduce((acc, p) => ({ ...acc, [p.company]: (acc[p.company] || 0) + 1 }), {});
  const companies = Object.keys(counts).sort((a, b) => counts[b] - counts[a] || a.localeCompare(b, "pt-BR"));
  const people = [...data.people].sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
  return (
    <main className="pg">
      <PageHero title={data.title} text={data.text} photo={photo} />
      <section className="pg-section">
        <div className="re-alumni">
          <section className="re-alumni-onde">
            <h2 className="re-alumni-titulo pg-heading">{data.sectionTitle}</h2>
            <p className="re-alumni-resumo">
              {data.people.length} alumni em {companies.length} empresas
            </p>
            <ul className="re-alumni-empresas">
              {companies.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </section>
          <div className="re-alumni-lista">
            {people.map((p, i) => (
              <article key={`${p.company}-${i}`} className="re-alumnus">
                <div className="re-alumnus-info">
                  <h3 className="re-alumnus-nome">{p.name}</h3>
                  <p className="re-alumnus-empresa">{p.company}</p>
                </div>
                <IconButton href={p.linkedin} label={`LinkedIn de ${p.name}`}>
                  <LinkedInIcon />
                </IconButton>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

/* --- Processo Seletivo --- */
function SelectionPage({ data, photo, selection, labels, notify }) {
  const [open, setOpen] = useState(-1);
  const regOpen = selection.open && isSet(selection.url);
  const ext = isExternal(selection.url);
  const cta = (
    <div className="ps-cta-row">
      <a className="ps-cta" href={selection.url} {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {data.cta}
      </a>
    </div>
  );
  return (
    <main className="pg">
      <PageHero title={data.title} text={data.text} photo={photo} />

      {/* === SEÇÃO: PROCESSO SELETIVO — STATUS === */}
      <div className={`ps-status${regOpen ? " is-open" : ""}`}>
        <div className="ps-status-inner">
          <p className="ps-status-text">
            <i aria-hidden="true" />
            <strong>{regOpen ? labels.openLabel : labels.closedLabel}</strong>
            {regOpen ? isSet(selection.period) && <span>· {selection.period}</span> : <span>· {data.closedNote}</span>}
          </p>
          {regOpen ? (
            <a className="pg-btn" href={selection.url} {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
              {labels.applyLabel}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          ) : (
            notify && (
              <a className="pg-textlink" href="#newsletter">
                <Mail className="h-4 w-4" aria-hidden="true" />
                {data.notifyLabel}
              </a>
            )
          )}
        </div>
      </div>

      {/* === SEÇÃO: PROCESSO SELETIVO — ETAPAS === */}
      <section style={{ background: "#fff" }}>
        <div className="ps-wrap">
          <div className={`ps-steps${regOpen ? "" : " ps-steps--end"}`}>
            {data.steps.map((step, i) => (
              <div key={step.label} className="ps-step">
                <div className="ps-num" aria-hidden="true">
                  <span>
                    {i + 1}
                    <sup>a</sup>
                  </span>
                  <i />
                </div>
                <p>
                  <strong>{step.label}:</strong> {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
        {regOpen && cta}
      </section>

      {/* === SEÇÃO: PROCESSO SELETIVO — PERGUNTAS FREQUENTES === */}
      <section className="ps-faq">
        <div className="ps-wrap">
          <h3 className="pg-heading">{data.faqTitle}</h3>
          <div>
            {data.faq.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.q} className={`ps-acc-item ${isOpen ? "is-open" : ""}`}>
                  <button
                    type="button"
                    className="ps-acc-btn"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span>{item.q}</span>
                    <span className="ps-plus" aria-hidden="true" />
                  </button>
                  <div id={`faq-${i}`} className="ps-acc-panel" hidden={!isOpen}>
                    <p>{item.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* Botão de inscrição repetido no fim da página (só com inscrições abertas) */}
        {regOpen && <div className="ps-cta-end">{cta}</div>}
      </section>
    </main>
  );
}

/* --- Eventos --- */
function EventsPage({ data, photo }) {
  return (
    <main className="pg">
      <PageHero title={data.title} text={data.text} photo={photo} />
      <section className="pg-section">
        <div className="re-eventos">
          {data.groups.map((group) => (
            <section key={group.semester} className="re-eventos-grupo">
              <h2 className="re-eventos-semestre">{group.semester}</h2>
              <div className="re-eventos-lista">
                {group.items.map((ev) => {
                  const d = parseDate(ev.date);
                  return (
                    <article key={`${ev.date}-${ev.title}`} className="re-evento">
                      <div className="re-evento-foto">
                        {isSet(ev.photo) ? (
                          <img src={ev.photo} alt={ev.title} loading="lazy" />
                        ) : (
                          <span className="re-evento-sem-foto" aria-hidden="true">
                            <BrandMark />
                          </span>
                        )}
                      </div>
                      <div className="re-evento-info">
                        <div className="re-evento-dia" aria-hidden="true">
                          <strong>{String(d.d).padStart(2, "0")}</strong>
                          <span>{d.short}</span>
                        </div>
                        <div className="re-evento-corpo">
                          <p className="re-evento-quando">
                            <time dateTime={ev.date}>{d.long}</time>
                          </p>
                          <h3 className="re-evento-titulo pg-heading">{ev.title}</h3>
                          <div className="re-evento-texto">
                            {ev.text.map((para, i) => (
                              <p key={i}>{para}</p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}

/* Título de seção das abas: Montserrat centralizado + símbolo entre duas linhas */
function PgTitle({ children }) {
  return (
    <h2 className="re-members-title pg-heading">
      {children}
      <span className="re-members-marca" aria-hidden="true">
        <BrandMark className="h-5 w-5" />
      </span>
    </h2>
  );
}

/* Foto 3:2 (ou caixa cinza com o símbolo, enquanto não houver foto) */
function PgPhoto({ src, alt }) {
  return (
    <div className="re-evento-foto">
      {isSet(src) ? (
        <img src={src} alt={alt} loading="lazy" />
      ) : (
        <span className="re-evento-sem-foto" aria-hidden="true">
          <BrandMark />
        </span>
      )}
    </div>
  );
}

/* --- Sobre (#/sobre) --- */
function AboutPage({ data, photo }) {
  const deckExt = isExternal(data.deck.href);
  return (
    <main className="pg">
      <PageHero title={data.title} text={data.text} photo={photo} />

      {/* === SEÇÃO: SOBRE — QUEM SOMOS === */}
      <section className="pg-block">
        <div className="pg-container">
          {data.opening && data.opening.length > 0 && (
            <div className="ab-opening">
              {data.opening.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          )}
          <PgTitle>{data.sectionTitle}</PgTitle>
          <div className="ab-grid">
            <PgPhoto src={data.photo} alt={`Membros da ${SITE_DATA.brand.name}`} />
            <div className="ab-text">
              {data.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              {isSet(data.deck.href) && (
                <p>
                  <a className="pg-btn" href={data.deck.href} {...(deckExt ? { target: "_blank", rel: "noopener noreferrer" } : { download: true })}>
                    {data.deck.label}
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* === SEÇÃO: SOBRE — MISSÃO, VISÃO E VALORES === */}
      <section className="pg-block pg-band">
        <div className="pg-container">
          <div className="ab-mvv">
            {data.pillars.map((item) => (
              <article key={item.title}>
                <h3 className="pg-heading">{item.title}</h3>
                {item.text && <p>{item.text}</p>}
                {item.list && (
                  <ul className="ab-values">
                    {item.list.map((v) => (
                      <li key={v}>{v}</li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* === SEÇÃO: SOBRE — TRAJETÓRIA === */}
      <section className="pg-block">
        <div className="pg-container">
          <PgTitle>{data.timelineTitle}</PgTitle>
          <ol className="ab-timeline">
            {data.timeline.map((step) => (
              <li key={step.title} className="ab-step">
                {isSet(step.date) && <p className="ab-step-date">{step.date}</p>}
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
          <div className="pg-links" style={{ marginTop: "clamp(40px, 5vw, 64px)" }}>
            {data.next.map((l) => (
              <a key={l.href} className="pg-link-pill" href={l.href}>
                {l.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

/* --- Células (#/nucleos) --- */
function NucleosPage({ data, photo }) {
  return (
    <main className="pg">
      <PageHero title={data.title} text={data.text} photo={photo} />

      {/* === SEÇÃO: NÚCLEOS — COMO FUNCIONA O SEMESTRE === */}
      <section className="pg-block">
        <div className="pg-container">
          <p className="pg-lead">{data.intro}</p>
          <div style={{ marginTop: "clamp(48px, 6vw, 72px)" }}>
            <PgTitle>{data.cycleTitle}</PgTitle>
            <ol className="nu-cycle">
              {data.cycle.map((step) => (
                <li key={step.title}>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* === SEÇÃO: NÚCLEOS TÉCNICOS === */}
      <section className="pg-block pg-band">
        <div className="pg-container">
          <PgTitle>{data.technicalTitle}</PgTitle>
          <div className="nu-rows">
            {data.technical.map((n) => (
              <article key={n.name} id={`nucleo-${n.name}`} className="re-evento nu-row">
                <PgPhoto src={n.photo} alt={`Célula de ${n.name}`} />
                <div className="re-evento-corpo">
                  <h3 className="pg-row-title pg-heading">{n.name}</h3>
                  <p style={{ lineHeight: 1.6 }}>{n.description}</p>
                  <p className="pg-kicker">{data.deliverablesLabel}</p>
                  <ul className="nu-list">
                    {n.deliverables.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                  <p>
                    <a className="pg-textlink" href={`#/research?nucleo=${encodeURIComponent(n.name)}`}>
                      {data.researchLink}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* === SEÇÃO: ÁREAS DE GESTÃO === */}
      <section className="pg-block">
        <div className="pg-container">
          <PgTitle>{data.areasTitle}</PgTitle>
          <div className="nu-areas">
            {data.areas.map((a) => (
              <article key={a.name}>
                <h3>{a.name}</h3>
                <p>{a.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

/* Card de estudo (aba Research e destaque da página inicial) */
function ResearchCard({ item, labels }) {
  const ext = isExternal(item.href);
  return (
    <article className="rs-card">
      <div className="rs-cover">
        {isSet(item.cover) ? (
          <img src={item.cover} alt="" loading="lazy" />
        ) : (
          <>
            <BrandMark />
            <span>{item.nucleo}</span>
          </>
        )}
      </div>
      <div className="rs-body">
        <p className="rs-kicker">{item.nucleo}</p>
        <h3 className="rs-title pg-heading">{item.title}</h3>
        <p className="rs-question">
          <strong>{labels.questionLabel}:</strong> {item.question}
        </p>
        <p className="rs-authors">{item.authors.join(", ")}</p>
        {isSet(item.href) && (
          <a className="pg-textlink" href={item.href} {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
            {labels.linkLabel}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  );
}

/* --- Research (#/research) --- */
function ResearchPage({ data, photo }) {
  const readFilter = () => {
    const m = typeof window !== "undefined" ? window.location.hash.match(/[?&]nucleo=([^&]+)/) : null;
    return m ? decodeURIComponent(m[1]) : data.allLabel;
  };
  const [filter, setFilter] = useState(readFilter);
  useEffect(() => {
    const onHash = () => setFilter(readFilter());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const all = data.groups.flatMap((g) => g.items);
  const nucleos = [data.allLabel, ...Array.from(new Set(all.map((i) => i.nucleo)))];
  const groups = data.groups
    .map((g) => ({ ...g, items: filter === data.allLabel ? g.items : g.items.filter((i) => i.nucleo === filter) }))
    .filter((g) => g.items.length > 0);

  return (
    <main className="pg">
      <PageHero title={data.title} text={data.text} photo={photo} />
      <section className="pg-block">
        <div className="re-eventos">
          {nucleos.length > 2 && (
            <div className="rs-chips" role="group" aria-label="Filtrar por célula">
              {nucleos.map((n) => (
                <button key={n} type="button" className="rs-chip" aria-pressed={filter === n} onClick={() => setFilter(n)}>
                  {n}
                </button>
              ))}
            </div>
          )}

          {groups.length === 0 && <p className="rs-empty">Nenhum estudo publicado por esta célula ainda.</p>}

          {groups.map((group) => (
            <section key={group.semester} className="re-eventos-grupo">
              <h2 className="re-eventos-semestre">{group.semester}</h2>
              <div className="rs-grid">
                {group.items.map((item) => (
                  <ResearchCard key={item.title} item={item} labels={data} />
                ))}
              </div>
            </section>
          ))}

          <p className="rs-disclaimer">{data.disclaimer}</p>
        </div>
      </section>
    </main>
  );
}

/* --- Competições (#/competicoes) --- */
function CompetitionsPage({ data, photo }) {
  return (
    <main className="pg">
      <PageHero title={data.title} text={data.text} photo={photo} />
      <section className="pg-block">
        <div className="pg-container">
          <p className="pg-lead">{data.intro}</p>
          <div className="nu-rows" style={{ marginTop: "clamp(48px, 6vw, 72px)" }}>
            {data.items.map((c) => (
              <article key={c.name} className="re-evento nu-row">
                <PgPhoto src={c.photo} alt={c.name} />
                <div className="re-evento-corpo">
                  <p className="pg-kicker">{c.organizer}</p>
                  <h3 className="pg-row-title pg-heading">{c.name}</h3>
                  <p style={{ lineHeight: 1.6 }}>{c.description}</p>
                  <ul className="cp-results">
                    {c.results.map((r, i) => (
                      <li key={`${r.year}-${i}`}>
                        <span className="cp-year">{r.year}</span>
                        <div>
                          <p className="cp-result">{r.result}</p>
                          <p className="cp-team">{r.team}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

/* --- Contato (#/contato) --- */
function ContactPage({ data, photo, mode, email, brandName, location, address, socials }) {
  const [form, setForm] = useState({ nome: "", email: "", assunto: data.subjects[0], mensagem: "" });
  const [status, setStatus] = useState("idle"); // idle | invalid | loading | sent | mailto | error
  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (status === "invalid" || status === "error") setStatus("idle");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.nome.trim() || !EMAIL_REGEX.test(form.email.trim()) || !form.mensagem.trim()) {
      setStatus("invalid");
      return;
    }
    if (mode === "mailto") {
      const subject = encodeURIComponent(`[${form.assunto}] Contato pelo site`);
      const body = encodeURIComponent(`Nome: ${form.nome}\nE-mail: ${form.email}\n\n${form.mensagem}`);
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
      setStatus("mailto");
      return;
    }
    setStatus("loading");
    try {
      if (mode === "api") {
        const res = await fetch(data.endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("Falha no envio");
      } else {
        await new Promise((resolve) => setTimeout(resolve, 800)); // modo demonstração
      }
      setStatus("sent");
      setForm({ nome: "", email: "", assunto: data.subjects[0], mensagem: "" });
    } catch (err) {
      setStatus("error");
    }
  };

  const showForm = mode !== "off";
  const message =
    status === "invalid"
      ? { cls: "is-error", text: "Preencha nome, um e-mail válido e a mensagem." }
      : status === "error"
      ? { cls: "is-error", text: data.error }
      : status === "sent"
      ? { cls: "is-ok", text: data.sent }
      : status === "mailto"
      ? { cls: "is-ok", text: data.mailtoSent }
      : null;

  return (
    <main className="pg">
      <PageHero title={data.title} text={data.text} photo={photo} />
      <section className="pg-block">
        <div className="pg-container">
          <div className={`ct-grid ${showForm ? "" : "ct-grid--single"}`}>
            {/* === SEÇÃO: CONTATO — INFORMAÇÕES === */}
            <div>
              <h2 className="ct-title pg-heading">{data.infoTitle}</h2>
              <ul className="ct-info">
                <li>
                  <span className="re-icon-btn" aria-hidden="true">
                    <MapPin />
                  </span>
                  <div>
                    <p className="ct-label">Endereço</p>
                    <p>{location}</p>
                    <p>{address}</p>
                  </div>
                </li>
                {isSet(email) && (
                  <li>
                    <span className="re-icon-btn" aria-hidden="true">
                      <Mail />
                    </span>
                    <div>
                      <p className="ct-label">E-mail</p>
                      <a className="pg-textlink" href={`mailto:${email}`} style={{ wordBreak: "break-all" }}>
                        {email}
                      </a>
                    </div>
                  </li>
                )}
                {socials.length > 0 && (
                  <li>
                    <span className="re-icon-btn" aria-hidden="true">
                      <Users />
                    </span>
                    <div>
                      <p className="ct-label">Redes</p>
                      <div className="ct-socials">
                        {socials.map((s) => (
                          <IconButton key={s.id} href={s.href} label={s.label}>
                            <SocialIcon id={s.id} />
                          </IconButton>
                        ))}
                      </div>
                    </div>
                  </li>
                )}
              </ul>
              <div className="ct-box">
                <h3>{data.partnersTitle}</h3>
                <p>{data.partnersText}</p>
              </div>
            </div>

            {/* === SEÇÃO: CONTATO — FORMULÁRIO === */}
            {showForm && (
              <form className="ct-form" onSubmit={onSubmit} noValidate aria-label={`Fale com a ${brandName}`}>
                <h2 className="ct-title pg-heading">{data.formTitle}</h2>
                <div className="ct-fields">
                  <div className="ct-field">
                    <label htmlFor="ct-nome">Nome</label>
                    <input id="ct-nome" type="text" autoComplete="name" value={form.nome} onChange={update("nome")} />
                  </div>
                  <div className="ct-field">
                    <label htmlFor="ct-email">E-mail</label>
                    <input id="ct-email" type="email" inputMode="email" autoComplete="email" value={form.email} onChange={update("email")} />
                  </div>
                  <div className="ct-field ct-field--full">
                    <label htmlFor="ct-assunto">Assunto</label>
                    <select id="ct-assunto" value={form.assunto} onChange={update("assunto")}>
                      {data.subjects.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div className="ct-field ct-field--full">
                    <label htmlFor="ct-mensagem">Mensagem</label>
                    <textarea id="ct-mensagem" rows={6} value={form.mensagem} onChange={update("mensagem")} />
                  </div>
                </div>
                <div className="ct-actions">
                  <button type="submit" className="pg-btn" disabled={status === "loading"}>
                    {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <ArrowRight className="h-4 w-4" aria-hidden="true" />}
                    {status === "loading" ? "Enviando…" : "Enviar"}
                  </button>
                  <p className={`ct-msg ${message ? message.cls : ""}`} role="status" aria-live="polite">
                    {message ? message.text : ""}
                  </p>
                </div>
                {mode === "demo" && <p className="ct-demo">{data.demoNote}</p>}
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

/* ============================================================================
 * APP
 * ========================================================================== */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | invalid | loading | success | mailto | error
  const [submittedEmail, setSubmittedEmail] = useState("");
  const reduceMotion = usePrefersReducedMotion();
  const route = useRoute();

  const { brand, nav, hero, about, stats, highlights, testimonials, selectionBand, sponsors, ecosystem, newsletter, footer, pages } = SITE_DATA;

  /* --- Estado derivado: o que está preenchido e pode aparecer ------------- */
  const heroPhotoOk = useImageAvailable(isSet(hero.backgroundImage) ? hero.backgroundImage : "");
  const pagePhoto = heroPhotoOk ? hero.backgroundImage : null;
  const hasEmail = isSet(brand.email);
  const newsletterMode = isSet(newsletter.endpoint) ? "api" : hasEmail ? "mailto" : SHOW_PLACEHOLDERS ? "demo" : "off";
  const contactMode = isSet(pages.contact.endpoint) ? "api" : hasEmail ? "mailto" : SHOW_PLACEHOLDERS ? "demo" : "off";
  const newsletterCta = newsletterMode !== "off" ? nav.newsletterButton : null;
  // Link ativo: a aba da rota atual; "Início" na página inicial
  const isActive = (href) => (route === "home" ? href === "#inicio" : href === `#/${route}`);
  const navLinks = nav.links;
  const activeSocials = nav.socials.filter((s) => isSet(s.href));

  // Números: valor manual ou contagem do que já está cadastrado nas abas
  const autoCounts = {
    membros: pages.members.groups.reduce((n, g) => n + g.people.length, 0),
    nucleos: pages.nucleos.technical.length,
    estudos: pages.research.groups.reduce((n, g) => n + g.items.length, 0),
    eventos: pages.events.groups.reduce((n, g) => n + g.items.length, 0),
    alumni: pages.alumni.people.length,
  };
  const statItems = stats.items
    .map((s) => ({ ...s, value: isSet(s.value) ? s.value : s.auto && autoCounts[s.auto] > 0 ? String(autoCounts[s.auto]) : "" }))
    .filter((s) => s.value !== "");

  const latestStudies = pages.research.groups.flatMap((g) => g.items).slice(0, highlights.research.count);
  const latestEvents = pages.events.groups
    .flatMap((g) => g.items)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, highlights.events.count);
  const quotes = testimonials.items.filter((q) => SHOW_PLACEHOLDERS || (isSet(q.name) && isSet(q.quote)));
  const selectionOpen = nav.selection.open && isSet(nav.selection.url);
  const deck = pages.about.deck;

  const visibleTiers = sponsors.tiers
    .map((tier) => ({ ...tier, items: tier.items.filter((it) => SHOW_PLACEHOLDERS || isSet(it.logo) || isSet(it.name)) }))
    .filter((tier) => tier.items.length > 0);
  const collabs = ecosystem.items.filter((i) => SHOW_PLACEHOLDERS || isSet(i.name));

  /* --- Efeitos ------------------------------------------------------------ */
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 1280) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  /* Ao trocar de página: topo na página da equipe; âncora certa ao voltar para o início */
  useEffect(() => {
    setMenuOpen(false);
    if (route !== "home") {
      window.scrollTo(0, 0);
      return;
    }
    const hash = window.location.hash;
    if (hash && hash.length > 1 && !hash.startsWith("#/")) {
      const el = document.getElementById(hash.slice(1));
      if (el) el.scrollIntoView();
    }
  }, [route]);

  /* --- Newsletter --------------------------------------------------------- */
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (status === "invalid" || status === "error") setStatus("idle");
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    const value = email.trim();
    if (!EMAIL_REGEX.test(value)) {
      setStatus("invalid");
      return;
    }
    if (newsletterMode === "mailto") {
      const subject = encodeURIComponent("Inscrição na newsletter");
      const body = encodeURIComponent(`Quero receber a newsletter da ${brand.name} no e-mail: ${value}`);
      window.location.href = `mailto:${brand.email}?subject=${subject}&body=${body}`;
      setSubmittedEmail(value);
      setStatus("mailto");
      return;
    }
    setStatus("loading");
    try {
      if (newsletterMode === "api") {
        const res = await fetch(newsletter.endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: value }),
        });
        if (!res.ok) throw new Error("Falha no envio");
      } else {
        await new Promise((resolve) => setTimeout(resolve, 900)); // modo demonstração
      }
      setSubmittedEmail(value);
      setEmail("");
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
  };

  const year = new Date().getFullYear();

  return (
    <div className="fgv-root min-h-screen bg-white">
      <GlobalStyles />

      {/* === SEÇÃO: NAVBAR === */}
      {/* Barra fixa em navy (cor principal da marca). Marca e nome juntos à esquerda;
          à direita, apenas canais ativos e o botão da newsletter. */}
      <header className="fixed inset-x-0 top-0 z-50" style={{ background: PAGE_COLORS.navy, boxShadow: "0 10px 20px 0 rgba(0, 0, 0, 0.08)" }}>
        <nav className="flex items-center px-3 sm:px-4" style={{ minHeight: 64 }} aria-label="Navegação principal">
          <a
            href="#inicio"
            className="flex items-center gap-3 py-1 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            onClick={() => setMenuOpen(false)}
          >
            <BrandMark className="h-8 w-10 text-white" />
            <span className="pg-heading text-base tracking-tight">{brand.name}</span>
            {isSet(nav.institutionLogo) && (
              <>
                <span className="h-6 w-px bg-white opacity-30" aria-hidden="true" />
                <img src={nav.institutionLogo} alt={brand.institution} style={{ height: 30 }} />
              </>
            )}
          </a>

          <ul className="fgv-nav-desk ml-8 hidden items-center xl:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="fgv-nav-link block whitespace-nowrap transition-opacity hover:opacity-75"
                  aria-current={isActive(link.href) ? "page" : undefined}
                  style={
                    isActive(link.href)
                      ? { textDecoration: "underline", textUnderlineOffset: 6, textDecorationThickness: 1 }
                      : undefined
                  }
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="ml-auto hidden items-center xl:flex">
            <ul className="flex items-center">
              {activeSocials.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    className="fgv-nav-link flex items-center transition-opacity hover:opacity-75"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SocialIcon id={s.id} className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
            {newsletterCta && (
              <a
                href={newsletterCta.href}
                className="fgv-nav-cta ml-3 inline-flex items-center gap-1.5 whitespace-nowrap rounded px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white"
              >
                <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                {newsletterCta.label}
              </a>
            )}
          </div>

          <button
            type="button"
            className="ml-auto inline-flex items-center justify-center rounded px-3 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-white xl:hidden"
            style={{ color: "rgba(255, 255, 255, 0.7)" }}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {/* Menu mobile */}
        <div
          id="mobile-menu"
          className={`overflow-y-auto transition-all duration-300 ease-out xl:hidden ${
            menuOpen ? "opacity-100" : "pointer-events-none max-h-0 opacity-0"
          }`}
          style={menuOpen ? { maxHeight: "calc(100vh - 64px)" } : undefined}
        >
          <div className="px-4 pb-4">
            <ul className="grid sm:grid-cols-2 sm:gap-x-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="fgv-nav-link block"
                    aria-current={isActive(link.href) ? "page" : undefined}
                    style={{ paddingLeft: 0, ...(isActive(link.href) ? { textDecoration: "underline", textUnderlineOffset: 6 } : {}) }}
                    tabIndex={menuOpen ? 0 : -1}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            {(activeSocials.length > 0 || newsletterCta) && (
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2">
                {activeSocials.map((s) => (
                  <a key={s.id} href={s.href} aria-label={s.label} className="fgv-nav-link" style={{ paddingLeft: 0 }} tabIndex={menuOpen ? 0 : -1}>
                    <SocialIcon id={s.id} className="h-4 w-4" />
                  </a>
                ))}
                {newsletterCta && (
                  <a
                    href={newsletterCta.href}
                    onClick={() => setMenuOpen(false)}
                    tabIndex={menuOpen ? 0 : -1}
                    className="fgv-nav-cta inline-flex items-center gap-1.5 rounded px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white"
                  >
                    <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                    {newsletterCta.label}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* === PÁGINAS INTERNAS (uma por aba do menu) === */}
      {route === "sobre" ? (
        <AboutPage data={pages.about} photo={pagePhoto} />
      ) : route === "nucleos" ? (
        <NucleosPage data={pages.nucleos} photo={pagePhoto} />
      ) : route === "research" ? (
        <ResearchPage data={pages.research} photo={pagePhoto} />
      ) : route === "competicoes" ? (
        <CompetitionsPage data={pages.competitions} photo={pagePhoto} />
      ) : route === "membros" ? (
        <MembersPage data={pages.members} photo={pagePhoto} />
      ) : route === "alumni" ? (
        <AlumniPage data={pages.alumni} photo={pagePhoto} />
      ) : route === "processo-seletivo" ? (
        <SelectionPage
          data={pages.selection}
          photo={pagePhoto}
          selection={nav.selection}
          labels={selectionBand}
          notify={newsletterMode !== "off"}
        />
      ) : route === "eventos" ? (
        <EventsPage data={pages.events} photo={pagePhoto} />
      ) : route === "contato" ? (
        <ContactPage
          data={pages.contact}
          photo={pagePhoto}
          mode={contactMode}
          email={brand.email}
          brandName={brand.name}
          location={footer.location}
          address={footer.address}
          socials={activeSocials}
        />
      ) : (
        <main className="pg">
          {/* === SEÇÃO: HERO (ABERTURA) === */}
          {/* Foto do Viaduto do Chá em largura total com camada navy (a mesma cor das
              aberturas das abas), rede de partículas atenuada, logo central, uma frase
              curta e dois botões. As três frases sobre o viaduto ficam na aba Sobre. */}
          <section
            id="inicio"
            className="fgv-hero relative overflow-hidden"
            style={{
              backgroundColor: PAGE_COLORS.navy,
              backgroundImage: heroPhotoOk
                ? `radial-gradient(ellipse 55% 50% at 50% 55%, rgba(${PAGE_COLORS.navyRgb}, 0.5), rgba(${PAGE_COLORS.navyRgb}, 0) 75%), linear-gradient(rgba(${PAGE_COLORS.navyRgb}, 0.5), rgba(${PAGE_COLORS.navyRgb}, 0.6)), url("${hero.backgroundImage}")`
                : `radial-gradient(ellipse at 50% 30%, #1C335F 0%, ${PAGE_COLORS.navy} 55%, ${PAGE_COLORS.navyDeep} 100%)`,
              backgroundSize: "cover",
              backgroundPosition: heroPhotoOk ? `center, center, ${hero.backgroundPosition}` : "center",
              boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.25), 0 5px 15px 0 rgba(0, 0, 0, 0.2)",
            }}
          >
            <ParticleNetwork animate={!reduceMotion} subtle={heroPhotoOk} />

            <div className="pointer-events-none relative z-10 flex h-full items-center justify-center px-4 pb-6 text-center">
              <div className="pointer-events-auto text-white">
                <h1 className="sr-only">{brand.name}</h1>
                <HeroLogo src={hero.logo} alt={brand.name} />
                <p className="fgv-hero-text mx-auto max-w-3xl" style={{ marginTop: 28 }}>
                  {hero.tagline}
                </p>
                <div style={{ marginTop: 22 }}>
                  {hero.buttons.map((btn) => (
                    <a
                      key={btn.label}
                      href={btn.href}
                      className="fgv-hero-btn"
                      {...(isExternal(btn.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {btn.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {heroPhotoOk && isSet(hero.credit.text) && (
              <a
                href={hero.credit.href}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-3 right-4 z-10 text-xs text-white opacity-60 transition hover:opacity-100"
              >
                {hero.credit.text}
              </a>
            )}
          </section>

          {/* === SEÇÃO: SOBRE NÓS === */}
          {/* Foto do grupo, uma frase de destaque, um parágrafo, a apresentação
              institucional (quando houver PDF) e o link para a aba Sobre. */}
          <section id="quem-somos" className="pg-block scroll-mt-16">
            <div className="pg-container">
              <PgTitle>{about.title}</PgTitle>
              <div className="ab-grid">
                <PgPhoto src={about.photo} alt={`Membros da ${brand.name}`} />
                <div className="ab-text">
                  <h3 className="hm-about-lead pg-heading">{about.lead}</h3>
                  <p>{about.text}</p>
                  <div className="hm-actions">
                    {isSet(deck.href) && (
                      <a
                        className="pg-btn"
                        href={deck.href}
                        {...(isExternal(deck.href) ? { target: "_blank", rel: "noopener noreferrer" } : { download: true })}
                      >
                        {deck.label}
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                    )}
                    <a className="pg-textlink" href={about.link.href}>
                      {about.link.label}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* === SEÇÃO: NÚMEROS === */}
          {/* Faixa navy com 4 a 6 contadores que sobem de 0 até o valor ao aparecer na tela. */}
          {statItems.length > 0 && (
            <section id="numeros" className="hm-stats-band" aria-labelledby="numeros-titulo">
              <div className="pg-container">
                <h2 id="numeros-titulo" className="hm-stats-title">
                  {stats.title}
                </h2>
                <ul className="hm-stats">
                  {statItems.map((s) => (
                    <li key={s.label} className="hm-stat">
                      <strong>
                        <CountUp value={s.value} animate={!reduceMotion} />
                      </strong>
                      <span>{s.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* === SEÇÃO: NÚCLEOS === */}
          {/* Um card curto por célula técnica, com link para os estudos da célula. */}
          <section id="nucleos-destaque" className="pg-block pg-band">
            <div className="pg-container">
              <PgTitle>{highlights.nucleos.title}</PgTitle>
              <div className="hm-intro">
                <p className="pg-lead">{highlights.nucleos.text}</p>
              </div>
              <div className="hm-cards">
                {pages.nucleos.technical.map((n, i) => (
                  <article key={n.name} className="hm-card">
                    <p className="rs-kicker">
                      {String(i + 1).padStart(2, "0")} · {highlights.nucleos.kicker}
                    </p>
                    <h3 className="pg-heading">{n.name}</h3>
                    <p>{n.description}</p>
                    <a className="pg-textlink" href={`#/research?nucleo=${encodeURIComponent(n.name)}`}>
                      {pages.nucleos.researchLink}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </article>
                ))}
              </div>
              <div className="hm-more">
                <a className="pg-btn" href="#/nucleos">
                  {highlights.nucleos.button}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </section>

          {/* === SEÇÃO: RESEARCH EM DESTAQUE === */}
          {/* Os estudos mais recentes da aba Research, no mesmo card da aba. */}
          {latestStudies.length > 0 && (
            <section id="research-destaque" className="pg-block">
              <div className="pg-container">
                <PgTitle>{highlights.research.title}</PgTitle>
                <div className="hm-cards">
                  {latestStudies.map((item) => (
                    <ResearchCard key={item.title} item={item} labels={pages.research} />
                  ))}
                </div>
                <div className="hm-more">
                  <a className="pg-btn" href="#/research">
                    {highlights.research.button}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </section>
          )}

          {/* === SEÇÃO: ÚLTIMOS EVENTOS === */}
          {/* Os eventos mais recentes da aba Eventos: foto, data, título e o início do texto. */}
          {latestEvents.length > 0 && (
            <section id="eventos-recentes" className="pg-block pg-band">
              <div className="pg-container">
                <PgTitle>{highlights.events.title}</PgTitle>
                <div className="hm-cards">
                  {latestEvents.map((ev) => {
                    const d = parseDate(ev.date);
                    return (
                      <article key={`${ev.date}-${ev.title}`} className="rs-card">
                        <PgPhoto src={ev.photo} alt={ev.title} />
                        <div className="rs-body">
                          <p className="rs-kicker">
                            <time dateTime={ev.date}>{d.long}</time>
                          </p>
                          <h3 className="rs-title pg-heading">{ev.title}</h3>
                          {ev.text[0] && <p className="rs-question hm-excerpt">{ev.text[0]}</p>}
                        </div>
                      </article>
                    );
                  })}
                </div>
                <div className="hm-more">
                  <a className="pg-btn" href="#/eventos">
                    {highlights.events.button}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </section>
          )}

          {/* === SEÇÃO: DEPOIMENTOS === */}
          {/* Professor, parceiro e alumni: foto redonda, cargo e empresa. Só aparece
              com depoimentos reais preenchidos. */}
          {quotes.length > 0 && (
            <section id="depoimentos" className="pg-block">
              <div className="pg-container">
                <PgTitle>{testimonials.title}</PgTitle>
                <div className="hm-cards">
                  {quotes.map((q) => (
                    <figure key={q.name} className="hm-quote">
                      <blockquote>
                        <p>{q.quote}</p>
                      </blockquote>
                      <figcaption>
                        <span className="hm-avatar" aria-hidden="true">
                          {isSet(q.photo) ? <img src={q.photo} alt="" loading="lazy" /> : initials(q.name.replace(/[[\]]/g, ""))}
                        </span>
                        <span>
                          <span className="hm-quote-name">{q.name}</span>
                          <span className="hm-quote-role">{[q.role, q.company].filter(Boolean).join(" · ")}</span>
                        </span>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* === SEÇÃO: FAIXA DO PROCESSO SELETIVO === */}
          {/* Status (aberto ou encerrado) vindo de nav.selection, período e botões. */}
          <section id="processo-seletivo-faixa" className={`pg-block${quotes.length > 0 ? " pg-band" : ""}`}>
            <div className="pg-container">
              <div className="hm-ps">
                <div>
                  <p className={`hm-ps-status${selectionOpen ? " is-open" : ""}`}>
                    <i aria-hidden="true" />
                    {selectionOpen ? selectionBand.openLabel : selectionBand.closedLabel}
                    {selectionOpen && isSet(nav.selection.period) ? ` · ${nav.selection.period}` : ""}
                  </p>
                  <h2 className="pg-heading">{selectionBand.title}</h2>
                  <p className="hm-ps-text">{selectionOpen ? selectionBand.openText : selectionBand.closedText}</p>
                </div>
                <div className="hm-ps-actions">
                  {selectionOpen && (
                    <a
                      className="pg-btn pg-btn--light"
                      href={nav.selection.url}
                      {...(isExternal(nav.selection.url) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {selectionBand.applyLabel}
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  )}
                  <a className={`pg-btn ${selectionOpen ? "pg-btn--ghost" : "pg-btn--light"}`} href="#/processo-seletivo">
                    {selectionBand.moreLabel}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                  {!selectionOpen && newsletterMode !== "off" && (
                    <a className="pg-btn pg-btn--ghost" href="#newsletter">
                      <Mail className="h-4 w-4" aria-hidden="true" />
                      {selectionBand.notifyLabel}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* === SEÇÃO: PARCEIROS === */}
          {/* Faixa escura: logos com a mesma altura em caixas brancas, colaborações
              anteriores e o convite "Proponha um projeto" (leva à aba Contato). */}
          <section id="parceiros" className="pg-block hm-dark scroll-mt-16">
            <div className="pg-container">
              <PgTitle>{sponsors.title}</PgTitle>
              {visibleTiers.length > 0 && (
                <>
                  <div className="hm-intro">
                    <p className="pg-lead">{sponsors.subtitle}</p>
                  </div>
                  {visibleTiers.map((tier) => (
                    <div key={tier.id} className="hm-tier">
                      {visibleTiers.length > 1 && <p className="hm-label">{tier.label}</p>}
                      <ul className="hm-logos">
                        {tier.items.map((item) => (
                          <li key={item.name}>
                            <PartnerLogo item={item} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </>
              )}

              {collabs.length > 0 && (
                <div className="hm-collabs-wrap">
                  <h3 className="hm-label">{ecosystem.title}</h3>
                  <ul className="hm-collabs">
                    {collabs.map((c) => (
                      <li key={c.name}>
                        <strong>{c.name}</strong>
                        {(isSet(c.note) || SHOW_PLACEHOLDERS) && c.note && <span>{c.note}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className={`hm-invite${visibleTiers.length === 0 && collabs.length === 0 ? " hm-invite--solo" : ""}`}>
                <div>
                  <h3 className="pg-heading">{sponsors.invite.title}</h3>
                  <p>{sponsors.invite.text}</p>
                </div>
                <a className="pg-btn pg-btn--light" href={sponsors.invite.href}>
                  {sponsors.invite.label}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </section>

          {/* === SEÇÃO: NEWSLETTER === */}
          {/* Faixa curta: título, uma frase, campo e botão. O aviso de cancelamento só
              aparece quando há envio real configurado. */}
          {newsletterMode !== "off" && (
            <section id="newsletter" className="hm-news scroll-mt-16">
              <div className="pg-container hm-news-grid">
                <div>
                  <h2 className="pg-heading">{newsletter.title}</h2>
                  <p className="hm-news-text">{newsletter.text}</p>
                </div>

                {status === "success" || status === "mailto" ? (
                  <div className="hm-news-ok fgv-fade-in" role="status" aria-live="polite">
                    <span className="hm-news-icon" aria-hidden="true">
                      {status === "mailto" ? <Mail className="h-6 w-6" /> : <CheckCircle2 className="h-6 w-6" />}
                    </span>
                    <div>
                      <p className="hm-news-ok-title">{status === "mailto" ? newsletter.mailtoTitle : newsletter.successTitle}</p>
                      <p>
                        {status === "mailto" ? (
                          newsletter.mailtoText
                        ) : (
                          <>
                            {newsletter.successText} <strong className="break-all">{submittedEmail}</strong>.
                          </>
                        )}
                      </p>
                      <button type="button" onClick={() => setStatus("idle")} className="pg-textlink hm-linkbtn">
                        {newsletter.successReset}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} noValidate>
                    <label htmlFor="newsletter-email" className="sr-only">
                      {newsletter.label}
                    </label>
                    <div className="hm-news-form">
                      <input
                        id="newsletter-email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder={newsletter.placeholder}
                        disabled={status === "loading"}
                        aria-invalid={status === "invalid"}
                        aria-describedby="newsletter-feedback"
                      />
                      <button type="submit" className="pg-btn" disabled={status === "loading"}>
                        {status === "loading" ? (
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        ) : (
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        )}
                        {status === "loading" ? newsletter.loading : newsletter.button}
                      </button>
                    </div>
                    <p id="newsletter-feedback" className="hm-news-note" aria-live="polite">
                      {(status === "invalid" || status === "error") && (status === "invalid" ? newsletter.invalid : newsletter.error)}
                    </p>
                    {newsletterMode === "api" && <p className="hm-news-small">{newsletter.privacy}</p>}
                    {newsletterMode === "demo" && <p className="ct-demo">{newsletter.demoNote}</p>}
                  </form>
                )}
              </div>
            </section>
          )}
        </main>
      )}

      {/* === SEÇÃO: FOOTER === */}
      {/* Todas as abas, contato e apenas canais oficiais ativos. Fundo no tom mais
          escuro do navy, para não se fundir com a faixa de Parceiros. */}
      <footer className="ft" style={{ background: PAGE_COLORS.navyDeep }}>
        <div className={`${CONTAINER} grid gap-12 py-16 md:grid-cols-3`}>
          <div>
            <a href="#inicio" className="inline-flex items-center gap-3 text-white" style={{ color: "#fff" }}>
              <BrandMark className="h-10 w-10 text-white" />
              <span className="leading-tight">
                <span className="pg-heading block text-lg tracking-tight">{brand.name}</span>
                <span className="ft-label mt-1 block">{brand.formerName}</span>
              </span>
            </a>
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed">{footer.description}</p>
            {activeSocials.length > 0 && (
              <ul className="mt-6 flex gap-3">
                {activeSocials.map((s) => (
                  <li key={s.id}>
                    <a
                      href={s.href}
                      aria-label={s.label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ft-social flex h-10 w-10 items-center justify-center rounded-full"
                    >
                      <SocialIcon id={s.id} />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <nav aria-label="Links do rodapé">
            <p className="ft-label">Navegação</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-[15px]">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
              {newsletterCta && (
                <li>
                  <a href={newsletterCta.href}>{newsletterCta.label}</a>
                </li>
              )}
            </ul>
          </nav>

          <div>
            <p className="ft-label">Contato</p>
            <ul className="mt-5 space-y-4 text-[15px]">
              <li className="flex gap-3">
                <MapPin className="ft-icon mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>
                  <span className="ft-strong block font-semibold">{footer.location}</span>
                  <span className="block">{footer.address}</span>
                </span>
              </li>
              {hasEmail && (
                <li className="flex gap-3">
                  <Mail className="ft-icon mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <a href={`mailto:${brand.email}`} className="break-all">
                    {brand.email}
                  </a>
                </li>
              )}
              <li>
                <a href="#/contato" className="ft-strong inline-flex items-center gap-2 font-semibold">
                  Fale conosco
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="ft-divider border-t">
          <div className={`${CONTAINER} flex flex-col gap-3 py-6 text-[13.5px] md:flex-row md:items-center md:justify-between`}>
            <p>
              © {year} {brand.name} ({brand.formerName}). Todos os direitos reservados.
              {isSet(footer.privacy.href) && (
                <>
                  {" · "}
                  <a href={footer.privacy.href} className="underline-offset-4 hover:underline">
                    {footer.privacy.label}
                  </a>
                </>
              )}
            </p>
            <p className="max-w-xl md:text-right">{footer.legal}</p>
          </div>
        </div>
      </footer>

      {/* Botão "voltar ao topo" */}
      <a
        href={route !== "home" ? `#/${route}` : "#inicio"}
        onClick={(e) => {
          if (route !== "home") {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }}
        aria-label="Voltar ao topo"
        className={`fixed bottom-5 right-5 z-40 flex h-11 w-11 transform items-center justify-center fgv-to-top rounded-full text-white shadow-lg transition-all duration-300 ${
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <ArrowUp className="h-5 w-5" />
      </a>
    </div>
  );
}
