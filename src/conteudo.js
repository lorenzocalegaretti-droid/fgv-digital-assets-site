/* ============================================================================
 * CONTEÚDO DO SITE DA FGV DIGITAL ASSETS
 * ----------------------------------------------------------------------------
 * Este é o único arquivo que a equipe precisa editar para trocar textos, fotos,
 * nomes, links e datas. O layout fica em FGVDigitalAssets.jsx.
 *
 *   • showPlaceholders: true mostra os espaços reservados ([colchetes], fotos
 *     vazias) para a equipe ver onde cada conteúdo entra; false = versão pública.
 *   • Um campo conta como "preenchido" quando não está vazio, não é "#",
 *     não começa com "[" e não contém "seudominio".
 *   • Fotos e PDFs: coloque os arquivos em public/ (ex.: public/img/...) e use o
 *     caminho a partir da barra (ex.: "/img/equipe.jpg").
 *   • Depois de editar, confira com "npm run dev" antes de publicar.
 * ========================================================================== */

export const SITE_DATA = {
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
      { label: "Células", href: "#/celulas" },
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
        { label: "Conheça as células", href: "#/celulas" },
        { label: "Conheça os membros", href: "#/membros" },
        { label: "Leia nossos estudos", href: "#/research" },
      ],
    },

    /* --- Células (#/celulas) -------------------------------------------------- */
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
