import type { Lang } from "@/lib/lang";

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
    boardRoles: readonly string[];
    boardTitles: readonly (string | null)[];
    leadershipRoles: readonly string[];
    departmentRoles: readonly string[];
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

const ru: Messages = {
  common: {
    more: "Подробнее",
    language: "ЯЗЫК",
    menu: "Меню",
    backHome: "← На главную",
    photoSoon: "Фото скоро",
    comingSoon: "— скоро",
    staffCards: "Карточки сотрудников",
    brandShort: "НИФ КР",
  },
  nav: {
    home: "ГЛАВНАЯ",
    about: "О ФОНДЕ",
    finance: "ФИНАНСИРОВАНИЕ ПРОЕКТОВ",
    directions: "ПЕРСПЕКТИВНЫЕ НАПРАВЛЕНИЯ",
    msb: "ПРОЕКТЫ МСБ",
    partners: "ПАРТНЁРЫ",
    news: "НОВОСТИ",
    contacts: "КОНТАКТЫ",
  },
  decree: {
    line1: "Фонд учрежден постановлением",
    line2: "Кабинета Министров Кыргызской Республики",
    body: "от 5 ноября 2024 года № 666 во исполнение Закона Кыргызской Республики «О Национальном инвестиционном фонде Кыргызской Республики» и Указа Президента Кыргызской Республики № 155 от 14 июня 2024 года.",
  },
  counters: {
    tagline: "Инвестиции в проекты будущего",
    projects: "Проектов в реализации",
    totalSum: "Общая сумма проектов",
    currencySuffix: "с",
  },
  about: {
    heading: "О ФОНДЕ",
    blurb:
      "Национальный инвестиционный фонд выступает связующим звеном между государством, бизнесом и инвесторами. Мы применяем современные инструменты прямого инвестирования, направляя капитал в проекты, которые создают реальный экономический эффект и ускоряют развитие Кыргызстана.",
    pageTitle: "О фонде",
    goalTitle: "Цель и задачи",
    tasksTitle: "Основные задачи",
    legalTitle: "Правовой статус",
    boardTitle: "Совет директоров",
    leadershipTitle: "Руководство",
    departmentHeadsTitle: "Руководители департаментов",
    secretaryTitle: "Корпоративный секретарь",
    docsTitle: "Документы и отчётность",
    regulatoryTitle: "Регулирующие документы",
    reportsTitle: "Финансовая отчётность",
    founding:
      "Фонд учреждён постановлением Кабинета Министров Кыргызской Республики от 5 ноября 2024 года № 666 во исполнение Закона Кыргызской Республики «О Национальном инвестиционном фонде Кыргызской Республики» и Указа Президента Кыргызской Республики № 155 от 14 июня 2024 года.",
    goal: "Цель Фонда — повышать эффективность управления компаниями группы и обеспечивать долгосрочный рост их стоимости за счёт привлечения долгосрочных инвестиций и выхода на местный и международный рынок капитала.",
    tasks: [
      "Выполнение функций акционера (участника) в компаниях группы Фонда и управление имуществом, переданным в его собственность или доверительное управление.",
      "Повышение эффективности финансово-хозяйственной деятельности Фонда и компаний группы.",
      "Привлечение дополнительных инвестиций в Фонд и компании группы.",
      "Обеспечение выхода Фонда и компаний группы на местные и международные фондовые рынки.",
      "Формирование и реализация стратегий развития дочерних компаний.",
      "Содействие государственным органам в реализации отраслевых программ через компании группы.",
      "Формирование, развитие и управление кадровым потенциалом компаний группы.",
    ],
    legal: [
      "Фонд создан в форме открытого акционерного общества.",
      "Единственный акционер — Кабинет Министров Кыргызской Республики (в лице Министерства экономики и коммерции).",
      "Акции Фонда являются государственной собственностью и могут быть отчуждены только путём публичного предложения на фондовой бирже (не более 20 % акций).",
      "Кыргызская Республика не несёт ответственности по обязательствам Фонда, и Фонд не несёт ответственности по обязательствам Республики.",
    ],
    boardRoles: [
      "Председатель Совета директоров",
      "Член Совета директоров",
      "Член Совета директоров",
      "Член Совета директоров",
      "Член Совета директоров",
      "Член Совета директоров",
      "Член Совета директоров",
    ],
    boardTitles: [
      "Председатель Кабинета Министров Кыргызской Республики — Руководитель Администрации Президента Кыргызской Республики",
      "Специальный представитель Президента Кыргызской Республики по особым поручениям",
      "Министр финансов Кыргызской Республики",
      "Министр науки, высшего образования и инноваций Кыргызской Республики",
      null,
      null,
      null,
    ],
    leadershipRoles: ["Генеральный директор", "Заместитель генерального директора"],
    departmentRoles: [
      "Руководитель Юридического департамента",
      "Руководитель Инвестиционного департамента",
      "Руководитель Департамента IT-безопасности и комплаенс-контроля",
      "Руководитель департамента стратегического партнерства и организационных работ",
    ],
    secretaryRole: "Корпоративный секретарь",
    regulatoryDocs: [
      "Закон Кыргызской Республики «О Национальном инвестиционном фонде Кыргызской Республики» (№ 143 от 24 июля 2024 года)",
      "Устав ОАО «Национальный инвестиционный фонд Кыргызской Республики»",
    ],
    financialReports: ["Отчёт о финансовых результатах за 2025 год"],
  },
  finance: {
    heading: "ФИНАНСИРОВАНИЕ ПРОЕКТОВ",
    blurb:
      "Мы предлагаем современные инструменты финансирования, которые помогают привлекать капитал и успешно реализовывать стратегические проекты в Кыргызстане.",
    pageTitle: "Финансирование проектов",
    toolsTitle: "Инструменты фонда",
    toolsBody:
      "Фонд использует гибкие модели участия — от соинвестирования с банками и международными партнёрами до прямого вхождения в капитал компаний и целевых инструментов поддержки проектов.",
    applyCta: "Подать заявку",
    applyTitle: "Заявка на финансирование",
    applyIntro: "Заполните анкету — мы свяжемся с вами после рассмотрения заявки.",
    form: {
      organizationName: "Наименование организации",
      projectGoal: "Цель проекта",
      phone: "Телефон",
      email: "E-mail",
      submit: "Отправить",
      submitting: "Отправка…",
      successTitle: "Заявка отправлена",
      success: "Спасибо! Мы свяжемся с вами по указанным контактам.",
      errorTitle: "Не удалось отправить",
      error: "Попробуйте ещё раз или напишите на office@nif.kg.",
      required: "Заполните это поле",
    },
    cards: [
      {
        title: "Соинвестирование",
        description: "Совместное финансирование проектов с банками и международными партнёрами.",
      },
      {
        title: "Совместные предприятия",
        description: "Создание новых компаний совместно с инвесторами и государством.",
      },
      {
        title: "Инвестиции в капитал",
        description: "Прямое вхождение в капитал перспективных компаний.",
      },
      {
        title: "Инструменты поддержки",
        description: "Целевые займы и гарантии под конкретные нужды проекта.",
      },
    ],
  },
  directions: {
    heading: "ПЕРСПЕКТИВНЫЕ НАПРАВЛЕНИЯ",
    blurb:
      "Национальный инвестиционный фонд работает с ключевыми отраслями, которые имеют высокий потенциал роста и важны для развития экономики Кыргызстана.",
    pageTitle: "Перспективные направления",
    focusTitle: "Отраслевой фокус",
    focusBody:
      "Приоритет отдаётся проектам, которые формируют долгосрочный экономический эффект, создают рабочие места и развивают инфраструктуру регионов.",
    cards: [
      {
        title: "Промышленность и переработка",
        description: "Развитие производственных мощностей и глубокой переработки сырья.",
      },
      {
        title: "Транспорт и логистика",
        description: "Инфраструктурные проекты, связывающие регионы и рынки.",
      },
      {
        title: "Энергетика и инфраструктура",
        description: "Энергетические объекты и базовая инфраструктура страны.",
      },
      {
        title: "Туризм",
        description: "Инвестиции в туристический потенциал Кыргызстана.",
      },
      {
        title: "Образование",
        description: "Проекты, формирующие кадровый и интеллектуальный потенциал.",
      },
      {
        title: "Здравоохранение",
        description: "Развитие медицинской инфраструктуры и сервисов.",
      },
    ],
  },
  msb: {
    heading: "ПРОЕКТЫ МСБ",
    blurb:
      "Малый и средний бизнес играет ключевую роль в развитии регионов Кыргызстана. Национальный инвестиционный фонд поддерживает проекты МСБ, с особым акцентом на агропромышленный комплекс и переработку местного сырья, помогая создавать устойчивые бизнес-модели и повышать уровень жизни в регионах страны.",
    pageTitle: "Проекты МСБ",
    pageIntro:
      "Фонд финансирует проекты малого и среднего бизнеса по всей стране — от переработки шерсти и сафлора до птицеводства, сыроварения и гостиничной инфраструктуры. На карте отмечены районы и города, где реализуются или уже реализованы проекты при поддержке фонда.",
    overviewTitle: "Портфель поддержки МСБ",
    overviewBody:
      "Программа охватывает все области Кыргызстана и сочетает целевые займы с грантовой поддержкой. Основной объём средств направляется на покупку оборудования, пополнение оборотных средств и развитие производственных площадок в регионах.",
    overviewInstruments:
      "Наряду с займами фонд выделяет гранты на социально значимые инициативы — например, мобильные птичники и доильное оборудование для небольших хозяйств. Доля грантов в текущем портфеле невелика, но они важны для запуска локальных проектов с ограниченным доступом к капиталу.",
    statProjects: "Проектов",
    statLocations: "Точек на карте",
    statTotal: "Объём финансирования",
    statGrants: "Гранты",
    statSplit:
      "Структура портфеля: займы и инвестиции — {loans}, гранты — {grants} ({grantCount} проекта). Нажмите на точку на карте, чтобы увидеть сумму по району и долю в общем портфеле.",
    mapTitle: "Карта проектов МСБ",
    mapHint: "Контур Кыргызстана выделен на фоне соседних стран. Точки — районы и города с проектами; цифра на точке — число проектов.",
    mapPanelIdle: "Выберите район",
    mapPanelHint:
      "Кликните по точке на карте, чтобы открыть проекты района, суммы финансирования и статус реализации.",
    selectRegion: "Регион",
    projectsInRegion: "Проекты района",
    statusActive: "В реализации",
    statusCompleted: "Реализован",
    noProjects: "В этом районе пока нет опубликованных проектов.",
    closePanel: "Закрыть",
    financedLabel: "Финансирование",
    districtTotal: "Всего по точке",
    ofPortfolio: "от портфеля",
    grantBadge: "Грант",
  },
  partners: {
    heading: "ПАРТНЁРЫ",
    blurb:
      "Национальный инвестиционный фонд развивает партнёрства с ведущими международными финансовыми институтами и организациями для реализации стратегических проектов в Кыргызстане.",
    pageTitle: "Партнёры",
    strategyTitle: "Стратегическое сотрудничество",
    strategyBody:
      "Партнёрства позволяют привлекать международный опыт, расширять источники финансирования и реализовывать масштабные инвестиционные инициативы в приоритетных отраслях экономики.",
    registryTitle: "Реестр партнёров",
    registryIntro:
      "В реестре представлены организации, оказывающие профессиональные услуги Национальному инвестиционному фонду Кыргызской Республики.",
    cooperationTitle: "Международное и региональное сотрудничество",
    cooperationIntro:
      "Национальный инвестиционный фонд развивает сотрудничество с международными и региональными организациями для реализации стратегических проектов в Кыргызской Республике.",
    cooperationPartnersTitle: "Партнёры",
    joinTitle: "Стать партнёром",
    joinIntro:
      "Ознакомьтесь с критериями аккредитации для компаний, желающих стать партнёрами Национального инвестиционного фонда Кыргызской Республики.",
    docsTitle: "Документы",
    accreditationTitle: "Критерии аккредитации",
    actions: {
      registry: "Реестр партнёров",
      cooperation: "Международное и региональное сотрудничество",
      join: "Стать партнёром",
    },
    registryCategories: [
      "Аудиторские услуги",
      "Бухгалтерские услуги",
      "Оценочные услуги",
      "Страховые услуги",
      "Юридические услуги",
    ],
    accreditationDocs: [
      "Критерии для аккредитации аудиторских компаний",
      "Критерии для аккредитации бухгалтерских компаний",
      "Критерии для аккредитации оценочных компаний",
      "Критерии для аккредитации страховых компаний",
      "Критерии для аккредитации юридических компаний",
    ],
  },
  news: {
    heading: "НОВОСТИ",
    blurb:
      "Здесь мы рассказываем о работе Национального инвестиционного фонда: запусках и ходе инвестиционных проектов, партнёрствах с бизнесом и международными институтами, открытых отборах консультантов и управляющих компаний, вакансиях и аккредитации профессиональных партнёров. Следите за обновлениями, чтобы первыми узнавать о решениях, которые формируют инвестиционный климат и развитие экономики Кыргызстана.",
    readMore: "Читать ещё",
    pageTitle: "Новости",
    pageIntro: "Актуальные материалы о деятельности Национального инвестиционного фонда Кыргызской Республики.",
    updatesTitle: "Следите за обновлениями",
    updatesBody:
      "Публикуем информацию о новых проектах, партнёрствах и ключевых событиях в деятельности Национального инвестиционного фонда Кыргызской Республики.",
    previewDescription: "Описание новости",
    previewImage: "изображение",
    placeholders: [
      {
        title: "Новые инвестиционные проекты",
        date: "Скоро",
        excerpt: "Анонсы проектов фонда и ключевые этапы их реализации.",
      },
      {
        title: "Партнёрские соглашения",
        date: "Скоро",
        excerpt: "Сотрудничество с международными финансовыми институтами.",
      },
      {
        title: "Развитие регионов",
        date: "Скоро",
        excerpt: "Инициативы фонда в поддержке МСБ и региональной экономики.",
      },
    ],
  },
  footer: {
    addressLabel: "Адрес",
    addressLines: [
      "Кыргызская Республика, 720001",
      "г. Бишкек, ул. Токтогула, 125/1, БЦ «Авангард»,",
      "8 этаж,",
    ],
    towerA: 'Башня "А"',
    rightWing: "правое крыло",
    phoneLabel: "Телефон:",
    hotlineLabel: "Телефон доверия:",
    qrLabel: "Сайт на телефоне",
    copyright: "© 2026 Общественный фонд «Фонд социального партнёрства по развитию регионов»",
    developer: "Разработчик Гаипов Бакыт",
    backToTop: "Вернуться наверх",
  },
};

const kg: Messages = {
  common: {
    more: "Толугураак",
    language: "ТИЛ",
    menu: "Меню",
    backHome: "← Башкы бетке",
    photoSoon: "Сүрөт жакында",
    comingSoon: "— жакында",
    staffCards: "Кызматкерлердин карточкалары",
    brandShort: "КР УИФ",
  },
  nav: {
    home: "БАШКЫ БЕТ",
    about: "ФОНД ЖӨНҮНДӨ",
    finance: "ДОЛБООРЛОРДУ КАРЖЫЛОО",
    directions: "КЕЛЕЧЕКТҮҮ БАГЫТТАР",
    msb: "ЧОЖ ДОЛБООРЛОРУ",
    partners: "ӨНӨКТӨШТӨР",
    news: "ЖАҢЫЛЫКТАР",
    contacts: "БАЙЛАНЫШ",
  },
  decree: {
    line1: "Фонд төмөнкү токтом менен түзүлгөн",
    line2: "Кыргыз Республикасынын Министрлер Кабинетинин",
    body: "2024-жылдын 5-ноябрындагы № 666 токтому менен — Кыргыз Республикасынын «Кыргыз Республикасынын Улуттук инвестициялык фонду жөнүндө» Мыйзамын жана Кыргыз Республикасынын Президентинин 2024-жылдын 14-июнундагы № 155 Жарлыгын аткаруу максатында.",
  },
  counters: {
    tagline: "Келечек долбоорлоруна инвестициялар",
    projects: "Ишке ашырылып жаткан долбоорлор",
    totalSum: "Долбоорлордун жалпы суммасы",
    currencySuffix: "с",
  },
  about: {
    heading: "ФОНД ЖӨНҮНДӨ",
    blurb:
      "Улуттук инвестициялык фонд мамлекет, бизнес жана инвесторлордун ортосундагы байланыштыруучу звено болуп саналат. Биз түз инвестициялоонун заманбап инструменттерин колдонуп, капиталды Кыргызстандын өнүгүшүн тездеткен жана чыныгы экономикалык эффект жараткан долбоорлорго багыттайбыз.",
    pageTitle: "Фонд жөнүндө",
    goalTitle: "Максат жана милдеттер",
    tasksTitle: "Негизги милдеттер",
    legalTitle: "Укуктук статус",
    boardTitle: "Директорлор кеңеши",
    leadershipTitle: "Жетекчилик",
    departmentHeadsTitle: "Департамент жетекчилери",
    secretaryTitle: "Корпоративдик катчы",
    docsTitle: "Документтер жана отчеттуулук",
    regulatoryTitle: "Жөнгө салуучу документтер",
    reportsTitle: "Финансылык отчеттуулук",
    founding:
      "Фонд Кыргыз Республикасынын Министрлер Кабинетинин 2024-жылдын 5-ноябрындагы № 666 токтому менен — Кыргыз Республикасынын «Кыргыз Республикасынын Улуттук инвестициялык фонду жөнүндө» Мыйзамын жана Кыргыз Республикасынын Президентинин 2024-жылдын 14-июнундагы № 155 Жарлыгын аткаруу максатында түзүлгөн.",
    goal: "Фонддун максаты — топтун компанияларын башкаруунун натыйжалуулугун жогорулатуу жана узак мөөнөттүү инвестицияларды тартуу менен жергиликтүү жана эл аралык капитал рыногуна чыгуу аркылуу алардын наркынын узак мөөнөттүү өсүшүн камсыздоо.",
    tasks: [
      "Фонд тобунун компанияларында акционердин (катышуучунун) функцияларын аткаруу жана анын менчигине же ишенимдүү башкарууга берилген мүлктү башкаруу.",
      "Фонддун жана топтун компанияларынын финансылык-чарбалык ишинин натыйжалуулугун жогорулатуу.",
      "Фондго жана топтун компанияларына кошумча инвестицияларды тартуу.",
      "Фонддун жана топтун компанияларынын жергиликтүү жана эл аралык фонд рынокторуна чыгуусун камсыздоо.",
      "Туунду компаниялардын өнүгүү стратегияларын түзүү жана ишке ашыруу.",
      "Мамлекеттик органдарга тармактык программаларды топтун компаниялары аркылуу ишке ашырууга көмөктөшүү.",
      "Топтун компанияларынын кадрдык потенциалын калыптандыруу, өнүктүрүү жана башкаруу.",
    ],
    legal: [
      "Фонд ачык акционердик коом формасында түзүлгөн.",
      "Жалгыз акционер — Кыргыз Республикасынын Министрлер Кабинети (Экономика жана коммерция министрлигинин атынан).",
      "Фонддун акциялары мамлекеттик менчик болуп саналат жана фонд биржасында ачык сунуштоо жолу менен гана ээликтен ажыратылышы мүмкүн (акциялардын 20% ашык эмес).",
      "Кыргыз Республикасы Фонддун милдеттенмелери боюнча жоопкерчилик тартпайт, Фонд да Республиканын милдеттенмелери боюнча жоопкерчилик тартпайт.",
    ],
    boardRoles: [
      "Директорлор кеңешинин төрагасы",
      "Директорлор кеңешинин мүчөсү",
      "Директорлор кеңешинин мүчөсү",
      "Директорлор кеңешинин мүчөсү",
      "Директорлор кеңешинин мүчөсү",
      "Директорлор кеңешинин мүчөсү",
      "Директорлор кеңешинин мүчөсү",
    ],
    boardTitles: [
      "Кыргыз Республикасынын Министрлер Кабинетинин Төрагасы — Кыргыз Республикасынын Президентинин Администрациясынын Жетекчиси",
      "Кыргыз Республикасынын Президентинин өзгөчө тапшырмалар боюнча атайын өкүлү",
      "Кыргыз Республикасынын Финансы министри",
      "Кыргыз Республикасынын Илими, жогорку билим берүү жана инновациялар министри",
      null,
      null,
      null,
    ],
    leadershipRoles: ["Башкы директор", "Башкы директордун орун басары"],
    departmentRoles: [
      "Юридикалык департаменттин жетекчиси",
      "Инвестициялык департаменттин жетекчиси",
      "IT-коопсуздук жана комплаенс-контроль департаментинин жетекчиси",
      "Стратегиялык өнөктөштүк жана уюштуруу иштери департаментинин жетекчиси",
    ],
    secretaryRole: "Корпоративдик катчы",
    regulatoryDocs: [
      "Кыргыз Республикасынын «Кыргыз Республикасынын Улуттук инвестициялык фонду жөнүндө» Мыйзамы (2024-жылдын 24-июлундагы № 143)",
      "«Кыргыз Республикасынын Улуттук инвестициялык фонду» ААК Уставы",
    ],
    financialReports: ["2025-жыл үчүн финансылык натыйжалар жөнүндө отчет"],
  },
  finance: {
    heading: "ДОЛБООРЛОРДУ КАРЖЫЛОО",
    blurb:
      "Биз капиталды тартууга жана Кыргызстандагы стратегиялык долбоорлорду ийгиликтүү ишке ашырууга жардам берген заманбап каржылоо инструменттерин сунуштайбыз.",
    pageTitle: "Долбоорлорду каржылоо",
    toolsTitle: "Фонддун инструменттери",
    toolsBody:
      "Фонд ийкемдүү катышуу моделдерин колдонот — банктар жана эл аралык өнөктөштөр менен биргелешкен инвестициялоодон тартып компаниялардын капиталына түз кирүүгө жана долбоорлорду колдоонун максаттуу инструменттерине чейин.",
    applyCta: "Арыз берүү",
    applyTitle: "Каржылоого арыз",
    applyIntro: "Анкетаны толтуруңуз — арызды карап чыккандан кийин сиз менен байланышабыз.",
    form: {
      organizationName: "Уюмдун аталышы",
      projectGoal: "Долбоордун максаты",
      phone: "Телефон",
      email: "E-mail",
      submit: "Жөнөтүү",
      submitting: "Жөнөтүлүүдө…",
      successTitle: "Арыз жөнөтүлдү",
      success: "Рахмат! Көрсөтүлгөн байланыштар боюнча сиз менен байланышабыз.",
      errorTitle: "Жөнөтүлбөй калды",
      error: "Кайра аракет кылыңыз же office@nif.kg дарегине жазыңыз.",
      required: "Бул талааны толтуруңуз",
    },
    cards: [
      {
        title: "Биргелешкен инвестициялоо",
        description: "Банктар жана эл аралык өнөктөштөр менен долбоорлорду биргелешип каржылоо.",
      },
      {
        title: "Биргелешкен ишканалар",
        description: "Инвесторлор жана мамлекет менен бирге жаңы компанияларды түзүү.",
      },
      {
        title: "Капиталга инвестициялар",
        description: "Келечектүү компаниялардын капиталына түз кирүү.",
      },
      {
        title: "Колдоо инструменттери",
        description: "Долбоордун конкреттүү муктаждыктарына ылайык максаттуу насыялар жана кепилдиктер.",
      },
    ],
  },
  directions: {
    heading: "КЕЛЕЧЕКТҮҮ БАГЫТТАР",
    blurb:
      "Улуттук инвестициялык фонд өсүү потенциалы жогору жана Кыргызстандын экономикасын өнүктүрүү үчүн маанилүү болгон негизги тармактар менен иштейт.",
    pageTitle: "Келечектүү багыттар",
    focusTitle: "Тармактык басым",
    focusBody:
      "Узак мөөнөттүү экономикалык эффект жараткан, жумуш орундарын түзгөн жана аймактардын инфраструктурасын өнүктүргөн долбоорлорго артыкчылык берилет.",
    cards: [
      {
        title: "Өнөр жай жана кайра иштетүү",
        description: "Өндүрүштүк кубаттуулуктарды жана чийки затты терең кайра иштетүүнү өнүктүрүү.",
      },
      {
        title: "Транспорт жана логистика",
        description: "Аймактарды жана базарларды байланыштырган инфраструктуралык долбоорлор.",
      },
      {
        title: "Энергетика жана инфраструктура",
        description: "Энергетикалык объекттер жана өлкөнүн негизги инфраструктурасы.",
      },
      {
        title: "Туризм",
        description: "Кыргызстандын туристтик потенциалына инвестициялар.",
      },
      {
        title: "Билим берүү",
        description: "Кадрдык жана интеллектуалдык потенциалды калыптандырган долбоорлор.",
      },
      {
        title: "Саламаттык сактоо",
        description: "Медициналык инфраструктураны жана кызматтарды өнүктүрүү.",
      },
    ],
  },
  msb: {
    heading: "ЧОЖ ДОЛБООРЛОРУ",
    blurb:
      "Чакан жана орто бизнес Кыргызстандын аймактарын өнүктүрүүдө негизги ролду ойнойт. Улуттук инвестициялык фонд ЧОЖ долбоорлорун колдойт, айрыкча агроөнөр жай комплексине жана жергиликтүү чийки затты кайра иштетүүгө басым жасап, туруктуу бизнес-моделдерди түзүүгө жана өлкөнүн аймактарында жашоо деңгээлин жогорулатууга жардам берет.",
    pageTitle: "ЧОЖ долбоорлору",
    pageIntro:
      "Фонд өлкө боюнча чакан жана орто бизнес долбоорлорун каржылайт — жүн жана сафлорду кайра иштетүүдөн тартып тоокчулук, сыр жасоо жана мейманкана инфраструктурасына чейин. Картада фонддун колдоосу менен ишке ашырылып жаткан же ишке ашырылган долбоорлор бар райондор жана шаарлар белгиленген.",
    overviewTitle: "ЧОЖду колдоо портфели",
    overviewBody:
      "Программа Кыргызстандын бардык облустарын камтыйт жана максаттуу займдарды гранттык колдоо менен айкалыштырат. Каражаттардын негизги бөлүгү жабдуу сатып алууга, жүгүртүү каражаттарын толуктоого жана аймактардагы өндүрүштүк аянттарды өнүктүрүүгө багытталат.",
    overviewInstruments:
      "Займдар менен катар фонд социалдык маанидеги демилгелерге гранттар берет — мисалы, чакан чарбалар үчүн мобилдүү тоокканалар жана саан жабдуулары. Гранттардын үлүшү азыркы портфелде кичине, бирок капиталга чектелген жеткиликтүүлүгү бар жергиликтүү долбоорлорду баштоо үчүн маанилүү.",
    statProjects: "Долбоорлор",
    statLocations: "Картадагы чекиттер",
    statTotal: "Каржылоо көлөмү",
    statGrants: "Гранттар",
    statSplit:
      "Портфелдин түзүмү: займдар жана инвестициялар — {loans}, гранттар — {grants} ({grantCount} долбоор). Район боюнча сумманы жана жалпы портфелдеги үлүштү көрүү үчүн картадагы чекитке басыңыз.",
    mapTitle: "ЧОЖ долбоорлорунун картасы",
    mapHint: "Кыргызстандын контуру коңшу өлкөлөрдүн фонунда бөлүнүп турат. Чекиттер — долбоорлору бар райондор жана шаарлар; чекиттеги сан — долбоорлордун саны.",
    mapPanelIdle: "Районду тандаңыз",
    mapPanelHint:
      "Картадагы чекитке басып, райондун долбоорлорун, каржылоо суммаларын жана ишке ашыруу статусун ачыңыз.",
    selectRegion: "Аймак",
    projectsInRegion: "Райондун долбоорлору",
    statusActive: "Ишке ашырылууда",
    statusCompleted: "Ишке ашырылган",
    noProjects: "Бул райондо азырынча жарыяланган долбоорлор жок.",
    closePanel: "Жабуу",
    financedLabel: "Каржылоо",
    districtTotal: "Чекит боюнча бардыгы",
    ofPortfolio: "портфелден",
    grantBadge: "Грант",
  },
  partners: {
    heading: "ӨНӨКТӨШТӨР",
    blurb:
      "Улуттук инвестициялык фонд Кыргызстандагы стратегиялык долбоорлорду ишке ашыруу үчүн алдыңкы эл аралык финансылык институттар жана уюмдар менен өнөктөштүктү өнүктүрөт.",
    pageTitle: "Өнөктөштөр",
    strategyTitle: "Стратегиялык кызматташтык",
    strategyBody:
      "Өнөктөштүк эл аралык тажрыйбаны тартууга, каржылоо булактарын кеңейтүүгө жана экономиканын артыкчылыктуу тармактарында ири инвестициялык демилгелерди ишке ашырууга мүмкүндүк берет.",
    registryTitle: "Өнөктөштөр реестри",
    registryIntro:
      "Реестрде Кыргыз Республикасынын Улуттук инвестициялык фондуна кесипкөй кызмат көрсөткөн уюмдар берилген.",
    cooperationTitle: "Эл аралык жана аймактык кызматташтык",
    cooperationIntro:
      "Улуттук инвестициялык фонд Кыргыз Республикасындагы стратегиялык долбоорлорду ишке ашыруу үчүн эл аралык жана аймактык уюмдар менен кызматташтыкты өнүктүрөт.",
    cooperationPartnersTitle: "Өнөктөштөр",
    joinTitle: "Өнөктөш болуу",
    joinIntro:
      "Кыргыз Республикасынын Улуттук инвестициялык фондунун өнөктөшү болууну каалаган компаниялар үчүн аккредитация критерийлери менен таанышыңыз.",
    docsTitle: "Документтер",
    accreditationTitle: "Аккредитация критерийлери",
    actions: {
      registry: "Өнөктөштөр реестри",
      cooperation: "Эл аралык жана аймактык кызматташтык",
      join: "Өнөктөш болуу",
    },
    registryCategories: [
      "Аудиттик кызматтар",
      "Бухгалтердик кызматтар",
      "Баалоо кызматтары",
      "Камсыздандыруу кызматтары",
      "Юридикалык кызматтар",
    ],
    accreditationDocs: [
      "Аудиттик компанияларды аккредитациялоо критерийлери",
      "Бухгалтердик компанияларды аккредитациялоо критерийлери",
      "Баалоо компанияларын аккредитациялоо критерийлери",
      "Камсыздандыруу компанияларын аккредитациялоо критерийлери",
      "Юридикалык компанияларды аккредитациялоо критерийлери",
    ],
  },
  news: {
    heading: "ЖАҢЫЛЫКТАР",
    blurb:
      "Бул жерде биз Улуттук инвестициялык фонддун ишмердүүлүгү жөнүндө айтабыз: инвестициялык долбоорлордун башталышы жана жүрүшү, бизнес жана эл аралык институттар менен өнөктөштүк, консультанттарды жана башкаруучу компанияларды ачык тандоо, бош кызмат орундары жана кесипкөй өнөктөштөрдү аккредитациялоо. Жаңыртууларды көзөмөлдөп, Кыргызстандын инвестициялык климатын жана экономикасын калыптандырган чечимдер жөнүндө биринчилерден болуп билиңиз.",
    readMore: "Дагы окуу",
    pageTitle: "Жаңылыктар",
    pageIntro: "Кыргыз Республикасынын Улуттук инвестициялык фондунун ишмердүүлүгү жөнүндө актуалдуу материалдар.",
    updatesTitle: "Жаңыртууларды көзөмөлдөңүз",
    updatesBody:
      "Кыргыз Республикасынын Улуттук инвестициялык фондунун ишмердүүлүгүндөгү жаңы долбоорлор, өнөктөштүктөр жана негизги окуялар жөнүндө маалымат жарыялайбыз.",
    previewDescription: "Жаңылыктын сүрөттөмөсү",
    previewImage: "сүрөт",
    placeholders: [
      {
        title: "Жаңы инвестициялык долбоорлор",
        date: "Жакында",
        excerpt: "Фонддун долбоорлорунун анонстору жана аларды ишке ашыруунун негизги этаптары.",
      },
      {
        title: "Өнөктөштүк макулдашуулар",
        date: "Жакында",
        excerpt: "Эл аралык финансылык институттар менен кызматташтык.",
      },
      {
        title: "Аймактарды өнүктүрүү",
        date: "Жакында",
        excerpt: "ЧОЖду жана аймактык экономиканы колдоодогу фонддун демилгелери.",
      },
    ],
  },
  footer: {
    addressLabel: "Дарек",
    addressLines: [
      "Кыргыз Республикасы, 720001",
      "Бишкек ш., Токтогул көч., 125/1, «Авангард» БЦ,",
      "8-кабат,",
    ],
    towerA: '«А» мунарасы',
    rightWing: "оң канат",
    phoneLabel: "Телефон:",
    hotlineLabel: "Ишеним телефону:",
    qrLabel: "Сайт телефондо",
    copyright: "© 2026 «Аймактарды өнүктүрүү боюнча социалдык өнөктөштүк фонду» Коомдук фонду",
    developer: "Иштеп чыгуучу Гаипов Бакыт",
    backToTop: "Жогоруга кайтуу",
  },
};

const en: Messages = {
  common: {
    more: "Learn more",
    language: "LANG",
    menu: "Menu",
    backHome: "← Back to home",
    photoSoon: "Photo soon",
    comingSoon: "— soon",
    staffCards: "Staff cards",
    brandShort: "NIF KR",
  },
  nav: {
    home: "HOME",
    about: "ABOUT THE FUND",
    finance: "PROJECT FINANCING",
    directions: "PRIORITY SECTORS",
    msb: "SME PROJECTS",
    partners: "PARTNERS",
    news: "NEWS",
    contacts: "CONTACTS",
  },
  decree: {
    line1: "The Fund was established by a resolution of",
    line2: "the Cabinet of Ministers of the Kyrgyz Republic",
    body: "No. 666 dated 5 November 2024, pursuant to the Law of the Kyrgyz Republic “On the National Investment Fund of the Kyrgyz Republic” and Presidential Decree No. 155 of 14 June 2024.",
  },
  counters: {
    tagline: "Investing in projects of the future",
    projects: "Projects in implementation",
    totalSum: "Total project value",
    currencySuffix: "s",
  },
  about: {
    heading: "ABOUT THE FUND",
    blurb:
      "The National Investment Fund connects the state, business, and investors. We apply modern direct investment instruments, channeling capital into projects that create real economic impact and accelerate Kyrgyzstan’s development.",
    pageTitle: "About the Fund",
    goalTitle: "Purpose and objectives",
    tasksTitle: "Key objectives",
    legalTitle: "Legal status",
    boardTitle: "Board of Directors",
    leadershipTitle: "Leadership",
    departmentHeadsTitle: "Department heads",
    secretaryTitle: "Corporate Secretary",
    docsTitle: "Documents and reporting",
    regulatoryTitle: "Regulatory documents",
    reportsTitle: "Financial reporting",
    founding:
      "The Fund was established by Resolution of the Cabinet of Ministers of the Kyrgyz Republic No. 666 dated 5 November 2024, pursuant to the Law of the Kyrgyz Republic “On the National Investment Fund of the Kyrgyz Republic” and Presidential Decree No. 155 of 14 June 2024.",
    goal: "The Fund’s purpose is to improve the management efficiency of group companies and ensure long-term growth in their value by attracting long-term investment and accessing local and international capital markets.",
    tasks: [
      "Performing shareholder (participant) functions in the Fund’s group companies and managing assets transferred into its ownership or trust management.",
      "Improving the financial and operating performance of the Fund and group companies.",
      "Attracting additional investment into the Fund and group companies.",
      "Ensuring access of the Fund and group companies to local and international stock markets.",
      "Developing and implementing growth strategies for subsidiaries.",
      "Supporting government bodies in delivering sector programs through group companies.",
      "Building, developing, and managing the human capital of group companies.",
    ],
    legal: [
      "The Fund is established as an open joint-stock company.",
      "The sole shareholder is the Cabinet of Ministers of the Kyrgyz Republic (represented by the Ministry of Economy and Commerce).",
      "Shares of the Fund are state property and may be disposed of only through a public offering on a stock exchange (no more than 20% of shares).",
      "The Kyrgyz Republic is not liable for the Fund’s obligations, and the Fund is not liable for the Republic’s obligations.",
    ],
    boardRoles: [
      "Chair of the Board of Directors",
      "Member of the Board of Directors",
      "Member of the Board of Directors",
      "Member of the Board of Directors",
      "Member of the Board of Directors",
      "Member of the Board of Directors",
      "Member of the Board of Directors",
    ],
    boardTitles: [
      "Chair of the Cabinet of Ministers of the Kyrgyz Republic — Head of the Presidential Administration of the Kyrgyz Republic",
      "Special Representative of the President of the Kyrgyz Republic for Special Assignments",
      "Minister of Finance of the Kyrgyz Republic",
      "Minister of Science, Higher Education and Innovations of the Kyrgyz Republic",
      null,
      null,
      null,
    ],
    leadershipRoles: ["Chief Executive Officer", "Deputy Chief Executive Officer"],
    departmentRoles: [
      "Head of the Legal Department",
      "Head of the Investment Department",
      "Head of the IT Security and Compliance Control Department",
      "Head of the Strategic Partnership and Organizational Affairs Department",
    ],
    secretaryRole: "Corporate Secretary",
    regulatoryDocs: [
      "Law of the Kyrgyz Republic “On the National Investment Fund of the Kyrgyz Republic” (No. 143 of 24 July 2024)",
      "Charter of OJSC “National Investment Fund of the Kyrgyz Republic”",
    ],
    financialReports: ["Statement of financial results for 2025"],
  },
  finance: {
    heading: "PROJECT FINANCING",
    blurb:
      "We offer modern financing instruments that help attract capital and successfully deliver strategic projects in Kyrgyzstan.",
    pageTitle: "Project financing",
    toolsTitle: "Fund instruments",
    toolsBody:
      "The Fund uses flexible participation models — from co-investment with banks and international partners to direct equity stakes and targeted project support instruments.",
    applyCta: "Apply",
    applyTitle: "Financing application",
    applyIntro: "Fill in the form — we will contact you after reviewing your application.",
    form: {
      organizationName: "Organization name",
      projectGoal: "Project goal",
      phone: "Phone",
      email: "E-mail",
      submit: "Submit",
      submitting: "Sending…",
      successTitle: "Application sent",
      success: "Thank you! We will contact you using the details provided.",
      errorTitle: "Could not send",
      error: "Please try again or email office@nif.kg.",
      required: "This field is required",
    },
    cards: [
      {
        title: "Co-investment",
        description: "Joint project financing with banks and international partners.",
      },
      {
        title: "Joint ventures",
        description: "Creating new companies together with investors and the state.",
      },
      {
        title: "Equity investment",
        description: "Direct equity participation in high-potential companies.",
      },
      {
        title: "Support instruments",
        description: "Targeted loans and guarantees tailored to project needs.",
      },
    ],
  },
  directions: {
    heading: "PRIORITY SECTORS",
    blurb:
      "The National Investment Fund works with key sectors that have strong growth potential and are vital to Kyrgyzstan’s economic development.",
    pageTitle: "Priority sectors",
    focusTitle: "Sector focus",
    focusBody:
      "Priority is given to projects that create long-term economic impact, jobs, and regional infrastructure.",
    cards: [
      {
        title: "Industry and processing",
        description: "Developing production capacity and deep processing of raw materials.",
      },
      {
        title: "Transport and logistics",
        description: "Infrastructure projects connecting regions and markets.",
      },
      {
        title: "Energy and infrastructure",
        description: "Energy facilities and the country’s core infrastructure.",
      },
      {
        title: "Tourism",
        description: "Investing in Kyrgyzstan’s tourism potential.",
      },
      {
        title: "Education",
        description: "Projects that build human and intellectual capital.",
      },
      {
        title: "Healthcare",
        description: "Developing medical infrastructure and services.",
      },
    ],
  },
  msb: {
    heading: "SME PROJECTS",
    blurb:
      "Small and medium-sized enterprises play a key role in regional development across Kyrgyzstan. The National Investment Fund supports SME projects, with a special focus on agribusiness and processing of local raw materials, helping build sustainable business models and raise living standards in the country’s regions.",
    pageTitle: "SME projects",
    pageIntro:
      "The Fund finances SME projects nationwide — from wool and safflower processing to poultry, cheese-making and hospitality infrastructure. The map highlights districts and cities where projects supported by the Fund are underway or already completed.",
    overviewTitle: "SME support portfolio",
    overviewBody:
      "The programme covers all regions of Kyrgyzstan and combines targeted loans with grant support. Most funding goes to equipment purchases, working capital and the development of production sites in the regions.",
    overviewInstruments:
      "Alongside loans, the Fund provides grants for socially important initiatives — for example mobile poultry houses and milking equipment for smaller farms. Grants are a modest share of the current portfolio, but they matter for launching local projects with limited access to capital.",
    statProjects: "Projects",
    statLocations: "Map points",
    statTotal: "Total financing",
    statGrants: "Grants",
    statSplit:
      "Portfolio mix: loans and investments — {loans}, grants — {grants} ({grantCount} projects). Click a map point to see the district total and its share of the overall portfolio.",
    mapTitle: "SME projects map",
    mapHint: "Kyrgyzstan’s outline is highlighted against neighbouring countries. Points mark districts and cities with projects; the number on a point shows how many projects are there.",
    mapPanelIdle: "Select a district",
    mapPanelHint:
      "Click a point on the map to open district projects, financing amounts and implementation status.",
    selectRegion: "Region",
    projectsInRegion: "District projects",
    statusActive: "In progress",
    statusCompleted: "Completed",
    noProjects: "No published projects in this district yet.",
    closePanel: "Close",
    financedLabel: "Financing",
    districtTotal: "Total for this point",
    ofPortfolio: "of portfolio",
    grantBadge: "Grant",
  },
  partners: {
    heading: "PARTNERS",
    blurb:
      "The National Investment Fund builds partnerships with leading international financial institutions and organizations to deliver strategic projects in Kyrgyzstan.",
    pageTitle: "Partners",
    strategyTitle: "Strategic cooperation",
    strategyBody:
      "Partnerships help attract international expertise, expand funding sources, and deliver large-scale investment initiatives in priority sectors of the economy.",
    registryTitle: "Partner registry",
    registryIntro:
      "The registry lists organizations that provide professional services to the National Investment Fund of the Kyrgyz Republic.",
    cooperationTitle: "International and regional cooperation",
    cooperationIntro:
      "The National Investment Fund develops cooperation with international and regional organizations to deliver strategic projects in the Kyrgyz Republic.",
    cooperationPartnersTitle: "Partners",
    joinTitle: "Become a partner",
    joinIntro:
      "Review the accreditation criteria for companies seeking to partner with the National Investment Fund of the Kyrgyz Republic.",
    docsTitle: "Documents",
    accreditationTitle: "Accreditation criteria",
    actions: {
      registry: "Partner registry",
      cooperation: "International and regional cooperation",
      join: "Become a partner",
    },
    registryCategories: [
      "Audit services",
      "Accounting services",
      "Valuation services",
      "Insurance services",
      "Legal services",
    ],
    accreditationDocs: [
      "Accreditation criteria for audit firms",
      "Accreditation criteria for accounting firms",
      "Accreditation criteria for valuation firms",
      "Accreditation criteria for insurance firms",
      "Accreditation criteria for legal firms",
    ],
  },
  news: {
    heading: "NEWS",
    blurb:
      "Here we share updates on the National Investment Fund’s work: the launch and progress of investment projects, partnerships with business and international institutions, open selections of consultants and management companies, vacancies, and the accreditation of professional partners. Stay tuned to be among the first to learn about decisions that shape Kyrgyzstan’s investment climate and economic development.",
    readMore: "Read more",
    pageTitle: "News",
    pageIntro: "Current materials on the activities of the National Investment Fund of the Kyrgyz Republic.",
    updatesTitle: "Stay updated",
    updatesBody:
      "We publish information about new projects, partnerships, and key events in the work of the National Investment Fund of the Kyrgyz Republic.",
    previewDescription: "News description",
    previewImage: "image",
    placeholders: [
      {
        title: "New investment projects",
        date: "Soon",
        excerpt: "Project announcements and key implementation milestones.",
      },
      {
        title: "Partnership agreements",
        date: "Soon",
        excerpt: "Cooperation with international financial institutions.",
      },
      {
        title: "Regional development",
        date: "Soon",
        excerpt: "Fund initiatives supporting SMEs and the regional economy.",
      },
    ],
  },
  footer: {
    addressLabel: "Address",
    addressLines: [
      "Kyrgyz Republic, 720001",
      "Bishkek, Toktogul St. 125/1, Avangard BC,",
      "8th floor,",
    ],
    towerA: 'Tower "A"',
    rightWing: "right wing",
    phoneLabel: "Phone:",
    hotlineLabel: "Hotline:",
    qrLabel: "Open on mobile",
    copyright: "© 2026 Public Foundation “Social Partnership Fund for Regional Development”",
    developer: "Developer: Gaipov Bakyt",
    backToTop: "Back to top",
  },
};

const zh: Messages = {
  common: {
    more: "查看更多",
    language: "语言",
    menu: "菜单",
    backHome: "← 返回首页",
    photoSoon: "照片即将上线",
    comingSoon: "— 即将发布",
    staffCards: "员工卡片",
    brandShort: "国家投资基金",
  },
  nav: {
    home: "首页",
    about: "关于基金",
    finance: "项目融资",
    directions: "重点发展方向",
    msb: "中小企业项目",
    partners: "合作伙伴",
    news: "新闻",
    contacts: "联系我们",
  },
  decree: {
    line1: "基金根据决议设立",
    line2: "吉尔吉斯共和国部长会议",
    body: "2024年11月5日第666号决议，以执行《吉尔吉斯共和国国家投资基金法》及吉尔吉斯共和国总统2024年6月14日第155号令。",
  },
  counters: {
    tagline: "投资未来项目",
    projects: "在实施项目",
    totalSum: "项目总金额",
    currencySuffix: "索姆",
  },
  about: {
    heading: "关于基金",
    blurb:
      "国家投资基金是连接政府、企业与投资者的重要纽带。我们运用现代化直接投资工具，将资本投向能够产生实际经济效益并加快吉尔吉斯共和国发展的项目。",
    pageTitle: "关于基金",
    goalTitle: "目标与任务",
    tasksTitle: "主要任务",
    legalTitle: "法律地位",
    boardTitle: "董事会",
    leadershipTitle: "管理层",
    departmentHeadsTitle: "各部门负责人",
    secretaryTitle: "公司秘书",
    docsTitle: "文件与报告",
    regulatoryTitle: "规范性文件",
    reportsTitle: "财务报告",
    founding:
      "基金根据吉尔吉斯共和国部长会议2024年11月5日第666号决议设立，以执行《吉尔吉斯共和国国家投资基金法》及吉尔吉斯共和国总统2024年6月14日第155号令。",
    goal: "基金的目标是通过吸引长期投资并进入国内外资本市场，提高集团公司管理效率，实现企业价值的长期增长。",
    tasks: [
      "履行基金集团所属公司股东（出资人）职责，并管理划归其所有或委托管理的资产；",
      "提高基金及集团所属公司的经营管理和财务绩效；",
      "吸引更多投资进入基金及集团所属公司；",
      "推动基金及集团所属公司进入国内外资本市场；",
      "制定并实施子公司的发展战略；",
      "通过集团所属公司协助政府部门落实行业发展规划；",
      "建设、发展并管理集团所属公司的人才队伍。",
    ],
    legal: [
      "基金以公开股份公司的形式设立；",
      "唯一股东为吉尔吉斯共和国部长会议（由吉尔吉斯共和国经济与商业部代表履行股东职责）；",
      "基金股份属于国家所有，仅可通过证券交易所公开发行的方式转让，且转让比例不得超过股份总数的20%；",
      "吉尔吉斯共和国不对基金的债务承担责任，基金亦不对吉尔吉斯共和国的债务承担责任。",
    ],
    boardRoles: [
      "董事会主席",
      "董事会成员",
      "董事会成员",
      "董事会成员",
      "董事会成员",
      "董事会成员",
      "董事会成员",
    ],
    boardTitles: [
      "吉尔吉斯共和国部长会议主席 — 吉尔吉斯共和国总统行政署署长",
      "吉尔吉斯共和国总统特别事务特别代表",
      "吉尔吉斯共和国财政部长",
      "吉尔吉斯共和国科学、高等教育与创新部长",
      null,
      null,
      null,
    ],
    leadershipRoles: ["总经理", "副总经理"],
    departmentRoles: [
      "法律部负责人",
      "投资部负责人",
      "信息安全与合规控制部负责人",
      "战略合作与组织工作部负责人",
    ],
    secretaryRole: "公司秘书",
    regulatoryDocs: [
      "《吉尔吉斯共和国国家投资基金法》（2024年7月24日第143号）",
      "《吉尔吉斯共和国国家投资基金公开股份公司章程》",
    ],
    financialReports: ["2025年度财务报告"],
  },
  finance: {
    heading: "项目融资",
    blurb:
      "我们提供现代化融资工具，助力吸引投资，并推动吉尔吉斯共和国战略项目的顺利实施。",
    pageTitle: "项目融资",
    toolsTitle: "基金工具",
    toolsBody:
      "基金采用灵活的参与模式——从与银行及国际合作伙伴联合投资，到直接入股企业以及定向项目支持工具。",
    applyCta: "提交申请",
    applyTitle: "融资申请",
    applyIntro: "请填写表格，我们审核申请后将与您联系。",
    form: {
      organizationName: "机构名称",
      projectGoal: "项目目标",
      phone: "电话",
      email: "电子邮箱",
      submit: "提交",
      submitting: "提交中…",
      successTitle: "申请已提交",
      success: "感谢您！我们将通过您提供的联系方式与您联系。",
      errorTitle: "提交失败",
      error: "请重试，或发送邮件至 office@nif.kg。",
      required: "请填写此字段",
    },
    cards: [
      {
        title: "联合投资",
        description: "与银行及国际合作伙伴共同为项目提供融资。",
      },
      {
        title: "合资企业",
        description: "与投资者及政府共同设立新公司。",
      },
      {
        title: "股权投资",
        description: "直接投资于具有发展潜力的企业。",
      },
      {
        title: "支持工具",
        description: "根据项目需求提供定向贷款及担保支持。",
      },
    ],
  },
  directions: {
    heading: "重点发展方向",
    blurb:
      "国家投资基金重点支持具有较高发展潜力、对吉尔吉斯共和国经济发展具有重要意义的重点行业。",
    pageTitle: "重点发展方向",
    focusTitle: "行业重点",
    focusBody:
      "优先支持能够产生长期经济效益、创造就业并推动地区基础设施建设的项目。",
    cards: [
      {
        title: "工业及加工产业",
        description: "推动生产能力提升和原材料深加工。",
      },
      {
        title: "交通与物流",
        description: "支持连接各地区和市场的基础设施项目。",
      },
      {
        title: "能源与基础设施",
        description: "投资能源项目及国家基础设施建设。",
      },
      {
        title: "旅游业",
        description: "支持吉尔吉斯共和国旅游产业发展。",
      },
      {
        title: "教育",
        description: "支持培养人才和提升创新能力的项目。",
      },
      {
        title: "医疗卫生",
        description: "推动医疗基础设施建设和医疗服务发展。",
      },
    ],
  },
  msb: {
    heading: "中小企业项目",
    blurb:
      "中小企业是推动吉尔吉斯共和国区域经济发展的重要力量。国家投资基金重点支持中小企业项目，特别是在农工综合体和本地原材料加工领域，助力构建可持续商业模式，提升区域居民生活水平。",
    pageTitle: "中小企业项目",
    pageIntro:
      "基金为全国各地的中小企业项目提供融资支持，涵盖羊毛加工、红花加工、家禽养殖、奶酪生产及酒店基础设施等多个领域。地图标示了获得基金支持、正在实施或已完成项目的地区和城市。",
    overviewTitle: "中小企业支持项目组合",
    overviewBody:
      "该计划覆盖吉尔吉斯共和国所有州，结合定向贷款与赠款支持。资金主要用于购置设备、补充流动资金以及发展各地区的生产设施。",
    overviewInstruments:
      "除贷款外，基金还为具有社会效益的项目提供赠款支持，例如为小型农场提供移动式禽舍和挤奶设备。虽然赠款在当前项目组合中的占比较小，但对于帮助资金有限的地方项目顺利启动具有重要意义。",
    statProjects: "项目数量",
    statLocations: "地图标注点",
    statTotal: "融资总额",
    statGrants: "赠款",
    statSplit:
      "投资组合结构：贷款及投资占{loans}，赠款占{grants}（{grantCount}个项目）。点击地图上的标注点，可查看相应地区的融资金额及其在整体投资组合中的占比。",
    mapTitle: "中小企业项目地图",
    mapHint:
      "吉尔吉斯共和国地图轮廓以周边国家为背景显示。地图上的标注点代表已实施项目的地区和城市，标注中的数字表示该地区的项目数量。",
    mapPanelIdle: "请选择地区",
    mapPanelHint:
      "点击地图上的标注点，可查看该地区的项目详情、融资金额及实施进展。",
    selectRegion: "地区",
    projectsInRegion: "本地区项目",
    statusActive: "实施中",
    statusCompleted: "已完成",
    noProjects: "该地区暂无已发布项目。",
    closePanel: "关闭",
    financedLabel: "融资",
    districtTotal: "该点合计",
    ofPortfolio: "占投资组合",
    grantBadge: "赠款",
  },
  partners: {
    heading: "合作伙伴",
    blurb:
      "国家投资基金积极与国际领先的金融机构及组织建立合作伙伴关系，共同推动吉尔吉斯共和国战略项目的实施。",
    pageTitle: "合作伙伴",
    strategyTitle: "战略合作",
    strategyBody:
      "合作伙伴关系有助于引入国际经验、拓展融资渠道，并在重点经济领域实施大型投资项目。",
    registryTitle: "合作伙伴名录",
    registryIntro:
      "合作伙伴名录收录了为吉尔吉斯共和国国家投资基金提供专业服务的机构。",
    cooperationTitle: "国际与区域合作",
    cooperationIntro:
      "国家投资基金积极发展与国际及区域组织的合作，共同推动吉尔吉斯共和国战略项目的实施。",
    cooperationPartnersTitle: "合作伙伴",
    joinTitle: "成为合作伙伴",
    joinIntro:
      "请查阅希望成为吉尔吉斯共和国国家投资基金合作伙伴的公司所需满足的认证标准。",
    docsTitle: "文件",
    accreditationTitle: "认证标准",
    actions: {
      registry: "合作伙伴名录",
      cooperation: "国际与区域合作",
      join: "成为合作伙伴",
    },
    registryCategories: [
      "审计服务",
      "会计服务",
      "评估服务",
      "保险服务",
      "法律服务",
    ],
    accreditationDocs: [
      "审计公司认证标准",
      "会计公司认证标准",
      "评估公司认证标准",
      "保险公司认证标准",
      "法律公司认证标准",
    ],
  },
  news: {
    heading: "新闻",
    blurb:
      "在此我们介绍国家投资基金的工作动态：投资项目的启动与推进、与企业及国际机构的合作、顾问与管理公司的公开遴选、职位空缺，以及专业合作伙伴的认证。请持续关注，第一时间了解塑造吉尔吉斯斯坦投资环境与经济发展的重要决策。",
    readMore: "查看更多",
    pageTitle: "新闻",
    pageIntro: "有关吉尔吉斯共和国国家投资基金活动的最新内容。",
    updatesTitle: "关注动态",
    updatesBody:
      "我们发布有关新项目、合作伙伴关系以及吉尔吉斯共和国国家投资基金重要活动的信息。",
    previewDescription: "新闻简介",
    previewImage: "图片",
    placeholders: [
      {
        title: "新投资项目",
        date: "即将发布",
        excerpt: "基金项目公告及其实施关键阶段。",
      },
      {
        title: "合作协议",
        date: "即将发布",
        excerpt: "与国际金融机构的合作。",
      },
      {
        title: "区域发展",
        date: "即将发布",
        excerpt: "基金支持中小企业与区域经济的举措。",
      },
    ],
  },
  footer: {
    addressLabel: "地址",
    addressLines: [
      "吉尔吉斯共和国，720001",
      "比什凯克市托克托古拉街125/1号，“Avangard”商务中心，",
      "8层，",
    ],
    towerA: "A座",
    rightWing: "右翼",
    phoneLabel: "电话",
    hotlineLabel: "举报热线",
    qrLabel: "手机打开网站",
    copyright: "© 2026 公共基金会“区域发展社会伙伴关系基金”",
    developer: "开发者：Gaipov Bakyt",
    backToTop: "返回顶部",
  },
};

export const MESSAGES: Record<Lang, Messages> = {
  RU: ru,
  KG: kg,
  EN: en,
  ZH: zh,
};

export function getMessages(lang: Lang): Messages {
  return MESSAGES[lang] ?? MESSAGES.RU;
}
