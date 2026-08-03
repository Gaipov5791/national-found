import type { Messages } from "@/lib/i18n/messages";
import type { AboutPerson } from "@/components/sections/sectionContent";
import {
  ABOUT_BOARD_META,
  ABOUT_CORPORATE_SECRETARY_META,
  ABOUT_DEPARTMENT_HEADS_META,
  ABOUT_FINANCIAL_REPORT_HREFS,
  ABOUT_LEADERSHIP_META,
  ABOUT_REGULATORY_DOC_HREFS,
  DIRECTION_CARD_ICONS,
  FINANCE_CARD_ICONS,
} from "@/components/sections/sectionContent";
import {
  ACCREDITATION_DOCUMENTS as ACCREDITATION_DOC_META,
  PARTNER_REGISTRY as PARTNER_REGISTRY_META,
} from "@/data/partners";

function mapPeople(
  meta: readonly { name: string; photo?: string }[],
  roles: readonly string[],
  titles?: readonly (string | null)[]
): AboutPerson[] {
  return meta.map((person, i) => ({
    ...person,
    role: roles[i] ?? "",
    ...(titles?.[i] ? { title: titles[i]! } : {}),
  }));
}

export function getFinanceCards(t: Messages) {
  return t.finance.cards.map((card, i) => ({
    ...card,
    icon: FINANCE_CARD_ICONS[i]!,
  }));
}

export function getDirectionCards(t: Messages) {
  return t.directions.cards.map((card, i) => ({
    ...card,
    icon: DIRECTION_CARD_ICONS[i]!,
  }));
}

export function getAboutBoard(t: Messages) {
  return mapPeople(ABOUT_BOARD_META, t.about.boardRoles, t.about.boardTitles);
}

export function getAboutLeadership(t: Messages) {
  return mapPeople(ABOUT_LEADERSHIP_META, t.about.leadershipRoles);
}

export function getAboutDepartmentHeads(t: Messages) {
  return mapPeople(ABOUT_DEPARTMENT_HEADS_META, t.about.departmentRoles);
}

export function getAboutCorporateSecretary(t: Messages): AboutPerson {
  return {
    ...ABOUT_CORPORATE_SECRETARY_META,
    role: t.about.secretaryRole,
  };
}

export function getAboutRegulatoryDocs(t: Messages) {
  return t.about.regulatoryDocs.map((title, i) => ({
    title,
    href: ABOUT_REGULATORY_DOC_HREFS[i]!,
  }));
}

export function getAboutFinancialReports(t: Messages) {
  return t.about.financialReports.map((title, i) => ({
    title,
    href: ABOUT_FINANCIAL_REPORT_HREFS[i] ?? null,
  }));
}

export function getPartnerRegistry(t: Messages) {
  return PARTNER_REGISTRY_META.map((category, i) => ({
    ...category,
    title: t.partners.registryCategories[i] ?? category.title,
  }));
}

export function getAccreditationDocuments(t: Messages) {
  return ACCREDITATION_DOC_META.map((doc, i) => ({
    ...doc,
    title: t.partners.accreditationDocs[i] ?? doc.title,
  }));
}
