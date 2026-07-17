export const FINANCE_CARD_ICONS = [
  "/icons/finance/coinvest.png",
  "/icons/finance/joint-venture.png",
  "/icons/finance/equity.png",
  "/icons/finance/support.png",
] as const;

const publicAsset = (path: string) => encodeURI(path);

export const DIRECTION_CARD_ICONS = [
  publicAsset("/icons/perspective/Иконки Перпективные направления/Промышленность и переработка.png"),
  publicAsset("/icons/perspective/Иконки Перпективные направления/Транспорт и логистика.png"),
  publicAsset("/icons/perspective/Иконки Перпективные направления/Энергетика и инфраструктура.png"),
  publicAsset("/icons/perspective/Иконки Перпективные направления/Туризм.png"),
  publicAsset("/icons/perspective/Иконки Перпективные направления/Образование.png"),
  publicAsset("/icons/perspective/Иконки Перпективные направления/Здравоохранение.png"),
] as const;

/** Preview card ids on the landing news block. Add items to enable the marquee (3+). */
export const NEWS_PREVIEW_IDS = ["news-1", "news-2", "news-3", "news-4"] as const;

export type AboutPerson = {
  name: string;
  role: string;
  /** Additional official title (e.g. minister), shown under the name */
  title?: string;
  photo?: string;
};

export type AboutPersonMeta = {
  name: string;
  photo?: string;
};

export const ABOUT_BOARD_META: readonly AboutPersonMeta[] = [
  { name: "Касымалиев Адылбек Алешович", photo: "/images/about/photo_3.png" },
  { name: "Торобаев Бакыт Эргешевич", photo: "/images/about/photo_16.png" },
  { name: "Суйналиев Руслан Мырзабекович", photo: "/images/about/photo_15.png" },
  { name: "Исаматова Гульзат Тыныбековна", photo: "/images/about/photo_14.png" },
  { name: "Сариев Темир Аргембаевич", photo: "/images/about/photo_7.png" },
  { name: "Акматалиев Адилет Искендербекович" },
  { name: "Темиркулов Азамат Азатбекович", photo: "/images/about/photo_11.png" },
];

export const ABOUT_LEADERSHIP_META: readonly AboutPersonMeta[] = [
  { name: "Темирбеков Уран Темирбекович", photo: "/images/about/photo_12.png" },
  { name: "Мадумаров Аскат Эркинович", photo: "/images/about/photo_4.png" },
];

export const ABOUT_DEPARTMENT_HEADS_META: readonly AboutPersonMeta[] = [
  { name: "Бекташов Талант Изатиллаевич", photo: "/images/about/photo_10.png" },
  { name: "Абдымамбетов Нурбек Абыдкапарович", photo: "/images/about/photo_2.png" },
  { name: "Марлисов Анвар Болотбекович", photo: "/images/about/photo_5.png" },
  { name: "Эрса Расул Тахирович", photo: "/images/about/photo_13.png" },
];

export const ABOUT_CORPORATE_SECRETARY_META: AboutPersonMeta = {
  name: "Турдугулов Абай Тагайбекович",
  photo: "/images/about/photo_6.png",
};

export const ABOUT_REGULATORY_DOC_HREFS = [
  "/docs/about/zakon-143.pdf",
  "/docs/about/ustav.pdf",
] as const;

export const ABOUT_FINANCIAL_REPORT_HREFS = [null] as const;
