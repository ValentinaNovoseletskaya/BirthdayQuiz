const QUESTIONS_DATA = [
  {
    id: 1,
    production: "Щелкунчик",
    type: "text",
    question: "Кто создал музыку для знаменитого балета «Щелкунчик»?",
    answers: [
      "Модест Мусоргский",
      "Петр Ильич Чайковский",
      "Николай Римский-Корсаков",
      "Антон Рубинштейн"
    ],
    correctIndex: 1,
    photoPath: "assets/photos/photo-01.jpg",
    hints: [
      { level: 1, text: "📜 Из дневника посетителя:\n\"Вчера была в Большом на балете. Какая музыка! Ее автор также создал 'Лебединое озеро' и 'Спящую красавицу'. Три великих балета одного гения!\"", delay: 0 },
      { level: 2, text: "🎼 Музыкальный ребус: ЧАЙ + КОВ + СКИЙ = ?", delay: 30000 },
      { level: 3, text: "🎭 Анаграмма: КИЙКОЧВАЙС → ЧАЙКОВСКИЙ", delay: 60000 }
    ]
  },
  {
    id: 2,
    production: "Щелкунчик",
    type: "text",
    question: "Когда впервые состоялся показ балета в Большом театре?",
    answers: ["1892 год", "1900 год", "1925 год", "1950 год"],
    correctIndex: 0,
    photoPath: "assets/photos/photo-02.jpg",
    hints: [
      { level: 1, text: "📅 Хронологическая линейка: |----1880----⚫----1890----?----1900----|", delay: 0 },
      { level: 2, text: "🧮 2000 - 108 = ?", delay: 30000 },
      { level: 3, text: "📋 1 8 _ 2 (третья цифра = 9)", delay: 60000 }
    ]
  },
  {
    id: 3,
    production: "Щелкунчик",
    type: "photo",
    question: "На фотографии - программка спектакля. Кто автор сказки, по которой написан балет?",
    placeholderPath: "assets/placeholders/question-03.jpg",
    answers: [
      "Ганс Христиан Андерсен",
      "Братья Гримм",
      "Эрнст Теодор Амадей Гофман",
      "Шарль Перро"
    ],
    correctIndex: 2,
    photoPath: "assets/photos/photo-03.jpg",
    hints: [
      { level: 1, text: "🔍 \"...сказки немецкого романтика Э.Т.А. Г████...\"", delay: 0 },
      { level: 2, text: "🎨 ГОФ + МАН = ? (немецкий писатель, композитор)", delay: 30000 },
      { level: 3, text: "📖 Гофман, Эрнст Теодор Амадей (1776–1822)", delay: 60000 }
    ]
  },
  // Жизель
  {
    id: 4,
    production: "Жизель",
    type: "text",
    question: "О чём повествует классический сюжет балета?",
    answers: [
      "Любовь крестьянина и принцессы",
      "История девушки-простолюдинки, обманутой графом",
      "Приключения солдата, отправившегося искать сокровища",
      "Семейные конфликты аристократии"
    ],
    correctIndex: 1,
    photoPath: "assets/photos/photo-04.jpg",
    hints: [
      { level: 1, text: "🎭 \"Юная крестьянка ______ влюбляется в незнакомца. Он — знатный _____...\"", delay: 0 },
      { level: 2, text: "💔 Драматический треугольник: Девушка — Граф — Правда", delay: 30000 },
      { level: 3, text: "🎪 Выбери: Простолюдинка ♥ Граф (обманул)", delay: 60000 }
    ]
  },
  {
    id: 5,
    production: "Жизель",
    type: "text",
    question: "В каком году состоялось первое представление 'Жизели' в Большом театре?",
    answers: ["1841 год", "1856 год", "1884 год", "1901 год"],
    correctIndex: 2,
    photoPath: "assets/photos/photo-05.jpg",
    hints: [
      { level: 1, text: "📜 Премьера в Москве спустя 43 года после Парижа (1841)", delay: 0 },
      { level: 2, text: "🧮 1841 + 43 = ?", delay: 30000 },
      { level: 3, text: "📅 1 8 8 _ (четвёртая цифра = 2×2)", delay: 60000 }
    ]
  },
  {
    id: 6,
    production: "Жизель",
    type: "photo",
    question: "На фотографии сцена из второго акта. Как называются духи-танцовщицы?",
    placeholderPath: "assets/placeholders/question-06.jpg",
    answers: ["Сильфиды", "Вилисы", "Наяды", "Нимфы"],
    correctIndex: 1,
    photoPath: "assets/photos/photo-06.jpg",
    hints: [
      { level: 1, text: "👻 Девушки, умершие до свадьбы; созвучно слову 'вила'", delay: 0 },
      { level: 2, text: "🔤 Филворд: В И Л И С Ы ...", delay: 30000 },
      { level: 3, text: "📖 ВИ_ИСЫ — мифические духи", delay: 60000 }
    ]
  },
  // Золушка
  {
    id: 7,
    production: "Золушка",
    type: "text",
    question: "Какой русский композитор написал музыку к балету 'Золушка'?",
    answers: ["Игорь Стравинский", "Сергей Прокофьев", "Дмитрий Шостакович", "Николай Римский-Корсаков"],
    correctIndex: 1,
    photoPath: "assets/photos/photo-07.jpg",
    hints: [
      { level: 1, text: "🎼 Известен 'Ромео и Джульетта', 'Война и мир'", delay: 0 },
      { level: 2, text: "🎭 Акростих указывает на фамилию ПРОКОФЬЕВ", delay: 30000 },
      { level: 3, text: "📝 С Е Р _ _ Й   П Р О _ О _ Ь Е В", delay: 60000 }
    ]
  },
  {
    id: 8,
    production: "Золушка",
    type: "text",
    question: "Что символизирует эпизод с появлением хрустального башмачка?",
    answers: ["Появление любви", "Начало нового этапа жизни героя", "Решение проблемы персонажа", "Признание зрителей"],
    correctIndex: 1,
    photoPath: "assets/photos/photo-08.jpg",
    hints: [
      { level: 1, text: "🎨 Метафора трансформации", delay: 0 },
      { level: 2, text: "🔄 До→Символ→После: старая жизнь → новая жизнь", delay: 30000 },
      { level: 3, text: "📖 Ключевое: Новый этап", delay: 60000 }
    ]
  },
  {
    id: 9,
    production: "Золушка",
    type: "photo",
    question: "На афише какая деталь костюма Золушки является ключевой?",
    placeholderPath: "assets/placeholders/question-09.jpg",
    answers: ["Диадема", "Хрустальная туфелька", "Бальное платье", "Волшебная палочка"],
    correctIndex: 1,
    photoPath: "assets/photos/photo-09.jpg",
    hints: [
      { level: 1, text: "✨ Загадка о том, что теряется и находит принц", delay: 0 },
      { level: 2, text: "🔍 Увеличенный фрагмент с бликами", delay: 30000 },
      { level: 3, text: "👠 Что теряет Золушка?", delay: 60000 }
    ]
  },
  // Дон Кихот
  {
    id: 10,
    production: "Дон Кихот",
    type: "text",
    question: "Кто исполнил партию Китри в одном из известных спектаклей Большого театра?",
    answers: ["Майя Плисецкая", "Галина Уланова", "Алла Осипенко", "Светлана Захарова"],
    correctIndex: 0,
    photoPath: "assets/photos/photo-10.jpg",
    hints: [
      { level: 1, text: "🌟 Великая балерина XX века, 'Умирающий лебедь'", delay: 0 },
      { level: 2, text: "🎭 Ребус с рыбами + ПЛИСЕ + царь + Я", delay: 30000 },
      { level: 3, text: "📝 ЯАКЯСЛИПЕЦ → ПЛИСЕЦКАЯ", delay: 60000 }
    ]
  },
  {
    id: 11,
    production: "Дон Кихот",
    type: "text",
    question: "Откуда черпал вдохновение композитор Лео Делиб?",
    answers: ["Альфред де Мюссе", "Испанские народные мелодии", "Русские хороводы", "Английские баллады"],
    correctIndex: 1,
    photoPath: "assets/photos/photo-11.jpg",
    hints: [
      { level: 1, text: "🗺️ Действие в Испании (Сервантес)", delay: 0 },
      { level: 2, text: "🎸 Сегидилья, Болеро, Фанданго", delay: 30000 },
      { level: 3, text: "🎵 Страна происхождения: Испания", delay: 60000 }
    ]
  },
  {
    id: 12,
    production: "Дон Кихот",
    type: "photo",
    question: "На фотографии костюм главной героини. Из какой страны стиль?",
    placeholderPath: "assets/placeholders/question-12.jpg",
    answers: ["Италия", "Испания", "Португалия", "Франция"],
    correctIndex: 1,
    photoPath: "assets/photos/photo-12.jpg",
    hints: [
      { level: 1, text: "💃 Воланы, яркие цвета, веер, кастаньеты", delay: 0 },
      { level: 2, text: "🗺️ Пиренейский полуостров, столица Мадрид", delay: 30000 },
      { level: 3, text: "🎭 И С _ А Н И _", delay: 60000 }
    ]
  },
  // Раймонда
  {
    id: 13,
    production: "Раймонда",
    type: "text",
    question: "Кто композитор балета 'Раймонда'?",
    answers: ["Михаил Глинка", "Александр Глазунов", "Пётр Чайковский", "Игорь Стравинский"],
    correctIndex: 1,
    photoPath: "assets/photos/photo-13.jpg",
    hints: [
      { level: 1, text: "🎼 Ученик Римского-Корсакова, директор консерватории", delay: 0 },
      { level: 2, text: "🔤 ГЛАЗ + УНОВ", delay: 30000 },
      { level: 3, text: "📝 Г Л А _ У _ О В", delay: 60000 }
    ]
  },
  {
    id: 14,
    production: "Раймонда",
    type: "text",
    question: "Сколько актов в оригинальной версии балета 'Раймонда'?",
    answers: ["Один", "Два", "Три", "Четыре"],
    correctIndex: 2,
    photoPath: "assets/photos/photo-14.jpg",
    hints: [
      { level: 1, text: "📖 Экспозиция — Конфликт — Развязка", delay: 0 },
      { level: 2, text: "🎭 Классическая трехактная структура", delay: 30000 },
      { level: 3, text: "🔢 Выбор: 3", delay: 60000 }
    ]
  },
  {
    id: 15,
    production: "Раймонда",
    type: "photo",
    question: "В какой исторический период происходит действие?",
    placeholderPath: "assets/placeholders/question-15.jpg",
    answers: ["Древний Рим", "Средневековье", "Эпоха Возрождения", "XIX век"],
    correctIndex: 1,
    photoPath: "assets/photos/photo-15.jpg",
    hints: [
      { level: 1, text: "⚔️ Рыцари, замки, геральдика", delay: 0 },
      { level: 2, text: "📅 500—1500 н.э.", delay: 30000 },
      { level: 3, text: "🏰 С Р Е Д Н Е В Е _ О _ Ь Е", delay: 60000 }
    ]
  },
  // Гамлет
  {
    id: 16,
    production: "Гамлет",
    type: "text",
    question: "Кто является автором пьесы 'Гамлет'?",
    answers: ["Уильям Шекспир", "Александр Пушкин", "Лев Толстой", "Антон Чехов"],
    correctIndex: 0,
    photoPath: "assets/photos/photo-16.jpg",
    hints: [
      { level: 1, text: "🎭 'Быть или не быть' — английский драматург", delay: 0 },
      { level: 2, text: "🎪 Стратфорд-на-Эйвоне → Глобус", delay: 30000 },
      { level: 3, text: "📝 У И Л Ь Я М   Ш Е _ С П _ Р", delay: 60000 }
    ]
  },
  {
    id: 17,
    production: "Гамлет",
    type: "text",
    question: "Как называется знаменитый монолог главного героя?",
    answers: ["Монолог сомнений", "Монолог решимости", "Монолог размышлений", "Солилоквий Гамлета"],
    correctIndex: 2,
    photoPath: "assets/photos/photo-17.jpg",
    hints: [
      { level: 1, text: "💭 'Быть или не быть...' — герой философствует", delay: 0 },
      { level: 2, text: "🤔 Он размышляет, а не решает", delay: 30000 },
      { level: 3, text: "📖 Монолог РАЗМЫШЛЕНИЙ", delay: 60000 }
    ]
  },
  {
    id: 18,
    production: "Гамлет",
    type: "photo",
    question: "На фотографии реквизит из сцены. Что держит Гамлет?",
    placeholderPath: "assets/placeholders/question-18.jpg",
    answers: ["Корону", "Кинжал", "Череп", "Письмо"],
    correctIndex: 2,
    photoPath: "assets/photos/photo-18.jpg",
    hints: [
      { level: 1, text: "💀 'Увы, бедный Йорик!'", delay: 0 },
      { level: 2, text: "🔍 Memento mori — пустые глазницы", delay: 30000 },
      { level: 3, text: "🎭 Ч Е _ Е П", delay: 60000 }
    ]
  },
  // Макбет
  {
    id: 19,
    production: "Макбет",
    type: "text",
    question: "Почему многие актёры считают постановку 'Макбета' несчастливой?",
    answers: [
      "Название похоже на слово 'проклятие'",
      "Шекспир наложил проклятье",
      "Часто происходят случайные травмы и аварии",
      "Традиционно плохие отзывы"
    ],
    correctIndex: 2,
    photoPath: "assets/photos/photo-19.jpg",
    hints: [
      { level: 1, text: "🎭 Театральная легенда о 'Шотландской пьесе'", delay: 0 },
      { level: 2, text: "⚠️ Реальные несчастные случаи", delay: 30000 },
      { level: 3, text: "🔮 Травмы и аварии", delay: 60000 }
    ]
  },
  {
    id: 20,
    production: "Макбет",
    type: "text",
    question: "Какие персонажи появляются в самом начале трагедии 'Макбет'?",
    answers: ["Ведьмы", "Рыцари короля", "Воины армии Макбета", "Призраки солдат"],
    correctIndex: 0,
    photoPath: "assets/photos/photo-20.jpg",
    hints: [
      { level: 1, text: "🌙 Гром и молния, варят зелье и пророчествуют", delay: 0 },
      { level: 2, text: "🔮 Три загадочные фигуры у котла", delay: 30000 },
      { level: 3, text: "🧙 Ведьмы", delay: 60000 }
    ]
  },
  {
    id: 21,
    production: "Макбет",
    type: "photo",
    question: "Сколько ведьм в классической постановке?",
    placeholderPath: "assets/placeholders/question-21.jpg",
    answers: ["Одна", "Две", "Три", "Пять"],
    correctIndex: 2,
    photoPath: "assets/photos/photo-21.jpg",
    hints: [
      { level: 1, text: "🔢 Магическое число", delay: 0 },
      { level: 2, text: "👁️ Слева одна, в центре одна, справа одна", delay: 30000 },
      { level: 3, text: "🧮 2 + 1 = 3", delay: 60000 }
    ]
  },
  // Эсмеральда
  {
    id: 22,
    production: "Эсмеральда",
    type: "text",
    question: "На основе какого произведения создан балет?",
    answers: [
      "Новелла Ги де Мопассана 'Жизнь бедняка'",
      "Роман Виктора Гюго 'Собор Парижской Богоматери'",
      "Рассказ Ремарка 'Возвращение домой'",
      "Пьеса Бернарда Шоу 'Пигмалион'"
    ],
    correctIndex: 1,
    photoPath: "assets/photos/photo-22.jpg",
    hints: [
      { level: 1, text: "📚 Французский романтик XIX века, Нотр-Дам де Пари", delay: 0 },
      { level: 2, text: "🏰 Париж → Собор → Автор с фамилией ГЮ__", delay: 30000 },
      { level: 3, text: "✍️ Виктор ГЮГО", delay: 60000 }
    ]
  },
  {
    id: 23,
    production: "Эсмеральда",
    type: "text",
    question: "Кто являлся хореографом первого исполнения в Большом театре?",
    answers: ["Мариус Петипа", "Леонид Лавровский", "Борис Эйфман", "Алексей Ратманский"],
    correctIndex: 0,
    photoPath: "assets/photos/photo-23.jpg",
    hints: [
      { level: 1, text: "🩰 Отец классического русского балета", delay: 0 },
      { level: 2, text: "🎭 ПЕ + ТИ + ПА", delay: 30000 },
      { level: 3, text: "📝 П Е Т И П А", delay: 60000 }
    ]
  },
  {
    id: 24,
    production: "Эсмеральда",
    type: "photo",
    question: "На афише изображен главный герой. Кто он?",
    placeholderPath: "assets/placeholders/question-24.jpg",
    answers: ["Феб", "Фролло", "Квазимодо", "Гренгуар"],
    correctIndex: 2,
    photoPath: "assets/photos/photo-24.jpg",
    hints: [
      { level: 1, text: "🔔 Добрый звонарь Нотр-Дама с горбом", delay: 0 },
      { level: 2, text: "🎭 Имя начинается на 'Ква...'", delay: 30000 },
      { level: 3, text: "📖 К В А З И М О _ О", delay: 60000 }
    ]
  },
  {
    id: 25,
    production: "Эсмеральда",
    type: "photo",
    question: "На фотографии костюм героини. К какому народу она принадлежит?",
    placeholderPath: "assets/placeholders/question-25.jpg",
    answers: ["Французы", "Цыгане", "Испанцы", "Итальянцы"],
    correctIndex: 1,
    photoPath: "assets/photos/photo-25.jpg",
    hints: [
      { level: 1, text: "💃 Яркие юбки, монеты, множество браслетов", delay: 0 },
      { level: 2, text: "🎪 Живет в таборе, гадает на картах", delay: 30000 },
      { level: 3, text: "🔮 Ц Ы Г А _ Е", delay: 60000 }
    ]
  },
  // Орлеанская дева
  {
    id: 26,
    production: "Орлеанская дева",
    type: "text",
    question: "Какое произведение легло в основу либретто оперы?",
    answers: [
      "Роман Дюма 'Три мушкетера'",
      "Драматическая поэма Фридриха Шиллера",
      "Повесть 'Отверженные'",
      "Стихотворение Гейне"
    ],
    correctIndex: 1,
    photoPath: "assets/photos/photo-26.jpg",
    hints: [
      { level: 1, text: "📖 Немецкий поэт-романтик, 'Разбойники'", delay: 0 },
      { level: 2, text: "🎭 ШИЛ + ЛЕР", delay: 30000 },
      { level: 3, text: "✍️ Ф. Ш И Л Л _ Р", delay: 60000 }
    ]
  },
  {
    id: 27,
    production: "Орлеанская дева",
    type: "text",
    question: "Какой жанр представляет собой эта постановка?",
    answers: ["Опера", "Балет", "Музыкальная драма", "Пантомима"],
    correctIndex: 0,
    photoPath: "assets/photos/photo-27.jpg",
    hints: [
      { level: 1, text: "🎵 Поют, оркестр, вокальные партии", delay: 0 },
      { level: 2, text: "🎭 Артисты поют → это ...", delay: 30000 },
      { level: 3, text: "🎼 О П Е Р А", delay: 60000 }
    ]
  },
  {
    id: 28,
    production: "Орлеанская дева",
    type: "photo",
    question: "На фотографии героиня в доспехах. Кто она по истории?",
    placeholderPath: "assets/placeholders/question-28.jpg",
    answers: ["Принцесса", "Воительница/Воин", "Монахиня", "Крестьянка"],
    correctIndex: 1,
    photoPath: "assets/photos/photo-28.jpg",
    hints: [
      { level: 1, text: "⚔️ Жанна д'Арк — национальная героиня Франции", delay: 0 },
      { level: 2, text: "🛡️ Доспехи, шлем, меч и знамя", delay: 30000 },
      { level: 3, text: "⚔️ Воительница", delay: 60000 }
    ]
  },
  // Альцина
  {
    id: 29,
    production: "Альцина",
    type: "text",
    question: "Кто поставил спектакль в Большом театре?",
    answers: ["Валерий Гергиев", "Юрий Любимов", "Робер Лепаж", "Георгий Товстоногов"],
    correctIndex: 2,
    photoPath: "assets/photos/photo-29.jpg",
    hints: [
      { level: 1, text: "🎭 Канадский режиссёр, мультимедиа на сцене", delay: 0 },
      { level: 2, text: "🌍 Канадец, ЛЕ + ПАЖ", delay: 30000 },
      { level: 3, text: "🎬 Р. Л Е П А Ж", delay: 60000 }
    ]
  },
  {
    id: 30,
    production: "Альцина",
    type: "text",
    question: "Чем отличается эта постановка от классических?",
    answers: [
      "Поставлена на немецком языке",
      "Современная хореография",
      "Использование VR и мультимедийных технологий",
      "Онлайн-трансляция"
    ],
    correctIndex: 2,
    photoPath: "assets/photos/photo-30.jpg",
    hints: [
      { level: 1, text: "💻 3D-проекции, голограммы, интерактивные декорации", delay: 0 },
      { level: 2, text: "🎨 Ключ: технологии (проекции, VR)", delay: 30000 },
      { level: 3, text: "💡 МУЛЬТИМЕДИЙНЫЕ ТЕХНОЛОГИИ", delay: 60000 }
    ]
  },
  {
    id: 31,
    production: "Альцина",
    type: "photo",
    question: "Композитор какой эпохи написал 'Альцину'?",
    placeholderPath: "assets/placeholders/question-31.jpg",
    answers: ["Ренессанс", "Барокко", "Классицизм", "Романтизм"],
    correctIndex: 1,
    photoPath: "assets/photos/photo-31.jpg",
    hints: [
      { level: 1, text: "🎼 Гендель (1685–1759), стиль пышности", delay: 0 },
      { level: 2, text: "📅 XVII–XVIII века → барокко", delay: 30000 },
      { level: 3, text: "🎭 Б А Р О _ _ О", delay: 60000 }
    ]
  },
  // Сотворение мира
  {
    id: 32,
    production: "Сотворение мира",
    type: "text",
    question: "Чьё сочинение лежит в основе музыкальной композиции спектакля?",
    answers: ["В.А. Моцарта", "Ф.Й. Гайдна", "Л. ван Бетховена", "И.С. Баха"],
    correctIndex: 1,
    photoPath: "assets/photos/photo-32.jpg",
    hints: [
      { level: 1, text: "🎵 Венский классик, оратория 1798 года", delay: 0 },
      { level: 2, text: "🎼 ГАЙ + ДН", delay: 30000 },
      { level: 3, text: "✍️ Г А Й Д Н", delay: 60000 }
    ]
  },
  {
    id: 33,
    production: "Сотворение мира",
    type: "text",
    question: "Сколько частей включает музыкально-драматическое представление?",
    answers: ["Одна", "Три", "Семь", "Девять"],
    correctIndex: 1,
    photoPath: "assets/photos/photo-33.jpg",
    hints: [
      { level: 1, text: "📖 Часть 1 (дни 1–4), Часть 2 (5–6), Часть 3 (7)", delay: 0 },
      { level: 2, text: "🔢 1+1+1", delay: 30000 },
      { level: 3, text: "🎭 ТРИ", delay: 60000 }
    ]
  },
  {
    id: 34,
    production: "Сотворение мира",
    type: "text",
    question: "Для кого предназначалась первоначальная версия концерта?",
    answers: [
      "Придворного оркестра Екатерины II",
      "Венского благотворительного собрания музыкантов",
      "Концертного зала Лондона",
      "Церкви Святого Стефана в Вене"
    ],
    correctIndex: 1,
    photoPath: "assets/photos/photo-34.jpg",
    hints: [
      { level: 1, text: "🎼 Сбор средств для поддержки семей музыкантов", delay: 0 },
      { level: 2, text: "❤️ Благотворительное общество музыкантов (Вена)", delay: 30000 },
      { level: 3, text: "🎵 Венское благотворительное собрание музыкантов", delay: 60000 }
    ]
  },
  {
    id: 35,
    production: "Сотворение мира",
    type: "photo",
    question: "Какая библейская книга легла в основу сюжета?",
    placeholderPath: "assets/placeholders/question-35.jpg",
    answers: ["Апокалипсис", "Бытие", "Псалмы", "Евангелие"],
    correctIndex: 1,
    photoPath: "assets/photos/photo-35.jpg",
    hints: [
      { level: 1, text: "📖 'В начале сотворил Бог небо и землю...'", delay: 0 },
      { level: 2, text: "📚 Первая книга: дни творения", delay: 30000 },
      { level: 3, text: "📖 Б Ы Т И _", delay: 60000 }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = QUESTIONS_DATA;
}


