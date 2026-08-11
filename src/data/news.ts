import type { Lang } from "@/lib/lang";
import type { L10nText } from "@/data/msbProjects";
import { pickL10n } from "@/data/msbProjects";
import { getNewsBody } from "@/data/newsBodies";

export type NewsItem = {
  id: string;
  /** ISO date YYYY-MM-DD */
  date: string;
  image: string;
  title: L10nText;
  excerpt: L10nText;
  /** Use `contain` for square banners with edge text that must stay visible. */
  imageFit?: "cover" | "contain";
};

/**
 * News synced from nif.kg WordPress.
 * Full article HTML lives in `newsBodies.ts`.
 */
export const NEWS_ITEMS: readonly NewsItem[] = [
  {
    id: "office-renovation-repeat",
    date: "2026-08-11",
    image: "/images/news/office-renovation.png",
    title: {
      RU: "ОАО «Национальный инвестиционный фонд Кыргызской Республики» ПОВТОРНО запрашивает коммерческие предложения на выполнение работ по ремонту офисного здания.",
      KG: "«Кыргыз Республикасынын Улуттук инвестициялык фонду» ААК кеңсе имаратын оңдоо иштерин аткаруу боюнча коммерциялык сунуштарды КАЙРАДАН сурайт.",
      EN: "OJSC “National Investment Fund of the Kyrgyz Republic” REPEATEDLY requests commercial proposals for office building renovation works.",
      ZH: "吉尔吉斯共和国国家投资基金再次征集办公楼装修工程商业报价。",
    },
    excerpt: {
      RU: "ОАО «Национальный инвестиционный фонд Кыргызской Республики» приглашает заинтересованных поставщиков услуг представить коммерческие предложения на выполнение работ по ремонту офисного здания. Техническое задание прилагается.",
      KG: "«Кыргыз Республикасынын Улуттук инвестициялык фонду» ААК кеңсе имаратын оңдоо иштерин аткаруу боюнча коммерциялык сунуштарды тапшырууга кызыкдар кызмат көрсөтүүчүлөрдү чакырат. Техникалык тапшырма тиркелет.",
      EN: "OJSC “National Investment Fund of the Kyrgyz Republic” invites interested service providers to submit commercial proposals for office building renovation works. The terms of reference are attached.",
      ZH: "吉尔吉斯共和国国家投资基金诚邀相关服务供应商就办公楼装修工程提交商业报价。技术任务书附后。",
    },
  },
  {
    id: "audit-2025",
    date: "2026-08-05",
    image: "/images/news/audit-2025.png",
    imageFit: "contain",
    title: {
      RU: "Приглашение на участие в конкурсе по отбору аудиторской компании",
      KG: "Аудитордук компанияны тандоо боюнча сынакка катышууга чакыруу",
      EN: "Invitation to participate in the selection of an audit company",
      ZH: "邀请参与审计公司遴选竞标",
    },
    excerpt: {
      RU: "ОАО «Национальный инвестиционный фонд Кыргызской Республики» приглашает принять участие в открытом конкурсе по выбору аудиторской организации для проведения аудита консолидированной финансовой отчетности (КФО) за год, заканчивающийся 31 декабря 2025 года.",
      KG: "«Кыргыз Республикасынын Улуттук инвестициялык фонду» ААК 2025-жылдын 31-декабрында аяктаган жыл үчүн консолидацияланган финансылык отчеттуулуктун (КФО) аудитин жүргүзүү үчүн аудитордук уюмду тандоо боюнча ачык сынакка катышууга чакырат.",
      EN: "OJSC “National Investment Fund of the Kyrgyz Republic” invites you to take part in an open tender to select an audit organization for the audit of the consolidated financial statements (CFS) for the year ending 31 December 2025.",
      ZH: "吉尔吉斯共和国国家投资基金邀请参与公开竞标，以遴选审计机构对截至2025年12月31日年度的合并财务报表（KFO）进行审计。",
    },
  },
  {
    id: "audit-2026",
    date: "2026-08-05",
    image: "/images/news/audit-2026.png",
    imageFit: "contain",
    title: {
      RU: "Приглашение на участие в конкурсе по отбору аудиторской компании",
      KG: "Аудитордук компанияны тандоо боюнча сынакка катышууга чакыруу",
      EN: "Invitation to participate in the selection of an audit company",
      ZH: "邀请参与审计公司遴选竞标",
    },
    excerpt: {
      RU: "ОАО «Национальный инвестиционный фонд Кыргызской Республики» приглашает принять участие в открытом конкурсе по выбору аудиторской организации для проведения аудита консолидированной финансовой отчетности (КФО) за год, заканчивающийся 31 декабря 2026 года.",
      KG: "«Кыргыз Республикасынын Улуттук инвестициялык фонду» ААК 2026-жылдын 31-декабрында аяктаган жыл үчүн консолидацияланган финансылык отчеттуулуктун (КФО) аудитин жүргүзүү үчүн аудитордук уюмду тандоо боюнча ачык сынакка катышууга чакырат.",
      EN: "OJSC “National Investment Fund of the Kyrgyz Republic” invites you to take part in an open tender to select an audit organization for the audit of the consolidated financial statements (CFS) for the year ending 31 December 2026.",
      ZH: "吉尔吉斯共和国国家投资基金邀请参与公开竞标，以遴选审计机构对截至2026年12月31日年度的合并财务报表（KFO）进行审计。",
    },
  },
  {
    id: "office-renovation",
    date: "2026-08-04",
    image: "/images/news/office-renovation.png",
    title: {
      RU: "ОАО «Национальный инвестиционный фонд Кыргызской Республики» запрашивает коммерческие предложения на выполнение работ по ремонту офисного здания.",
      KG: "«Кыргыз Республикасынын Улуттук инвестициялык фонду» ААК кеңсе имаратын оңдоо иштерин аткаруу боюнча коммерциялык сунуштарды сурайт.",
      EN: "OJSC “National Investment Fund of the Kyrgyz Republic” requests commercial proposals for office building renovation works.",
      ZH: "吉尔吉斯共和国国家投资基金就办公楼装修工程公开征集商业报价。",
    },
    excerpt: {
      RU: "ОАО «Национальный инвестиционный фонд Кыргызской Республики» (далее — Фонд) приглашает заинтересованных поставщиков услуг представить коммерческие предложения на выполнение работ по ремонту офисного здания.",
      KG: "«Кыргыз Республикасынын Улуттук инвестициялык фонду» ААК (мындан ары — Фонд) кеңсе имаратын оңдоо иштерин аткаруу боюнча коммерциялык сунуштарды тапшырууга кызыкдар кызмат көрсөтүүчүлөрдү чакырат.",
      EN: "OJSC “National Investment Fund of the Kyrgyz Republic” (the Fund) invites interested service providers to submit commercial proposals for office building renovation works.",
      ZH: "吉尔吉斯共和国国家投资基金（以下简称“基金”）诚邀相关服务供应商就办公楼装修工程提交商业报价。",
    },
  },
  {
    id: "office-partitions",
    date: "2026-08-04",
    image: "/images/news/office-partitions.png",
    title: {
      RU: "ОАО «Национальный инвестиционный фонд Кыргызской Республики» запрашивает коммерческие предложения на выполнение работ по изготовлению и установке офисных перегородок.",
      KG: "«Кыргыз Республикасынын Улуттук инвестициялык фонду» ААК кеңсе бөлүкчөлөрүн жасоо жана орнотуу иштерин аткаруу боюнча коммерциялык сунуштарды сурайт.",
      EN: "OJSC “National Investment Fund of the Kyrgyz Republic” requests commercial proposals for the manufacture and installation of office partitions.",
      ZH: "吉尔吉斯共和国国家投资基金就办公隔断的制作与安装工程公开征集商业报价。",
    },
    excerpt: {
      RU: "ОАО «Национальный инвестиционный фонд Кыргызской Республики» (далее — Фонд) приглашает заинтересованных поставщиков услуг представить коммерческие предложения на выполнение работ по изготовлению и установке офисных перегородок.",
      KG: "«Кыргыз Республикасынын Улуттук инвестициялык фонду» ААК (мындан ары — Фонд) кеңсе бөлүкчөлөрүн жасоо жана орнотуу иштерин аткаруу боюнча коммерциялык сунуштарды тапшырууга кызыкдар кызмат көрсөтүүчүлөрдү чакырат.",
      EN: "OJSC “National Investment Fund of the Kyrgyz Republic” (the Fund) invites interested service providers to submit commercial proposals for the manufacture and installation of office partitions.",
      ZH: "吉尔吉с共和国国家投资基金（以下简称“基金”）诚邀相关服务供应商就办公隔断的制作与安装工程提交商业报价。",
    },
  },
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
      ZH: "吉尔吉с共和国国家投资基金宣布启动新一轮审计、保险、评估、法律及会计公司的认证程序。",
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

export function getNewsById(id: string): NewsItem | undefined {
  return NEWS_ITEMS.find((item) => item.id === id);
}

export function getLocalizedNewsArticle(id: string, lang: Lang) {
  const item = getNewsById(id);
  if (!item) return undefined;
  const body = getNewsBody(id, lang);
  if (!body) return undefined;
  return {
    ...item,
    title: pickL10n(item.title, lang),
    excerpt: pickL10n(item.excerpt, lang),
    dateLabel: formatNewsDate(item.date, lang),
    body,
  };
}
