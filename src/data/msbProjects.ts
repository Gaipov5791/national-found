import type { Lang } from "@/lib/lang";

export type L10nText = Record<Lang, string>;

export type MsbProjectStatus = "active" | "completed";

export type MsbProject = {
  id: string;
  title: L10nText;
  summary: L10nText;
  status: MsbProjectStatus;
};

export type MsbDistrict = {
  id: string;
  name: L10nText;
  region: L10nText;
  /** [latitude, longitude] */
  coordinates: readonly [number, number];
  projects: readonly MsbProject[];
};

export function pickL10n(value: L10nText, lang: Lang): string {
  return value[lang] ?? value.RU;
}

/** Demo district points — replace with real fund project data when available. */
export const MSB_DISTRICTS: readonly MsbDistrict[] = [
  {
    id: "bishkek",
    name: { RU: "г. Бишкек", KG: "Бишкек ш.", EN: "Bishkek city" },
    region: { RU: "г. Бишкек", KG: "Бишкек ш.", EN: "Bishkek" },
    coordinates: [42.8746, 74.5698],
    projects: [
      {
        id: "bishkek-1",
        title: {
          RU: "Переработка сельхозпродукции",
          KG: "Айыл чарба продукциясын кайра иштетүү",
          EN: "Agri-product processing",
        },
        summary: {
          RU: "Модернизация линии переработки и расширение сбыта в столице.",
          KG: "Кайра иштетүү линиясын модернизациялоо жана борбордо сатууну кеңейтүү.",
          EN: "Processing line upgrade and sales expansion in the capital.",
        },
        status: "active",
      },
      {
        id: "bishkek-2",
        title: {
          RU: "Логистический хаб МСБ",
          KG: "ЧОЖ логистикалык хабы",
          EN: "SME logistics hub",
        },
        summary: {
          RU: "Складская инфраструктура для региональных производителей.",
          KG: "Аймактык өндүрүүчүлөр үчүн склад инфраструктурасы.",
          EN: "Warehouse infrastructure for regional producers.",
        },
        status: "completed",
      },
    ],
  },
  {
    id: "alamudun",
    name: { RU: "Аламудунский район", KG: "Аламүдүн району", EN: "Alamudun district" },
    region: { RU: "Чуйская область", KG: "Чүй облусу", EN: "Chuy Region" },
    coordinates: [42.89, 74.55],
    projects: [
      {
        id: "alamudun-1",
        title: {
          RU: "Тепличный комплекс",
          KG: "Жылыткыч комплекси",
          EN: "Greenhouse complex",
        },
        summary: {
          RU: "Выращивание овощей для внутреннего рынка круглый год.",
          KG: "Ички рынок үчүн жыл бою жашылча өстүрүү.",
          EN: "Year-round vegetable production for the domestic market.",
        },
        status: "active",
      },
    ],
  },
  {
    id: "issyk-ata",
    name: { RU: "Ысык-Атинский район", KG: "Ысык-Ата району", EN: "Issyk-Ata district" },
    region: { RU: "Чуйская область", KG: "Чүй облусу", EN: "Chuy Region" },
    coordinates: [42.82, 74.95],
    projects: [
      {
        id: "issyk-ata-1",
        title: {
          RU: "Молочный цех",
          KG: "Сүт цехи",
          EN: "Dairy workshop",
        },
        summary: {
          RU: "Переработка молока местных фермеров.",
          KG: "Жергиликтүү фермерлердин сүтүн кайра иштетүү.",
          EN: "Processing milk from local farmers.",
        },
        status: "completed",
      },
    ],
  },
  {
    id: "karakol",
    name: { RU: "г. Каракол", KG: "Каракол ш.", EN: "Karakol city" },
    region: { RU: "Иссык-Кульская область", KG: "Ысык-Көл облусу", EN: "Issyk-Kul Region" },
    coordinates: [42.4907, 78.3936],
    projects: [
      {
        id: "karakol-1",
        title: {
          RU: "Туристический сервис МСБ",
          KG: "ЧОЖ туристтик сервиси",
          EN: "SME tourism services",
        },
        summary: {
          RU: "Гостевые дома и сопутствующие услуги у озера.",
          KG: "Көл жээгиндеги конок үйлөр жана кошумча кызматтар.",
          EN: "Guesthouses and related services near the lake.",
        },
        status: "active",
      },
    ],
  },
  {
    id: "tyup",
    name: { RU: "Тюпский район", KG: "Түп району", EN: "Tyup district" },
    region: { RU: "Иссык-Кульская область", KG: "Ысык-Көл облусу", EN: "Issyk-Kul Region" },
    coordinates: [42.72, 78.36],
    projects: [
      {
        id: "tyup-1",
        title: {
          RU: "Рыбная переработка",
          KG: "Балык кайра иштетүү",
          EN: "Fish processing",
        },
        summary: {
          RU: "Цех по переработке рыбы Иссык-Куля.",
          KG: "Ысык-Көл балыгын кайра иштетүү цехи.",
          EN: "Issyk-Kul fish processing facility.",
        },
        status: "active",
      },
    ],
  },
  {
    id: "naryn",
    name: { RU: "г. Нарын", KG: "Нарын ш.", EN: "Naryn city" },
    region: { RU: "Нарынская область", KG: "Нарын облусу", EN: "Naryn Region" },
    coordinates: [41.4287, 75.9911],
    projects: [
      {
        id: "naryn-1",
        title: {
          RU: "Шерстяное производство",
          KG: "Жүн өндүрүшү",
          EN: "Wool production",
        },
        summary: {
          RU: "Переработка шерсти и выпуск текстиля.",
          KG: "Жүндү кайра иштетүү жана текстиль чыгаруу.",
          EN: "Wool processing and textile production.",
        },
        status: "completed",
      },
    ],
  },
  {
    id: "at-bashy",
    name: { RU: "Ат-Башинский район", KG: "Ат-Башы району", EN: "At-Bashy district" },
    region: { RU: "Нарынская область", KG: "Нарын облусу", EN: "Naryn Region" },
    coordinates: [41.17, 75.8],
    projects: [
      {
        id: "at-bashy-1",
        title: {
          RU: "Мясная переработка",
          KG: "Эт кайра иштетүү",
          EN: "Meat processing",
        },
        summary: {
          RU: "Мини-цех для местных животноводов.",
          KG: "Жергиликтүү малчылар үчүн мини-цех.",
          EN: "Mini workshop for local livestock farmers.",
        },
        status: "active",
      },
    ],
  },
  {
    id: "talas",
    name: { RU: "г. Талас", KG: "Талас ш.", EN: "Talas city" },
    region: { RU: "Таласская область", KG: "Талас облусу", EN: "Talas Region" },
    coordinates: [42.5228, 72.2427],
    projects: [
      {
        id: "talas-1",
        title: {
          RU: "Фасолевый кластер",
          KG: "Лобия кластери",
          EN: "Bean cluster",
        },
        summary: {
          RU: "Сбор, сушка и фасовка фасоли для экспорта.",
          KG: "Экспорт үчүн лобияны чогултуу, кургатуу жана таңгактоо.",
          EN: "Bean collection, drying and packing for export.",
        },
        status: "active",
      },
    ],
  },
  {
    id: "jalal-abad",
    name: { RU: "г. Джалал-Абад", KG: "Жалал-Абад ш.", EN: "Jalal-Abad city" },
    region: { RU: "Джалал-Абадская область", KG: "Жалал-Абад облусу", EN: "Jalal-Abad Region" },
    coordinates: [40.933, 73.0],
    projects: [
      {
        id: "jalal-abad-1",
        title: {
          RU: "Сухофрукты и орехи",
          KG: "Курғақ жемиш жана жаңгак",
          EN: "Dried fruits and nuts",
        },
        summary: {
          RU: "Переработка и упаковка для внутреннего и внешнего рынка.",
          KG: "Ички жана тышкы рынок үчүн кайра иштетүү жана таңгактоо.",
          EN: "Processing and packaging for domestic and export markets.",
        },
        status: "completed",
      },
    ],
  },
  {
    id: "suzak",
    name: { RU: "Сузакский район", KG: "Сузак району", EN: "Suzak district" },
    region: { RU: "Джалал-Абадская область", KG: "Жалал-Абад облусу", EN: "Jalal-Abad Region" },
    coordinates: [40.9, 72.9],
    projects: [
      {
        id: "suzak-1",
        title: {
          RU: "Овощная консервация",
          KG: "Жашылча консервациясы",
          EN: "Vegetable canning",
        },
        summary: {
          RU: "Цех консервации сезонного урожая.",
          KG: "Сезондук түшүмдү консервациялоо цехи.",
          EN: "Seasonal harvest canning facility.",
        },
        status: "active",
      },
    ],
  },
  {
    id: "osh",
    name: { RU: "г. Ош", KG: "Ош ш.", EN: "Osh city" },
    region: { RU: "г. Ош", KG: "Ош ш.", EN: "Osh city" },
    coordinates: [40.5283, 72.7985],
    projects: [
      {
        id: "osh-1",
        title: {
          RU: "Швейное производство",
          KG: "Тигүү өндүрүшү",
          EN: "Garment production",
        },
        summary: {
          RU: "Рабочие места в лёгкой промышленности для МСБ.",
          KG: "ЧОЖ үчүн жеңил өнөр жайда жумуш орундары.",
          EN: "Light-industry jobs for SMEs.",
        },
        status: "active",
      },
    ],
  },
  {
    id: "karasuu",
    name: { RU: "Кара-Сууский район", KG: "Кара-Суу району", EN: "Kara-Suu district" },
    region: { RU: "Ошская область", KG: "Ош облусу", EN: "Osh Region" },
    coordinates: [40.7, 72.88],
    projects: [
      {
        id: "karasuu-1",
        title: {
          RU: "Торгово-логистический узел",
          KG: "Соода-логистикалык түйүн",
          EN: "Trade and logistics hub",
        },
        summary: {
          RU: "Поддержка МСБ на южном торговом коридоре.",
          KG: "Түштүк соода коридорундагы ЧОЖду колдоо.",
          EN: "SME support on the southern trade corridor.",
        },
        status: "completed",
      },
    ],
  },
  {
    id: "batken",
    name: { RU: "г. Баткен", KG: "Баткен ш.", EN: "Batken city" },
    region: { RU: "Баткенская область", KG: "Баткен облусу", EN: "Batken Region" },
    coordinates: [40.0626, 70.8194],
    projects: [
      {
        id: "batken-1",
        title: {
          RU: "Абрикосовая переработка",
          KG: "Өрүк кайра иштетүү",
          EN: "Apricot processing",
        },
        summary: {
          RU: "Сушка и экспорт абрикоса местных садов.",
          KG: "Жергиликтүү бакчалардын өрүгүн кургатуу жана экспорттоо.",
          EN: "Drying and export of local apricot harvests.",
        },
        status: "active",
      },
    ],
  },
  {
    id: "leylek",
    name: { RU: "Лейлекский район", KG: "Лейлек району", EN: "Leylek district" },
    region: { RU: "Баткенская область", KG: "Баткен облусу", EN: "Batken Region" },
    coordinates: [39.85, 69.75],
    projects: [
      {
        id: "leylek-1",
        title: {
          RU: "Медовое производство",
          KG: "Бал өндүрүшү",
          EN: "Honey production",
        },
        summary: {
          RU: "Кооператив пчеловодов и фасовка мёда.",
          KG: "Аарычылар кооперативи жана балды таңгактоо.",
          EN: "Beekeeper cooperative and honey packing.",
        },
        status: "completed",
      },
    ],
  },
] as const;
