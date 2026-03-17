import { CompetitorReport } from "./types";

const knownCompanies: Record<string, Partial<CompetitorReport>> = {
  "notion.com": {
    company: {
      name: "Notion",
      description: "Универсальное рабочее пространство для заметок, документов, управления проектами и вики.",
      industry: "SaaS / Продуктивность",
      founded: "2013",
      employees: "500-1000",
      location: "Сан-Франциско, США",
      logo: "https://www.notion.so/front-static/favicon.ico",
    },
    product: {
      pricing: [
        { name: "Free", price: "$0/мес", features: ["До 10 гостей", "Базовые блоки", "7 дней истории"] },
        { name: "Plus", price: "$10/мес", features: ["Безлимит гостей", "Безлимит блоков", "30 дней истории"] },
        { name: "Business", price: "$18/мес", features: ["SAML SSO", "Приватные пространства", "Bulk export"] },
        { name: "Enterprise", price: "По запросу", features: ["Audit log", "SCIM", "Выделенный менеджер"] },
      ],
      features: ["Документы и вики", "Базы данных", "Канбан-доски", "Календарь", "Шаблоны", "API", "AI-ассистент"],
      usp: "Единая платформа, заменяющая десятки инструментов для командной работы",
      targetAudience: "Стартапы, IT-команды, фрилансеры, студенты",
    },
    marketing: {
      seoScore: 92,
      trafficEstimate: "~200M визитов/мес",
      socialMedia: { twitter: "2.1M подписчиков", linkedin: "500K подписчиков", facebook: "300K подписчиков", instagram: "150K подписчиков" },
      contentStrategy: "Контент-маркетинг через шаблоны, YouTube-туториалы, блог с кейсами пользователей",
    },
    tech: {
      stack: ["React", "Next.js", "TypeScript", "Kotlin", "PostgreSQL", "Redis", "AWS"],
      analytics: ["Google Analytics", "Segment", "Amplitude"],
      cms: "Собственная CMS",
      cdn: "CloudFront",
      hosting: "AWS",
    },
    swot: {
      strengths: ["Гибкая система блоков", "Сильное комьюнити", "Фримиум модель", "Кросс-платформенность"],
      weaknesses: ["Медленная загрузка больших документов", "Сложность для новичков", "Ограниченные оффлайн-возможности"],
      opportunities: ["AI-интеграции", "Enterprise рынок", "Образовательный сектор"],
      threats: ["Конкуренция от Microsoft Loop", "Coda и другие all-in-one решения", "Снижение роста SaaS рынка"],
    },
    recommendations: [
      "Сфокусируйтесь на скорости — Notion проигрывает в производительности на больших документах",
      "Предложите лучший оффлайн-режим — это слабое место Notion",
      "Создайте миграционные инструменты из Notion для лёгкого перехода",
      "Инвестируйте в AI-функции — это главный тренд в продуктивности",
      "Разработайте marketplace шаблонов с монетизацией для авторов",
      "Сделайте упор на простоту — многие пользователи считают Notion слишком сложным",
    ],
  },
  "slack.com": {
    company: {
      name: "Slack",
      description: "Платформа корпоративных коммуникаций и совместной работы.",
      industry: "SaaS / Коммуникации",
      founded: "2013",
      employees: "2000-5000",
      location: "Сан-Франциско, США",
      logo: "https://slack.com/favicon.ico",
    },
    product: {
      pricing: [
        { name: "Free", price: "$0/мес", features: ["90 дней истории", "10 интеграций", "1:1 звонки"] },
        { name: "Pro", price: "$8.75/мес", features: ["Вся история", "Безлимит интеграций", "Групповые звонки"] },
        { name: "Business+", price: "$12.50/мес", features: ["SAML SSO", "Compliance", "24/7 поддержка"] },
        { name: "Enterprise Grid", price: "По запросу", features: ["Неограниченные workspace", "eDiscovery", "DLP"] },
      ],
      features: ["Каналы", "Прямые сообщения", "Huddles", "Clips", "Workflow Builder", "Интеграции", "Slack Connect"],
      usp: "Стандарт де-факто для корпоративного мессенджинга с мощной экосистемой интеграций",
      targetAudience: "Корпорации, IT-компании, удалённые команды",
    },
    marketing: {
      seoScore: 95,
      trafficEstimate: "~400M визитов/мес",
      socialMedia: { twitter: "1.5M подписчиков", linkedin: "1.2M подписчиков", facebook: "500K подписчиков", instagram: "100K подписчиков" },
      contentStrategy: "B2B контент-маркетинг, партнёрские интеграции, Slack Community",
    },
    tech: {
      stack: ["React", "Electron", "PHP", "Java", "MySQL", "Vitess", "AWS"],
      analytics: ["Mixpanel", "Google Analytics", "Internal analytics"],
      cms: "Собственная CMS",
      cdn: "CloudFront + Fastly",
      hosting: "AWS",
    },
    swot: {
      strengths: ["Огромная база пользователей", "Экосистема интеграций", "Сильный бренд", "Часть Salesforce"],
      weaknesses: ["Высокая стоимость для больших команд", "Потребление ресурсов (Electron)", "Информационный шум"],
      opportunities: ["AI-бот интеграции", "Замена email полностью", "Вертикальные решения"],
      threats: ["Microsoft Teams (бесплатно с Office 365)", "Discord для бизнеса", "Telegram/WhatsApp Business"],
    },
    recommendations: [
      "Предложите агрессивный прайсинг — Slack дорого стоит для больших команд",
      "Сделайте нативное приложение вместо Electron — это ключевое преимущество",
      "Сфокусируйтесь на видео-коммуникациях — Slack отстаёт от Zoom/Teams",
      "Создайте лучшие инструменты для async-коммуникации",
      "Интегрируйте AI для суммаризации каналов и поиска по истории",
      "Разработайте инструменты миграции из Slack для привлечения их пользователей",
    ],
  },
};

function extractDomain(url: string): string {
  try {
    const u = new URL(url.startsWith("http") ? url : `https://${url}`);
    return u.hostname.replace("www.", "");
  } catch {
    return url.replace(/^(https?:\/\/)?(www\.)?/, "").split("/")[0];
  }
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function generateMockData(url: string, id: string): CompetitorReport {
  const domain = extractDomain(url);
  const known = knownCompanies[domain];

  if (known) {
    return {
      id,
      url,
      createdAt: new Date().toISOString(),
      company: known.company!,
      product: known.product!,
      marketing: known.marketing!,
      tech: known.tech!,
      swot: known.swot!,
      recommendations: known.recommendations!,
    };
  }

  const companyName = capitalize(domain.split(".")[0]);

  return {
    id,
    url,
    createdAt: new Date().toISOString(),
    company: {
      name: companyName,
      description: `${companyName} — инновационная компания, предоставляющая цифровые решения для бизнеса и индивидуальных пользователей.`,
      industry: "Технологии / SaaS",
      founded: `${2010 + Math.floor(Math.random() * 10)}`,
      employees: ["50-100", "100-500", "500-1000", "1000-5000"][Math.floor(Math.random() * 4)],
      location: ["Сан-Франциско, США", "Нью-Йорк, США", "Лондон, Великобритания", "Берлин, Германия"][Math.floor(Math.random() * 4)],
      logo: `https://${domain}/favicon.ico`,
    },
    product: {
      pricing: [
        { name: "Starter", price: "$0/мес", features: ["Базовые функции", "1 пользователь", "Email поддержка"] },
        { name: "Professional", price: "$29/мес", features: ["Расширенные функции", "До 10 пользователей", "Приоритетная поддержка"] },
        { name: "Enterprise", price: "По запросу", features: ["Все функции", "Безлимит пользователей", "Выделенный менеджер", "SLA"] },
      ],
      features: ["Дашборд аналитики", "API интеграции", "Командная работа", "Экспорт данных", "Мобильное приложение", "Кастомизация"],
      usp: `${companyName} выделяется удобным интерфейсом и мощными инструментами автоматизации`,
      targetAudience: "Малый и средний бизнес, стартапы, корпоративные клиенты",
    },
    marketing: {
      seoScore: 60 + Math.floor(Math.random() * 30),
      trafficEstimate: `~${Math.floor(Math.random() * 50 + 5)}M визитов/мес`,
      socialMedia: {
        twitter: `${Math.floor(Math.random() * 500 + 10)}K подписчиков`,
        linkedin: `${Math.floor(Math.random() * 300 + 5)}K подписчиков`,
        facebook: `${Math.floor(Math.random() * 200 + 5)}K подписчиков`,
        instagram: `${Math.floor(Math.random() * 100 + 5)}K подписчиков`,
      },
      contentStrategy: "Блог с экспертными статьями, вебинары, YouTube-канал с обучающими видео, email-рассылки",
    },
    tech: {
      stack: ["React", "Node.js", "TypeScript", "PostgreSQL", "Redis", "Docker", "Kubernetes"],
      analytics: ["Google Analytics", "Mixpanel", "Hotjar"],
      cms: "Headless CMS",
      cdn: "Cloudflare",
      hosting: "AWS / GCP",
    },
    swot: {
      strengths: [
        "Интуитивный пользовательский интерфейс",
        "Сильная техническая команда",
        "Быстрый рост пользовательской базы",
        "Активное развитие продукта",
      ],
      weaknesses: [
        "Ограниченное присутствие на международных рынках",
        "Зависимость от ключевых клиентов",
        "Высокие затраты на привлечение клиентов",
      ],
      opportunities: [
        "Выход на новые рынки",
        "AI/ML интеграции для автоматизации",
        "Партнёрства с крупными платформами",
        "Рост спроса на удалённую работу",
      ],
      threats: [
        "Усиление конкуренции от крупных игроков",
        "Экономическая неопределённость",
        "Изменения в регулировании данных",
        "Быстрое устаревание технологий",
      ],
    },
    recommendations: [
      `Выделитесь уникальным ценностным предложением — ${companyName} пока не имеет чёткой дифференциации`,
      "Предложите более гибкую ценовую модель с помесячной оплатой без обязательств",
      "Инвестируйте в контент-маркетинг и SEO для органического роста",
      "Разработайте API и интеграции с популярными инструментами",
      "Создайте программу лояльности и реферальную программу",
      "Сфокусируйтесь на customer success для снижения оттока",
    ],
  };
}
