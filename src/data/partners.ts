export type Partner = {
  name: string;
  logo: string;
};

export type PartnerCategory = {
  title: string;
  partners: readonly Partner[];
};

export const PARTNER_REGISTRY: readonly PartnerCategory[] = [
  {
    title: "Аудиторские услуги",
    partners: [
      { name: "Baker Tilly", logo: "/partners/registry/audit/baker-tilly.webp" },
      { name: "EY", logo: "/partners/registry/audit/ey.webp" },
      { name: "Kreston", logo: "/partners/registry/audit/kreston.webp" },
    ],
  },
  {
    title: "Бухгалтерские услуги",
    partners: [
      {
        name: "Бухгалтерские услуги",
        logo: "/partners/registry/accounting/accounting.webp",
      },
    ],
  },
  {
    title: "Оценочные услуги",
    partners: [
      {
        name: "Бизнес Эксперт",
        logo: "/partners/registry/valuation/business-expert.webp",
      },
      {
        name: "Кыргыз Риэлт",
        logo: "/partners/registry/valuation/kyrgyz-rielt.webp",
      },
      { name: "НЦЭО", logo: "/partners/registry/valuation/nczeo.webp" },
      {
        name: "Славянский Восток",
        logo: "/partners/registry/valuation/slavyanskiy-vostok.webp",
      },
    ],
  },
  {
    title: "Страховые услуги",
    partners: [
      { name: "EY", logo: "/partners/registry/insurance/ey.webp" },
      {
        name: "Кыргызстан",
        logo: "/partners/registry/insurance/kyrgyzstan.webp",
      },
      { name: "НСК", logo: "/partners/registry/insurance/nsk.webp" },
    ],
  },
  {
    title: "Юридические услуги",
    partners: [
      { name: "AIM", logo: "/partners/registry/legal/aim.webp" },
      {
        name: "Bakirdinova",
        logo: "/partners/registry/legal/bakirdinova.webp",
      },
      { name: "GRATA", logo: "/partners/registry/legal/grata.webp" },
      { name: "LEKS", logo: "/partners/registry/legal/leks.webp" },
      { name: "Sentil", logo: "/partners/registry/legal/sentil.webp" },
      { name: "Veritas", logo: "/partners/registry/legal/veritas.webp" },
    ],
  },
] as const;

export const COOPERATION_PARTNERS: readonly Partner[] = [
  { name: "AIM", logo: "/partners/cooperation/aim.webp" },
  { name: "Bakirdinova", logo: "/partners/cooperation/bakirdinova.webp" },
  { name: "GRATA", logo: "/partners/cooperation/grata.webp" },
  { name: "LEKS", logo: "/partners/cooperation/leks.webp" },
  { name: "Sentil", logo: "/partners/cooperation/sentil.webp" },
  { name: "Veritas", logo: "/partners/cooperation/veritas.webp" },
] as const;

export type AccreditationDocument = {
  title: string;
  href: string;
};

export const ACCREDITATION_DOCUMENTS: readonly AccreditationDocument[] = [
  {
    title: "Критерии для аккредитации аудиторских компаний",
    href: "/partners/docs/audit-accreditation-criteria.pdf",
  },
  {
    title: "Критерии для аккредитации бухгалтерских компаний",
    href: "/partners/docs/accounting-accreditation-criteria.pdf",
  },
  {
    title: "Критерии для аккредитации оценочных компаний",
    href: "/partners/docs/valuation-accreditation-criteria.pdf",
  },
  {
    title: "Критерии для аккредитации страховых компаний",
    href: "/partners/docs/insurance-accreditation-criteria.pdf",
  },
  {
    title: "Критерии для аккредитации юридических компаний",
    href: "/partners/docs/legal-accreditation-criteria.pdf",
  },
] as const;
