/* ============================================================================
 * VERSÃO EM INGLÊS DO CONTEÚDO (botão PT | EN do menu)
 * ----------------------------------------------------------------------------
 * Este arquivo só traz os TEXTOS em inglês. Fotos, links, datas e a ordem das
 * listas continuam vindo de conteudo.js.
 *
 *   • Cada campo daqui substitui o campo de mesmo nome em conteudo.js.
 *   • Listas são casadas pela posição: o 1º item daqui traduz o 1º item de lá.
 *     Ao incluir um evento, membro ou competição em conteudo.js, inclua a
 *     tradução na mesma posição aqui. Sem tradução, o item aparece em português.
 *   • Campos que não aparecem aqui ficam iguais nas duas línguas.
 * ========================================================================== */

export const SITE_DATA_EN = {
  brand: {
    formerName: "formerly FGV Crypto",
  },

  nav: {
    links: [
      { label: "Home" },
      { label: "About" },
      { label: "Teams" },
      { label: "Research" },
      { label: "Competitions" },
      { label: "Events" },
      { label: "Members" },
      { label: "Alumni" },
      { label: "Recruitment" },
      { label: "Contact" },
    ],
    newsletterButton: { label: "Newsletter" },
  },

  hero: {
    tagline: "The digital assets student organization at FGV",
  },

  about: {
    title: "About us",
    lead: "The digital assets student organization at FGV in São Paulo.",
    paragraphs: [
      "FGV Digital Assets was founded in 2021 as FGV Crypto by students of Fundação Getulio Vargas. We bring together undergraduates from different programs to study the crypto-asset market and the uses of blockchain technology in the financial system.",
      "In our research and project teams, members analyze protocols, build financial models and study topics such as decentralized lending, stablecoins and asset tokenization. We also organize CryptoWeek, a week of talks that brings the technology and market discussions behind our work to the academic community.",
    ],
    link: { label: "Read our story" },
  },

  stats: {
    title: "The organization in numbers",
    items: [
      { label: "years of history" },
      { label: "teams" },
      { label: "Cryptoweek editions" },
      { label: "titles at FGV's Digital Currencies Datathon" },
      { label: "applicants in the last recruitment" },
    ],
  },

  highlights: {
    nucleos: {
      title: "Teams",
      paragraphs: [
        "Every semester, members are organized into work teams, each responsible for a project in one area of the digital assets market.",
        "Throughout the semester, the teams do work close to the day-to-day of the market: protocol analysis, research and portfolio management, cases and competitions, and prototypes of new products. Projects meet weekly and are followed by market institutions, which gives members full immersion and direct contact with professionals in the field.",
      ],
      artLabel: "teams",
      button: "Meet the teams",
    },
    competitions: {
      title: "Competitions",
      photoCaption: "2024 Datathon champions: Crypto X Quant team",
      button: "See the competitions",
    },
    showcase: {
      title: "Competitions and events",
      subtitle: "Two-time champions of FGV EESP's Digital Currencies Datathon",
      competitionKicker: "Competition",
    },
    events: { button: "See all events" },
  },

  testimonials: {
    title: "Testimonials",
  },

  selectionBand: {
    title: "Recruitment",
    openLabel: "Applications open",
    closedLabel: "Applications closed",
    openText: "We are looking for FGV-SP undergraduates from any program who are interested in blockchain, crypto assets and financial markets. No prior knowledge is required.",
    closedText: "Recruitment opens twice a year, in February and August. See the stages and the FAQ.",
    applyLabel: "Apply",
    moreLabel: "How it works",
    notifyLabel: "Get notified",
    artLabel: "stages to full membership",
  },

  sponsors: {
    title: "Partners",
    subtitle: "Institutions that support our teams, our events and our members' development.",
    tiers: [{ label: "Partners" }],
    invite: {
      title: "Propose a project to us",
      text: "Consulting projects, panels, workshops and Cryptoweek events with FGV-SP students. Tell us the topic and we will get in touch.",
      label: "Get in touch",
    },
  },

  ecosystem: {
    title: "We have also worked with",
    items: [
      { note: "2nd Datathon (2021) and talks" },
      { note: "Tokenization workshop and Cryptoweek" },
      { note: "Academic paper and Cryptoweek" },
      { note: "Research (2023) and talks" },
      { note: "Cryptoweeks 2025.2 and 2026.2" },
      { note: "Cryptoweeks 2025.1 and 2026.1" },
      { note: "Workshop with B3 and event at Itaú" },
      { note: "Cryptoweeks 2026.1 and 2026.2" },
      { note: "Tokenization in agribusiness" },
      { note: "Cryptoweeks 2023.1 and 2025.1" },
      { note: "Panels on Bitcoin and ETFs" },
      { note: "Blockchain in logistics" },
    ],
  },

  newsletter: {
    title: "Get our updates",
    text: "Events, Cryptoweek and the opening of recruitment.",
    label: "Your email",
    placeholder: "name@domain.com",
    button: "Subscribe",
    loading: "Sending…",
    invalid: "Enter a valid email (e.g. name@domain.com).",
    error: "We could not complete your subscription right now. Please try again shortly.",
    privacy: "You can unsubscribe at any time.",
    successTitle: "Subscription confirmed",
    successText: "We will send the next edition to",
    mailtoTitle: "One more step",
    mailtoText: "We opened your email app with the subscription request. Just send the message.",
    successReset: "Subscribe another email",
  },

  footer: {
    description: "FGV-SP student organization focused on digital finance and crypto assets, founded in 2021 as FGV Crypto.",
    privacy: { label: "Privacy policy" },
  },

  pages: {
    about: {
      title: "About",
      text: "FGV-SP student organization focused on digital finance, crypto assets and the new financial infrastructure.",
      sectionTitle: "Who we are",
      deck: { label: "Institutional presentation (PDF)" },
      pillars: [
        { title: "Mission", text: "To develop our members in the world of crypto assets." },
        { title: "Vision", text: "To be a reference in crypto assets in Brazil." },
        { title: "Values", list: ["Excellence", "Integrity", "Honesty", "A sense of family"] },
      ],
      timelineTitle: "Our story",
      next: [{ label: "Meet the teams" }, { label: "Meet the members" }, { label: "See the events" }],
    },

    nucleos: {
      title: "Teams",
      text: "Members are organized into teams, each with a hands-on project and direct contact with the market.",
      intro:
        "Our teams turn knowledge into practice in the digital assets market. Each one has a technical focus, applied projects and direct contact with financial and crypto institutions, with weekly meetings throughout the semester.",
      technicalTitle: "Our teams",
      partnerLabel: "Partner:",
      technical: [
        {
          name: "Consulting",
          short: "Strategic projects for partners",
          description:
            "Hands-on training in project management and delivery: members develop strategic solutions for our partners' needs. In 2026.1, the project analyzed the digital assets market from the perspective of a large financial institution, with guidance from Bradesco's Head of Digital Assets.",
          deliverables: ["Market and opportunity analysis", "Strategic paths for the partner", "Final presentation to executives"],
        },
        {
          short: "Research and management of our fund",
          description:
            "Combines research and fund management: asset analysis, investment theses (Buy, Hold and Sell) and management of a real portfolio, with decisions based on data and financial modeling. In 2026.1, the research was done in partnership with BTG Pactual and mentored by Mercado Bitcoin.",
          deliverables: ["Investment theses", "Technical and fundamental analysis", "Monitoring of the fund's portfolio"],
        },
        {
          short: "Hackathons, cases and competitions",
          description:
            "Focused on high performance in competitions: members prepare for hackathons, cases and institutional challenges, building solutions under pressure. We are two-time champions of FGV EESP's Digital Currencies Datathon (2021 and 2024).",
          deliverables: ["Preparation for hackathons and cases", "Participation in competitions", "Solutions built on tight deadlines"],
        },
        {
          short: "Products and prototypes for digital assets",
          description:
            "A space to create and validate innovation projects: products and solutions for the digital assets market, from hypothesis testing to prototype.",
          deliverables: ["Hypothesis testing", "Projects built from scratch", "Viable prototypes"],
        },
      ],
      deliverablesLabel: "What the team delivers",
      researchLink: "See the team's work",
      areasTitle: "Management areas",
      areas: [
        { name: "Partnerships and Communications", description: "Handles partnerships, communications and the organization's social media." },
        { name: "Recruitment", description: "Runs the two selection processes each year: test, group dynamic and interviews." },
        { name: "Trainee Program", description: "Supports new members through training until they become full members." },
      ],
    },

    competitions: {
      title: "Competitions",
      text: "University challenges in which FGV Digital Assets members have stood out.",
      teamsLabel: "Finalist teams",
      items: [
        {
          name: "Hashdex University Challenge",
          entries: [
            {
              result: "Finalists",
              paragraphs: [
                "In 2026, two FGV Digital Assets teams were selected for the final of the Hashathon, a university challenge organized by Hashdex.",
                "Each team built an overview of the crypto market, covering ETFs, DeFi, tokenization, stablecoins and regulation, and developed an applied case. Click a team's name to download its slides.",
              ],
              teams: [
                { members: "Lorenzo Calegaretti, Tiago Luiz and Davi Melo" },
                { members: "Felipe Santoro, Giovanni Fava and João Barros" },
              ],
            },
          ],
        },
        {
          name: "Digital Currencies Datathon",
          entries: [
            {
              result: "Finalists",
              paragraphs: [
                "In 2026, the FGV Crypto team was one of the five finalists of the 7th Digital Currencies Data Challenge (Datathon), held by FGV EESP in partnership with the FGV Digital Finance Research Center and Ripple.",
                "Open to undergraduate teams from all over Brazil, the competition gave each group ten days to build a data-driven solution to a real problem in the crypto-asset ecosystem. FGV Digital Assets also supported this edition, alongside USP-UBRI.",
              ],
            },
            {
              result: "Supporters",
              paragraphs: [
                "In 2025, FGV Digital Assets supported the 6th edition of FGV EESP's Digital Currencies Data Challenge (Datathon), alongside Ripple (UBRI), GV Code and USP-UBRI.",
                "The Datathon brings together undergraduates from all over Brazil and, starting with this edition, from Portugal as well, through Nova SBE. Teams have just a few days to solve a real problem in blockchain, crypto assets and financial innovation.",
              ],
            },
            {
              result: "Champions",
              paragraphs: [
                "In 2024, the Crypto X Quant team, formed together with FGV Quant, won the 5th edition of the Digital Currencies Datathon, beating 19 other teams.",
                "The Datathon is an FGV EESP competition on blockchain, crypto assets and financial innovation, in which teams have just a few days to solve a real problem set by the organizers.",
              ],
              members: "André Togni, Bernardo Rubin, Francisco Zipman and Leonardo Ono",
            },
            {
              result: "Champions",
              paragraphs: [
                "In 2021, FGV Digital Assets won the 2nd edition of the Digital Currencies Datathon, organized by FGV EESP in partnership with Hashdex, with a prize of R$ 8,000.",
                "The team developed a non-directional investment strategy using crypto-asset options.",
              ],
            },
          ],
        },
      ],
    },

    contact: {
      title: "Contact",
      text: "Talk to FGV Digital Assets about partnerships, events, press or recruitment.",
      formTitle: "Get in touch with FGV Digital Assets",
      formIntro: "or fill out the form below:",
      button: "Send message",
      addressLine2: "Bela Vista, São Paulo/SP — also accessible from Rua Itapeva, 432",
      sent: "Message sent. We will reply to the email you provided.",
      mailtoSent: "We opened your email app with the message ready. Just send it.",
      error: "We could not send it right now. Please try again shortly.",
    },

    members: {
      title: "Members",
      text: "Meet the board, the team leads and the members of FGV Digital Assets.",
      groups: [
        {
          title: "Board",
          people: [{ role: "President" }, { role: "Institutional Director" }, { role: "Academic Director" }],
        },
        {
          title: "Team Leads",
          people: [
            { role: "Consulting Team Lead" },
            { role: "Asset Team Lead" },
            { role: "Challenges Team Lead" },
            { role: "Innovation Lab Lead" },
            { role: "Trainee Program Lead" },
          ],
        },
        {
          title: "Members",
          people: [
            { role: "Member" },
            { role: "Member" },
            { role: "Asset Team Member" },
            { role: "Member" },
            { role: "Member" },
            { role: "Member" },
            { role: "Member" },
            { role: "Member" },
            { role: "Member" },
          ],
        },
      ],
    },

    alumni: {
      text: "Our former members work at asset managers, banks and companies across financial markets and digital assets.",
      sectionTitle: "Where our alumni are",
      people: [
        { role: "Former President" },
        { role: "Co-founder and former Vice President" },
        { role: "Former Institutional Director" },
        { role: "Former Institutional Director" },
        {},
        { role: "Former Member" },
        { role: "Former DeFi Team Member" },
        { role: "Co-founder" },
        { role: "Co-founder and former President" },
        { role: "Former President" },
        { role: "Former President" },
        { role: "Former President" },
        { role: "Former Institutional Director (Vice President)" },
        { role: "Former Institutional Director" },
        { role: "Former Institutional Director" },
        { role: "Former Academic Director" },
        { role: "Former Academic Director" },
        { role: "Former Director of Member Management" },
        { role: "Former Director of Integration" },
        { role: "Former Fund Team Lead" },
        { role: "Former DeFi Team Lead" },
        { role: "Former Partnerships Lead" },
        { role: "Former Layers Lead" },
        { role: "Former Partnerships and Communications Lead" },
        { role: "Former Member Management Lead" },
        { role: "Former Fund Projects Lead" },
        { role: "Former Partnerships Lead" },
        { role: "Former Partnerships and Communications Lead" },
        { role: "Former Team Lead" },
        { role: "Former Consulting Team Member" },
        { role: "Former DeFi Team Member" },
        { role: "Former Research Member" },
        { role: "Former Fund Team Member" },
        { role: "Former Member" },
        { role: "Former Research Team Member" },
        { role: "Former Fund Team Member" },
        { role: "Former Member" },
        { role: "Former Member" },
        { role: "Former Fund Team Member" },
        { role: "Former Investment Team Member" },
        { role: "Former Consulting Team Member" },
        { role: "Former Partnerships Member" },
        { role: "Former Researcher" },
        { role: "Former Research Team Member" },
        { role: "Former DeFi Member" },
        { role: "Former Member" },
      ],
    },

    selection: {
      title: "Recruitment",
      text: "",
      intro: {
        before: "The ",
        strong: "FGV Digital Assets Recruitment Process",
        after: " takes place twice a year and is open to FGV-SP undergraduates from any program. We are looking for students interested in blockchain, crypto assets and financial markets who share the organization's values.",
      },
      closedNote: "The next recruitment opens at the start of the semester, in February or August.",
      notifyLabel: "Get notified by email",
      stepsIntro: { before: "The process has ", strong: "three stages" },
      steps: [
        {
          label: "GMAT-style test",
          text: "A GMAT-style multiple-choice exam with questions on logical reasoning, decision-making and global current affairs.",
        },
        {
          label: "Group dynamic",
          text: "In teams, candidates solve a digital finance case and propose technology-based solutions to real challenges in financial markets. This stage assesses teamwork and business sense.",
        },
        {
          label: "Technical and fit interviews",
          text: "Interviews to understand the candidate's practical skills and fit with our culture. Candidates receive preparation material in advance.",
        },
      ],
      afterSteps:
        "Those selected join the trainee program, a training cycle that ends with a final presentation. In 2025.1, the trainees analyzed a token and presented their work at Ripple's office.",
      datesTitle: "Key dates",
      dates: {
        registration: { label: "Applications close" },
        result: { label: "Recruitment results" },
      },
      cta: "Click here to apply!",
      faqTitle: "Frequently asked questions:",
      faq: [
        {
          q: "Do I need prior knowledge to apply?",
          a: "No. You can start from scratch: the trainee program exists precisely to train new members.",
        },
        {
          q: "Who can apply?",
          a: "FGV-SP undergraduates from any program.",
        },
        {
          q: "When do applications open?",
          a: "Twice a year, at the start of each semester. In 2026.1, applications ran until March 1; in 2026.2, from July 28 to August 23.",
        },
        {
          q: "How do I prepare for the interviews?",
          a: "Candidates who reach the 3rd stage receive complete preparation material in advance.",
        },
      ],
    },

    events: {
      title: "Events",
      text: "Talks, panels, workshops and Cryptoweek, a week of events held every semester at FGV EESP.",
      groups: [
        {
          items: [
            {
              title: "Talk with Brasil Bitcoin",
              text: [
                "Jorge de Almeida, CEO, and Hugo Benício, Head of Operations and Sales at Brasil Bitcoin, talked with members about running a Brazilian crypto-asset exchange.",
              ],
            },
            {
              title: "Talk with Henry Oyama (Hashdex)",
              text: [
                "Henry Oyama, Director of Investment Strategies Brazil at Hashdex, talked with members about blockchain, crypto assets and investment strategies in today's market.",
              ],
            },
            {
              title: "Cryptoweek 2026.2",
              text: [
                "October 19 to 22, at FGV EESP. The opening brought together Carlos Akira Sato (PAGOS) and Gabriel Della Torre (Vault Capital) to discuss the impact of blockchain and digital assets.",
                "On the second day, a panel with André Haro, Lucas Oliveira, Bruno Liman and Rafael Puerari, in partnership with WeSearch, discussed what ETFs have changed in the crypto market. The week closed with Murillo Bargas, Head of Crypto at Inter.",
              ],
            },
            {
              title: "Workshop: tokenization in financial markets",
              text: [
                "In partnership with B3 and Z-Invest, as part of World Investor Week. Eduardo Alexandre Marques Silva, head of digital assets at B3, explained how tokenization changes the issuance, trading and settlement of investments.",
              ],
            },
            {
              title: "Talk with Pedro Lorenzini (Itaú Unibanco)",
              text: [
                "An exclusive opportunity for members of FGV Crypto and Inteli Finance to talk with Pedro Lorenzini, one of Itaú Unibanco's key leaders, where he is Global Markets Treasury & Latam Head.",
                "The conversation covered treasury, product strategy and operations in Latin America. We thank Itaú Unibanco and Z-Invest for hosting us.",
              ],
            },
          ],
        },
        {
          items: [
            {
              title: "Blockchain on the Road",
              text: [
                "An evening at FGV EESP with leaders from Bradesco, Ripple and Blockchain Rio on the state of the digital assets market, stablecoins, AMMs and tokenomics, new business models and careers in Web3.",
              ],
            },
            {
              title: "Cryptoweek 2026.1",
              text: [
                "May 11 to 15, at the FGV EESP Auditorium: Igor Carneiro (Vault Capital), Thiago Mello (Head of Crypto at Itaú), Lucas Rocha and Mathias Dal Ri (Nexa Finance), Pedro Lapenta (Director of Yield Strategies at Hashdex) and Rita Casolato (Compliance and Risk at Liqi Digital Assets).",
                "Topics ranged from building a crypto asset manager to the digital assets strategy of the country's largest bank, crypto yield and the new rules from the Central Bank and the CVM.",
              ],
            },
            {
              title: "On-chain analysis session with Bruno Liman",
              text: [
                "A session open to everyone on how to read blockchain data to understand the real flow of capital and anticipate trends in the crypto market.",
              ],
            },
          ],
        },
        {
          items: [
            {
              title: "Cryptoweek 2025.2",
              text: [
                "It opened with B3 on the convergence between traditional markets and the crypto ecosystem, followed by a panel on digital assets in banks with João Aragão and Courtnay Guimarães.",
                "The week also featured a talk on the philosophy of blockchain and crypto-economics, WeSearch on the role of Bitcoin in the fiat world and Ney Miyamoto (B2V) on where asset managers are heading with digital assets.",
              ],
            },
          ],
        },
        {
          items: [
            {
              title: "Trainees' final presentation at Ripple",
              text: [
                "At Ripple's office on Faria Lima, the trainees presented their analysis of a token: governance, tokenomics, fundamental and technical analysis, and strategic buy and sell zones.",
              ],
            },
            {
              title: "Cryptoweek 2025.1",
              text: [
                "Panels with Blockchain Rio and FGV EESP, an event with BTG Pactual's Digital Assets team, the tokenization company Liqi on the tokenization market, and BlockBR.",
              ],
            },
          ],
        },
        {
          items: [
            {
              title: "Cryptoweek 2024.2",
              text: [
                "November 6 to 12: QR Capital on the growth of the crypto market, an event on regulation, Banco BV on crypto and Drex and, with the Logistics League, DHL on blockchain in supply chains.",
              ],
            },
          ],
        },
        {
          items: [
            {
              title: "Cryptoweek 2024.1",
              text: [
                "\"Drex and the tokenized world\" with Marcel Smetana and, in partnership with Agroliga FGV, Anderson Nacaxe (Agrotoken) on tokenization in agribusiness.",
              ],
            },
          ],
        },
        {
          items: [
            {
              title: "Cryptoweek 2023.2",
              text: [
                "Tokenization in agribusiness with Agrotoken and, with FGV Real Estate, tokenization in real estate with Leonardo Paz (CEO of Imovelweb) and Andreas Blazoudakis (CEO of Netspaces).",
              ],
            },
          ],
        },
        {
          items: [
            {
              title: "Cryptoweek 2023.1",
              text: [
                "The first Cryptoweek: crypto asset management, Alexandre Van de Sande, and Cássio, CEO of BlockBR, on tokenization.",
              ],
            },
            {
              title: "Binance Academy: University Tour",
              text: [
                "An introduction to the fundamentals of cryptocurrencies with Binance Academy, in partnership with FGV Crypto.",
              ],
            },
          ],
        },
        {
          items: [
            {
              title: "NFTs: hype or revolution in fashion?",
              text: [
                "With FGV's Fashion Business League, on what NFTs can do for fashion. Speakers included Caio Barbosa (Lumx Studios), Bianca Torquato and Lorenza Sabatini (Vex Authentics), with the legal perspective of FCM Law.",
              ],
            },
            {
              title: "Crypto classes at CEAP Pedreira",
              text: [
                "A series of classes at the Centro Educacional Assistencial Profissionalizante (CEAP), in Pedreira, bringing cryptocurrency and blockchain concepts to young students.",
              ],
            },
          ],
        },
      ],
    },
  },
};
