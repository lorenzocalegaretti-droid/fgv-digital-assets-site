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
 *   #/sobre · #/celulas · #/research · #/competicoes · #/eventos · #/membros
 *   · #/alumni · #/processo-seletivo · #/contato   (#/equipe redireciona para Sobre)
 *   O conteúdo de cada aba fica em SITE_DATA.pages (arquivo src/conteudo.js).
 *
 * COMO EDITAR
 *   • Todo o conteúdo visível está em SITE_DATA, no arquivo src/conteudo.js.
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
  ChevronLeft,
  ChevronRight,
  Users,
  Mail,
  MapPin,
  CheckCircle2,
  Loader2,
} from "lucide-react";

/* Conteúdo (textos, fotos, links): src/conteudo.js */
import { SITE_DATA } from "./conteudo.js";

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
  .pg-heading { font-family: 'Montserrat G FGV', 'Montserrat', sans-serif; font-weight: 400; }

  /* Abertura das páginas: foto com camada navy a 77% */
  .pg-hero { position: relative; display: flex; align-items: center; justify-content: center; min-height: max(480px, 74vh); padding: 104px 16px 40px; text-align: center; color: #fff; background-color: ${PAGE_COLORS.navy}; background-size: cover; background-position: center; }
  .pg-hero::before { content: ""; position: absolute; inset: 0; background: ${PAGE_COLORS.navy}; opacity: 0.77; }
  .pg-hero > div { position: relative; }
  .pg-hero h1 { font-family: 'Montserrat G FGV', 'Montserrat', sans-serif; font-weight: 400; font-size: clamp(42px, 4.85vw, 69.84px); line-height: 1.056; letter-spacing: -0.02em; }
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
  .re-members-grid--lg .re-member-photo { max-width: 170px; }
  /* Diretoria em triângulo: presidente sozinho no topo, dois diretores lado a lado embaixo. */
  .re-members-grid.re-members-grid--tri { display: grid; grid-template-columns: repeat(2, minmax(0, 225px)); justify-content: center; column-gap: clamp(40px, 9vw, 130px); row-gap: clamp(28px, 3vw, 40px); }
  .re-members-grid--tri > .re-member:first-child { grid-column: 1 / -1; justify-self: center; width: 100%; max-width: 225px; }
  .re-member { min-width: 0; text-align: center; }
  .re-member-photo { position: relative; width: 100%; max-width: 145px; margin: 0 auto; aspect-ratio: 1 / 1; overflow: hidden; border-radius: 50%; background: ${PAGE_COLORS.photo}; display: grid; place-items: center; }
  .re-member-photo img { width: 100%; height: 100%; object-fit: cover; object-position: center; display: block; filter: saturate(0.9); transition: transform .5s, filter .5s; }
  .re-member:hover .re-member-photo img { transform: scale(1.03); filter: saturate(1); }
  .re-member-initials { font-size: 36px; font-weight: 600; letter-spacing: 0.04em; color: #7A8597; }
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
  .re-alumnus-papel { font-size: 13.5px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; color: ${PAGE_COLORS.accent}; margin-bottom: 2px !important; }
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
  .ps-num span { font-family: 'Montserrat G FGV', 'Montserrat', sans-serif; font-weight: 300; font-size: 58px; line-height: 1; }
  .ps-num sup { font-family: 'Montserrat G FGV', 'Montserrat', sans-serif; font-weight: 300; font-size: 30px; top: -0.75em; }
  .ps-num i { display: block; width: 2px; height: 58px; background: ${PAGE_COLORS.navy}; }
  .ps-step p { text-align: justify; }
  .ps-step strong { color: ${PAGE_COLORS.accent}; font-weight: 700; }
  .ps-cta-row { display: flex; justify-content: center; padding: 24px 0 35px; }
  .ps-cta { display: inline-block; font-family: 'Montserrat G FGV', 'Montserrat', sans-serif; font-weight: 300; font-size: 22.32px; line-height: 27px; color: #fff; background: ${PAGE_COLORS.accent}; border-radius: 300px; padding: 27px 39.6px; transition: background .2s; }
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
  /* Eventos: base da lista abaixo (.re-*), com data na foto, foto alternando de lado,
     data por extenso em azul e semestre maior */
  .ev-list .re-eventos-semestre { gap: 22px; font-family: 'Montserrat G FGV', 'Montserrat', sans-serif; font-weight: 300; font-size: clamp(30px, 2.6vw, 40px); letter-spacing: -0.01em; }
  .ev-list .re-eventos-semestre::after { background: rgba(${PAGE_COLORS.navyRgb}, 0.22); }
  .ev-list .re-eventos-lista { gap: clamp(44px, 4.5vw, 72px); }
  .ev-list .re-evento-foto, .ev-list .re-evento-thumb { border-radius: 0; }
  .ev-tag { position: absolute; z-index: 1; top: 14px; left: 14px; display: flex; flex-direction: column; align-items: center; min-width: 58px; padding: 9px 10px 8px; background: #fff; color: ${PAGE_COLORS.navy}; border-radius: 0; line-height: 1; box-shadow: 0 6px 18px rgba(5, 14, 31, 0.18); }
  .ev-tag strong { font-family: 'Montserrat G FGV', 'Montserrat', sans-serif; font-size: 24px; font-weight: 600; }
  .ev-tag span { margin-top: 5px; font-size: 12.5px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; opacity: 0.6; }
  .ev-list .re-evento-quando { font-size: 13.5px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: ${PAGE_COLORS.navy}; opacity: 0.6; }
  .ev-list .re-evento-corpo { padding-left: 22px; border-left: 2px solid rgba(${PAGE_COLORS.navyRgb}, 0.12); }
  @media (min-width: 768px) {
    .ev-list .re-evento:nth-child(even) { grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); }
    .ev-list .re-evento:nth-child(even) > :first-child { order: 2; }
  }
  .re-eventos { max-width: 1360px; margin: 0 auto; padding: 0 clamp(16px, 3vw, 48px); color: ${PAGE_COLORS.navy}; }
  .re-eventos-grupo + .re-eventos-grupo { margin-top: clamp(49.5px, 4.5vw, 72px); }
  .re-eventos-semestre { display: flex; align-items: center; gap: 18px; margin: 0 0 clamp(22.5px, 2.5vw, 31.5px) !important; font-size: 18px; font-weight: 600; line-height: 1.2; letter-spacing: 0.02em; }
  .re-eventos-semestre::after { content: ""; flex: 1 1 0%; height: 1px; background: rgba(${PAGE_COLORS.navyRgb}, 0.14); }
  .re-eventos-lista { display: flex; flex-direction: column; gap: clamp(31.5px, 3vw, 45px); }
  .re-evento { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: clamp(27px, 3vw, 45px); align-items: center; }
  .re-evento-foto { position: relative; aspect-ratio: 3 / 2; overflow: hidden; border-radius: 3px; background: ${PAGE_COLORS.photo}; display: grid; place-items: center; }
  .re-evento-foto img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .5s; }
  .re-evento:hover .re-evento-foto img { transform: scale(1.03); }
  .re-evento-thumbs { display: flex; gap: 8px; margin-top: 8px; }
  .re-evento-thumb { width: 64px; aspect-ratio: 3 / 2; padding: 0; border: 2px solid transparent; border-radius: 3px; overflow: hidden; background: ${PAGE_COLORS.photo}; cursor: pointer; opacity: 0.6; transition: opacity .2s, border-color .2s; }
  .re-evento-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .re-evento-thumb:hover { opacity: 1; }
  .re-evento-thumb[aria-pressed="true"] { opacity: 1; border-color: ${PAGE_COLORS.accent}; }
  .re-evento-thumb:focus-visible { outline: 2px solid ${PAGE_COLORS.accent}; outline-offset: 2px; }
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
  .nu-cycle li::before { content: counter(nu); display: grid; place-items: center; width: 44px; height: 44px; margin-bottom: 16px; border-radius: 50%; background: ${PAGE_COLORS.navy}; color: #fff; font-family: 'Montserrat G FGV', 'Montserrat', sans-serif; font-size: 20px; }
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

  /* Competições: faixas por competição, anos em foto + texto */
  .cp-sec { padding: clamp(40px, 3.6vw, 56px) 16px clamp(64px, 5.2vw, 80px); background: #fff; color: #111; }
  .cp-sec--navy { background: #1F3561; color: #fff; }
  .cp-sec > .cp-sec-title { max-width: 900px; margin: 0 auto clamp(40px, 6vw, 96px); font-family: 'Montserrat G FGV', 'Montserrat', sans-serif; font-weight: 700; font-size: clamp(30px, 2.93vw, 45px); line-height: 1.22; text-align: center; }
  .cp-entries { max-width: 1120px; margin: 0 auto; display: flex; flex-direction: column; gap: clamp(56px, 6vw, 96px); }
  .cp-entry { display: grid; grid-template-columns: 1fr; gap: 28px; align-items: center; }
  .cp-photo { aspect-ratio: 550 / 372; overflow: hidden; background: ${PAGE_COLORS.navy}; }
  .cp-photo img, .cp-photo svg { width: 100%; height: 100%; object-fit: cover; display: block; }
  .cp-sec .cp-text h3 { margin: 0 auto 14px !important; padding-bottom: 14px; max-width: 500px; border-bottom: 1px solid currentColor; text-align: center; font-family: 'Montserrat G FGV', 'Montserrat', sans-serif; line-height: 1.25; }
  .cp-h-name { display: block; font-style: italic; font-weight: 700; font-size: clamp(24px, 2.2vw, 34px); }
  .cp-h-result { display: block; margin-top: 6px; font-weight: 700; font-size: clamp(26px, 2.4vw, 36px); text-transform: uppercase; }
  .cp-text { max-width: 555px; width: 100%; justify-self: center; }
  .cp-text p { padding: 0 2px; font-size: 18px; line-height: 1.55; text-align: justify; hyphens: manual; color: #3d3d3d; }
  .cp-sec--navy .cp-text p { color: rgba(255, 255, 255, 0.92); }
  .cp-text p + p { margin-top: 22px; }
  .cp-members { text-align: left !important; }
  @media (min-width: 768px) {
    .cp-entry { grid-template-columns: 550fr 555fr; gap: 56px; }
    .cp-entry:nth-child(even) .cp-photo { order: 2; }
  }

  /* Contato */
  /* Contato no estilo do InFinance: tudo centralizado, campos só com linha embaixo */
  .ct-section { padding: 40px 16px clamp(48px, 5vw, 64px); }
  .ct-wrap { max-width: 680px; margin: 0 auto; }
  .ct-head { text-align: center; margin-bottom: 14px; }
  .ct-head h2 { font-family: 'Montserrat G FGV', 'Montserrat', sans-serif; font-weight: 500; font-size: clamp(24px, 2.2vw, 31px); line-height: 1.2; color: ${PAGE_COLORS.accent}; }
  .ct-head p { max-width: 330px; margin: 6px auto 0 !important; font-size: 18px; line-height: 1.4; }
  .ct-head a { font-weight: 700; color: ${PAGE_COLORS.navy}; text-decoration: none; word-break: break-all; }
  .ct-head a:hover { text-decoration: underline; text-underline-offset: 4px; }
  .ct-fields { display: flex; flex-direction: column; gap: 22px; }
  .ct-field { display: flex; flex-direction: column; }
  .ct-field label { font-size: 15.5px; opacity: 0.8; }
  .ct-field input, .ct-field textarea { font-family: inherit; font-size: 16px; color: ${PAGE_COLORS.navy}; background: transparent; border: 0; border-bottom: 1.5px solid ${PAGE_COLORS.navy}; border-radius: 0; padding: 10px 2px 6px; outline: none; transition: border-color .2s; }
  .ct-field textarea { resize: vertical; min-height: 72px; }
  .ct-field input:focus, .ct-field textarea:focus { border-bottom-color: ${PAGE_COLORS.accent}; }
  .ct-actions { display: flex; flex-direction: column; align-items: center; gap: 12px; margin-top: 28px; }
  .ct-submit { font-family: inherit; font-size: 15px; letter-spacing: 0.02em; text-transform: uppercase; min-width: 226px; padding: 10px 32px; border: 0; border-radius: 999px; background: ${PAGE_COLORS.navy}; color: #fff; cursor: pointer; transition: background .2s; }
  .ct-submit:hover { background: ${PAGE_COLORS.accent}; }
  .ct-submit:disabled { opacity: 0.6; cursor: progress; }
  .ct-msg { font-size: 16px; line-height: 1.4; text-align: center; min-height: 1px; }
  .ct-msg.is-ok { color: #1F7A45; }
  .ct-msg.is-error { color: #B3261E; }
  .ct-demo { margin-top: 14px !important; font-size: 14px; color: #92400E; text-align: center; }
  /* Faixa cinza com endereço e mapa */
  .ct-place { background: #F0F0F0; padding: clamp(44px, 5vw, 64px) 16px clamp(40px, 5vw, 56px); }
  .ct-place-inner { max-width: 1045px; margin: 0 auto; }
  .ct-place h2 { text-align: center; font-family: 'Montserrat G FGV', 'Montserrat', sans-serif; font-weight: 500; font-size: clamp(20px, 2vw, 28px); line-height: 1.4; color: ${PAGE_COLORS.navy}; }
  .ct-map-tabs { display: flex; justify-content: center; flex-wrap: wrap; gap: 8px; margin: 22px 0 18px; }
  .ct-map-tab { font-family: inherit; font-size: 15px; padding: 8px 18px; border-radius: 999px; border: 1px solid rgba(${PAGE_COLORS.navyRgb}, 0.3); background: #fff; color: ${PAGE_COLORS.navy}; cursor: pointer; transition: background .2s, color .2s, border-color .2s; }
  .ct-map-tab:hover { border-color: ${PAGE_COLORS.navy}; }
  .ct-map-tab[aria-pressed="true"] { background: ${PAGE_COLORS.navy}; border-color: ${PAGE_COLORS.navy}; color: #fff; }
  .ct-map-frame { width: 100%; height: clamp(272px, 32vw, 416px); border: 0; display: block; background: #E3E3E3; }

  /* Sobre: frases de abertura (vieram da tela inicial) */
  .ab-opening { max-width: 820px; margin: 0 auto clamp(48px, 6vw, 72px); display: flex; flex-direction: column; gap: 14px; text-align: center; font-family: 'Montserrat G FGV', 'Montserrat', sans-serif; font-weight: 300; font-size: clamp(20px, 1.8vw, 24px); line-height: 1.5; }

  /* --- Página inicial: blocos que resumem as abas --- */
  .pg-btn--light { background: #fff; color: ${PAGE_COLORS.navy}; }
  .pg-btn--light:hover { background: ${PAGE_COLORS.photo}; }
  .pg-btn--ghost { background: transparent; color: #fff; box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.6); }
  .pg-btn--ghost:hover { background: rgba(255, 255, 255, 0.12); }
  .hm-intro { margin-bottom: clamp(32px, 4vw, 48px); }
  .hm-more { display: flex; flex-wrap: wrap; justify-content: center; gap: 14px; margin-top: clamp(32px, 4vw, 48px); }
  .hm-show { padding: clamp(56px, 7vw, 96px) 0; color: #fff; background-color: ${PAGE_COLORS.navy}; background-size: cover; background-position: center; }
  .hm-show-title { text-align: center; color: #fff; font-size: clamp(30px, 3.6vw, 48px); line-height: 1.1; }
  .hm-show-sub { text-align: center; margin-top: 14px !important; font-size: clamp(17px, 1.6vw, 21px); opacity: 0.9; }
  .hm-show-carousel { position: relative; margin-top: clamp(32px, 4vw, 52px); }
  .hm-show-track { display: flex; gap: 24px; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none; }
  .hm-show-track::-webkit-scrollbar { display: none; }
  .hm-show-slide { position: relative; flex: 0 0 calc((100% - 24px) / 2); margin: 0; aspect-ratio: 3 / 2; overflow: hidden; border-radius: 4px; scroll-snap-align: start; background: ${PAGE_COLORS.navyDeep}; }
  .hm-show-slide img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .hm-show-slide figcaption { position: absolute; left: 0; right: 0; bottom: 0; padding: 48px 22px 18px; display: flex; flex-direction: column; gap: 4px; background: linear-gradient(transparent, rgba(5, 14, 31, 0.85)); }
  .hm-show-slide figcaption span { font-size: 14px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; opacity: 0.8; }
  .hm-show-slide figcaption strong { font-size: clamp(17px, 1.5vw, 21px); line-height: 1.3; font-weight: 600; }
  .hm-show-arrow { position: absolute; top: 50%; transform: translateY(-50%); width: 48px; height: 48px; display: grid; place-items: center; border: 0; border-radius: 50%; background: rgba(255, 255, 255, 0.92); color: ${PAGE_COLORS.navy}; cursor: pointer; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3); }
  .hm-show-arrow--prev { left: -18px; } .hm-show-arrow--next { right: -18px; }
  .hm-show-btn-outline { background: transparent; box-shadow: inset 0 0 0 1.5px #fff; }
  .hm-show-btn-outline:hover { background: rgba(255, 255, 255, 0.12); }
  @media (max-width: 760px) { .hm-show-slide { flex-basis: 86%; } .hm-show-arrow { display: none; } }
  .hm-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 14px 26px; margin-top: 6px; }

  .hm-stats-band { background: ${PAGE_COLORS.navy}; color: #fff; padding: clamp(44px, 5vw, 72px) 0; }
  .hm-stats-title { text-align: center; font-size: 15.3px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.7; margin-bottom: clamp(24px, 3vw, 36px) !important; }
  .hm-stats { list-style: none; padding: 0; display: flex; flex-wrap: wrap; justify-content: center; row-gap: 28px; }
  .hm-stat { flex: 1 1 0%; min-width: 0; padding: 4px 16px; text-align: center; }
  .hm-stat strong { display: block; font-family: 'Montserrat G FGV', 'Montserrat', sans-serif; font-weight: 300; font-size: clamp(40px, 4.2vw, 58px); line-height: 1; letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }
  .hm-stat > span { display: block; margin-top: 10px; font-size: 16.2px; line-height: 1.3; opacity: 0.78; }
  @media (min-width: 1024px) { .hm-stat + .hm-stat { border-left: 1px solid rgba(255, 255, 255, 0.16); } }

  .hm-cards { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: clamp(18px, 2.4vw, 32px); }
  .hm-excerpt { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }

  .hm-quote { margin: 0; display: flex; flex-direction: column; gap: 22px; background: #fff; border: 1px solid rgba(${PAGE_COLORS.navyRgb}, 0.12); border-radius: 14px; padding: 30px 28px 26px; }
  .hm-quote blockquote { margin: 0; font-size: 18px; line-height: 1.6; }
  .hm-quote blockquote::before { content: "“"; display: block; height: 30px; font-family: 'Montserrat G FGV', 'Montserrat', sans-serif; font-size: 64px; line-height: 1; color: ${PAGE_COLORS.accent}; }
  .hm-quote figcaption { margin-top: auto; display: flex; align-items: center; gap: 14px; }
  .hm-avatar { flex: 0 0 56px; width: 56px; height: 56px; border-radius: 50%; overflow: hidden; display: grid; place-items: center; background: ${PAGE_COLORS.photo}; color: #7A8597; font-weight: 600; }
  .hm-avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .hm-quote-name { display: block; font-weight: 700; line-height: 1.3; }
  .hm-quote-role { display: block; font-size: 15.3px; line-height: 1.35; opacity: 0.7; }

  .hm-ps-status { display: inline-flex; align-items: center; gap: 9px; font-size: 14px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; background: rgba(255, 255, 255, 0.14); border-radius: 300px; padding: 6px 14px; }
  .hm-ps-status i { flex: 0 0 8px; width: 8px; height: 8px; border-radius: 50%; background: #CBD5E1; }
  .hm-ps-status.is-open i { background: #4ADE80; box-shadow: 0 0 0 4px rgba(74, 222, 128, 0.25); }

  .hm-dark { background: ${PAGE_COLORS.navy}; color: #fff; }
  .hm-dark .re-members-marca { color: #fff; }
  .hm-tier + .hm-tier { margin-top: 36px; }
  .hm-partners .pg-container { max-width: 1480px; }
  .hm-partners .hm-logos { gap: clamp(28px, 3.4vw, 48px) 0; margin: 8px auto 0; align-items: center; }
  .hm-partners .hm-logos > li { width: 20%; display: flex; justify-content: center; }
  @media (max-width: 1100px) { .hm-partners .hm-logos > li { width: 25%; } }
  @media (max-width: 760px) { .hm-partners .hm-logos > li { width: 50%; } }
  .hm-partners .hm-logo { display: flex; align-items: center; justify-content: center; height: 76px; padding: 0; background: none; border: 0; box-shadow: none; }
  .hm-partners .hm-logo img { height: calc(44px * var(--logo-h, 1)); width: auto; max-width: 210px; object-fit: contain; }
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
  .hm-news-ok-title { font-family: 'Montserrat G FGV', 'Montserrat', sans-serif; font-size: 24px; line-height: 1.25; margin-bottom: 6px !important; }
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
    .ab-grid, .ab-timeline, .nu-areas { grid-template-columns: minmax(0, 1fr); }
    .ab-timeline { gap: 36px; }
    .pg-lead { font-size: 18px; }
  }
  @media (max-width: 480px) {
    .nu-cycle { grid-template-columns: minmax(0, 1fr); }
  }

  /* --- Blocos de ponta a ponta (foto de um lado, texto do outro), como na FGV Finance --- */
  .fs { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); min-height: clamp(480px, 42vw, 620px); }
  .fs--dark .fs-panel { background: ${PAGE_COLORS.navy}; color: #fff; }
  .fs--light .fs-panel { background: #fff; }
  .fs--band .fs-panel { background: #F3F5F8; }
  .fs--reverse .fs-media { order: 2; }
  .fs-panel { display: flex; align-items: center; padding: clamp(48px, 6vw, 96px) clamp(24px, 6vw, 96px); }
  .fs-inner { width: 100%; max-width: 560px; display: flex; flex-direction: column; gap: 18px; }
  .fs:not(.fs--reverse) .fs-inner { margin-right: auto; }
  .fs--reverse .fs-inner { margin-left: auto; }
  .fs-title { font-size: clamp(30px, 3vw, 42px); line-height: 1.12; }
  .fs-title::after { content: ""; display: block; width: 56px; height: 3px; margin-top: 18px; background: currentColor; opacity: 0.35; }
  .fs-inner > p { line-height: 1.65; }
  .fs--dark .fs-inner > p { opacity: 0.88; }
  .fs-lead { font-family: 'Montserrat G FGV', 'Montserrat', sans-serif; font-size: clamp(20px, 1.7vw, 24px) !important; font-weight: 500; line-height: 1.35 !important; }
  .fs-list { list-style: none; padding: 0; margin: 4px 0 6px; border-top: 1px solid rgba(255, 255, 255, 0.16); }
  .fs--light .fs-list, .fs--band .fs-list { border-top-color: rgba(${PAGE_COLORS.navyRgb}, 0.14); }
  .fs-list li { border-bottom: 1px solid rgba(255, 255, 255, 0.16); }
  .fs--light .fs-list li, .fs--band .fs-list li { border-bottom-color: rgba(${PAGE_COLORS.navyRgb}, 0.14); }
  .fs-list a, .fs-list > li > div { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 14px 0; color: inherit; }
  .fs-list a:hover .fs-list-name { text-decoration: underline; text-underline-offset: 4px; }
  .fs-list-name { font-family: 'Montserrat G FGV', 'Montserrat', sans-serif; font-weight: 600; font-size: 18px; }
  .fs-list-note { display: block; font-size: 15.3px; opacity: 0.7; margin-top: 2px; }
  .fs--compact { min-height: 0; }
  .fs--compact .fs-panel { padding-top: clamp(40px, 4.5vw, 64px); padding-bottom: clamp(40px, 4.5vw, 64px); }
  .fs--compact .fs-inner { max-width: 640px; gap: 14px; }
  .fs--compact .fs-title::after { margin-top: 14px; }
  .fs--compact .fs-list { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: 32px; margin: 2px 0 4px; }
  .fs--compact .fs-list a { padding: 12px 0; }
  .fs--compact .fs-list-note { font-size: 14.4px; }
  @media (max-width: 560px) { .fs--compact .fs-list { grid-template-columns: minmax(0, 1fr); } }
  .fs-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 12px 22px; margin-top: 8px; }
  .fs-media { position: relative; overflow: hidden; background: ${PAGE_COLORS.navyDeep}; }
  .fs-media img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
  .fs-art { position: absolute; inset: 0; }
  .fs-art svg { position: absolute; inset: 0; width: 100%; height: 100%; }
  .fs-art-caption { position: absolute; left: clamp(20px, 3vw, 40px); bottom: clamp(20px, 3vw, 36px); right: clamp(20px, 3vw, 40px); color: #fff; }
  .fs-art-caption strong { display: block; font-family: 'Montserrat G FGV', 'Montserrat', sans-serif; font-weight: 300; font-size: clamp(56px, 7vw, 104px); line-height: 1; letter-spacing: -0.02em; }
  .fs-art-caption span { display: block; margin-top: 10px; font-size: 15.3px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.7; }
  .fs-caption { position: absolute; left: 0; right: 0; bottom: 0; padding: 40px 20px 14px; font-size: 14px; font-style: italic; color: #fff; background: linear-gradient(transparent, rgba(5, 14, 31, 0.75)); }

  /* --- Missão, visão e valores (página inicial) --- */
  .fs--light .hm-ps-status i { background: #94A3B8; }
  .fs--light .hm-ps-status.is-open i { background: #16A34A; box-shadow: 0 0 0 4px rgba(22, 163, 74, 0.2); }
  .fs--light .hm-ps-status { align-self: flex-start; background: rgba(${PAGE_COLORS.navyRgb}, 0.07); color: ${PAGE_COLORS.navy}; }
  .fs-step-n { display: inline-block; min-width: 34px; font-weight: 500; opacity: 0.5; }
  .fs-steps .fs-list-name { font-size: 17px; }
  .fs-steps > li > div { padding: 11px 0; }

  /* Missão, visão e valores: três colunas sobre fundo branco; título centralizado com
     um fio embaixo, texto justificado e valores em lista centralizada (referência FGV Finance) */
  .mv-band { background: #fff; padding: clamp(28px, 3vw, 32px) 0; }
  .mv-grid { max-width: 1440px; margin: 0 auto; padding: 0 clamp(16px, 4vw, 64px); display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: clamp(32px, 8vw, 160px); justify-items: center; }
  .mv-item { width: 100%; max-width: 360px; }
  .mv-item h3 { font-family: 'Source Sans 3', 'Source Sans Pro', sans-serif; font-weight: 700; font-size: 26px; line-height: 1.2; text-align: center; color: #111; padding-bottom: 6px; margin-bottom: 8px !important; border-bottom: 1px solid #333; }
  .mv-item p { font-size: 19px; line-height: 24px; text-align: justify; hyphens: auto; color: #3d3d3d; }
  .mv-values { list-style: none; padding: 0; margin: 0; text-align: center; font-size: 19px; line-height: 24px; color: #3d3d3d; }
  @media (max-width: 900px) {
    .fs { grid-template-columns: minmax(0, 1fr); min-height: 0; }
    .fs-media { min-height: 280px; }
    .fs--reverse .fs-media { order: 0; }
    .fs-inner { max-width: 640px; margin: 0 auto !important; }
    .mv-grid { grid-template-columns: minmax(0, 1fr); gap: 40px; }
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
      /* G da marca: o G da Montserrat com a barra horizontal (desenho da diretoria). A fonte
         public/fonts/montserrat-g-*.woff2 tem só a letra G; o resto do texto continua em Montserrat. */
      @font-face { font-family: 'Montserrat G FGV'; src: url('/fonts/montserrat-g-300.woff2?v=2') format('woff2'); font-weight: 300; font-display: swap; unicode-range: U+0047; }
      @font-face { font-family: 'Montserrat G FGV'; src: url('/fonts/montserrat-g-400.woff2?v=2') format('woff2'); font-weight: 400; font-display: swap; unicode-range: U+0047; }
      @font-face { font-family: 'Montserrat G FGV'; src: url('/fonts/montserrat-g-500.woff2?v=2') format('woff2'); font-weight: 500; font-display: swap; unicode-range: U+0047; }
      @font-face { font-family: 'Montserrat G FGV'; src: url('/fonts/montserrat-g-600.woff2?v=2') format('woff2'); font-weight: 600; font-display: swap; unicode-range: U+0047; }
      @font-face { font-family: 'Montserrat G FGV'; src: url('/fonts/montserrat-g-700.woff2?v=2') format('woff2'); font-weight: 700; font-display: swap; unicode-range: U+0047; }

      html { scroll-behavior: smooth; }
      .fgv-root { font-family: 'Source Sans 3', 'Source Sans Pro', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; color: ${PAGE_COLORS.navy}; -webkit-font-smoothing: antialiased; }
      .fgv-root ::selection { background: #BFDBFE; color: ${PAGE_COLORS.navy}; }

      /* --- Navbar (navy) e botões de destaque (azul) --- */
      .fgv-nav-link { font-family: 'Montserrat G FGV', 'Montserrat', sans-serif; font-size: 15px; font-weight: 300; line-height: 25.6px; padding: 8px 7px; color: #fff; }
      /* As abas ocupam o espaço entre a marca e os ícones, com distâncias iguais entre si. */
      .fgv-nav-desk { margin-inline: clamp(24px, 3vw, 56px); }
      .fgv-nav-desk .fgv-nav-link { padding: 8px 6px; }
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

      /* Nome da marca no menu e no rodapé: mesma escrita da logo (Montserrat seminegrito, caixa-alta) */
      .brand-word { font-family: 'Montserrat G FGV', 'Montserrat', sans-serif; font-weight: 600; text-transform: uppercase; letter-spacing: 0.01em; line-height: 1.1; }

      /* --- Abertura (medidas da referência) --- */
      .fgv-hero-text { font-family: 'Montserrat G FGV', 'Montserrat', sans-serif; font-size: 20px; font-weight: 300; line-height: 26px; color: #fff; text-shadow: 0 1px 12px rgba(0,0,0,0.45); }
      /* Altura da abertura: tela cheia, conteúdo centrado na área abaixo da navbar */
      .fgv-hero { height: 100vh; min-height: 620px; padding-top: 64px; }

      ${PAGES_CSS}

      /* Troca de aba em duas etapas.
         Saída: a página sobe um pouco e some sobre um fundo navy (a cor do topo de todas as abas),
         então a tela nunca fica branca.
         Entrada: o topo nasce todo navy e a foto vai aparecendo; o título sobe revelado de baixo
         para cima, depois o texto e, por fim, o resto da página. Os estados finais usam
         transform: none para não atrapalhar elementos fixos dentro da página. */
      @keyframes pg-out { to { opacity: 0; transform: translateY(-24px); } }
      .pg-swap--out { animation: pg-out .26s cubic-bezier(.4, 0, 1, 1) both; }
      @keyframes pg-veil { from { opacity: 1; } to { opacity: .77; } }
      @keyframes pg-title { from { opacity: 0; transform: translateY(56px); clip-path: inset(0 0 100% 0); } to { opacity: 1; transform: none; clip-path: inset(0 0 -20% 0); } }
      @keyframes pg-rise { from { opacity: 0; transform: translateY(26px); } to { opacity: 1; transform: none; } }
      @keyframes pg-logo { from { opacity: 0; transform: scale(.9) translateY(18px); } to { opacity: 1; transform: none; } }
      .pg-swap--in .pg-hero::before { animation: pg-veil 1.2s ease-out both; }
      .pg-swap--in .pg-hero h1 { animation: pg-title .95s cubic-bezier(.16, 1, .3, 1) .1s both; }
      .pg-swap--in .pg-hero p { animation: pg-rise .85s cubic-bezier(.16, 1, .3, 1) .34s both; }
      .pg-swap--in .pg > :not(:first-child) { animation: pg-rise .8s cubic-bezier(.16, 1, .3, 1) .45s both; }
      .pg-swap--in .fgv-hero-logo { animation: pg-logo 1s cubic-bezier(.16, 1, .3, 1) .08s both; }
      .pg-swap--in .fgv-hero-text { animation: pg-rise .85s cubic-bezier(.16, 1, .3, 1) .38s both; }
      @media (prefers-reduced-motion: reduce) {
        .pg-swap--out, .pg-swap--in .pg-hero::before, .pg-swap--in .pg-hero h1, .pg-swap--in .pg-hero p,
        .pg-swap--in .pg > :not(:first-child), .pg-swap--in .fgv-hero-logo, .pg-swap--in .fgv-hero-text { animation: none; }
      }
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
const RESEARCH_ON = SITE_DATA.pages.research.enabled !== false;
const ABOUT_ON = SITE_DATA.pages.about.enabled !== false;
const ROUTES = ["sobre", "celulas", "research", "competicoes", "eventos", "membros", "alumni", "processo-seletivo", "contato"].filter(
  (r) => (r !== "research" || RESEARCH_ON) && (r !== "sobre" || ABOUT_ON)
);
const ROUTE_ALIASES = { equipe: "sobre", nucleos: "celulas" };
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

/* Transição entre abas: quando a rota muda, a página atual esmaece (fase "out") e,
   em seguida, a nova página é montada e entra com fade e um leve deslize (fase "in").
   Quem pede menos movimento no sistema (prefers-reduced-motion) troca sem animação. */
const PAGE_OUT_MS = 260;
function usePageTransition(route) {
  const [shownRoute, setShownRoute] = useState(route);
  const [pagePhase, setPagePhase] = useState("in");
  useEffect(() => {
    if (route === shownRoute) return undefined;
    const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShownRoute(route);
      return undefined;
    }
    setPagePhase("out");
    const t = setTimeout(() => {
      setShownRoute(route);
      setPagePhase("in");
    }, PAGE_OUT_MS);
    return () => clearTimeout(t);
  }, [route]); // eslint-disable-line react-hooks/exhaustive-deps
  return [shownRoute, pagePhase];
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

/* Símbolo oficial da FGV Crypto: octógono de nós ligados (traçado a partir do PNG
 * da marca, em coordenadas de 1024 px). Usa currentColor, então herda a cor do texto. */
const LOGO_NODES = {
  A: [388, 237], B: [623, 237], C: [786, 406], D: [786, 634], E: [623, 800],
  F: [389, 800], G: [223, 635], H: [223, 405], I: [504, 521], J: [669, 521],
};
const LOGO_LINES = ["AB", "BC", "CD", "DE", "EF", "FG", "GH", "HA", "AE", "AD", "BF", "CF", "AC", "BD", "CE", "DF", "HI", "GI"];
const LOGO_VIEWBOX = "189 203 632 632";

function LogoGlyph() {
  return (
    <>
      <g stroke="currentColor" strokeWidth="12" strokeLinecap="round">
        {LOGO_LINES.map((l) => {
          const [x1, y1] = LOGO_NODES[l[0]];
          const [x2, y2] = LOGO_NODES[l[1]];
          return <line key={l} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
      </g>
      <g fill="currentColor">
        {Object.entries(LOGO_NODES).map(([k, [cx, cy]]) => (
          <circle key={k} cx={cx} cy={cy} r="29" />
        ))}
      </g>
    </>
  );
}

/* Missão, visão e valores (página inicial e aba Sobre) */
function MissionVisionValues({ pillars, id }) {
  return (
    <section id={id} className="mv-band" aria-label="Missão, visão e valores">
      <div className="mv-grid">
        {pillars.map((item) => (
          <article key={item.title} className="mv-item">
            <h3>{item.title}</h3>
            {item.text && <p>{item.text}</p>}
            {item.list && (
              <ul className="mv-values">
                {item.list.map((v) => (
                  <li key={v}>{v}</li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

function BrandMark({ className = "h-9 w-9" }) {
  return (
    <svg viewBox={LOGO_VIEWBOX} className={className} fill="none" aria-hidden="true">
      <LogoGlyph />
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
      count: subtle ? 34 : 30,
      maxCount: 70,
      maxSize: 5,
      maxOpacity: subtle ? 0.75 : 0.5,
      linkDistance: 330,
      linkOpacity: subtle ? 0.45 : 0.28,
      linkWidth: subtle ? 1.3 : 1,
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

/* Logo principal da abertura (~250px, branco): símbolo + "FGV DIGITAL ASSETS". Substituível por imagem em SITE_DATA.hero.logo */
function HeroLogo({ src, alt }) {
  const size = { width: "clamp(230px, 28vw, 400px)", height: "auto" };
  if (isSet(src)) return <img src={src} alt={alt} className="fgv-hero-logo mx-auto block max-w-full" style={size} />;
  return (
    <svg viewBox="0 0 300 262" className="fgv-hero-logo mx-auto block max-w-full" style={size} role="img" aria-label={alt}>
      <svg x="70" y="0" width="160" height="160" viewBox={LOGO_VIEWBOX} color="#fff" aria-hidden="true">
        <LogoGlyph />
      </svg>
      <text x="150" y="220" textAnchor="middle" fill="#fff" fontFamily="'Montserrat G FGV', Montserrat, sans-serif" fontWeight="600" fontSize="48" letterSpacing="1">
        FGV
      </text>
      <text x="150" y="254" textAnchor="middle" fill="#fff" fontFamily="'Montserrat G FGV', Montserrat, sans-serif" fontWeight="600" fontSize="22" letterSpacing="0.6">
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
      {isSet(item.logo) ? <img src={item.logo} alt={item.name} loading="lazy" style={item.h ? { "--logo-h": item.h } : undefined} /> : <span>{item.name}</span>}
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
            <div className={`re-members-grid re-members-grid--${group.size || "sm"}${group.layout === "triangulo" ? " re-members-grid--tri" : ""}`}>
              {group.people.map((p, i) => (
                <article key={`${p.role}-${i}`} className="re-member">
                  <div className="re-member-photo">
                    {isSet(p.photo) ? (
                      <img src={p.photo} alt={p.name} loading="lazy" />
                    ) : (
                      <span className="re-member-initials">{initials(p.name)}</span>
                    )}
                  </div>
                  <div className="re-member-info">
                    <h3 className="re-member-name">{p.name}</h3>
                    <p className="re-member-cargo">{p.role}</p>
                    {isSet(p.course) && <p className="re-member-curso">{p.course}</p>}
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
                  {isSet(p.role) && <p className="re-alumnus-papel">{p.role}</p>}
                  <h3 className="re-alumnus-nome">{p.name}</h3>
                  <p className="re-alumnus-empresa">{[p.position, p.company].filter((v) => isSet(v)).join(" · ")}</p>
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
// Foto principal (ev.photo) e fotos extras (ev.morePhotos). Com mais de uma, aparecem
// miniaturas clicáveis abaixo da foto.
function EventGallery({ ev, badge }) {
  const photos = [ev.photo, ...(ev.morePhotos || [])].filter((src) => isSet(src));
  const [current, setCurrent] = useState(0);
  return (
    <div>
      <div className="re-evento-foto">
        {badge}
        {photos.length > 0 ? (
          <img src={photos[current]} alt={`${ev.title}: foto ${current + 1} de ${photos.length}`} loading="lazy" />
        ) : (
          <span className="re-evento-sem-foto" aria-hidden="true">
            <BrandMark />
          </span>
        )}
      </div>
      {photos.length > 1 && (
        <div className="re-evento-thumbs">
          {photos.map((src, i) => (
            <button
              key={src}
              type="button"
              className="re-evento-thumb"
              aria-pressed={i === current}
              aria-label={`Ver foto ${i + 1} de ${photos.length}`}
              onClick={() => setCurrent(i)}
            >
              <img src={src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function EventsPage({ data, photo }) {
  return (
    <main className="pg">
      <PageHero title={data.title} text={data.text} photo={photo} />
      <section className="pg-section">
        {/* Lista por semestre: a data fica numa etiqueta sobre a foto, a foto alterna de
            lado a cada evento e a data por extenso vira uma linha azul acima do título. */}
        <div className="re-eventos ev-list">
          {data.groups.map((group) => (
            <section key={group.semester} className="re-eventos-grupo">
              <h2 className="re-eventos-semestre">{group.semester}</h2>
              <div className="re-eventos-lista">
                {group.items.map((ev) => {
                  const d = parseDate(ev.date);
                  return (
                    <article key={`${ev.date}-${ev.title}`} className="re-evento">
                      <EventGallery
                        ev={ev}
                        badge={
                          <span className="ev-tag" aria-hidden="true">
                            <strong>{String(d.d).padStart(2, "0")}</strong>
                            <span>{d.short}</span>
                          </span>
                        }
                      />
                      <div className="re-evento-info">
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

/* Arte estática (rede de nós sobre navy) usada no lugar da foto enquanto ela não
   existe. `seed` muda o desenho de um bloco para outro. */
function NetworkArt({ seed = 1 }) {
  let s = seed * 9301 + 49297;
  const rand = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  const nodes = Array.from({ length: 26 }, () => [rand() * 600, rand() * 480, 1.5 + rand() * 2.5]);
  const lines = [];
  nodes.forEach((a, i) =>
    nodes.slice(i + 1).forEach((b) => {
      const d = Math.hypot(a[0] - b[0], a[1] - b[1]);
      if (d < 130) lines.push([a, b, 1 - d / 130]);
    })
  );
  const gid = `fs-grad-${seed}`;
  return (
    <svg viewBox="0 0 600 480" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id={gid} cx="70%" cy="25%" r="85%">
          <stop offset="0" stopColor="#1C335F" />
          <stop offset="0.55" stopColor={PAGE_COLORS.navy} />
          <stop offset="1" stopColor={PAGE_COLORS.navyDeep} />
        </radialGradient>
      </defs>
      <rect width="600" height="480" fill={`url(#${gid})`} />
      {lines.map(([a, b, o], i) => (
        <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#8FB3FF" strokeOpacity={0.35 * o} strokeWidth="1" />
      ))}
      {nodes.map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="#C9DAFF" fillOpacity="0.75" />
      ))}
    </svg>
  );
}

/* Bloco de ponta a ponta: foto (ou arte) de um lado e painel de texto do outro.
   tone: "dark" (painel navy) | "light" (branco) | "band" (cinza claro).
   reverse: texto à esquerda e foto à direita. */
/* --- Competições e eventos (tela inicial) --- */
function Showcase({ data, competition, events, competitionsButton, eventsButton }) {
  const trackRef = useRef(null);
  const slides = [
    ...(isSet(competition.photo)
      ? [{ key: "competicao", photo: competition.photo, kicker: data.competitionKicker, title: competition.photoCaption }]
      : []),
    ...events.map((ev) => ({ key: `${ev.date}-${ev.title}`, photo: ev.photo, kicker: parseDate(ev.date).long, title: ev.title })),
  ];
  const move = (dir) => {
    const t = trackRef.current;
    if (!t) return;
    const slide = t.querySelector(".hm-show-slide");
    const step = slide ? slide.getBoundingClientRect().width + 24 : t.clientWidth;
    t.scrollBy({ left: dir * step, behavior: "smooth" });
  };
  return (
    <section
      id="competicoes-eventos"
      className="hm-show scroll-mt-16"
      aria-labelledby="competicoes-eventos-titulo"
      style={isSet(data.backgroundImage) ? { backgroundImage: `linear-gradient(rgba(${PAGE_COLORS.navyRgb}, 0.82), rgba(${PAGE_COLORS.navyRgb}, 0.9)), url("${data.backgroundImage}")` } : undefined}
    >
      <div className="pg-container">
        <h2 id="competicoes-eventos-titulo" className="hm-show-title pg-heading">{data.title}</h2>
        {isSet(data.subtitle) && <p className="hm-show-sub">{data.subtitle}</p>}
        {slides.length > 0 && (
          <div className="hm-show-carousel">
            <div className="hm-show-track" ref={trackRef}>
              {slides.map((s) => (
                <figure key={s.key} className="hm-show-slide">
                  <img src={s.photo} alt={s.title} loading="lazy" />
                  <figcaption>
                    <span>{s.kicker}</span>
                    <strong>{s.title}</strong>
                  </figcaption>
                </figure>
              ))}
            </div>
            {slides.length > 2 && (
              <>
                <button type="button" className="hm-show-arrow hm-show-arrow--prev" onClick={() => move(-1)} aria-label="Foto anterior">
                  <ChevronLeft className="h-7 w-7" aria-hidden="true" />
                </button>
                <button type="button" className="hm-show-arrow hm-show-arrow--next" onClick={() => move(1)} aria-label="Próxima foto">
                  <ChevronRight className="h-7 w-7" aria-hidden="true" />
                </button>
              </>
            )}
          </div>
        )}
        <div className="hm-more">
          <a className="pg-btn pg-btn--light" href="#/competicoes">
            {competitionsButton}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <a className="pg-btn hm-show-btn-outline" href="#/eventos">
            {eventsButton}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

function FullSplit({ id, tone = "dark", reverse = false, compact = false, photo, photoAlt = "", photoPosition, caption, art, children, labelledBy }) {
  return (
    <section id={id} className={`fs fs--${tone}${reverse ? " fs--reverse" : ""}${compact ? " fs--compact" : ""} scroll-mt-16`} aria-labelledby={labelledBy}>
      <div className="fs-media">
        {isSet(photo) ? (
          <>
            <img src={photo} alt={photoAlt} loading="lazy" style={photoPosition ? { objectPosition: photoPosition } : undefined} />
            {isSet(caption) && <p className="fs-caption">{caption}</p>}
          </>
        ) : (
          <div className="fs-art">
            <NetworkArt seed={art?.seed ?? 1} />
            {art?.value && (
              <p className="fs-art-caption">
                <strong>{art.value}</strong>
                {art.label && <span>{art.label}</span>}
              </p>
            )}
          </div>
        )}
      </div>
      <div className="fs-panel">
        <div className="fs-inner">{children}</div>
      </div>
    </section>
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
      <MissionVisionValues pillars={data.pillars} />

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

/* --- Células (#/celulas) --- */
function NucleosPage({ data, photo }) {
  return (
    <main className="pg">
      <PageHero title={data.title} text={data.text} photo={photo} />

      {/* === SEÇÃO: NÚCLEOS — INTRODUÇÃO === */}
      {/* "Como funciona o semestre" saiu do site; os passos continuam em conteudo.js (pages.nucleos.cycle). */}
      <section className="pg-block">
        <div className="pg-container">
          <p className="pg-lead">{data.intro}</p>
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
                  {isSet(n.partner) && <p className="pg-kicker">{data.partnerLabel} {n.partner}</p>}
                  <h3 className="pg-row-title pg-heading">{n.name}</h3>
                  <p style={{ lineHeight: 1.6 }}>{n.description}</p>
                  <p className="pg-kicker">{data.deliverablesLabel}</p>
                  <ul className="nu-list">
                    {n.deliverables.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                  {RESEARCH_ON && SITE_DATA.pages.research.groups.some((g) => g.items.some((it) => it.nucleo === n.name)) && (
                    <p>
                      <a className="pg-textlink" href={`#/research?nucleo=${encodeURIComponent(n.name)}`}>
                        {data.researchLink}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                    </p>
                  )}
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
        {item.authors && item.authors.length > 0 && <p className="rs-authors">{item.authors.join(", ")}</p>}
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

/* --- Competições (#/competicoes) ---
   Abertura igual à das outras abas; depois uma faixa por competição (nome em
   negrito). Cada participação tem foto de um lado e, do outro, "competição + ano"
   em itálico, o resultado em caixa alta, um fio, o texto e a linha de membros
   (formato do Time Acadêmico do FGV Finance). A foto alterna de lado. */
function CompetitionsPage({ data, photo }) {
  return (
    <main className="pg">
      <PageHero title={data.title} text={data.text} photo={photo} />
      {data.items.map((c, ci) => (
        <section key={c.name} className={`cp-sec${ci % 2 ? " cp-sec--navy" : ""}`} aria-label={c.name}>
          <h2 className="cp-sec-title">{c.name}</h2>
          <div className="cp-entries">
            {c.entries.map((e, ei) => (
              <article key={`${e.year}-${e.result}`} className="cp-entry">
                <div className="cp-photo">
                  {isSet(e.photo) ? (
                    <img src={e.photo} alt={`${c.name} ${e.year}: ${e.result}`} loading="lazy" />
                  ) : (
                    <NetworkArt seed={ci * 5 + ei + 2} />
                  )}
                </div>
                <div className="cp-text">
                  <h3>
                    <span className="cp-h-name">{c.name} {e.year}</span>
                    <span className="cp-h-result">{e.result}</span>
                  </h3>
                  {e.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                  {isSet(e.members) && <p className="cp-members">Membros - {e.members}</p>}
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}

/* --- Contato (#/contato) --- */
function ContactPage({ data, photo, mode, email, brandName }) {
  const empty = { nome: "", email: "", mensagem: "" };
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState("idle"); // idle | invalid | loading | sent | mailto | error
  const [place, setPlace] = useState(0);
  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (status === "invalid" || status === "error") setStatus("idle");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.nome.trim() || !EMAIL_REGEX.test(form.email.trim())) {
      setStatus("invalid");
      return;
    }
    if (mode === "mailto") {
      const subject = encodeURIComponent(`Contato pelo site — ${form.nome.trim()}`);
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
      setForm(empty);
    } catch (err) {
      setStatus("error");
    }
  };

  const showForm = mode !== "off";
  const message =
    status === "invalid"
      ? { cls: "is-error", text: "Preencha seu nome e um e-mail válido." }
      : status === "error"
      ? { cls: "is-error", text: data.error }
      : status === "sent"
      ? { cls: "is-ok", text: data.sent }
      : status === "mailto"
      ? { cls: "is-ok", text: data.mailtoSent }
      : null;

  const addresses = data.addresses || [];
  const current = addresses[place];

  return (
    <main className="pg">
      <PageHero title={data.title} text={data.text} photo={photo} />

      {/* === SEÇÃO: CONTATO — CHAMADA E FORMULÁRIO (centralizados) === */}
      <section className="ct-section">
        <div className="pg-container">
          <div className="ct-wrap">
            <div className="ct-head">
              <h2>{data.formTitle}</h2>
              {isSet(email) && (
                <p>
                  <a href={`mailto:${email}`}>{email}</a> {showForm ? data.formIntro : ""}
                </p>
              )}
            </div>

            {showForm && (
              <form onSubmit={onSubmit} noValidate aria-label={`Fale com a ${brandName}`}>
                <div className="ct-fields">
                  <div className="ct-field">
                    <label htmlFor="ct-nome">Nome *</label>
                    <input id="ct-nome" type="text" autoComplete="name" required value={form.nome} onChange={update("nome")} />
                  </div>
                  <div className="ct-field">
                    <label htmlFor="ct-email">Email *</label>
                    <input id="ct-email" type="email" inputMode="email" autoComplete="email" required value={form.email} onChange={update("email")} />
                  </div>
                  <div className="ct-field">
                    <label htmlFor="ct-mensagem">Mensagem</label>
                    <textarea id="ct-mensagem" rows={3} value={form.mensagem} onChange={update("mensagem")} />
                  </div>
                </div>
                <div className="ct-actions">
                  <button type="submit" className="ct-submit" disabled={status === "loading"}>
                    {status === "loading" ? "Enviando…" : data.button}
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

      {/* === SEÇÃO: CONTATO — ENDEREÇO E MAPA (faixa cinza) === */}
      {current && (
        <section className="ct-place">
          <div className="ct-place-inner">
            <h2>
              {data.addressLine1}
              <br />
              {data.addressLine2}
            </h2>
            {addresses.length > 1 && (
              <div className="ct-map-tabs" role="group" aria-label="Escolha o endereço no mapa">
                {addresses.map((a, i) => (
                  <button key={a.label} type="button" className="ct-map-tab" aria-pressed={i === place} onClick={() => setPlace(i)}>
                    {a.label}
                  </button>
                ))}
              </div>
            )}
            <iframe
              key={current.query}
              className="ct-map-frame"
              title={`Mapa: ${current.query}`}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(current.query)}&z=15&hl=pt-BR&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      )}
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
  const [shownRoute, pagePhase] = usePageTransition(route);

  const { brand, nav, hero, about, stats, highlights, testimonials, selectionBand, sponsors, ecosystem, newsletter, footer, pages } = SITE_DATA;

  /* --- Estado derivado: o que está preenchido e pode aparecer ------------- */
  const heroPhotoOk = useImageAvailable(isSet(hero.backgroundImage) ? hero.backgroundImage : "");
  const pagePhoto = heroPhotoOk ? hero.backgroundImage : null;
  const hasEmail = isSet(brand.email);
  const newsletterMode =
    newsletter.enabled === false ? "off" : isSet(newsletter.endpoint) ? "api" : hasEmail ? "mailto" : SHOW_PLACEHOLDERS ? "demo" : "off";
  const contactMode = isSet(pages.contact.endpoint) ? "api" : hasEmail ? "mailto" : SHOW_PLACEHOLDERS ? "demo" : "off";
  const newsletterCta = newsletterMode !== "off" ? nav.newsletterButton : null;
  // Link ativo: a aba da rota atual; "Início" na página inicial
  const isActive = (href) => (route === "home" ? href === "#inicio" : href === `#/${route}`);
  const navLinks = nav.links.filter(
    (l) => (l.href !== "#/research" || RESEARCH_ON) && (l.href !== "#/sobre" || ABOUT_ON)
  );
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
    // "instant": o site usa rolagem suave, mas aqui a página nova ainda está invisível
    if (shownRoute !== "home") {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    const hash = window.location.hash;
    if (hash && hash.length > 1 && !hash.startsWith("#/")) {
      const el = document.getElementById(hash.slice(1));
      if (el) el.scrollIntoView({ behavior: "instant" });
      return;
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [shownRoute]);

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
    <div className="fgv-root min-h-screen bg-white" style={pagePhase === "out" ? { background: PAGE_COLORS.navy } : undefined}>
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
            <BrandMark className="h-8 w-8 text-white" />
            <span className="brand-word text-[15px]">{brand.name}</span>
            {isSet(nav.institutionLogo) && (
              <>
                <span className="h-6 w-px bg-white opacity-30" aria-hidden="true" />
                <img src={nav.institutionLogo} alt={brand.institution} style={{ height: 30 }} />
              </>
            )}
          </a>

          <ul className="fgv-nav-desk hidden flex-1 items-center justify-evenly xl:flex">
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
      {/* Troca de aba suave: a página atual some rápido e a nova entra subindo de leve. */}
      <div key={shownRoute} className={`pg-swap pg-swap--${pagePhase}`}>
      {shownRoute === "sobre" ? (
        <AboutPage data={pages.about} photo={pagePhoto} />
      ) : shownRoute === "celulas" ? (
        <NucleosPage data={pages.nucleos} photo={pagePhoto} />
      ) : shownRoute === "research" ? (
        <ResearchPage data={pages.research} photo={pagePhoto} />
      ) : shownRoute === "competicoes" ? (
        <CompetitionsPage data={pages.competitions} photo={pagePhoto} />
      ) : shownRoute === "membros" ? (
        <MembersPage data={pages.members} photo={pagePhoto} />
      ) : shownRoute === "alumni" ? (
        <AlumniPage data={pages.alumni} photo={pagePhoto} />
      ) : shownRoute === "processo-seletivo" ? (
        <SelectionPage
          data={pages.selection}
          photo={pagePhoto}
          selection={nav.selection}
          labels={selectionBand}
          notify={newsletterMode !== "off"}
        />
      ) : shownRoute === "eventos" ? (
        <EventsPage data={pages.events} photo={pagePhoto} />
      ) : shownRoute === "contato" ? (
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
              aberturas das abas), rede de partículas atenuada, logo grande no centro
              e uma frase curta (sem botões, como na CJE e na FGV Finance). As três frases sobre o viaduto ficam na aba Sobre. */}
          <section
            id="inicio"
            className="fgv-hero relative overflow-hidden"
            style={{
              backgroundColor: PAGE_COLORS.navy,
              backgroundImage: heroPhotoOk
                ? `radial-gradient(ellipse 55% 50% at 50% 55%, rgba(${PAGE_COLORS.navyRgb}, 0.5), rgba(${PAGE_COLORS.navyRgb}, 0) 75%), linear-gradient(rgba(${PAGE_COLORS.navyRgb}, 0.64), rgba(${PAGE_COLORS.navyRgb}, 0.74)), url("${hero.backgroundImage}")`
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
          {/* Bloco de ponta a ponta (como na CJE): foto do grupo à esquerda; frase de
              destaque, parágrafos, apresentação institucional (com PDF) e link à direita. */}
          <FullSplit
            id="quem-somos"
            tone="light"
            photo={about.photo}
            photoAlt={`Membros da ${brand.name}`}
            caption={about.photoCaption}
            art={{ seed: 3 }}
            labelledBy="quem-somos-titulo"
          >
            <h2 id="quem-somos-titulo" className="fs-title pg-heading">{about.title}</h2>
            <p className="fs-lead">{about.lead}</p>
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <div className="fs-actions">
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
              {ABOUT_ON && (
                <a className="pg-textlink" href={about.link.href}>
                  {about.link.label}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              )}
            </div>
          </FullSplit>

          {/* === SEÇÃO: MISSÃO, VISÃO E VALORES === */}
          {/* Três colunas no formato da FGV Finance. O texto vem de pages.about.pillars,
              o mesmo da aba Sobre. */}
          <MissionVisionValues id="missao" pillars={pages.about.pillars} />

          {/* === SEÇÃO: NÚCLEOS === */}
          {/* Um card curto por célula técnica, com link para os estudos da célula. */}
          {/* Bloco de ponta a ponta: painel navy à esquerda, foto à direita. */}
          <FullSplit
            id="nucleos-destaque"
            tone="dark"
            reverse
            compact
            photo={highlights.nucleos.photo}
            photoAlt={`Célula da ${brand.name}`}
            caption={highlights.nucleos.photoCaption}
            art={{ seed: 7, value: String(pages.nucleos.technical.length), label: highlights.nucleos.artLabel }}
            labelledBy="nucleos-titulo"
          >
            <h2 id="nucleos-titulo" className="fs-title pg-heading">{highlights.nucleos.title}</h2>
            {highlights.nucleos.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <ul className="fs-list">
              {pages.nucleos.technical.map((n) => (
                <li key={n.name}>
                  <a href="#/celulas">
                    <span>
                      <span className="fs-list-name">{n.name}</span>
                      <span className="fs-list-note">{n.short || n.description}</span>
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
            <div className="fs-actions">
              <a className="pg-btn pg-btn--light" href="#/celulas">
                {highlights.nucleos.button}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </FullSplit>

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

          {/* === SEÇÃO: COMPETIÇÕES E EVENTOS === */}
          {/* Como "CJE na mídia & eventos": foto aérea da FGV escurecida ao fundo, título,
              frase de destaque e carrossel com a competição e os últimos eventos. */}
          <Showcase
            data={highlights.showcase}
            competition={highlights.competitions}
            events={latestEvents.filter((ev) => isSet(ev.photo) && ev.photo !== about.photo)}
            competitionsButton={highlights.competitions.button}
            eventsButton={highlights.events.button}
          />

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

          {/* === SEÇÃO: PARCEIROS === */}
          {/* Fundo branco, só as logos, em fileiras centralizadas e com alturas equilibradas. */}
          <section id="parceiros" className="pg-block hm-partners scroll-mt-16">
            <div className="pg-container">
              <PgTitle>{sponsors.title}</PgTitle>
              {visibleTiers.length > 0 && (
                <>
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
      </div>

      {/* === SEÇÃO: FOOTER === */}
      {/* Todas as abas, contato e apenas canais oficiais ativos. Fundo no tom mais
          escuro do navy, para não se fundir com a faixa de Parceiros. */}
      <footer className="ft" style={{ background: PAGE_COLORS.navyDeep }}>
        <div className={`${CONTAINER} grid gap-12 py-16 md:grid-cols-3`}>
          <div>
            <a href="#inicio" className="inline-flex items-center gap-3 text-white" style={{ color: "#fff" }}>
              <BrandMark className="h-10 w-10 text-white" />
              <span className="leading-tight">
                <span className="brand-word block text-lg">{brand.name}</span>
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
