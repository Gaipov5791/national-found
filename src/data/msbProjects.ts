import type { Lang } from "@/lib/lang";

export type L10nText = Record<Lang, string>;

export type MsbProjectStatus = "active" | "completed";

export type MsbInstrument = "loan" | "grant";

export type MsbProject = {
  id: string;
  title: L10nText;
  summary: L10nText;
  /** Financing amount in KGS */
  amountSom: number;
  instrument: MsbInstrument;
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

const region = {
  bishkek: { RU: "г. Бишкек", KG: "Бишкек ш.", EN: "Bishkek" },
  chuy: { RU: "Чуйская область", KG: "Чүй облусу", EN: "Chuy Region" },
  talas: { RU: "Таласская область", KG: "Талас облусу", EN: "Talas Region" },
  naryn: { RU: "Нарынская область", KG: "Нарын облусу", EN: "Naryn Region" },
  issykKul: { RU: "Иссык-Кульская область", KG: "Ысык-Көл облусу", EN: "Issyk-Kul Region" },
  jalalAbad: { RU: "Джалал-Абадская область", KG: "Жалал-Абад облусу", EN: "Jalal-Abad Region" },
  osh: { RU: "Ошская область", KG: "Ош облусу", EN: "Osh Region" },
  batken: { RU: "Баткенская область", KG: "Баткен облусу", EN: "Batken Region" },
} as const;

/** Real Fund SME portfolio from the «Общие» sheet (addresses geocoded to district/city points). */
export const MSB_DISTRICTS: readonly MsbDistrict[] = [
  {
    id: "bishkek",
    name: { RU: "г. Бишкек", KG: "Бишкек ш.", EN: "Bishkek city" },
    region: region.bishkek,
    coordinates: [42.8746, 74.5698],
    projects: [
      {
        id: "abdullaeva-felt",
        title: {
          RU: "Цех войлока и шерсти",
          KG: "Кийиз жана жүн цехи",
          EN: "Felt and wool workshop",
        },
        summary: {
          RU: "ИП «Абдуллаева Камилла» — запуск цеха по производству войлока и шерстяных изделий.",
          KG: "ЖИ «Абдуллаева Камилла» — кийиз жана жүн буюмдарын өндүрүү цехин ишке киргизүү.",
          EN: "IE Abdullaeva Kamilla — launching a workshop for felt and wool products.",
        },
        amountSom: 3504800,
        instrument: "loan",
        status: "active",
      },
      {
        id: "baibol-felt",
        title: {
          RU: "Производство войлочных изделий",
          KG: "Кийиз буюмдарын өндүрүү",
          EN: "Felt products manufacturing",
        },
        summary: {
          RU: "ОсОО «Группа компаний Байбол» — покупка оборудования для производства войлочных изделий.",
          KG: "«Байбол» компаниялар тобу» ЖЧК — кийиз буюмдарын өндүрүү үчүн жабдуу сатып алуу.",
          EN: "Baibol Group LLC — equipment for felt products manufacturing.",
        },
        amountSom: 2600000,
        instrument: "loan",
        status: "active",
      },
      {
        id: "ravenstvo-poultry",
        title: {
          RU: "Мобильный птичник",
          KG: "Мобилдүү тооккана",
          EN: "Mobile poultry house",
        },
        summary: {
          RU: "ОО «Равенство» — грант на приобретение мобильного птичника.",
          KG: "«Теңдик» КУ — мобилдүү тооккана сатып алууга грант.",
          EN: "Equality PA — grant for a mobile poultry house.",
        },
        amountSom: 178000,
        instrument: "grant",
        status: "active",
      },
    ],
  },
  {
    id: "alamudun",
    name: { RU: "Аламудунский район", KG: "Аламүдүн району", EN: "Alamudun district" },
    region: region.chuy,
    coordinates: [42.89, 74.55],
    projects: [
      {
        id: "erkeganova-wool",
        title: {
          RU: "Переработка шерсти",
          KG: "Жүндү кайра иштетүү",
          EN: "Wool processing",
        },
        summary: {
          RU: "ИП «Эркеганова Асель Бексултановна» (с. Нижняя Аларча) — иглопробивной и стегальный станки, оборотные средства.",
          KG: "ЖИ «Эркеганова Асель Бексултановна» (Төмөнкү Аларча а.) — ийне тешүүчү жана стежка станоктору, жүгүртүү каражаттары.",
          EN: "IE Erkeganova Asel (Nizhnyaya Alarcha) — needle-punch and quilting machines, working capital.",
        },
        amountSom: 3500000,
        instrument: "loan",
        status: "active",
      },
      {
        id: "kyrgyz-dan-premises",
        title: {
          RU: "Производственное помещение",
          KG: "Өндүрүштүк жай",
          EN: "Production premises",
        },
        summary: {
          RU: "ОсОО «Кыргыз Дан» (с. Мыкан) — приобретение производственного помещения.",
          KG: "«Кыргыз Дан» ЖЧК (Мыкан а.) — өндүрүштүк жай сатып алуу.",
          EN: "Kyrgyz Dan LLC (Mykan) — acquisition of production premises.",
        },
        amountSom: 8660000,
        instrument: "loan",
        status: "active",
      },
    ],
  },
  {
    id: "sokuluk",
    name: { RU: "Сокулукский район", KG: "Сокулук району", EN: "Sokuluk district" },
    region: region.chuy,
    coordinates: [42.86, 74.3],
    projects: [
      {
        id: "kushubakova-processing",
        title: {
          RU: "Производственное оборудование",
          KG: "Өндүрүштүк жабдуу",
          EN: "Production equipment",
        },
        summary: {
          RU: "ИП «Кушубакова Самарбу Бекматжановна» (с. Сокулук) — оборудование, оборотный капитал и модульные блоки для цеха.",
          KG: "ЖИ «Кушубакова Самарбу Бекматжановна» (Сокулук а.) — жабдуу, жүгүртүү капиталы жана цех үчүн модулдук блоктор.",
          EN: "IE Kushubakova Samarbu (Sokuluk) — equipment, working capital and modular blocks for a workshop.",
        },
        amountSom: 2506710,
        instrument: "loan",
        status: "active",
      },
      {
        id: "mayluu-sutuu-cheese",
        title: {
          RU: "Производство сыра",
          KG: "Сыр өндүрүшү",
          EN: "Cheese production",
        },
        summary: {
          RU: "ОсОО «Майлуу-Суттуу» (с. Белек) — линия оборудования для сырной продукции.",
          KG: "«Майлуу-Сүттүү» ЖЧК (Белек а.) — сыр продукциясы үчүн жабдуу линиясы.",
          EN: "Mayluu-Sutuu LLC (Belek) — equipment line for cheese products.",
        },
        amountSom: 2856040,
        instrument: "loan",
        status: "active",
      },
      {
        id: "guseynova-poultry",
        title: {
          RU: "Мобильный птичник",
          KG: "Мобилдүү тооккана",
          EN: "Mobile poultry house",
        },
        summary: {
          RU: "Гусейнова Айнагуль Исатбековна (с. Сокулук) — грант на покупку мобильного птичника.",
          KG: "Гусейнова Айнагүл Исатбековна (Сокулук а.) — мобилдүү тооккана сатып алууга грант.",
          EN: "Guseynova Ainagul (Sokuluk) — grant for a mobile poultry house.",
        },
        amountSom: 178000,
        instrument: "grant",
        status: "active",
      },
    ],
  },
  {
    id: "jayil",
    name: { RU: "Жайылский район", KG: "Жайыл району", EN: "Jayil district" },
    region: region.chuy,
    coordinates: [42.8, 73.9],
    projects: [
      {
        id: "dzhusupbekov-freezing",
        title: {
          RU: "Шоковая заморозка",
          KG: "Шок тоңдуруу",
          EN: "Blast freezing",
        },
        summary: {
          RU: "ИП «Джусупбеков Мирлан Акимжанович» (с. Кыйырма) — шкафы шоковой заморозки и дизельный генератор 25 кВт.",
          KG: "ЖИ «Жусупбеков Мирлан Акимжанович» (Кыйырма а.) — шок тоңдуруу шкафтары жана 25 кВт дизел генератору.",
          EN: "IE Dzhusupbekov Mirlan (Kyiyrma) — blast freezers and a 25 kW diesel generator.",
        },
        amountSom: 3000000,
        instrument: "loan",
        status: "active",
      },
      {
        id: "li-wool",
        title: {
          RU: "Переработка шерсти",
          KG: "Жүндү кайра иштетүү",
          EN: "Wool processing",
        },
        summary: {
          RU: "ИП «Ли Сергей Сергеевич» (с. Сосновка) — запчасти для оборудования, закупка и мойка сырья.",
          KG: "ЖИ «Ли Сергей Сергеевич» (Сосновка а.) — жабдуу тетиктери, чийки зат сатып алуу жана жуу.",
          EN: "IE Li Sergey (Sosnovka) — spare parts, raw material purchase and washing.",
        },
        amountSom: 3000000,
        instrument: "loan",
        status: "active",
      },
    ],
  },
  {
    id: "talas-city",
    name: { RU: "г. Талас", KG: "Талас ш.", EN: "Talas city" },
    region: region.talas,
    coordinates: [42.5228, 72.2427],
    projects: [
      {
        id: "nurseiit-wool",
        title: {
          RU: "Заготовка овечьей шерсти",
          KG: "Кой жүндүн даярдоосу",
          EN: "Sheep wool procurement",
        },
        summary: {
          RU: "ИП «Нурсейит кызы Нурсайкал» — закупка сырья и овечьей шерсти.",
          KG: "ЖИ «Нурсейит кызы Нурсайкал» — чийки зат жана кой жүндүн сатып алуу.",
          EN: "IE Nurseiit kyzy Nursaikal — purchase of raw materials and sheep wool.",
        },
        amountSom: 2400000,
        instrument: "loan",
        status: "active",
      },
    ],
  },
  {
    id: "talas-district",
    name: { RU: "Таласский район", KG: "Талас району", EN: "Talas district" },
    region: region.talas,
    coordinates: [42.55, 72.15],
    projects: [
      {
        id: "nurzhanov-silage",
        title: {
          RU: "Производство и упаковка силоса",
          KG: "Силос өндүрүү жана таңгактоо",
          EN: "Silage production and packing",
        },
        summary: {
          RU: "СКК «Нуржанов Агрохолдинг» (с. Жон-Арык) — производство и упаковка силоса.",
          KG: "«Нуржанов Агрохолдинг» АКК (Жон-Арык а.) — силос өндүрүү жана таңгактоо.",
          EN: "Nurzhanov Agroholding (Jon-Aryk) — silage production and packing.",
        },
        amountSom: 600000,
        instrument: "loan",
        status: "active",
      },
    ],
  },
  {
    id: "bakai-ata",
    name: { RU: "Бакай-Атинский район", KG: "Бакай-Ата району", EN: "Bakai-Ata district" },
    region: region.talas,
    coordinates: [42.48, 71.95],
    projects: [
      {
        id: "gert-safflower",
        title: {
          RU: "Переработка сафлора",
          KG: "Сафлорду кайра иштетүү",
          EN: "Safflower processing",
        },
        summary: {
          RU: "КХ «Герт» (с. Ак-Добо) — оборудование по переработке сафлора.",
          KG: "«Герт» ДЧ (Ак-Дөбө а.) — сафлорду кайра иштетүү жабдуусу.",
          EN: "Farm Gert (Ak-Dobo) — safflower processing equipment.",
        },
        amountSom: 1366000,
        instrument: "loan",
        status: "active",
      },
    ],
  },
  {
    id: "naryn-city",
    name: { RU: "г. Нарын", KG: "Нарын ш.", EN: "Naryn city" },
    region: region.naryn,
    coordinates: [41.4287, 75.9911],
    projects: [
      {
        id: "anarbekov-footwear",
        title: {
          RU: "Обувь из шерсти",
          KG: "Жүндөн бут кийим",
          EN: "Wool footwear",
        },
        summary: {
          RU: "ИП «Анарбеков Акбар Русланович» — оборудование для производства уличной обуви из шерсти.",
          KG: "ЖИ «Анарбеков Акбар Русланович» — жүндөн көчө бут кийимин өндүрүү жабдуусу.",
          EN: "IE Anarbekov Akbar — equipment for outdoor wool footwear production.",
        },
        amountSom: 5000000,
        instrument: "loan",
        status: "active",
      },
      {
        id: "zhakshylykov-wool",
        title: {
          RU: "Заготовка овечьей шерсти",
          KG: "Кой жүндүн даярдоосу",
          EN: "Sheep wool procurement",
        },
        summary: {
          RU: "ИП «Жакшылыков Курманбек Асанбекович» — приобретение сырья и овечьей шерсти.",
          KG: "ЖИ «Жакшылыков Курманбек Асанбекович» — чийки зат жана кой жүндүн сатып алуу.",
          EN: "IE Zhakshylykov Kurmanbek — purchase of raw materials and sheep wool.",
        },
        amountSom: 4000000,
        instrument: "loan",
        status: "active",
      },
    ],
  },
  {
    id: "naryn-district",
    name: { RU: "Нарынский район", KG: "Нарын району", EN: "Naryn district" },
    region: region.naryn,
    coordinates: [41.45, 75.95],
    projects: [
      {
        id: "usoyun-hospitality",
        title: {
          RU: "Гостиничная инфраструктура",
          KG: "Мейманкана инфраструктурасы",
          EN: "Hospitality infrastructure",
        },
        summary: {
          RU: "ИП Усойун уулу Улан (с. Таш-Башат) — оборудование, мебель и отделочные работы для расширения инфраструктуры.",
          KG: "ЖИ Усойун уулу Улан (Таш-Башат а.) — инфраструктураны кеңейтүү үчүн жабдуу, эмерек жана жасалгалоо иштери.",
          EN: "IE Usoyun uulu Ulan (Tash-Bashat) — equipment, furniture and finishing works to expand facilities.",
        },
        amountSom: 2000000,
        instrument: "loan",
        status: "active",
      },
      {
        id: "namazbek-workshop",
        title: {
          RU: "Дооснащение цеха",
          KG: "Цехти толуктоо",
          EN: "Workshop upgrade",
        },
        summary: {
          RU: "ИП «Намазбек уулу Самат» (Эмгек-Талаа) — тепловой пресс и фрезерный станок с ЧПУ.",
          KG: "ЖИ «Намазбек уулу Самат» (Эмгек-Талаа) — жылуулук пресси жана ЧПУ фрезер станогу.",
          EN: "IE Namazbek uulu Samat (Emgek-Talaa) — heat press and CNC milling machine.",
        },
        amountSom: 2810000,
        instrument: "loan",
        status: "active",
      },
    ],
  },
  {
    id: "kochkor",
    name: { RU: "Кочкорский район", KG: "Кочкор району", EN: "Kochkor district" },
    region: region.naryn,
    coordinates: [42.21, 75.75],
    projects: [
      {
        id: "akmatov-ahmedjan-wool",
        title: {
          RU: "Приём и заготовка шерсти",
          KG: "Жүндү кабыл алуу жана даярдоо",
          EN: "Wool intake and procurement",
        },
        summary: {
          RU: "ИП «Акматов Ахмеджан Саитович» (с. Кочкор) — пополнение оборота для приёма и заготовки шерсти.",
          KG: "ЖИ «Акматов Ахмеджан Саитович» (Кочкор а.) — жүндү кабыл алуу жана даярдоо үчүн жүгүртүү каражаттарын толуктоо.",
          EN: "IE Akmatov Ahmedjan (Kochkor) — working capital for wool intake and procurement.",
        },
        amountSom: 2000000,
        instrument: "loan",
        status: "active",
      },
    ],
  },
  {
    id: "jumgal",
    name: { RU: "Жумгальский район", KG: "Жумгал району", EN: "Jumgal district" },
    region: region.naryn,
    coordinates: [41.9, 74.3],
    projects: [
      {
        id: "ibiraimov-poultry",
        title: {
          RU: "Мобильный птичник",
          KG: "Мобилдүү тооккана",
          EN: "Mobile poultry house",
        },
        summary: {
          RU: "ИП Ибираимов Жусуп Оболбекович (с. Кызыл-Эмгек) — покупка мобильного птичника.",
          KG: "ЖИ Ибираимов Жусуп Оболбекович (Кызыл-Эмгек а.) — мобилдүү тооккана сатып алуу.",
          EN: "IE Ibiraimov Zhusup (Kyzyl-Emgek) — purchase of a mobile poultry house.",
        },
        amountSom: 173000,
        instrument: "loan",
        status: "active",
      },
    ],
  },
  {
    id: "karakol",
    name: { RU: "г. Каракол", KG: "Каракол ш.", EN: "Karakol city" },
    region: region.issykKul,
    coordinates: [42.4907, 78.3936],
    projects: [
      {
        id: "akmatov-adilet-wool",
        title: {
          RU: "Заготовка шерсти",
          KG: "Жүндү даярдоо",
          EN: "Wool procurement",
        },
        summary: {
          RU: "ИП «Акматов Адилет Кубанычбекович» — пополнение оборотных средств для заготовки шерсти.",
          KG: "ЖИ «Акматов Адилет Кубанычбекович» — жүндү даярдоо үчүн жүгүртүү каражаттарын толуктоо.",
          EN: "IE Akmatov Adilet — working capital for wool procurement.",
        },
        amountSom: 2000000,
        instrument: "loan",
        status: "active",
      },
    ],
  },
  {
    id: "ton",
    name: { RU: "Тонский район", KG: "Тоң району", EN: "Ton district" },
    region: region.issykKul,
    coordinates: [42.15, 77.2],
    projects: [
      {
        id: "isakov-dairy",
        title: {
          RU: "Доильное оборудование",
          KG: "Саан жабдуусу",
          EN: "Milking equipment",
        },
        summary: {
          RU: "Исаков Тимурлан Карыпович (с. Торт-Куль) — грант на доильный аппарат и сопутствующие нужды.",
          KG: "Исаков Тимурлан Карыпович (Төрт-Күл а.) — саан аппаратына жана кошумча муктаждыктарга грант.",
          EN: "Isakov Timurlan (Tort-Kul) — grant for a milking machine and related needs.",
        },
        amountSom: 455900,
        instrument: "grant",
        status: "active",
      },
    ],
  },
  {
    id: "kerben",
    name: { RU: "г. Кербен", KG: "Кербен ш.", EN: "Kerben city" },
    region: region.jalalAbad,
    coordinates: [41.49, 71.75],
    projects: [
      {
        id: "abdurasul-wool",
        title: {
          RU: "Линия переработки шерсти",
          KG: "Жүндү кайра иштетүү линиясы",
          EN: "Wool processing line",
        },
        summary: {
          RU: "ИП «Абдурасул уулу Бекмурат» — линия мойки, чесания, сушки и стежки шерсти, оборотные средства.",
          KG: "ЖИ «Абдурасул уулу Бекмурат» — жүндү жуу, тароо, кургатуу жана стежка линиясы, жүгүртүү каражаттары.",
          EN: "IE Abdurasul uulu Bekmurat — wool washing, carding, drying and quilting line, plus working capital.",
        },
        amountSom: 3300000,
        instrument: "loan",
        status: "active",
      },
      {
        id: "akymbaev-safflower",
        title: {
          RU: "Переработка сафлора",
          KG: "Сафлорду кайра иштетүү",
          EN: "Safflower processing",
        },
        summary: {
          RU: "ИП Акымбаев У. Д. — оборудование по переработке сафлорового масла (проект завершён досрочно).",
          KG: "ЖИ Акымбаев У. Д. — сафлор майын кайра иштетүү жабдуусу (долбоор мөөнөтүнөн мурда аяктаган).",
          EN: "IE Akymbaev U. D. — safflower oil processing equipment (completed ahead of schedule).",
        },
        amountSom: 573300,
        instrument: "loan",
        status: "completed",
      },
    ],
  },
  {
    id: "chatkal",
    name: { RU: "Чаткальский район", KG: "Чаткал району", EN: "Chatkal district" },
    region: region.jalalAbad,
    coordinates: [41.7, 71.0],
    projects: [
      {
        id: "ak-dan-safflower",
        title: {
          RU: "Производство сафлорового масла",
          KG: "Сафлор майын өндүрүү",
          EN: "Safflower oil production",
        },
        summary: {
          RU: "СХК «Ак-Дан Жаны Базар» (с. Жаны-Базар) — производство сафлорового масла.",
          KG: "«Ак-Дан Жаңы Базар» АЧК (Жаңы-Базар а.) — сафлор майын өндүрүү.",
          EN: "Ak-Dan Zhany Bazar (Zhany-Bazar) — safflower oil production.",
        },
        amountSom: 573300,
        instrument: "loan",
        status: "active",
      },
    ],
  },
  {
    id: "toguz-toro",
    name: { RU: "Тогуз-Тороуский район", KG: "Тогуз-Торо району", EN: "Toguz-Toro district" },
    region: region.jalalAbad,
    coordinates: [41.4, 73.8],
    projects: [
      {
        id: "sheripov-safflower",
        title: {
          RU: "Переработка сафлора",
          KG: "Сафлорду кайра иштетүү",
          EN: "Safflower processing",
        },
        summary: {
          RU: "ИП «Шерипов У. Б.» (с. Атай) — оборудование по переработке сафлора.",
          KG: "ЖИ «Шерипов У. Б.» (Атай а.) — сафлорду кайра иштетүү жабдуусу.",
          EN: "IE Sheripov U. B. (Atay) — safflower processing equipment.",
        },
        amountSom: 1342859,
        instrument: "loan",
        status: "active",
      },
    ],
  },
  {
    id: "suzak",
    name: { RU: "Сузакский район", KG: "Сузак району", EN: "Suzak district" },
    region: region.jalalAbad,
    coordinates: [40.9, 72.95],
    projects: [
      {
        id: "kabirov-wool",
        title: {
          RU: "Переработка шерсти",
          KG: "Жүндү кайра иштетүү",
          EN: "Wool processing",
        },
        summary: {
          RU: "ИП «Кабиров Жыргалбек Каныбекович» (с. Сафаровка) — оборудование для переработки шерсти.",
          KG: "ЖИ «Кабиров Жыргалбек Каныбекович» (Сафаровка а.) — жүндү кайра иштетүү жабдуусу.",
          EN: "IE Kabirov Zhyrgalbek (Safarovka) — wool processing equipment.",
        },
        amountSom: 3600000,
        instrument: "loan",
        status: "active",
      },
    ],
  },
  {
    id: "chong-alay",
    name: { RU: "Чон-Алайский район", KG: "Чоң-Алай району", EN: "Chong-Alay district" },
    region: region.osh,
    coordinates: [39.6, 72.3],
    projects: [
      {
        id: "saparaliev-poultry",
        title: {
          RU: "Птицеводство",
          KG: "Тоокчулук",
          EN: "Poultry farming",
        },
        summary: {
          RU: "ИП «Сапаралиев Абдилаким Туратбекович» (с. Жаш-Тилек) — покупка кур и корма.",
          KG: "ЖИ «Сапаралиев Абдилаким Туратбекович» (Жаш-Тилек а.) — тоок жана тоют сатып алуу.",
          EN: "IE Saparaliev Abdilakim (Jash-Tilek) — purchase of chickens and feed.",
        },
        amountSom: 880800,
        instrument: "loan",
        status: "active",
      },
    ],
  },
  {
    id: "kara-kulja",
    name: { RU: "Кара-Кулжинский район", KG: "Кара-Кулжа району", EN: "Kara-Kulja district" },
    region: region.osh,
    coordinates: [40.5, 73.5],
    projects: [
      {
        id: "mataeva-wool",
        title: {
          RU: "Линия переработки шерсти",
          KG: "Жүндү кайра иштетүү линиясы",
          EN: "Wool processing line",
        },
        summary: {
          RU: "ИП «Матаева Айгул Асановна» (с. Бий-Мырза) — линия мойки, чесания, валяния и стежки шерсти.",
          KG: "ЖИ «Матаева Айгүл Асановна» (Бий-Мырза а.) — жүндү жуу, тароо, кийиздөө жана стежка линиясы.",
          EN: "IE Mataeva Aigul (Biy-Myrza) — wool washing, carding, felting and quilting line.",
        },
        amountSom: 3800630,
        instrument: "loan",
        status: "active",
      },
    ],
  },
  {
    id: "kadamjay",
    name: { RU: "Кадамжайский район", KG: "Кадамжай району", EN: "Kadamjay district" },
    region: region.batken,
    coordinates: [40.12, 71.75],
    projects: [
      {
        id: "arzybaeva-drying",
        title: {
          RU: "Сушка овощей и фруктов",
          KG: "Жашылча-жемиш кургатуу",
          EN: "Fruit and vegetable drying",
        },
        summary: {
          RU: "ИП «Арзыбаева Азада Абдижамиловна» (с. Кыргыз-Кыштак) — оборудование для сушки и мойки овощей и фруктов.",
          KG: "ЖИ «Арзыбаева Азада Абдижамиловна» (Кыргыз-Кыштак а.) — жашылча-жемишти кургатуу жана жуу жабдуусу.",
          EN: "IE Arzybaeva Azada (Kyrgyz-Kyshtak) — equipment for washing and drying fruit and vegetables.",
        },
        amountSom: 400000,
        instrument: "loan",
        status: "active",
      },
    ],
  },
  {
    id: "leylek",
    name: { RU: "Лейлекский район", KG: "Лейлек району", EN: "Leylek district" },
    region: region.batken,
    coordinates: [39.9, 69.7],
    projects: [
      {
        id: "kara-biy-safflower",
        title: {
          RU: "Переработка сафлора",
          KG: "Сафлорду кайра иштетүү",
          EN: "Safflower processing",
        },
        summary: {
          RU: "СПК «Кара-Бий» (с. Тогуз-Булак) — оборудование по переработке сафлора.",
          KG: "«Кара-Бий» ӨПК (Тогуз-Булак а.) — сафлорду кайра иштетүү жабдуусу.",
          EN: "Kara-Biy cooperative (Toguz-Bulak) — safflower processing equipment.",
        },
        amountSom: 2272753,
        instrument: "loan",
        status: "active",
      },
    ],
  },
];

export function districtFinancing(district: MsbDistrict): number {
  return district.projects.reduce((sum, project) => sum + project.amountSom, 0);
}

export function portfolioStats(districts: readonly MsbDistrict[] = MSB_DISTRICTS) {
  const projects = districts.flatMap((d) => d.projects);
  const totalSom = projects.reduce((sum, p) => sum + p.amountSom, 0);
  const grantSom = projects
    .filter((p) => p.instrument === "grant")
    .reduce((sum, p) => sum + p.amountSom, 0);
  const loanSom = totalSom - grantSom;
  const grantCount = projects.filter((p) => p.instrument === "grant").length;
  return {
    projectCount: projects.length,
    districtCount: districts.length,
    totalSom,
    grantSom,
    loanSom,
    grantCount,
    grantShare: totalSom > 0 ? grantSom / totalSom : 0,
    loanShare: totalSom > 0 ? loanSom / totalSom : 0,
  };
}

export function formatSomAmount(amount: number, lang: Lang): string {
  const locale = lang === "EN" ? "en-US" : "ru-RU";
  if (amount >= 1_000_000) {
    const millions = amount / 1_000_000;
    const digits = millions >= 10 ? 1 : 2;
    const value = new Intl.NumberFormat(locale, {
      maximumFractionDigits: digits,
      minimumFractionDigits: 0,
    }).format(Number(millions.toFixed(digits)));
    if (lang === "EN") return `${value}M KGS`;
    if (lang === "KG") return `${value} млн сом`;
    return `${value} млн сом`;
  }
  const value = new Intl.NumberFormat(locale).format(amount);
  return lang === "EN" ? `${value} KGS` : `${value} сом`;
}

export function formatPercent(share: number, lang: Lang): string {
  const locale = lang === "EN" ? "en-US" : "ru-RU";
  return `${new Intl.NumberFormat(locale, {
    maximumFractionDigits: 1,
    minimumFractionDigits: 0,
  }).format(share * 100)}%`;
}
