import type { Lang } from "@/lib/lang";
import type { L10nText } from "@/data/msbProjects";
import { pickL10n } from "@/data/msbProjects";

export type NewsItem = {
  id: string;
  /** ISO date YYYY-MM-DD */
  date: string;
  image: string;
  title: L10nText;
  excerpt: L10nText;
  /** WordPress article URL while local detail pages are not ready */
  sourceUrl: Partial<Record<Lang, string>>;
};

/**
 * News synced from nif.kg WordPress (wp-json / admin).
 * Update this list when the customer publishes new posts.
 */
export const NEWS_ITEMS: readonly NewsItem[] = [
  {
    id: "vacancy-risk-manager",
    date: "2026-06-15",
    image: "/images/news/vacancy.jpg",
    title: {
      RU: "Объявление о вакансии",
      KG: "Бош кызмат орду жөнүндө жарыя",
      EN: "Job vacancy announcement",
      ZH: "职位空缺公告",
    },
    excerpt: {
      RU: "ОАО «Национальный инвестиционный фонд Кыргызской Республики» объявляет о наборе специалиста на должность Риск-менеджера.",
      KG: "«Кыргыз Республикасынын Улуттук инвестициялык фонду» ААК Риск-менеджер кызмат ордуна адис тартуу жөнүндө жарыялайт.",
      EN: "OJSC “National Investment Fund of the Kyrgyz Republic” is hiring a Risk Manager.",
      ZH: "吉尔吉斯共和国国家投资基金公开招聘风险管理专员。",
    },
    sourceUrl: {
      RU: "https://nif.kg/%d0%b1%d0%b5%d0%b7-%d1%80%d1%83%d0%b1%d1%80%d0%b8%d0%ba%d0%b8/obyavlenie-o-vakansii/",
    },
  },
  {
    id: "consultant-selection",
    date: "2026-06-09",
    image: "/images/news/consultant.jpg",
    title: {
      RU: "Объявление о проведении отбора консультанта",
      KG: "Консультантты тандоо боюнча жарыя",
      EN: "Announcement on the selection of a consultant",
      ZH: "关于遴选顾问的公告",
    },
    excerpt: {
      RU: "ОАО «Национальный инвестиционный фонд Кыргызской Республики» приглашает принять участие в отборе консультанта для оказания услуг по разработке проектной документации и сопровождению строительства.",
      KG: "«Кыргыз Республикасынын Улуттук инвестициялык фонду» ААК долбоордук документтерди иштеп чыгуу жана курулушту коштоо боюнча консультантты тандоого катышууга чакырат.",
      EN: "OJSC “National Investment Fund of the Kyrgyz Republic” invites applications for the selection of a consultant for project documentation and construction support services.",
      ZH: "吉尔吉斯共和国国家投资基金邀请参与项目文件编制及建设陪同服务顾问遴选。",
    },
    sourceUrl: {
      RU: "https://nif.kg/%d0%b1%d0%b5%d0%b7-%d1%80%d1%83%d0%b1%d1%80%d0%b8%d0%ba%d0%b8/obyavlenie-o-provedenii-otbora-konsultanta/",
    },
  },
  {
    id: "hotel-management-company",
    date: "2026-05-11",
    image: "/images/news/hotel.jpg",
    title: {
      RU: "Объявление о привлечении управляющей компании / гостиничного консультанта",
      KG: "Башкаруучу компанияны / мейманкана консультантын тартуу жөнүндө жарыя",
      EN: "Announcement on the Selection of a Hotel Management Company / Hotel Consultant",
      ZH: "关于公开征集酒店管理公司",
    },
    excerpt: {
      RU: "ОАО «Национальный инвестиционный фонд Кыргызской Республики» объявляет о привлечении управляющей компании / гостиничного консультанта для реализации проекта создания современного курортного комплекса международного уровня на базе пансионата «Дружба» (Иссык-Кульская область).",
      KG: "«Кыргыз Республикасынын Улуттук инвестициялык фонду» ААК Ысык-Көл облусундагы «Дружба» пансионатынын базасында эл аралык деңгээлдеги заманбап курорттук комплекс түзүү үчүн башкаруучу компанияны / мейманкана консультантын тартуу жөнүндө жарыялайт.",
      EN: "OJSC “National Investment Fund of the Kyrgyz Republic” announces the selection of a Hotel Management Company / Hotel Consultant for a modern international-level resort complex at the “Druzhba” Resort (Issyk-Kul Region).",
      ZH: "吉尔吉斯共和国国家投资基金现公开征集酒店管理公司 / 酒店咨询顾问，参与实施位于伊塞克湖州“友谊”疗养院的国际化现代度假综合体建设项目。",
    },
    sourceUrl: {
      RU: "https://nif.kg/novosti/obyavlenie-o-privlechenii-upravlyayushhej-kompanii-gostinichnogo-konsultanta/",
      KG: "https://nif.kg/ky/novosti-2/bashkaruuchu-kompaniyany-mejmankana-konsultantyn-tartuu-zh%d3%a9n%d2%afnd%d3%a9-zharyya/",
      EN: "https://nif.kg/en/novosti-3/announcement-on-the-selection-of-a-hotel-management-company-hotel-consultant/",
      ZH: "https://nif.kg/zh/novosti-4/guan-yu-gong-kai-zheng-ji-jiu-dian-guan-li-gong-si/",
    },
  },
  {
    id: "accreditation",
    date: "2026-04-17",
    image: "/images/news/accreditation.jpg",
    title: {
      RU: "Объявление",
      KG: "Жарыя",
      EN: "Announcement",
      ZH: "公告",
    },
    excerpt: {
      RU: "ОАО «Национальный инвестиционный фонд Кыргызской Республики» объявляет о запуске очередной процедуры аккредитации аудиторских, страховых, оценочных, юридических и бухгалтерских компаний.",
      KG: "«Кыргыз Республикасынын Улуттук инвестициялык фонду» ААК аудитордук, камсыздандыруу, баалоо, юридикалык жана бухгалтердик компанияларды аккредитациялоонун кезектеги процедурасын баштоо жөнүндө жарыялайт.",
      EN: "OJSC “National Investment Fund of the Kyrgyz Republic” announces another accreditation round for audit, insurance, valuation, legal, and accounting firms.",
      ZH: "吉尔吉斯共和国国家投资基金宣布启动新一轮审计、保险、评估、法律及会计公司的认证程序。",
    },
    sourceUrl: {
      RU: "https://nif.kg/novosti/obyavlenie/",
    },
  },
] as const;

const DATE_LOCALES: Record<Lang, string> = {
  RU: "ru-RU",
  KG: "ky-KG",
  EN: "en-GB",
  ZH: "zh-CN",
};

export function formatNewsDate(date: string, lang: Lang): string {
  const parsed = new Date(`${date}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  try {
    return new Intl.DateTimeFormat(DATE_LOCALES[lang], {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(parsed);
  } catch {
    return date;
  }
}

export function getNewsItems(): readonly NewsItem[] {
  return NEWS_ITEMS;
}

export function getNewsPreview(lang: Lang, limit = 4) {
  return NEWS_ITEMS.slice(0, limit).map((item) => ({
    id: item.id,
    title: pickL10n(item.title, lang),
    description: pickL10n(item.excerpt, lang),
    image: item.image,
    date: formatNewsDate(item.date, lang),
    href: item.sourceUrl[lang] ?? item.sourceUrl.RU,
  }));
}
