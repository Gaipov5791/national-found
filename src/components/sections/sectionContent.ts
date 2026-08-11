export const FINANCE_CARD_ICONS = [
  "/icons/finance/coinvest.webp",
  "/icons/finance/joint-venture.webp",
  "/icons/finance/equity.webp",
  "/icons/finance/support.webp",
] as const;

export const DIRECTION_CARD_ICONS = [
  "/icons/perspective/optimized/industry.webp",
  "/icons/perspective/optimized/transport.webp",
  "/icons/perspective/optimized/energy.webp",
  "/icons/perspective/optimized/tourism.webp",
  "/icons/perspective/optimized/education.webp",
  "/icons/perspective/optimized/health.webp",
] as const;

export type AboutPerson = {
  name: string;
  role: string;
  /** Additional official title (e.g. minister), shown under the name */
  title?: string;
  photo?: string;
};

export type AboutPersonMeta = {
  photo?: string;
};

export const ABOUT_BOARD_META: readonly AboutPersonMeta[] = [
  { photo: "/images/about/photo_3.webp" },
  { photo: "/images/about/photo_16.webp" },
  { photo: "/images/about/photo_15.webp" },
  { photo: "/images/about/photo_14.webp" },
  { photo: "/images/about/photo_7.webp" },
  {},
  { photo: "/images/about/photo_11.webp" },
];

export const ABOUT_LEADERSHIP_META: readonly AboutPersonMeta[] = [
  { photo: "/images/about/photo_12.webp" },
  { photo: "/images/about/photo_4.webp" },
];

export const ABOUT_DEPARTMENT_HEADS_META: readonly AboutPersonMeta[] = [
  { photo: "/images/about/photo_10.webp" },
  { photo: "/images/about/photo_2.webp" },
  { photo: "/images/about/photo_5.webp" },
  { photo: "/images/about/photo_13.webp" },
];

export const ABOUT_CORPORATE_SECRETARY_META: AboutPersonMeta = {
  photo: "/images/about/photo_6.webp",
};

export const ABOUT_REGULATORY_DOC_HREFS = [
  "/docs/about/zakon-143.pdf",
  "/docs/about/ustav.pdf",
] as const;

export const ABOUT_FINANCIAL_REPORT_HREFS = [null] as const;
