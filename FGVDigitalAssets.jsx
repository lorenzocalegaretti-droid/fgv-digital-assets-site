/* ============================================================================
 * FGV DIGITAL ASSETS — Site institucional (antiga FGV Crypto)
 * ----------------------------------------------------------------------------
 * Stack: React + Tailwind CSS (apenas classes utilitárias core) + lucide-react
 *
 * Arquitetura de seções (inspirada na Cambridge Blockchain Society):
 *   Navbar → Hero → Quem Somos & Sobre Nós → O Que Fazemos (6 pilares)
 *   → Patrocinadores (tiers) → Ecossistema & Parcerias → Newsletter → Footer
 *
 * COMO EDITAR
 *   • Todo o conteúdo visível está centralizado em SITE_DATA (logo abaixo).
 *   • Logos de patrocinadores: preencha `logo` com a URL do SVG/PNG oficial
 *     (fundo transparente). Enquanto `logo` for null, aparece o placeholder.
 *   • Foto institucional: preencha SITE_DATA.about.image.src.
 *   • Newsletter: preencha SITE_DATA.newsletter.endpoint com o endpoint do seu
 *     provedor (Mailchimp, Beehiiv, Google Apps Script, API própria etc.).
 *     Sem endpoint, o envio é simulado localmente (útil para protótipo).
 *   • Cores da marca: objeto THEME.
 * ========================================================================== */

import React, { useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  ArrowRight,
  ArrowUpRight,
  ArrowUp,
  BookOpen,
  GraduationCap,
  LineChart,
  Mic,
  Landmark,
  Network,
  Users,
  Layers,
  Building2,
  Mail,
  MapPin,
  Check,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from "lucide-react";

/* ============================================================================
 * SITE_DATA — CONTEÚDO CENTRALIZADO (edite aqui)
 * ========================================================================== */
const SITE_DATA = {
  brand: {
    name: "FGV Digital Assets",
    formerName: "antiga FGV Crypto",
    institution: "FGV EAESP",
    // ⚠️ Substitua pelo e-mail institucional oficial.
    email: "contato@seudominio.com.br",
  },

  /* --- Navbar ------------------------------------------------------------ */
  nav: {
    links: [
      { label: "Quem Somos", href: "#quem-somos" },
      { label: "Atuação", href: "#atuacao" },
      { label: "Parceiros", href: "#parceiros" },
      { label: "Newsletter", href: "#newsletter" },
    ],
    // ⚠️ Troque pelo link oficial do formulário do Processo Seletivo.
    cta: { label: "Processo Seletivo", href: "#newsletter" },
    // Emblema institucional exibido à direita da navbar (ex.: brasão/logo da FGV EAESP).
    institutionLogo: null, // ⚠️ URL do PNG/SVG (fundo transparente, ~30px de largura)
    institutionLabel: "EAESP",
    // Ícones sociais da navbar (ids disponíveis: youtube, linkedin, instagram, x, email)
    socials: [
      { id: "youtube", label: "YouTube", href: "#" }, // ⚠️ links oficiais
      { id: "linkedin", label: "LinkedIn", href: "#" },
      { id: "x", label: "X (Twitter)", href: "#" },
      { id: "instagram", label: "Instagram", href: "#" },
    ],
  },

  /* --- Hero (tela inicial — mesma composição da referência) ----------------
   * Cada item de `paragraphs` é um bloco; cada string dentro dele é uma linha
   * (quebra de linha forçada, como no layout original).
   * ----------------------------------------------------------------------- */
  hero: {
    backgroundImage: null, // ⚠️ URL da foto de fundo (ex.: prédio da FGV EAESP / São Paulo). Sem foto, usa um fundo escuro neutro.
    logo: null, // ⚠️ URL do logo principal em versão branca (~250px de largura). Sem logo, usa o logo SVG padrão.
    paragraphs: [
      [
        "Em 1892, o Viaduto do Chá foi erguido sobre o Vale do Anhangabaú",
        "para unir as duas metades de São Paulo.",
      ],
      ["Podemos construir uma infraestrutura confiável que conecte todos sem intermediários?"],
      ["Os ativos digitais são essa ponte?"],
    ],
    buttons: [
      { label: "Conheça a entidade", href: "#quem-somos" },
      { label: "Seja membro", href: "#newsletter" },
    ],
  },

  /* --- Quem Somos & Sobre Nós --------------------------------------------- */
  about: {
    eyebrow: "Quem Somos",
    title: "A entidade estudantil da FGV EAESP dedicada à fronteira dos ativos digitais.",
    lead:
      "Somos a FGV Digital Assets — antiga FGV Crypto —, entidade estudantil e grupo de pesquisa da Escola de Administração de Empresas de São Paulo da Fundação Getulio Vargas. Reunimos alunos para estudar, debater e produzir conhecimento sobre ativos digitais e a nova infraestrutura do sistema financeiro.",
    aboutTitle: "Sobre Nós",
    aboutText:
      "Nascida como FGV Crypto, a entidade ampliou seu escopo para acompanhar a maturidade do setor: nossa agenda vai além das criptomoedas e abrange tokenização de ativos reais, stablecoins, finanças descentralizadas, liquidação cross-border e o arcabouço regulatório que conecta inovação e mercado de capitais. Nossa missão é formar profissionais tecnicamente preparados e servir de ponte entre a academia e os principais players do ecossistema.",
    image: {
      src: null, // ⚠️ Insira aqui a URL da foto institucional (ex.: membros na FGV EAESP).
      alt: "Membros da FGV Digital Assets reunidos na FGV EAESP, em São Paulo",
      badge: "antiga FGV Crypto",
      placeholderLabel: "[Foto institucional — membros na FGV EAESP]",
      caption: "Espaço reservado para foto oficial da equipe · proporção 4:3",
    },
    facts: [
      { label: "Origem", value: "FGV Crypto" },
      { label: "Sede", value: "FGV EAESP · São Paulo" },
      { label: "Formato", value: "Entidade estudantil & grupo de pesquisa" },
      { label: "Foco", value: "Ativos digitais & infraestrutura financeira" },
    ],
    // ⚠️ Ajuste as etapas conforme o histórico oficial da entidade.
    timeline: {
      title: "Trajetória institucional",
      steps: [
        {
          phase: "Origem",
          title: "FGV Crypto",
          text: "Grupo de estudos formado por alunos interessados em blockchain, criptoativos e seus fundamentos econômicos.",
        },
        {
          phase: "Consolidação",
          title: "Pesquisa & Mercado",
          text: "Estruturação de núcleos internos, produção de research e aproximação com gestoras, exchanges e escritórios.",
        },
        {
          phase: "Hoje",
          title: "FGV Digital Assets",
          text: "Escopo ampliado para tokenização, stablecoins, DeFi e regulação, com atuação institucional na FGV EAESP.",
        },
      ],
    },
    structure: {
      title: "Membros, pesquisadores e lideranças",
      text: "Uma estrutura organizada em núcleos, cada um com entregas próprias e lideranças dedicadas.",
      units: [
        { name: "Diretoria Executiva", desc: "Estratégia, governança e representação institucional." },
        { name: "Núcleo de Research", desc: "Publicações, relatórios e teses de mercado." },
        { name: "Núcleo de Educação", desc: "Trilha de trainees, células de estudo e cursos." },
        { name: "Núcleo de Projetos", desc: "Cases, modelagem quantitativa e estudos de protocolos." },
        { name: "Relações Institucionais", desc: "Parcerias, patrocínios e curadoria de eventos." },
        { name: "Alumni & Advisors", desc: "Ex-membros, professores e profissionais que orientam a entidade." },
      ],
    },
  },

  /* --- O Que Fazemos (6 pilares) ------------------------------------------ */
  pillarsSection: {
    eyebrow: "O Que Fazemos",
    title: "Seis pilares de atuação",
    subtitle:
      "Da pesquisa acadêmica à conexão com o mercado: uma agenda completa para formar quem vai construir a próxima infraestrutura financeira.",
    // ⚠️ Troque pelo link da página/repositório de publicações.
    cta: { label: "Ver publicações e projetos", href: "#" },
  },
  pillars: [
    {
      icon: "BookOpen",
      title: "Research Acadêmico & Mercado",
      description:
        "Publicações, estudos aplicados e teses sobre DeFi, tokenização, stablecoins, liquidação cross-border e estrutura de mercado — com metodologia acadêmica e leitura prática do setor.",
      tags: ["DeFi", "Tokenização", "Stablecoins", "Cross-border"],
    },
    {
      icon: "GraduationCap",
      title: "Educação & Formação",
      description:
        "Trilha de trainees e células de estudo, cursos introdutórios e técnicos e workshops abertos que disseminam conhecimento sobre ativos digitais na FGV.",
      tags: ["Trainee", "Células", "Workshops"],
    },
    {
      icon: "LineChart",
      title: "Projetos & Modelagem",
      description:
        "Desenvolvimento de cases, análises quantitativas e financeiras e estudos práticos sobre protocolos, tokenomics e infraestrutura de mercado.",
      tags: ["Valuation", "Quant", "Protocolos"],
    },
    {
      icon: "Mic",
      title: "Eventos & Debates",
      description:
        "Painéis, palestras e encontros com profissionais de gestoras, exchanges, bancos, escritórios e acadêmicos que estão construindo o setor.",
      tags: ["Painéis", "Palestras", "Encontros"],
    },
    {
      icon: "Landmark",
      title: "Conexão Institucional",
      description:
        "Aproximação entre estudantes da FGV e players estratégicos dos setores financeiro, jurídico e tecnológico, abrindo portas para carreira e cooperação.",
      tags: ["Financeiro", "Jurídico", "Tecnologia"],
    },
    {
      icon: "Network",
      title: "Comunidade & Ecossistema",
      description:
        "Uma rede ativa de alunos, ex-membros, pesquisadores e parceiros que sustenta a troca contínua de conhecimento sobre ativos digitais.",
      tags: ["Alumni", "Pesquisadores", "Parceiros"],
    },
  ],

  /* --- Patrocinadores (tiers) ---------------------------------------------
   * Para inserir um logo oficial: { name: "Nome", logo: "https://.../logo.svg", url: "https://..." }
   * ----------------------------------------------------------------------- */
  sponsors: {
    eyebrow: "Patrocinadores",
    title: "Apoio institucional",
    subtitle:
      "Organizações que viabilizam nossa pesquisa, nossos eventos e a formação de novos talentos em ativos digitais.",
    tiers: [
      {
        id: "gold",
        badge: "Gold",
        label: "Patrocinadores Principais",
        size: "lg",
        items: [
          { name: "[LOGO PARCEIRO 01]", logo: null, url: "#" },
          { name: "[LOGO PARCEIRO 02]", logo: null, url: "#" },
        ],
      },
      {
        id: "silver",
        badge: "Silver",
        label: "Apoiadores",
        size: "md",
        items: [
          { name: "[LOGO PARCEIRO 03]", logo: null, url: "#" },
          { name: "[LOGO PARCEIRO 04]", logo: null, url: "#" },
          { name: "[LOGO PARCEIRO 05]", logo: null, url: "#" },
        ],
      },
      {
        id: "bronze",
        badge: "Bronze",
        label: "Comunidade",
        size: "sm",
        items: [
          { name: "[LOGO PARCEIRO 06]", logo: null, url: "#" },
          { name: "[LOGO PARCEIRO 07]", logo: null, url: "#" },
          { name: "[LOGO PARCEIRO 08]", logo: null, url: "#" },
          { name: "[LOGO PARCEIRO 09]", logo: null, url: "#" },
        ],
      },
    ],
    cta: {
      text: "Sua organização quer apoiar a formação de talentos em ativos digitais na FGV EAESP?",
      label: "Seja um parceiro",
    },
  },

  /* --- Ecossistema & Parcerias Anteriores ---------------------------------- */
  ecosystem: {
    eyebrow: "Ecossistema",
    title: "Com quem já construímos",
    subtitle:
      "Instituições, empresas e comunidades com as quais já realizamos projetos, eventos e pesquisas.",
    items: [
      { name: "[Parceiro / Gestora 01]", category: "Mercado" },
      { name: "[Iniciativa Acadêmica 02]", category: "Academia" },
      { name: "[Protocolo / Infraestrutura 03]", category: "Infraestrutura" },
      { name: "[Liga / Comunidade 04]", category: "Comunidade" },
      { name: "[Exchange 05]", category: "Mercado" },
      { name: "[Centro de Pesquisa 06]", category: "Academia" },
      { name: "[Custodiante 07]", category: "Infraestrutura" },
      { name: "[Associação Setorial 08]", category: "Comunidade" },
      { name: "[Banco / Instituição Financeira 09]", category: "Mercado" },
      { name: "[Universidade Parceira 10]", category: "Academia" },
      { name: "[Rede Blockchain 11]", category: "Infraestrutura" },
      { name: "[Hub de Inovação 12]", category: "Comunidade" },
      { name: "[Fintech / Banco Digital 13]", category: "Mercado" },
      { name: "[Grupo de Pesquisa 14]", category: "Academia" },
      { name: "[Plataforma de Tokenização 15]", category: "Infraestrutura" },
      { name: "[Mídia Especializada 16]", category: "Comunidade" },
    ],
  },

  /* --- Newsletter ---------------------------------------------------------- */
  newsletter: {
    eyebrow: "Newsletter",
    title: "Research, agenda e oportunidades — direto no seu e-mail.",
    text:
      "Receba nossas publicações, convites para painéis e workshops e o aviso de abertura do Processo Seletivo da FGV Digital Assets.",
    topics: ["Research notes e relatórios", "Agenda de eventos e workshops", "Abertura do Processo Seletivo"],
    label: "Seu melhor e-mail",
    placeholder: "nome@dominio.com",
    button: "Inscrever-se",
    loading: "Enviando…",
    invalid: "Insira um e-mail válido (ex.: nome@dominio.com).",
    error: "Não foi possível concluir a inscrição agora. Tente novamente em instantes.",
    privacy: "Sem spam. Você pode cancelar a inscrição a qualquer momento.",
    successTitle: "Inscrição confirmada!",
    successText: "Enviaremos a próxima edição para",
    successReset: "Inscrever outro e-mail",
    endpoint: null, // ⚠️ Ex.: "https://seu-provedor.com/api/subscribe" (POST JSON { email })
  },

  /* --- Footer -------------------------------------------------------------- */
  footer: {
    description:
      "Entidade estudantil e grupo de pesquisa da FGV EAESP dedicada a ativos digitais, infraestrutura blockchain e integração entre mercado e academia.",
    location: "São Paulo • FGV EAESP",
    address: "Av. 9 de Julho, 2029 — Bela Vista",
    socials: [
      { id: "linkedin", label: "LinkedIn", href: "#" }, // ⚠️ links oficiais
      { id: "instagram", label: "Instagram", href: "#" },
      { id: "x", label: "X (Twitter)", href: "#" },
      { id: "email", label: "E-mail", href: "mailto:contato@seudominio.com.br" },
    ],
    legal:
      "Entidade estudantil vinculada à FGV EAESP. Conteúdo de caráter educacional e acadêmico; não constitui recomendação de investimento.",
  },
};

/* ============================================================================
 * THEME — cores institucionais (aplicadas via style inline para máxima
 * compatibilidade com o Tailwind pré-compilado dos Artifacts)
 * ========================================================================== */
const THEME = {
  navy950: "#050E1F",
  navy900: "#0A1A36",
  navy800: "#10284F",
  line: "#8FB4F5",
  tier: { gold: "#A87B1E", silver: "#64748B", bronze: "#9A5B2B" },
};

const CONTAINER = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const PILLAR_ICONS = { BookOpen, GraduationCap, LineChart, Mic, Landmark, Network };
const CATEGORY_ICONS = { Mercado: Building2, Academia: GraduationCap, Infraestrutura: Layers, Comunidade: Users };

const TIER_LAYOUT = {
  lg: { grid: "grid-cols-1 sm:grid-cols-2", height: 168, text: "text-sm sm:text-base" },
  md: { grid: "grid-cols-2 sm:grid-cols-3", height: 120, text: "text-xs sm:text-sm" },
  sm: { grid: "grid-cols-2 md:grid-cols-4", height: 88, text: "text-xs" },
};

/* ============================================================================
 * ESTILOS GLOBAIS (fontes, animações e padrões de fundo)
 * ========================================================================== */
function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500&family=JetBrains+Mono:wght@400;500&display=swap');

      html { scroll-behavior: smooth; }
      /* Montserrat: mesma família tipográfica do site de referência */
      .fgv-root { font-family: 'Montserrat', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; -webkit-font-smoothing: antialiased; }

      /* --- Tela inicial: medidas idênticas às da referência --- */
      .fgv-nav-link { font-size: 16px; font-weight: 300; line-height: 25.6px; padding: 8px 8px; color: #fff; }
      .fgv-hero-text { font-family: 'Montserrat', sans-serif; font-size: 20px; font-weight: 300; line-height: 24px; color: #fff; }
      .fgv-hero-btn {
        display: inline-block; margin: 8px; padding: 8px 22px 6px;
        border: 1.6px solid #fbfbfb; border-radius: 4px; color: #fbfbfb;
        font-size: 12px; font-weight: 300; line-height: 18px; text-transform: uppercase;
        transition: background-color .15s ease, box-shadow .15s ease;
      }
      .fgv-hero-btn:hover { background-color: rgba(255,255,255,0.08); box-shadow: 0 8px 9px -4px rgba(0,0,0,0.15), 0 4px 18px 0 rgba(0,0,0,0.1); }
      .fgv-hero-btn:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
      .fgv-hero { height: 107vh; }
      @media (min-width: 992px) { .fgv-hero { margin-top: -58.59px; } }
      .fgv-root ::selection { background: #BFDBFE; color: #0A1A36; }
      .font-display { font-family: 'Newsreader', 'Iowan Old Style', Georgia, serif; font-weight: 500; letter-spacing: -0.015em; }
      .font-mono-ui { font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }

      .fgv-grid {
        background-image:
          linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px),
          linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px);
        background-size: 64px 64px;
        -webkit-mask-image: radial-gradient(ellipse at 50% 40%, #000 25%, transparent 75%);
                mask-image: radial-gradient(ellipse at 50% 40%, #000 25%, transparent 75%);
      }

      @keyframes fgv-fade-up { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
      .fgv-fade-up { animation: fgv-fade-up .9s cubic-bezier(.2,.7,.2,1) both; }

      @keyframes fgv-fade-in { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
      .fgv-fade-in { animation: fgv-fade-in .45s ease both; }

      @media (prefers-reduced-motion: reduce) {
        html { scroll-behavior: auto; }
        .fgv-fade-up, .fgv-fade-in { animation: none !important; }
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

/* Wrapper de entrada suave ao rolar a página */
function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`transform transition-all duration-700 ease-out motion-reduce:transition-none ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ============================================================================
 * COMPONENTES DE MARCA E UI
 * ========================================================================== */

/* Logo SVG minimalista: uma ponte em arco formada por nós de rede */
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

/* Rede de partículas animada do hero (mesmo comportamento da referência:
 * 30 nós brancos, linhas entre nós a até 375px, repulsão ao passar o mouse
 * e +4 nós a cada clique). Sem dependências: canvas 2D puro. */
function ParticleNetwork({ animate }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas ? canvas.parentElement : null;
    const ctx = canvas ? canvas.getContext("2d") : null;
    if (!canvas || !host || !ctx) return undefined;

    const CFG = {
      count: 30,
      maxCount: 80,
      maxSize: 6.25,
      maxOpacity: 0.5,
      linkDistance: 375,
      linkOpacity: 0.3,
      linkWidth: 1.25,
      speed: 7.5,
      repulseRadius: 80,
      refArea: 1440 * 900, // área de referência para a densidade (30 nós em tela desktop)
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

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = host.clientWidth;
      height = host.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles.forEach((p) => {
        p.x = Math.min(p.x, width);
        p.y = Math.min(p.y, height);
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = CFG.linkWidth;
      // em telas estreitas, encurta o alcance das linhas para não "fechar" a malha
      const linkDistance = Math.min(CFG.linkDistance, width * 0.8);
      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const a = particles[i];
          const b = particles[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < linkDistance) {
            const op = CFG.linkOpacity - (dist / linkDistance) * CFG.linkOpacity;
            ctx.strokeStyle = `rgba(255, 255, 255, ${op})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      particles.forEach((p) => {
        ctx.fillStyle = `rgba(255, 255, 255, ${p.o})`;
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
    // densidade proporcional à área (como o modo "density" do particles.js): ~30 no desktop, ~8 no celular
    const initialCount = Math.max(6, Math.min(CFG.count, Math.round((CFG.count * width * height) / CFG.refArea)));
    particles = Array.from({ length: initialCount }, () => makeParticle());
    draw();
    start();

    window.addEventListener("resize", resize);
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    host.addEventListener("click", onClick);

    // pausa a animação quando o hero sai da tela (economia de CPU/bateria)
    let io = null;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
      io.observe(host);
    }

    return () => {
      stop();
      if (io) io.disconnect();
      window.removeEventListener("resize", resize);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("click", onClick);
    };
  }, [animate]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}

/* Logo principal do hero (~250px, versão branca). Substituível por imagem via SITE_DATA.hero.logo */
function HeroLogo({ src, alt }) {
  if (src) return <img src={src} alt={alt} width="250" className="mx-auto block" />;
  const arch = [
    [35, 88], [62, 54], [94, 32], [125, 24], [156, 32], [188, 54], [215, 88],
  ];
  return (
    <svg viewBox="0 0 250 154" width="250" className="mx-auto block max-w-full" role="img" aria-label={alt}>
      <g stroke="#fff" strokeWidth="1.4" strokeLinecap="round" fill="none">
        <path d={arch.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ")} strokeOpacity="0.9" />
        <path d="M20 88 H230" strokeOpacity="0.9" />
        {arch.slice(1, -1).map(([x, y]) => (
          <line key={`h${x}`} x1={x} y1={y} x2={x} y2={88} strokeOpacity="0.45" />
        ))}
        {arch.slice(0, -1).map(([x, y], i) => (
          <line key={`d${x}`} x1={x} y1={y} x2={arch[i + 1][0]} y2={88} strokeOpacity="0.25" />
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

/* Cabeçalho padrão de seção */
function SectionHeader({ index, eyebrow, title, subtitle, align = "left", dark = false }) {
  const wrap = align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl";
  return (
    <div className={wrap}>
      <p className={`font-mono-ui text-xs uppercase tracking-widest ${dark ? "text-sky-300" : "text-blue-700"}`}>
        {index && <span className="mr-2 opacity-60">{index} —</span>}
        {eyebrow}
      </p>
      <h2
        className={`font-display mt-4 text-4xl leading-tight md:text-5xl ${dark ? "text-white" : "text-slate-900"}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-5 text-lg leading-relaxed ${dark ? "text-slate-300" : "text-slate-600"}`}>{subtitle}</p>
      )}
    </div>
  );
}

/* Placeholder de imagem com proporção fixa (nunca quebra o layout) */
function MediaPlaceholder({ image }) {
  return (
    <figure className="relative isolate">
      <div
        className="absolute -bottom-4 -right-4 -z-10 hidden h-full w-full rounded-2xl border border-blue-200 sm:block"
        aria-hidden="true"
      />
      <div
        className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100"
        style={{ aspectRatio: "4 / 3" }}
      >
        {image.src ? (
          <img src={image.src} alt={image.alt} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        ) : (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
            style={{ background: "linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)" }}
            role="img"
            aria-label={image.alt}
          >
            <svg viewBox="0 0 120 90" className="w-28 text-slate-400 sm:w-36" fill="none" aria-hidden="true">
              <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 30 L60 8 L110 30 Z" />
                <path d="M10 35 H110" />
                <path d="M22 40 V74 M41 40 V74 M60 40 V74 M79 40 V74 M98 40 V74" />
                <path d="M6 79 H114 M2 85 H118" />
              </g>
              <circle cx="60" cy="20" r="3" fill="#3B82F6" />
            </svg>
            <p className="font-mono-ui mt-6 text-xs uppercase tracking-widest text-slate-500">{image.placeholderLabel}</p>
          </div>
        )}
        <span
          className="font-mono-ui absolute left-4 top-4 rounded-full px-3 py-1 text-xs uppercase tracking-widest text-white"
          style={{ background: THEME.navy900 }}
        >
          {image.badge}
        </span>
      </div>
      <figcaption className="mt-3 text-xs text-slate-500">{image.caption}</figcaption>
    </figure>
  );
}

/* Espaço reservado para logo de patrocinador */
function LogoSlot({ item, size, color }) {
  const layout = TIER_LAYOUT[size];
  const isExternal = item.url && item.url.startsWith("http");
  return (
    <a
      href={item.url || "#"}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="group relative flex items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 px-5 transition duration-300 hover:border-slate-400 hover:bg-white hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      style={{ height: layout.height }}
      aria-label={item.name}
    >
      <span className="absolute right-3 top-3 h-1.5 w-1.5 rounded-full" style={{ background: color }} aria-hidden="true" />
      {item.logo ? (
        <img src={item.logo} alt={item.name} className="max-h-full max-w-full object-contain py-5" />
      ) : (
        <span className="text-center">
          <span className={`font-mono-ui block font-medium text-slate-700 ${layout.text}`}>{item.name}</span>
          <span className="mt-1 block text-xs text-slate-400">Inserir logotipo oficial · SVG/PNG</span>
        </span>
      )}
    </a>
  );
}

/* Ícones de redes sociais (SVG inline, sem dependência de ícones de marca) */
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
 * APP
 * ========================================================================== */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [ecoFilter, setEcoFilter] = useState("Todos");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | invalid | loading | success | error
  const [submittedEmail, setSubmittedEmail] = useState("");
  const reduceMotion = usePrefersReducedMotion();

  const { brand, nav, hero, about, pillarsSection, pillars, sponsors, ecosystem, newsletter, footer } = SITE_DATA;

  /* Navbar sólida ao rolar + botão "voltar ao topo" */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setShowTop(y > 700);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Fecha o menu mobile com ESC ou ao voltar para desktop */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  /* Destaque do link ativo conforme a seção visível */
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return undefined;
    const ids = ["inicio", "quem-somos", "atuacao", "parceiros", "ecossistema", "newsletter"];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const activeNav = activeSection === "ecossistema" ? "parceiros" : activeSection;

  /* Newsletter: validação + envio (real se houver endpoint, simulado caso contrário) */
  const emailIsValid = EMAIL_REGEX.test(email.trim());

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
    setStatus("loading");
    try {
      if (newsletter.endpoint) {
        const res = await fetch(newsletter.endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: value }),
        });
        if (!res.ok) throw new Error("Falha no envio");
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1100)); // envio simulado
      }
      setSubmittedEmail(value);
      setEmail("");
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
  };

  const inputStateClass =
    status === "invalid" || status === "error"
      ? "border-red-400 focus:ring-red-200"
      : emailIsValid
      ? "border-emerald-400 focus:ring-emerald-200"
      : "border-transparent focus:ring-blue-300";

  /* Ecossistema: filtros por categoria */
  const ecoCategories = ["Todos", ...Array.from(new Set(ecosystem.items.map((i) => i.category)))];
  const ecoItems = ecoFilter === "Todos" ? ecosystem.items : ecosystem.items.filter((i) => i.category === ecoFilter);
  const ecoCount = (cat) => (cat === "Todos" ? ecosystem.items.length : ecosystem.items.filter((i) => i.category === cat).length);

  const navSolid = scrolled || menuOpen;
  const year = new Date().getFullYear();

  return (
    <div className="fgv-root min-h-screen bg-white text-slate-900">
      <GlobalStyles />

      {/* === SEÇÃO: NAVBAR === */}
      {/* Mesma estrutura da referência: barra escura fixa (#262626); logo + links à esquerda;
          emblema institucional, ícones sociais e selo de CTA à direita; menu recolhido abaixo de 992px. */}
      <header
        className="fixed inset-x-0 top-0 z-50"
        style={{ background: "#262626", boxShadow: "0 10px 20px 0 rgba(0, 0, 0, 0.05)" }}
      >
        <nav className="flex items-center px-3" style={{ minHeight: 64 }} aria-label="Navegação principal">
          <a
            href="#inicio"
            style={{ marginRight: 20 }}
            className="flex items-center py-1 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            onClick={() => setMenuOpen(false)}
            aria-label={brand.name}
          >
            <BrandMark className="h-8 w-12 text-white" />
          </a>

          <ul className="hidden items-center lg:flex">
            {nav.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="fgv-nav-link block transition-opacity hover:opacity-75"
                  aria-current={activeNav === link.href.slice(1) ? "true" : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="ml-auto hidden items-center lg:flex">
            <a href="#inicio" className="mr-4 flex items-center" aria-label={brand.institution}>
              {nav.institutionLogo ? (
                <img src={nav.institutionLogo} alt={brand.institution} width="30" />
              ) : (
                <span
                  className="flex items-center justify-center border border-white text-white"
                  style={{ width: 30, height: 34, fontSize: 7, letterSpacing: "0.06em", borderRadius: "2px 2px 12px 12px" }}
                >
                  {nav.institutionLabel}
                </span>
              )}
            </a>
            <ul className="flex items-center">
              {nav.socials.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    className="fgv-nav-link flex items-center transition-opacity hover:opacity-75"
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "nofollow noopener noreferrer" : undefined}
                  >
                    <SocialIcon id={s.id} className="h-4 w-4" />
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={nav.cta.href}
                  className="ml-2 inline-flex items-center rounded px-2.5 py-1.5 font-semibold uppercase text-white transition hover:bg-blue-500"
                  style={{ background: "#2563EB", fontSize: 10, letterSpacing: "0.06em", lineHeight: 1.2 }}
                >
                  {nav.cta.label}
                </a>
              </li>
            </ul>
          </div>

          <button
            type="button"
            className="ml-auto inline-flex items-center justify-center rounded px-3 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-white lg:hidden"
            style={{ color: "rgba(255, 255, 255, 0.55)" }}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {/* Menu mobile (recolhível, como o navbar-collapse da referência) */}
        <div
          id="mobile-menu"
          className={`overflow-hidden transition-all duration-300 ease-out lg:hidden ${
            menuOpen ? "max-h-screen opacity-100" : "pointer-events-none max-h-0 opacity-0"
          }`}
        >
          <div className="px-3 pb-4">
            <ul>
              {nav.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="fgv-nav-link block"
                    style={{ paddingLeft: 0 }}
                    tabIndex={menuOpen ? 0 : -1}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <ul className="mt-2 flex flex-wrap items-center gap-x-3">
              {nav.socials.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    className="fgv-nav-link flex items-center"
                    style={{ paddingLeft: 0 }}
                    tabIndex={menuOpen ? 0 : -1}
                  >
                    <SocialIcon id={s.id} className="h-4 w-4" />
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={nav.cta.href}
                  onClick={() => setMenuOpen(false)}
                  tabIndex={menuOpen ? 0 : -1}
                  className="inline-flex items-center rounded px-2.5 py-1.5 font-semibold uppercase text-white"
                  style={{ background: "#2563EB", fontSize: 10, letterSpacing: "0.06em" }}
                >
                  {nav.cta.label}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </header>

      <main>
        {/* === SEÇÃO: HERO === */}
        {/* Mesma composição da tela inicial da referência: foto de fundo em "cover" com 107vh,
            rede de partículas conectadas, logo central de 250px, texto em Montserrat 20px
            com quebras de linha forçadas e dois botões contornados em caixa alta. */}
        <section
          id="inicio"
          className="fgv-hero relative overflow-hidden"
          style={{
            backgroundColor: "#16191d",
            backgroundImage: hero.backgroundImage
              ? `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url("${hero.backgroundImage}")`
              : "radial-gradient(ellipse at 50% 30%, #3b424b 0%, #23282e 45%, #111417 100%)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.25), 0 5px 15px 0 rgba(0, 0, 0, 0.2)",
          }}
        >
          <ParticleNetwork animate={!reduceMotion} />

          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-3 text-center">
            <div className="pointer-events-auto text-white">
              <h1 className="sr-only">{brand.name}</h1>
              <HeroLogo src={hero.logo} alt={brand.name} />
              <p className="fgv-hero-text" style={{ marginTop: 25.6, marginBottom: 16 }}>
                {hero.paragraphs.map((lines, i) => (
                  <React.Fragment key={i}>
                    {lines.map((line, j) => (
                      <React.Fragment key={j}>
                        {line}
                        {/* quebra forçada só a partir de 640px; no celular o texto flui naturalmente */}
                        {j < lines.length - 1 && (
                          <>
                            {" "}
                            <br className="hidden sm:inline" />
                          </>
                        )}
                      </React.Fragment>
                    ))}
                    <br />
                    <br />
                  </React.Fragment>
                ))}
              </p>
              <div>
                {hero.buttons.map((btn) => (
                  <a key={btn.label} href={btn.href} className="fgv-hero-btn" role="button">
                    {btn.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* === SEÇÃO: QUEM SOMOS & SOBRE NÓS === */}
        <section id="quem-somos" className="scroll-mt-16 bg-white py-24 md:py-32 lg:scroll-mt-20">
          <div className={CONTAINER}>
            <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
              <Reveal className="lg:col-span-5">
                <MediaPlaceholder image={about.image} />
              </Reveal>

              <Reveal className="lg:col-span-7" delay={120}>
                <SectionHeader index="01" eyebrow={about.eyebrow} title={about.title} />
                <p className="mt-6 text-lg leading-relaxed text-slate-600">{about.lead}</p>

                <div className="mt-10 border-t border-slate-200 pt-8">
                  <h3 className="font-display text-2xl text-slate-900">{about.aboutTitle}</h3>
                  <p className="mt-3 leading-relaxed text-slate-600">{about.aboutText}</p>
                </div>

                <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200">
                  {about.facts.map((fact) => (
                    <div key={fact.label} className="bg-white p-4 sm:p-5">
                      <dt className="font-mono-ui text-xs uppercase tracking-widest text-slate-400">{fact.label}</dt>
                      <dd className="mt-1.5 text-sm font-semibold leading-snug text-slate-900">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>

            {/* Trajetória + Estrutura */}
            <div className="mt-24 grid gap-14 lg:grid-cols-12 lg:gap-16">
              <Reveal className="lg:col-span-5">
                <h3 className="font-display text-3xl text-slate-900">{about.timeline.title}</h3>
                <ol className="relative mt-8 space-y-9 border-l border-slate-200 pl-8">
                  {about.timeline.steps.map((step, i) => {
                    const isLast = i === about.timeline.steps.length - 1;
                    return (
                      <li key={step.title} className="relative">
                        <span
                          className={`absolute -left-10 top-1 h-4 w-4 rounded-full border-2 border-blue-600 ${
                            isLast ? "bg-blue-600" : "bg-white"
                          }`}
                          aria-hidden="true"
                        />
                        <p className="font-mono-ui text-xs uppercase tracking-widest text-blue-700">{step.phase}</p>
                        <p className="mt-1 text-lg font-semibold text-slate-900">{step.title}</p>
                        <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{step.text}</p>
                      </li>
                    );
                  })}
                </ol>
              </Reveal>

              <Reveal className="lg:col-span-7" delay={120}>
                <h3 className="font-display text-3xl text-slate-900">{about.structure.title}</h3>
                <p className="mt-3 text-slate-600">{about.structure.text}</p>
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {about.structure.units.map((unit, i) => (
                    <li
                      key={unit.name}
                      className="flex gap-4 rounded-xl border border-slate-200 p-5 transition duration-300 hover:border-slate-300 hover:bg-slate-50"
                    >
                      <span className="font-mono-ui pt-0.5 text-xs text-slate-400">{String(i + 1).padStart(2, "0")}</span>
                      <span>
                        <span className="block font-semibold text-slate-900">{unit.name}</span>
                        <span className="mt-1 block text-sm leading-relaxed text-slate-600">{unit.desc}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        {/* === SEÇÃO: O QUE FAZEMOS (6 PILARES) === */}
        <section id="atuacao" className="scroll-mt-16 border-t border-slate-200 bg-slate-50 py-24 md:py-32 lg:scroll-mt-20">
          <div className={CONTAINER}>
            <Reveal>
              <SectionHeader
                align="center"
                index="02"
                eyebrow={pillarsSection.eyebrow}
                title={pillarsSection.title}
                subtitle={pillarsSection.subtitle}
              />
            </Reveal>

            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pillars.map((pillar, i) => {
                const Icon = PILLAR_ICONS[pillar.icon] || Layers;
                return (
                  <Reveal key={pillar.title} delay={(i % 3) * 90}>
                    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
                      <div className="flex items-start justify-between">
                        <span
                          className="flex h-12 w-12 transform items-center justify-center rounded-xl text-sky-100 transition duration-300 group-hover:scale-105"
                          style={{ background: THEME.navy900 }}
                        >
                          <Icon className="h-6 w-6" strokeWidth={1.6} />
                        </span>
                        <span className="font-mono-ui text-xs text-slate-400">{String(i + 1).padStart(2, "0")}</span>
                      </div>
                      <h3 className="font-display mt-6 text-2xl leading-snug text-slate-900">{pillar.title}</h3>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{pillar.description}</p>
                      <ul className="mt-6 flex flex-wrap gap-2">
                        {pillar.tags.map((tag) => (
                          <li key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                            {tag}
                          </li>
                        ))}
                      </ul>
                      <span
                        className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 transform bg-blue-600 transition-transform duration-500 group-hover:scale-x-100"
                        aria-hidden="true"
                      />
                    </article>
                  </Reveal>
                );
              })}
            </div>

            <Reveal className="mt-12 text-center">
              <a
                href={pillarsSection.cta.href}
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 transition hover:text-blue-900"
              >
                {pillarsSection.cta.label}
                <ArrowRight className="h-4 w-4" />
              </a>
            </Reveal>
          </div>
        </section>

        {/* === SEÇÃO: PATROCINADORES / APOIO INSTITUCIONAL (TIERS) === */}
        <section id="parceiros" className="scroll-mt-16 border-t border-slate-200 bg-white py-24 md:py-32 lg:scroll-mt-20">
          <div className={CONTAINER}>
            <Reveal>
              <SectionHeader
                align="center"
                index="03"
                eyebrow={sponsors.eyebrow}
                title={sponsors.title}
                subtitle={sponsors.subtitle}
              />
            </Reveal>

            <div className="mx-auto mt-16 max-w-5xl space-y-14">
              {sponsors.tiers.map((tier, ti) => {
                const color = THEME.tier[tier.id] || THEME.tier.silver;
                const layout = TIER_LAYOUT[tier.size];
                return (
                  <Reveal key={tier.id} delay={ti * 80}>
                    <div className="mb-6 flex items-center gap-4">
                      <span
                        className="font-mono-ui inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs uppercase tracking-widest"
                        style={{ borderColor: color, color }}
                      >
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} aria-hidden="true" />
                        {tier.badge}
                      </span>
                      <h3 className="font-display text-xl text-slate-900 sm:text-2xl">{tier.label}</h3>
                      <span className="h-px flex-1 bg-slate-200" aria-hidden="true" />
                    </div>
                    <div className={`grid gap-4 ${layout.grid}`}>
                      {tier.items.map((item) => (
                        <LogoSlot key={item.name} item={item} size={tier.size} color={color} />
                      ))}
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <Reveal className="mx-auto mt-16 max-w-5xl">
              <div
                className="flex flex-col items-start justify-between gap-6 rounded-2xl p-8 sm:flex-row sm:items-center"
                style={{ background: THEME.navy900 }}
              >
                <p className="font-display max-w-xl text-xl leading-snug text-white sm:text-2xl">{sponsors.cta.text}</p>
                <a
                  href={`mailto:${brand.email}`}
                  className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-sky-100"
                >
                  {sponsors.cta.label}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* === SEÇÃO: ECOSSISTEMA & PARCERIAS ANTERIORES === */}
        <section id="ecossistema" className="scroll-mt-16 border-t border-slate-200 bg-slate-50 py-24 md:py-32 lg:scroll-mt-20">
          <div className={CONTAINER}>
            <Reveal>
              <SectionHeader
                align="center"
                index="04"
                eyebrow={ecosystem.eyebrow}
                title={ecosystem.title}
                subtitle={ecosystem.subtitle}
              />
            </Reveal>

            <Reveal className="mt-12">
              <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Filtrar parceiros por categoria">
                {ecoCategories.map((cat) => {
                  const active = ecoFilter === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setEcoFilter(cat)}
                      aria-pressed={active}
                      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                        active
                          ? "border-transparent text-white"
                          : "border-slate-300 bg-white text-slate-600 hover:border-slate-400 hover:text-slate-900"
                      }`}
                      style={active ? { background: THEME.navy900 } : undefined}
                    >
                      {cat}
                      <span className={`font-mono-ui text-xs ${active ? "text-sky-300" : "text-slate-400"}`}>
                        {ecoCount(cat)}
                      </span>
                    </button>
                  );
                })}
              </div>

              <ul key={ecoFilter} className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {ecoItems.map((item, i) => {
                  const CatIcon = CATEGORY_ICONS[item.category] || Layers;
                  return (
                    <li
                      key={item.name}
                      className="fgv-fade-in flex h-32 flex-col justify-between rounded-xl border border-slate-200 bg-white p-4 transition duration-300 hover:border-slate-400 hover:shadow-md sm:p-5"
                      style={{ animationDelay: `${i * 35}ms` }}
                    >
                      <span className="flex items-center gap-2 text-slate-400">
                        <CatIcon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                        <span className="font-mono-ui text-xs uppercase tracking-widest">{item.category}</span>
                      </span>
                      <span className="font-mono-ui text-sm font-medium leading-snug text-slate-800">{item.name}</span>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* === SEÇÃO: NEWSLETTER === */}
        <section
          id="newsletter"
          className="relative scroll-mt-16 overflow-hidden py-24 md:py-32 lg:scroll-mt-20"
          style={{ background: `linear-gradient(160deg, ${THEME.navy900} 0%, ${THEME.navy800} 100%)` }}
        >
          <div className="fgv-grid absolute inset-0" aria-hidden="true" />
          <div className={`${CONTAINER} relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16`}>
            <Reveal>
              <SectionHeader dark index="05" eyebrow={newsletter.eyebrow} title={newsletter.title} subtitle={newsletter.text} />
              <ul className="mt-8 space-y-3">
                {newsletter.topics.map((topic) => (
                  <li key={topic} className="flex items-center gap-3 text-slate-200">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">
                      <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </span>
                    {topic}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={120}>
              <div
                className="rounded-2xl border p-6 shadow-2xl sm:p-8"
                style={{ background: "rgba(255, 255, 255, 0.05)", borderColor: "rgba(148, 163, 184, 0.22)" }}
              >
                {status === "success" ? (
                  <div className="fgv-fade-in" role="status" aria-live="polite">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white">
                      <CheckCircle2 className="h-6 w-6" />
                    </span>
                    <h3 className="font-display mt-5 text-3xl text-white">{newsletter.successTitle}</h3>
                    <p className="mt-3 leading-relaxed text-slate-300">
                      {newsletter.successText}{" "}
                      <strong className="break-all font-semibold text-white">{submittedEmail}</strong>.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-300 transition hover:text-white"
                    >
                      {newsletter.successReset}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} noValidate>
                    <label htmlFor="newsletter-email" className="block text-sm font-medium text-slate-200">
                      {newsletter.label}
                    </label>
                    <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                      <div className="relative flex-1">
                        <Mail
                          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transform text-slate-400"
                          aria-hidden="true"
                        />
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
                          className={`w-full rounded-full border-2 bg-white py-3 pl-12 pr-11 text-slate-900 placeholder-slate-400 outline-none transition focus:ring-4 disabled:opacity-70 ${inputStateClass}`}
                        />
                        {emailIsValid && status !== "loading" && (
                          <CheckCircle2
                            className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 transform text-emerald-500"
                            aria-hidden="true"
                          />
                        )}
                      </div>
                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-500 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {status === "loading" ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            {newsletter.loading}
                          </>
                        ) : (
                          <>
                            {newsletter.button}
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    </div>
                    <p id="newsletter-feedback" aria-live="polite" className="mt-3 text-sm" style={{ minHeight: 20 }}>
                      {status === "invalid" && (
                        <span className="fgv-fade-in inline-flex items-center gap-2 text-red-300">
                          <AlertCircle className="h-4 w-4" aria-hidden="true" />
                          {newsletter.invalid}
                        </span>
                      )}
                      {status === "error" && (
                        <span className="fgv-fade-in inline-flex items-center gap-2 text-red-300">
                          <AlertCircle className="h-4 w-4" aria-hidden="true" />
                          {newsletter.error}
                        </span>
                      )}
                    </p>
                    <p className="mt-4 border-t pt-4 text-xs text-slate-400" style={{ borderColor: "rgba(148, 163, 184, 0.18)" }}>
                      {newsletter.privacy}
                    </p>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* === SEÇÃO: FOOTER === */}
      <footer id="contato" className="text-slate-400" style={{ background: THEME.navy950 }}>
        <div className={`${CONTAINER} grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12`}>
          <div className="lg:col-span-5">
            <a href="#inicio" className="inline-flex items-center gap-3 text-white">
              <BrandMark className="h-10 w-10 text-sky-100" />
              <span className="leading-tight">
                <span className="block text-lg font-semibold tracking-tight">{brand.name}</span>
                <span className="font-mono-ui block text-xs uppercase tracking-widest text-slate-500">
                  {brand.formerName}
                </span>
              </span>
            </a>
            <p className="mt-6 max-w-sm text-sm leading-relaxed">{footer.description}</p>
            <ul className="mt-6 flex gap-3">
              {footer.socials.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 text-slate-300 transition hover:border-sky-400 hover:text-white"
                  >
                    <SocialIcon id={s.id} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav className="lg:col-span-2" aria-label="Links do rodapé">
            <p className="font-mono-ui text-xs uppercase tracking-widest text-slate-500">Navegação</p>
            <ul className="mt-5 space-y-3 text-sm">
              {nav.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={nav.cta.href} className="transition hover:text-white">
                  {nav.cta.label}
                </a>
              </li>
            </ul>
          </nav>

          <nav className="lg:col-span-2" aria-label="Pilares de atuação">
            <p className="font-mono-ui text-xs uppercase tracking-widest text-slate-500">Atuação</p>
            <ul className="mt-5 space-y-3 text-sm">
              {pillars.map((p) => (
                <li key={p.title}>
                  <a href="#atuacao" className="transition hover:text-white">
                    {p.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="font-mono-ui text-xs uppercase tracking-widest text-slate-500">Contato</p>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" aria-hidden="true" />
                <span>
                  <span className="block font-medium text-slate-200">{footer.location}</span>
                  <span className="block">{footer.address}</span>
                </span>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" aria-hidden="true" />
                <a href={`mailto:${brand.email}`} className="break-all transition hover:text-white">
                  {brand.email}
                </a>
              </li>
            </ul>
            <a
              href="#newsletter"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-slate-200 transition hover:border-white hover:text-white"
            >
              Assine a newsletter
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <div className="border-t" style={{ borderColor: "rgba(148, 163, 184, 0.14)" }}>
          <div className={`${CONTAINER} flex flex-col gap-3 py-6 text-xs md:flex-row md:items-center md:justify-between`}>
            <p>
              © {year} {brand.name} ({brand.formerName}). Todos os direitos reservados.
            </p>
            <p className="max-w-xl md:text-right">{footer.legal}</p>
          </div>
        </div>
      </footer>

      {/* Botão "voltar ao topo" */}
      <a
        href="#inicio"
        aria-label="Voltar ao topo"
        className={`fixed bottom-5 right-5 z-40 flex h-11 w-11 transform items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-all duration-300 hover:bg-blue-500 ${
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <ArrowUp className="h-5 w-5" />
      </a>
    </div>
  );
}
