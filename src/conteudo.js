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
 *
 * Fonte das informações: Instagram @fgvcrypto (posts de out/2022 a nov/2026 e os
 * destaques "Sobre nós", "Eventos" e "Cryptoweek"), LinkedIn, Linktree e a notícia
 * do CriptoFácil sobre o 2º Datathon (dez/2021).
 * ========================================================================== */

export const SITE_DATA = {
  // ⚠️ true durante a edição; false para publicar (oculta tudo que não foi preenchido).
  showPlaceholders: false,

  brand: {
    name: "FGV Digital Assets",
    formerName: "antiga FGV Crypto",
    institution: "FGV",
    // E-mail oficial (Linktree e posts da FGV Crypto). Usado no rodapé e no formulário de Contato.
    email: "fgvcrypto@gmail.com",
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
    // Botão destacado à direita do menu. Só aparece com a newsletter ativa (newsletter.enabled).
    newsletterButton: { label: "Newsletter", href: "#newsletter" },
    selection: {
      open: false, // ⚠️ true durante as inscrições (fevereiro e agosto)
      period: "", // ex.: "até 23 de agosto"
      url: "", // ⚠️ link do formulário de inscrição (botões "Inscreva-se")
    },
    institutionLogo: "", // ⚠️ logo da FGV em branco (~30px de altura); aparece ao lado da marca
    // Só aparecem os canais com endereço preenchido (ids: youtube, linkedin, instagram, x)
    socials: [
      { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/fgvcrypto/" },
      { id: "instagram", label: "Instagram", href: "https://www.instagram.com/fgvcrypto/" },
      { id: "youtube", label: "YouTube", href: "" }, // o canal existe, mas está sem vídeos
      { id: "x", label: "X (Twitter)", href: "" },
    ],
  },

  /* --- Abertura ----------------------------------------------------------- */
  hero: {
    // Foto aérea da Av. 9 de Julho: prédio novo da FGV à esquerda e o MASP ao fundo.
    // Teste: trocar por uma foto mais ampla (drone) quando houver.
    backgroundImage: "/img/hero/fgv-9-de-julho.jpg",
    // Ponto de foco do corte: "center", "30% 50%"…
    backgroundPosition: "center",
    credit: { text: "", href: "" }, // ⚠️ crédito do fotógrafo, se souber a origem
    logo: "", // ⚠️ logo principal em branco (~250px). Vazio = logo SVG padrão.
    // Uma frase curta abaixo do logo. As três frases sobre o Viaduto do Chá estão
    // no início da aba Sobre (pages.about.opening).
    tagline: "A liga de ativos digitais da FGV",
  },

  /* --- Sobre nós (versão curta da página inicial) ------------------------- */
  // O botão "Apresentação institucional (PDF)" usa pages.about.deck e só aparece com o PDF preenchido.
  about: {
    title: "Sobre nós",
    lead: "A liga estudantil de criptoativos e ativos digitais da FGV-SP, desde 2021.",
    paragraphs: [
      "Somos a FGV Digital Assets, antiga FGV Crypto: entidade estudantil fundada em 2021 por alunos da FGV-SP para capacitar e profissionalizar seus membros no universo dos criptoativos e da tecnologia blockchain.",
      "Reunimos graduandos de todos os cursos da FGV-SP em células com projetos práticos, organizamos a Cryptoweek a cada semestre e trabalhamos com parceiros como Bradesco, BTG Pactual, QR Asset Management e Ripple.",
    ],
    // A foto ocupa metade da tela, de ponta a ponta (vertical ou quadrada funciona melhor).
    // Sem foto, aparece uma arte com a rede de nós da marca.
    photo: "/img/eventos/2026-09-itau-pedro-lorenzini.jpg", // grupo no bate-papo do Itaú (set/2026)
    photoCaption: "", // legenda opcional sobre a foto (ex.: "Gestão 2026.1")
    link: { label: "Conheça a nossa história", href: "#/sobre" },
  },

  /* --- Números ---------------------------------------------------------------
   * `value` preenchido tem prioridade. Sem `value`, os itens com `auto` contam o que
   * já está cadastrado nas abas (membros, nucleos, estudos, eventos, alumni).
   * Itens sem valor e sem contagem ficam ocultos.
   * ----------------------------------------------------------------------- */
  stats: {
    title: "A entidade em números",
    items: [
      { label: "anos de história", value: "5" }, // fundada em 2021
      { label: "células", auto: "nucleos", value: "" },
      { label: "edições da Cryptoweek", value: "8" }, // 2023.1 a 2026.2
      { label: "títulos no Datathon de Moedas Digitais da FGV", value: "2" }, // 2021 e 2024
      { label: "inscritos no último processo seletivo", value: "" }, // ⚠️ preencha se tiverem o número
    ],
  },

  /* --- Destaques da página inicial (o conteúdo vem das abas) ----------------
   * Células: pages.nucleos.technical · Research: os primeiros trabalhos de
   * pages.research (o semestre mais recente fica no topo) · Eventos: os mais recentes.
   * ----------------------------------------------------------------------- */
  highlights: {
    // Blocos de ponta a ponta (foto de um lado, texto do outro). Sem foto, aparece a arte da marca.
    nucleos: {
      title: "Células",
      paragraphs: [
        "Os membros são organizados em células, cada uma responsável por um projeto prático no mercado de ativos digitais.",
        "Os projetos têm reuniões semanais e contato direto com o mercado, com parceiros como Bradesco, QR Asset Management e BTG Pactual.",
      ],
      artLabel: "células", // legenda do número na arte (quando não há foto)
      photo: "", // ⚠️ foto de uma célula trabalhando ou apresentando
      photoCaption: "", // ex.: "Apresentação final da célula de Consultoria no Bradesco"
      button: "Conheça as células",
    },
    competitions: {
      title: "Competições",
      photo: "/img/competicoes/2024-datathon-campeoes.jpg", // equipe Crypto X Quant (post de 05/12/2024)
      photoCaption: "Campeões do Datathon 2024: equipe Crypto X Quant",
      button: "Conheça as competições",
    },
    // Seção única "Competições e eventos" (como "CJE na mídia & eventos"): foto de fundo
    // escurecida e um carrossel com a foto da competição e as fotos dos últimos eventos.
    // A foto do Sobre nós não se repete aqui.
    showcase: {
      title: "Competições e eventos",
      subtitle: "Bicampeões do Datathon de Moedas Digitais da FGV EESP",
      backgroundImage: "/img/fundo/fgv-9-de-julho-aerea.jpg",
      competitionKicker: "Competição",
    },
    events: { count: 4, button: "Ver todos os eventos" },
  },

  /* --- Depoimentos -----------------------------------------------------------
   * Só aparecem os depoimentos com nome e texto preenchidos (sem [colchetes]).
   * photo: foto quadrada do rosto; vazia = iniciais. role/company: cargo e empresa atuais.
   * ⚠️ Ainda não há depoimentos reais: peçam a um ex-membro, a um parceiro e a um professor.
   * ----------------------------------------------------------------------- */
  testimonials: {
    title: "Depoimentos",
    items: [
      { quote: "[Depoimento de um professor da FGV sobre o trabalho da entidade.]", name: "[Nome do Professor]", role: "Professor", company: "FGV", photo: "" },
      { quote: "[Depoimento de um parceiro sobre um projeto ou evento feito com a entidade.]", name: "[Nome do Parceiro]", role: "[Cargo]", company: "[Empresa]", photo: "" },
      { quote: "[Depoimento de um ex-membro sobre o que aprendeu na entidade.]", name: "[Nome do Alumni]", role: "[Cargo atual]", company: "[Empresa atual]", photo: "" },
    ],
  },

  /* --- Faixa do Processo Seletivo (status vem de nav.selection) -------------- */
  selectionBand: {
    title: "Processo Seletivo",
    openLabel: "Inscrições abertas",
    closedLabel: "Inscrições encerradas",
    openText: "Buscamos graduandos de todos os cursos da FGV-SP interessados em blockchain, criptoativos e mercado financeiro. Não é preciso conhecimento prévio.",
    closedText: "A seleção abre duas vezes por ano, em fevereiro e em agosto. Veja as fases e as perguntas frequentes.",
    applyLabel: "Inscreva-se",
    moreLabel: "Como funciona",
    notifyLabel: "Receber o aviso",
    artLabel: "etapas até a efetivação", // legenda do número na arte (quando não há foto)
    photo: "", // ⚠️ foto de uma dinâmica ou da turma de trainees
    photoCaption: "",
  },

  /* --- Parceiros (só aparecem logos com nome ou imagem preenchidos) ----------
   * Item: { name: "Nome", logo: "/img/parceiros/nome.svg", url: "https://..." }
   * Sem logo, aparece o nome dentro da caixa branca.
   * ⚠️ Lista montada a partir das artes e posts da FGV Crypto (2025–2026). Confirmem com a
   *    diretoria quais parcerias estão ativas e se podem usar os logos.
   * ----------------------------------------------------------------------- */
  sponsors: {
    title: "Parceiros",
    subtitle: "Instituições que acompanham nossas células, nossos eventos e a formação dos membros.",
    // Logos sem caixa, em fileiras centralizadas (como na página de parceiros da referência).
    // `h` ajusta a altura de cada logo para todas parecerem do mesmo tamanho (1 = padrão).
    tiers: [
      {
        id: "parceiros",
        label: "Parceiros",
        items: [
          { name: "Ripple", logo: "/img/parceiros/ripple.svg", url: "" },
          { name: "Bradesco", logo: "/img/parceiros/bradesco.svg", url: "", h: 0.8 },
          { name: "Brasil Bitcoin", logo: "/img/parceiros/brasil-bitcoin.svg", url: "" },
          { name: "WeSearch", logo: "/img/parceiros/wesearch.png", url: "", h: 0.8 },
          { name: "B3", logo: "/img/parceiros/b3.svg", url: "", h: 1.35 },
          { name: "Hashdex", logo: "/img/parceiros/hashdex.svg", url: "" },
          { name: "Vault Capital", logo: "/img/parceiros/vault-capital.png", url: "" },
          { name: "Z-Invest", logo: "/img/parceiros/z-invest.png", url: "", h: 1.3 },
          { name: "Binance", logo: "/img/parceiros/binance.svg", url: "", h: 0.85 },
          { name: "BTG Pactual", logo: "/img/parceiros/btg-pactual.svg", url: "", h: 1.2 },
          { name: "Itaú BBA", logo: "/img/parceiros/itau-bba.svg", url: "", h: 1.4 },
          { name: "Blockchain.Rio", logo: "/img/parceiros/blockchain-rio.png", url: "", h: 0.8 },
          { name: "QR Asset Management", logo: "/img/parceiros/qr-asset.svg", url: "", h: 1.05 },
        ],
      },
    ],
    invite: {
      title: "Proponha um projeto à entidade",
      text: "Projetos de consultoria, painéis, workshops e eventos da Cryptoweek com estudantes da FGV-SP. Conte o tema e entramos em contato.",
      label: "Fale conosco",
      href: "#/contato",
    },
  },

  /* --- Colaborações anteriores (lista na faixa de Parceiros) -----------------
   * `note` descreve a colaboração.
   * ----------------------------------------------------------------------- */
  ecosystem: {
    title: "Também já trabalhamos com",
    items: [
      { name: "Hashdex", note: "2º Datathon (2021) e palestras" },
      { name: "B3", note: "Workshop de tokenização e Cryptoweek" },
      { name: "Banco BV", note: "Artigo acadêmico e Cryptoweek" },
      { name: "Itaú Unibanco", note: "Pesquisa (2023) e bate-papos" },
      { name: "Inter", note: "Cryptoweeks 2025.2 e 2026.2" },
      { name: "Liqi", note: "Cryptoweeks 2025.1 e 2026.1" },
      { name: "Z-Invest", note: "Workshop com a B3 e evento no Itaú" },
      { name: "Vault Capital", note: "Cryptoweeks 2026.1 e 2026.2" },
      { name: "Agrotoken", note: "Tokenização no agronegócio" },
      { name: "BlockBR", note: "Cryptoweeks 2023.1 e 2025.1" },
      { name: "WeSearch", note: "Painéis sobre Bitcoin e ETFs" },
      { name: "DHL", note: "Blockchain na logística" },
    ],
  },

  /* --- Newsletter -----------------------------------------------------------
   * enabled: false esconde a seção, o botão "Newsletter" do menu e os avisos por e-mail.
   * Ligada: com `endpoint`, faz POST JSON { email }; sem endpoint, usa brand.email (mailto).
   * ⚠️ Desligada porque a entidade ainda não tem newsletter. Liguem quando houver uma lista.
   * ----------------------------------------------------------------------- */
  newsletter: {
    enabled: false,
    title: "Receba nossas publicações",
    text: "Eventos, a Cryptoweek e o aviso de abertura do Processo Seletivo.",
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
    endpoint: "", // ex.: "https://seu-provedor.com/api/subscribe"
  },

  /* --- Rodapé -------------------------------------------------------------- */
  footer: {
    description:
      "Liga estudantil da FGV-SP voltada para digital finance e criptoativos, fundada em 2021 como FGV Crypto.",
    location: "São Paulo • FGV-SP",
    address: "Rua Dr. Plínio Barreto, 365 — Bela Vista", // endereço do perfil do Instagram (FGV EESP)
    legal:
      "Entidade estudantil da FGV-SP. Conteúdo de caráter educacional e acadêmico; não constitui recomendação de investimento.",
    privacy: { label: "Política de privacidade", href: "" }, // ⚠️ link da política; aparece quando preenchido
  },

  /* ==========================================================================
   * PÁGINAS INTERNAS
   * Fotos: coloque os arquivos em public/img/... e informe o caminho em `photo`.
   * Links (linkedin, email) vazios deixam o ícone visível, mas sem clique.
   * ⚠️ Em Membros, `email` deve ser sempre o institucional (da FGV ou da entidade),
   *    nunca o e-mail pessoal do aluno. Na dúvida, deixe só o LinkedIn.
   * ======================================================================== */
  pages: {
    /* --- Sobre (#/sobre) ------------------------------------------------------
     * Missão, visão e valores (pillars) aparecem aqui e na página inicial, logo
     * abaixo de "Sobre nós". Texto do destaque "Sobre nós" do Instagram.
     * ----------------------------------------------------------------------- */
    about: {
      title: "Sobre",
      text: "Liga estudantil da FGV-SP voltada para digital finance, criptoativos e a nova infraestrutura financeira.",
      // Abertura do texto (antes ficava na tela inicial, sobre a foto do Viaduto do Chá)
      opening: [
        "O Viaduto do Chá aproximou dois lados de São Paulo.",
        "Hoje, o que muda quando um pagamento atravessa fronteiras ou um título passa a ser negociado em blockchain?",
        "Na FGV, estudamos essas mudanças com dados, projetos e pesquisa aplicada.",
      ],
      sectionTitle: "Quem somos",
      photo: "", // ⚠️ foto do grupo (proporção 3:2)
      paragraphs: [
        "A FGV Digital Assets, antiga FGV Crypto, é uma entidade estudantil fundada em 2021 por alunos da FGV-SP. Nosso objetivo é capacitar e profissionalizar os membros no universo dos criptoativos e da tecnologia blockchain.",
        "Nos apresentamos como a primeira entidade cripto da América Latina. Reunimos graduandos de todos os cursos da FGV-SP e unimos teoria e prática por meio de pesquisas, projetos e contato direto com grandes players do mercado.",
        "Desde 2023 organizamos a Cryptoweek, semana de palestras e painéis realizada todo semestre na FGV EESP. E, além de cripto, temos um sentimento de família muito presente.",
      ],
      deck: { label: "Apresentação institucional (PDF)", href: "" }, // ⚠️ caminho do PDF, ex.: "/docs/apresentacao.pdf"
      pillars: [
        { title: "Missão", text: "Desenvolver os membros no universo de criptoativos." },
        { title: "Visão", text: "Ser referência no universo de criptoativos no Brasil." },
        { title: "Valores", list: ["Excelência", "Integridade", "Honestidade", "Sentimento de família"] },
      ],
      timelineTitle: "Trajetória",
      // Marcos do post "Destaques na nossa história" (ago/2024) e dos posts da FGV Crypto.
      timeline: [
        { date: "2021", title: "Fundação", text: "Alunos da FGV-SP criam a FGV Crypto, grupo de estudos voltado para cripto. Em dezembro, a entidade vence o 2º Datathon de Moedas Digitais da FGV EESP, com a Hashdex." },
        { date: "2022", title: "Primeiros eventos", text: "Evento com Alexandre Van de Sande, diretor da Ethereum Name Service Foundation, aulas de cripto no CEAP Pedreira e o evento sobre NFTs na moda." },
        { date: "2023", title: "Cryptoweek e Itaú", text: "Projeto de pesquisa sobre criptoativos com o Itaú, primeira Cryptoweek e eventos com a Binance Academy e o BTG Pactual." },
        { date: "2024", title: "BV, QR Capital e Datathon", text: "Artigo acadêmico com o Banco BV, Summer Intern com a QR Capital e o título do 5º Datathon com a equipe Crypto X Quant." },
        { date: "2025", title: "Fundo e Consultoria", text: "A QR Capital passa a acompanhar o fundo da entidade e a célula de Consultoria começa a parceria com o Bradesco." },
        { date: "2026", title: "FGV Digital Assets", text: "Novas células (Consultoria, Asset, Challenges e Innovation Lab) e agenda ampliada para tokenização, stablecoins, pagamentos e regulação." },
      ],
      next: [
        { label: "Conheça as células", href: "#/celulas" },
        { label: "Conheça os membros", href: "#/membros" },
        { label: "Veja os eventos", href: "#/eventos" },
      ],
    },

    /* --- Células (#/celulas) --------------------------------------------------
     * Células de 2026.2 (post de 17/08/2026). `partner` aparece acima do nome.
     * ----------------------------------------------------------------------- */
    nucleos: {
      title: "Células",
      text: "Os membros se organizam em células, cada uma com um projeto prático e contato direto com o mercado.",
      intro:
        "As células transformam conhecimento em prática no mercado de ativos digitais. Cada uma tem foco técnico, projetos aplicados e contato direto com instituições do mercado financeiro e cripto, com reuniões semanais ao longo do semestre.",
      cycleTitle: "Como funciona o semestre",
      cycle: [
        { title: "Trainee", text: "Os aprovados no processo seletivo passam por um ciclo de formação, que termina com uma apresentação final." },
        { title: "Célula", text: "Cada membro entra em uma célula: Consultoria, Asset, Challenges ou Innovation Lab." },
        { title: "Projeto", text: "O semestre tem reuniões semanais, internas e com os parceiros de cada célula." },
        { title: "Apresentação", text: "O trabalho final é apresentado aos parceiros, como os gestores do Bradesco na célula de Consultoria." },
      ],
      technicalTitle: "Nossas células",
      partnerLabel: "Parceria:",
      technical: [
        {
          name: "Consultoria",
          short: "Projetos estratégicos para parceiros", // descrição curta usada na página inicial
          partner: "Bradesco",
          photo: "",
          description:
            "Formação prática em gestão e execução de projetos: os membros desenvolvem soluções estratégicas para as demandas dos parceiros. Em 2026.1, o projeto analisou o mercado de ativos digitais sob a ótica de uma grande instituição financeira, com acompanhamento do Head de Ativos Digitais do Bradesco.",
          deliverables: ["Análise de cenário e de oportunidades", "Caminhos estratégicos para o parceiro", "Apresentação final aos gestores"],
        },
        {
          name: "Asset",
          short: "Research e gestão do fundo da entidade",
          partner: "QR Asset Management",
          photo: "",
          description:
            "Integra research e gestão de fundo: análise de ativos, teses de investimento (Buy, Hold e Sell) e gestão de uma carteira real, com decisões baseadas em dados e modelagem financeira. Em 2026.1, a pesquisa teve parceria com o BTG Pactual e mentorias do Mercado Bitcoin.",
          deliverables: ["Teses de investimento", "Análises técnicas e fundamentalistas", "Acompanhamento da carteira do fundo"],
        },
        {
          name: "Challenges",
          short: "Hackathons, cases e competições",
          partner: "",
          photo: "",
          description:
            "Foco em alta performance em competições: os membros se preparam para hackathons, cases e desafios institucionais, desenvolvendo soluções sob pressão. A entidade é bicampeã do Datathon de Moedas Digitais da FGV EESP (2021 e 2024).",
          deliverables: ["Preparação para hackathons e cases", "Participação em competições", "Soluções desenvolvidas sob prazo"],
        },
        {
          name: "Innovation Lab",
          short: "Produtos e protótipos para ativos digitais",
          partner: "",
          photo: "",
          description:
            "Ambiente para criar e validar projetos de inovação: produtos e soluções para o mercado de ativos digitais, do teste de hipóteses ao protótipo.",
          deliverables: ["Teste de hipóteses", "Projetos estruturados do zero", "Protótipos viáveis"],
        },
      ],
      deliverablesLabel: "O que a célula produz",
      researchLink: "Ver trabalhos da célula",
      areasTitle: "Áreas de gestão",
      areas: [
        { name: "Comercial e Comunicações", description: "Cuida das parcerias, da comunicação e das redes sociais da entidade." },
        { name: "Processo Seletivo", description: "Organiza as duas seleções do ano: prova, dinâmica em grupo e entrevistas." },
        { name: "Processo Trainee", description: "Acompanha a formação dos aprovados até a efetivação como membros." },
      ],
    },

    /* --- Research (#/research) -------------------------------------------------
     * Trabalhos desenvolvidos pela entidade. `nucleo` vira o filtro da página.
     * `href`: link do PDF ou da página do trabalho. `cover`: imagem da capa (4:3).
     * ⚠️ Faltam autores, títulos exatos e PDFs de alguns trabalhos: completem com a diretoria.
     * ----------------------------------------------------------------------- */
    research: {
      title: "Research",
      text: "Trabalhos desenvolvidos pelos membros em projetos com parceiros, competições e no programa trainee.",
      questionLabel: "Sobre",
      linkLabel: "Ler o trabalho",
      allLabel: "Todos",
      disclaimer: "Conteúdo de caráter educacional e acadêmico. Não constitui recomendação de investimento.",
      groups: [
        {
          semester: "2026.1",
          items: [
            {
              title: "Ativos digitais em uma grande instituição financeira",
              nucleo: "Consultoria",
              question: "Projeto aplicado com o Bradesco: análise do mercado de ativos digitais, das oportunidades e dos caminhos possíveis para o banco, apresentado aos gestores no fim do semestre.",
              authors: [],
              cover: "",
              href: "",
            },
          ],
        },
        {
          semester: "2025.1",
          items: [
            {
              title: "Análise de um token: governança, tokenomics e zonas de compra e venda",
              nucleo: "Programa Trainee",
              question: "Trabalho final dos trainees, com análises fundamentalista e técnica, apresentado no escritório da Ripple, na Faria Lima.",
              authors: [],
              cover: "",
              href: "",
            },
          ],
        },
        {
          semester: "2024.2",
          items: [
            {
              title: "Trabalho campeão do 5º Datathon de Moedas Digitais da FGV EESP",
              nucleo: "Challenges",
              question: "Equipe Crypto X Quant, formada por membros da FGV Crypto e da FGV Quant: primeiro lugar entre 20 equipes.",
              authors: ["André Togni", "Bernardo Rubin", "Francisco Zipman", "Leonardo Ono"],
              cover: "",
              href: "",
            },
          ],
        },
        {
          semester: "2024.1",
          items: [
            {
              title: "Artigo acadêmico com o Banco BV",
              nucleo: "Pesquisa",
              question: "Artigo desenvolvido em parceria com o Banco BV, parceiro oficial da entidade a partir de 2024.1.",
              authors: [],
              cover: "",
              href: "",
            },
          ],
        },
        {
          semester: "2021.2",
          items: [
            {
              title: "Estratégia de investimento não-direcional utilizando opções de criptoativos",
              nucleo: "Challenges",
              question: "Estratégia com opções (straddle) que ganha com a volatilidade das criptomoedas sem apostar na direção do preço. Campeã do 2º Datathon da FGV EESP com a Hashdex.",
              authors: [],
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
      text: "Desafios universitários em que nossos membros colocam em prática o que estudam sobre blockchain e criptoativos.",
      intro:
        "A célula de Challenges prepara os membros para hackathons, cases e desafios institucionais. Nossa principal competição é o Datathon de Moedas Digitais da FGV EESP, do qual somos bicampeões.",
      items: [
        {
          name: "Desafio de Dados (Datathon) de Moedas Digitais",
          organizer: "FGV EESP",
          photo: "",
          description:
            "Competição da FGV EESP sobre blockchain, criptoativos e inovações financeiras, aberta a universitários de todo o Brasil e, desde a 6ª edição, também de Portugal, com a Nova SBE. As equipes têm poucos dias para resolver um problema real proposto pela organização.",
          results: [
            { year: "2025", result: "Apoiadora da 6ª edição, ao lado de Ripple (UBRI), GV Code e USP-UBRI", team: "" },
            { year: "2024", result: "Campeã da 5ª edição, entre 20 equipes (Crypto X Quant, com a FGV Quant)", team: "André Togni, Bernardo Rubin, Francisco Zipman e Leonardo Ono" },
            { year: "2021", result: "Campeã da 2ª edição, organizada com a Hashdex (prêmio de R$ 8 mil)", team: "Trabalho: Estratégia de investimento não-direcional utilizando opções de criptoativos" },
          ],
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
      subjects: ["Parcerias e projetos", "Eventos e Cryptoweek", "Processo seletivo", "Imprensa", "Outros"],
      partnersTitle: "Para empresas",
      partnersText: "Quer propor um projeto de consultoria, um painel ou um evento na Cryptoweek com estudantes da FGV-SP? Entre em contato e conte o tema.",
      sent: "Mensagem enviada. Responderemos pelo e-mail informado.",
      mailtoSent: "Abrimos seu aplicativo de e-mail com a mensagem pronta. É só enviar.",
      error: "Não foi possível enviar agora. Tente novamente em instantes.",
      demoNote: "Modo de demonstração: nenhuma mensagem é enviada. Preencha brand.email ou contact.endpoint antes de publicar.",
    },

    /* --- Membros ------------------------------------------------------------
     * Fotos do ensaio da entidade (public/img/membros, 640×800). ⚠️ Faltam cursos,
     * LinkedIns e os demais membros; Thales Haddad ainda está sem foto.
     * ----------------------------------------------------------------------- */
    members: {
      title: "Membros",
      text: "Conheça a diretoria, a coordenação das células e os membros da FGV Digital Assets.",
      // size: "lg" (até 4 por linha, cards maiores) | "md" (5 por linha) | "sm" (6 por linha)
      groups: [
        {
          title: "Diretoria",
          size: "lg",
          // "triangulo": a primeira pessoa fica sozinha no topo e as outras duas lado a lado abaixo.
          layout: "triangulo",
          people: [
            { name: "Pedro Giampietro", role: "Presidente", course: "", photo: "/img/membros/pedro-giampietro.jpg", linkedin: "", email: "" },
            { name: "Felipe Souza", role: "Diretor Institucional", course: "", photo: "/img/membros/felipe-souza.jpg", linkedin: "", email: "" },
            { name: "Thales Haddad", role: "Diretor Acadêmico", course: "", photo: "", linkedin: "", email: "" },
          ],
        },
        {
          title: "Coordenação",
          size: "md",
          people: [
            { name: "Eduardo Holanda", role: "Coordenador da Célula de Consultoria", course: "", photo: "/img/membros/eduardo-holanda.jpg", linkedin: "", email: "" },
            { name: "Lorenzo Calegaretti", role: "Coordenador da Célula de Asset", course: "", photo: "/img/membros/lorenzo-calegaretti.jpg", linkedin: "", email: "" },
            { name: "Giovanni Fava", role: "Coordenador da Célula de Challenges", course: "", photo: "/img/membros/giovanni-fava.jpg", linkedin: "", email: "" },
            { name: "Gabriel Cavasin", role: "Coordenador do Innovation Lab", course: "", photo: "/img/membros/gabriel-cavasin.jpg", linkedin: "", email: "" },
            { name: "Natanael Spilla", role: "Coordenador do Processo Trainee", course: "", photo: "/img/membros/natanael-spilla.jpg", linkedin: "", email: "" },
          ],
        },
        {
          title: "Membros",
          size: "md",
          people: [
            { name: "André Brózios", role: "Membro", course: "", photo: "/img/membros/andre-brozios.jpg", linkedin: "", email: "" },
            { name: "Bárbara Amorim", role: "Membro", course: "", photo: "/img/membros/barbara-amorim.jpg", linkedin: "", email: "" },
            { name: "Guilherme Giuntini", role: "Membro da Célula de Asset", course: "", photo: "/img/membros/guilherme-giuntini.jpg", linkedin: "", email: "" },
            { name: "João Ramos", role: "Membro", course: "", photo: "", linkedin: "", email: "" },
            { name: "Maitê Botelho", role: "Membro", course: "", photo: "/img/membros/maite-botelho.jpg", linkedin: "", email: "" },
            { name: "Matheus Deconto", role: "Membro", course: "", photo: "/img/membros/matheus-deconto.jpg", linkedin: "", email: "" },
            { name: "Matheus Viana", role: "Membro", course: "", photo: "", linkedin: "", email: "" },
            { name: "Mirela Mota", role: "Membro", course: "", photo: "/img/membros/mirela-mota.jpg", linkedin: "", email: "" },
            { name: "Rafael Sinieghi", role: "Membro", course: "", photo: "/img/membros/rafael-sinieghi.jpg", linkedin: "", email: "" },
          ],
        },
      ],
    },

    /* --- Alumni -------------------------------------------------------------
     * Ex-membros do post de 07/09/2026. role: cargo que tiveram na entidade (opcional);
     * position e company: cargo e empresa atuais. A lista de empresas e o resumo
     * "X alumni em Y empresas" são calculados automaticamente.
     * ----------------------------------------------------------------------- */
    alumni: {
      title: "Alumni",
      text: "Nossos ex-membros estão em gestoras, bancos e empresas do mercado financeiro e de ativos digitais.",
      sectionTitle: "Onde nossos alumni estão",
      people: [
        { name: "Vinícius Ebel", role: "Ex-presidente", position: "Portfolio Manager", company: "Bloxs", linkedin: "" },
        { name: "Lucas Afonso", role: "Ex-vice-presidente", position: "Investment Analyst", company: "Nexa Finance", linkedin: "" },
        { name: "Daniel Neves", role: "Ex-diretor institucional", position: "Portfolio Management Analyst", company: "Blackhill Investments", linkedin: "" },
        { name: "Raquel Sanches", role: "Ex-diretora institucional", position: "Analista de M&A", company: "Ártica", linkedin: "" },
        { name: "Luiza Porto", role: "", position: "Wealth Management Analyst", company: "Galapagos Capital", linkedin: "" },
        { name: "Bruno Catelli", role: "", position: "Infrastructure Private Equity Analyst", company: "Kinea Investimentos", linkedin: "" },
        { name: "Pedro Alves", role: "", position: "Wealth Management Operations Analyst", company: "BTG Pactual", linkedin: "" },
        { name: "Alexandre Saraiva", role: "", position: "Consultor Pleno", company: "Volix", linkedin: "" },
      ],
    },

    /* --- Processo Seletivo ---------------------------------------------------- */
    selection: {
      title: "Processo Seletivo",
      text: "O processo seletivo acontece duas vezes por ano e tem 3 fases, seguidas do programa trainee. Buscamos graduandos de todos os cursos da FGV-SP interessados em blockchain, criptoativos e mercado financeiro.",
      // Faixa de status logo abaixo da abertura. Aberto/encerrado vem de nav.selection
      // (open, period, url); os rótulos vêm de selectionBand.
      closedNote: "A próxima seleção abre no início do semestre, em fevereiro ou em agosto.",
      notifyLabel: "Receber o aviso por e-mail", // aparece quando a newsletter está ativa
      steps: [
        {
          label: "Prova estilo GMAT",
          text: "Prova de múltipla escolha no padrão GMAT, com questões de raciocínio lógico, tomada de decisão e atualidades.",
        },
        {
          label: "Dinâmica em grupo",
          text: "Em equipe, os candidatos resolvem um case de digital finance e propõem soluções para desafios reais do mercado financeiro.",
        },
        {
          label: "Entrevistas técnica e de perfil",
          text: "Conversa para conhecer as habilidades do candidato e o alinhamento com a cultura da entidade. Antes, enviamos um material de apoio completo para a preparação.",
        },
        {
          label: "Programa Trainee",
          text: "Os aprovados passam por um ciclo de formação que termina com uma apresentação final. Em 2025.1, os trainees analisaram um token e apresentaram o trabalho no escritório da Ripple.",
        },
      ],
      cta: "Clique aqui para se inscrever!", // aparece no meio e no fim da página quando nav.selection.open = true e há url
      faqTitle: "Perguntas frequentes:",
      faq: [
        {
          q: "Preciso de conhecimentos prévios para prestar o PS?",
          a: "Não. Você pode começar do zero: o programa trainee existe justamente para formar os novos membros.",
        },
        {
          q: "Quem pode participar?",
          a: "Graduandos de todos os cursos da FGV-SP.",
        },
        {
          q: "Quando abrem as inscrições?",
          a: "Duas vezes por ano, no início de cada semestre. Em 2026.1 as inscrições foram até 1º de março; em 2026.2, de 28 de julho a 23 de agosto.",
        },
        {
          q: "Como me preparo para as entrevistas?",
          a: "Os candidatos que chegam à 3ª fase recebem com antecedência um material de apoio completo para a preparação.",
        },
      ],
    },

    /* --- Eventos -------------------------------------------------------------- */
    // date no formato AAAA-MM-DD (para semanas de evento, o primeiro dia); text é uma lista de parágrafos.
    // ⚠️ Acrescentem fotos (photo) dos eventos.
    events: {
      title: "Eventos",
      text: "Palestras, painéis, workshops e a Cryptoweek, semana de eventos que acontece todo semestre na FGV EESP.",
      groups: [
        {
          semester: "2026.2",
          items: [
            {
              date: "2026-11-18",
              title: "Bate-papo com a Brasil Bitcoin",
              photo: "/img/eventos/2026-11-brasil-bitcoin.webp",
              text: [
                "Jorge de Almeida, CEO, e Hugo Benício, Head of Operations and Sales da Brasil Bitcoin, conversaram com os membros sobre a operação de uma exchange brasileira de criptoativos.",
              ],
            },
            {
              date: "2026-11-11",
              title: "Bate-papo com Henry Oyama (Hashdex)",
              photo: "",
              text: [
                "Henry Oyama, Director of Investment Strategies Brazil na Hashdex, conversou com os membros sobre blockchain, criptoativos e estratégias de investimento no cenário atual.",
              ],
            },
            {
              date: "2026-10-19",
              title: "Cryptoweek 2026.2",
              photo: "/img/eventos/2026-10-cryptoweek-pagos-vault.jpg",
              morePhotos: ["/img/eventos/2026-10-cryptoweek-wesearch.jpg"], // fotos extras viram miniaturas
              text: [
                "De 19 a 22 de outubro, na FGV EESP. A abertura reuniu Carlos Akira Sato (PAGOS) e Gabriel Della Torre (Vault Capital) para falar do impacto da blockchain e dos ativos digitais.",
                "No segundo dia, um painel com André Haro, Lucas Oliveira, Bruno Liman e Rafael Puerari, em parceria com a WeSearch, discutiu o que os ETFs mudaram no mercado cripto. O encerramento foi com Murillo Bargas, Head of Crypto do Inter.",
              ],
            },
            {
              date: "2026-10-06",
              title: "Workshop: uso de tokenização no mercado financeiro",
              photo: "/img/eventos/2026-10-workshop-b3.jpg",
              text: [
                "Em parceria com a B3 e a Z-Invest, como parte da World Investor Week. Eduardo Alexandre Marques Silva, head de digital assets da B3, explicou como a tokenização muda a emissão, a negociação e a liquidação de investimentos.",
              ],
            },
            {
              date: "2026-09-16",
              title: "Bate-papo com Pedro Lorenzini (Itaú Unibanco)",
              photo: "/img/eventos/2026-09-itau-pedro-lorenzini.jpg",
              text: [
                "Pedro Lorenzini, Global Markets Treasury & Latam Head do Itaú Unibanco, falou sobre tesouraria, estratégia de produtos e operações na América Latina. Agradecemos ao Itaú Unibanco e à Z-Invest pela recepção.",
              ],
            },
          ],
        },
        {
          semester: "2026.1",
          items: [
            {
              date: "2026-05-19",
              title: "Blockchain on the Road",
              photo: "",
              text: [
                "Noite na FGV EESP com lideranças de Bradesco, Ripple e Blockchain Rio sobre o estado do mercado de ativos digitais, stablecoins, AMMs e tokenomics, novos modelos de negócio e carreiras em Web3.",
              ],
            },
            {
              date: "2026-05-11",
              title: "Cryptoweek 2026.1",
              photo: "",
              text: [
                "De 11 a 15 de maio, no Auditório da FGV EESP: Igor Carneiro (Vault Capital), Thiago Mello (Head of Crypto do Itaú), Lucas Rocha e Mathias Dal Ri (Nexa Finance), Pedro Lapenta (Director of Yield Strategies da Hashdex) e Rita Casolato (Compliance e Risco da Liqi Digital Assets).",
                "Os temas foram da construção de uma gestora cripto à estratégia de ativos digitais do maior banco do país, yield em cripto e as novas regras do Banco Central e da CVM.",
              ],
            },
            {
              date: "2026-04-08",
              title: "Session de análise on-chain com Bruno Liman",
              photo: "",
              text: [
                "Sessão aberta a todos sobre como ler os dados da blockchain para entender o fluxo real de capital e antecipar tendências do mercado cripto.",
              ],
            },
          ],
        },
        {
          semester: "2025.2",
          items: [
            {
              date: "2025-10-27",
              title: "Cryptoweek 2025.2",
              photo: "",
              text: [
                "Abertura com a B3 sobre a convergência entre o mercado tradicional e o ecossistema cripto, seguida de um painel sobre ativos digitais em bancos com João Aragão e Courtnay Guimarães.",
                "A semana teve ainda uma palestra sobre a filosofia da blockchain e da criptoeconomia, a WeSearch sobre o papel do Bitcoin no mundo fiduciário e Ney Miyamoto (B2V) sobre o rumo das gestoras com os ativos digitais.",
              ],
            },
          ],
        },
        {
          semester: "2025.1",
          items: [
            {
              date: "2025-06-20",
              title: "Apresentação final dos trainees na Ripple",
              photo: "",
              text: [
                "No escritório da Ripple, na Faria Lima, os trainees apresentaram a análise de um token: governança, tokenomics, análises fundamentalista e técnica e zonas estratégicas de compra e venda.",
              ],
            },
            {
              date: "2025-05-12",
              title: "Cryptoweek 2025.1",
              photo: "",
              text: [
                "Painéis com a Blockchain Rio e a FGV EESP, um evento com a área de Digital Assets do BTG Pactual, a tokenizadora Liqi sobre o mercado de tokenização e a BlockBR.",
              ],
            },
          ],
        },
        {
          semester: "2024.2",
          items: [
            {
              date: "2024-11-06",
              title: "Cryptoweek 2024.2",
              photo: "",
              text: [
                "De 6 a 12 de novembro: a QR Capital sobre o crescimento do mercado cripto, um evento sobre regulação, o Banco BV sobre cripto e Drex e, com a Liga de Logística, a DHL sobre blockchain nas cadeias de distribuição.",
              ],
            },
          ],
        },
        {
          semester: "2024.1",
          items: [
            {
              date: "2024-05-07",
              title: "Cryptoweek 2024.1",
              photo: "",
              text: [
                "\"Drex e o mundo tokenizado\" com Marcel Smetana e, em parceria com a Agroliga FGV, Anderson Nacaxe (Agrotoken) sobre a tokenização no agronegócio.",
              ],
            },
          ],
        },
        {
          semester: "2023.2",
          items: [
            {
              date: "2023-11-08",
              title: "Cryptoweek 2023.2",
              photo: "",
              text: [
                "Tokenização no agronegócio com a Agrotoken e, com a FGV Real Estate, tokenização no mercado imobiliário com Leonardo Paz (CEO da Imovelweb) e Andreas Blazoudakis (CEO da Netspaces).",
              ],
            },
          ],
        },
        {
          semester: "2023.1",
          items: [
            {
              date: "2023-05-23",
              title: "Cryptoweek 2023.1",
              photo: "",
              text: [
                "A primeira Cryptoweek: asset management em cripto, Alexandre Van de Sande e Cássio, CEO da BlockBR, sobre tokenização.",
              ],
            },
            {
              date: "2023-03-27",
              title: "Binance Academy: Tour nas Universidades",
              photo: "",
              text: [
                "Introdução aos fundamentos das criptomoedas com a Binance Academy, em parceria com a FGV Crypto.",
              ],
            },
          ],
        },
        {
          semester: "2022.2",
          items: [
            {
              date: "2022-11-03",
              title: "NFT: hype ou revolução na moda?",
              photo: "",
              text: [
                "Com a Liga de Negócios de Moda da FGV, sobre o que os NFTs podem fazer pela moda. Participaram Caio Barbosa (Lumx Studios), Bianca Torquato e Lorenza Sabatini (Vex Authentics), com a perspectiva jurídica da FCM Law.",
              ],
            },
            {
              date: "2022-10-15",
              title: "Aulas de cripto no CEAP Pedreira",
              photo: "",
              text: [
                "Série de aulas no Centro Educacional Assistencial Profissionalizante (CEAP), em Pedreira, para levar os conceitos de criptomoedas e blockchain a jovens estudantes.",
              ],
            },
          ],
        },
      ],
    },
  },
};
