
import type { Lang } from "@/lib/lang";
import ru from "./messages.ru";

export type Messages = {
  common: {
    more: string;
    language: string;
    menu: string;
    backHome: string;
    photoSoon: string;
    comingSoon: string;
    staffCards: string;
    brandShort: string;
    scrollDown: string;
    cardsPrev: string;
    cardsNext: string;
  };
  nav: {
    home: string;
    about: string;
    finance: string;
    directions: string;
    msb: string;
    partners: string;
    news: string;
    contacts: string;
  };
  decree: {
    line1: string;
    line2: string;
    body: string;
  };
  counters: {
    tagline: string;
    projects: string;
    totalSum: string;
    currencySuffix: string;
  };
  about: {
    heading: string;
    blurb: string;
    pageTitle: string;
    goalTitle: string;
    tasksTitle: string;
    legalTitle: string;
    boardTitle: string;
    leadershipTitle: string;
    departmentHeadsTitle: string;
    secretaryTitle: string;
    docsTitle: string;
    regulatoryTitle: string;
    reportsTitle: string;
    founding: string;
    goal: string;
    tasks: readonly string[];
    legal: readonly string[];
    boardNames: readonly string[];
    boardRoles: readonly string[];
    boardTitles: readonly (string | null)[];
    leadershipNames: readonly string[];
    leadershipRoles: readonly string[];
    departmentNames: readonly string[];
    departmentRoles: readonly string[];
    secretaryName: string;
    secretaryRole: string;
    regulatoryDocs: readonly string[];
    financialReports: readonly string[];
  };
  finance: {
    heading: string;
    blurb: string;
    pageTitle: string;
    toolsTitle: string;
    toolsBody: string;
    applyCta: string;
    applyTitle: string;
    applyIntro: string;
    form: {
      organizationName: string;
      projectGoal: string;
      phone: string;
      email: string;
      submit: string;
      submitting: string;
      successTitle: string;
      success: string;
      errorTitle: string;
      error: string;
      required: string;
    };
    cards: readonly { title: string; description: string }[];
  };
  directions: {
    heading: string;
    blurb: string;
    pageTitle: string;
    focusTitle: string;
    focusBody: string;
    cards: readonly { title: string; description: string }[];
  };
  msb: {
    heading: string;
    blurb: string;
    pageTitle: string;
    pageIntro: string;
    overviewTitle: string;
    overviewBody: string;
    overviewInstruments: string;
    statProjects: string;
    statLocations: string;
    statTotal: string;
    statGrants: string;
    statSplit: string;
    mapTitle: string;
    mapHint: string;
    mapPanelIdle: string;
    mapPanelHint: string;
    selectRegion: string;
    projectsInRegion: string;
    statusActive: string;
    statusCompleted: string;
    noProjects: string;
    closePanel: string;
    financedLabel: string;
    districtTotal: string;
    ofPortfolio: string;
    grantBadge: string;
  };
  partners: {
    heading: string;
    blurb: string;
    pageTitle: string;
    strategyTitle: string;
    strategyBody: string;
    registryTitle: string;
    registryIntro: string;
    cooperationTitle: string;
    cooperationIntro: string;
    cooperationPartnersTitle: string;
    joinTitle: string;
    joinIntro: string;
    docsTitle: string;
    accreditationTitle: string;
    actions: {
      registry: string;
      cooperation: string;
      join: string;
    };
    registryCategories: readonly string[];
    accreditationDocs: readonly string[];
  };
  news: {
    heading: string;
    blurb: string;
    readMore: string;
    pageTitle: string;
    pageIntro: string;
    updatesTitle: string;
    updatesBody: string;
    previewDescription: string;
    previewImage: string;
    placeholders: readonly { title: string; date: string; excerpt: string }[];
  };
  footer: {
    addressLabel: string;
    addressLines: readonly [string, string, string];
    towerA: string;
    rightWing: string;
    phoneLabel: string;
    hotlineLabel: string;
    qrLabel: string;
    copyright: string;
    developer: string;
    backToTop: string;
  };
};

const loaders: Record<Exclude<Lang, "RU">, () => Promise<{ default: Messages }>> = {
  KG: () => import("./messages.kg"),
  EN: () => import("./messages.en"),
  ZH: () => import("./messages.zh"),
};

const cache = new Map<Lang, Messages>([["RU", ru]]);

/** Eagerly resolve a language pack (cached). RU is always available sync. */
export async function loadMessages(lang: Lang): Promise<Messages> {
  const hit = cache.get(lang);
  if (hit) return hit;
  if (lang === "RU") return ru;
  const mod = await loaders[lang]();
  cache.set(lang, mod.default);
  return mod.default;
}

/**
 * Sync accessor for the active UI language.
 * Falls back to RU while a non-RU pack is still loading.
 */
export function getMessages(lang: Lang): Messages {
  return cache.get(lang) ?? ru;
}

export function hasMessages(lang: Lang): boolean {
  return cache.has(lang);
}
