/**
 * Database Makanan & Gizi
 * Sumber acuan: Tabel Komposisi Pangan Indonesia (TKPI - Kemenkes RI) & USDA FoodData Central
 */
const DEFAULT_FOODS = [
  // ==================== BUAH-BUAHAN ====================
  {
    id: "buah_apel",
    nama: "Apel Segar (Fuji/Malang)",
    kategori: "buah",
    icon: "🍎",
    porsi: "1 buah sedang (180g)",
    kalori: 95,
    giziBaik: {
      protein: 0.5,
      serat: 4.4,
      vitamin: ["Vitamin C", "Kalium", "Antioksidan Kuersetin", "Pektin"],
      khasiat: "Kaya serat pektin yang ampuh mengikat kolesterol jahat (LDL), menjaga kesehatan pembuluh darah jantung, melancarkan buang air besar, serta antioksidan kuersetin untuk menangkal radang dan radikal bebas."
    },
    giziJelek: {
      lemakJenuh: 0.1,
      gula: 19.0, // gula alami buah (fruktosa)
      natrium: 2,
      catatan: "Gula alami terikat serat pangan, aman untuk gula darah bila dikonsumsi utuh (bukan jus kemasan)."
    },
    status: "sangat-sehat"
  },
  {
    id: "buah_pisang",
    nama: "Pisang Cavendish / Ambon",
    kategori: "buah",
    icon: "🍌",
    porsi: "1 buah sedang (120g)",
    kalori: 105,
    giziBaik: {
      protein: 1.3,
      serat: 3.1,
      vitamin: ["Kalium Tinggi", "Vitamin B6", "Vitamin C", "Magnesium"],
      khasiat: "Sumber energi alami instan, tinggi kalium untuk menstabilkan tekanan darah dan mencegah kram otot. Vitamin B6 mendukung fungsi saraf dan pembentukan sel darah merah."
    },
    giziJelek: {
      lemakJenuh: 0.1,
      gula: 14.4,
      natrium: 1,
      catatan: "Kandungan karbohidrat baik, sangat cocok dimakan sebelum atau sesudah olahraga."
    },
    status: "sangat-sehat"
  },
  {
    id: "buah_alpukat",
    nama: "Alpukat Mentega",
    kategori: "buah",
    icon: "🥑",
    porsi: "1/2 buah sedang (100g)",
    kalori: 160,
    giziBaik: {
      protein: 2.0,
      serat: 6.7,
      vitamin: ["Lemak Baik Omega-9", "Vitamin E", "Folat", "Kalium"],
      khasiat: "Kaya asam lemak tak jenuh tunggal yang melindungi pembuluh darah, vitamin E untuk kekenyalan kulit, dan serat larut yang bikin kenyang lebih lama."
    },
    giziJelek: {
      lemakJenuh: 2.1,
      gula: 0.7,
      natrium: 7,
      catatan: "Padat kalori sehat dari lemak nabati, nikmati tanpa tambahan susu kental manis berlebih."
    },
    status: "sangat-sehat"
  },
  {
    id: "buah_pepaya",
    nama: "Pepaya California",
    kategori: "buah",
    icon: "🥭",
    porsi: "1 potong besar (150g)",
    kalori: 65,
    giziBaik: {
      protein: 0.9,
      serat: 2.7,
      vitamin: ["Enzim Papain", "Vitamin A", "Vitamin C Tinggi", "Likopen"],
      khasiat: "Mengandung enzim papain pencerna protein untuk meredakan sembelit & asam lambung. Vitamin C & A melimpah untuk kesehatan mata dan imunitas."
    },
    giziJelek: {
      lemakJenuh: 0.0,
      gula: 11.0,
      natrium: 4,
      catatan: "Rendah kalori, sangat aman dikonsumsi harian untuk diet sehat."
    },
    status: "sangat-sehat"
  },
  {
    id: "buah_jeruk",
    nama: "Jeruk Manis / Medan",
    kategori: "buah",
    icon: "🍊",
    porsi: "1 buah sedang (130g)",
    kalori: 62,
    giziBaik: {
      protein: 1.2,
      serat: 3.1,
      vitamin: ["Vitamin C 100% AKG", "Folat", "Flavonoid Hesperidin"],
      khasiat: "Memenuhi kebutuhan vitamin C harian, membantu penyerapan zat besi, mempercepat penyembuhan luka, serta meningkatkan pembentukan kolagen alami tubuh."
    },
    giziJelek: {
      lemakJenuh: 0.0,
      gula: 12.2,
      natrium: 0,
      catatan: "Bagus dimakan langsung dengan bulir seratnya daripada disaring jadi jus murni."
    },
    status: "sangat-sehat"
  },
  {
    id: "buah_jambubiji",
    nama: "Jambu Biji Merah",
    kategori: "buah",
    icon: "🍈",
    porsi: "1 buah sedang (100g)",
    kalori: 68,
    giziBaik: {
      protein: 2.6,
      serat: 5.4,
      vitamin: ["Vitamin C (4x lipat Jeruk)", "Likopen", "Kalium", "Antioksidan"],
      khasiat: "Raja vitamin C di antara buah tropis. Efektif mendongkrak trombosit darah saat pemulihan demam, menangkal infeksi virus, dan melancarkan pencernaan."
    },
    giziJelek: {
      lemakJenuh: 0.3,
      gula: 8.9,
      natrium: 2,
      catatan: "Sangat tinggi serat dan rendah indeks glikemik."
    },
    status: "sangat-sehat"
  },
  {
    id: "buah_semangka",
    nama: "Semangka Merah",
    kategori: "buah",
    icon: "🍉",
    porsi: "1 potong besar (200g)",
    kalori: 60,
    giziBaik: {
      protein: 1.2,
      serat: 0.8,
      vitamin: ["Air 92%", "Likopen Tinggi", "L-Citrulline", "Vitamin A"],
      khasiat: "Menghidrasi tubuh secara maksimal. Asam amino L-citrulline membantu pelebaran pembuluh darah dan meredakan nyeri otot pasca kerja/olahraga."
    },
    giziJelek: {
      lemakJenuh: 0.0,
      gula: 12.4,
      natrium: 2,
      catatan: "Kadar air sangat tinggi, segar dan menghidrasi di cuaca panas."
    },
    status: "sangat-sehat"
  },
  {
    id: "buah_mangga",
    nama: "Mangga Harum Manis",
    kategori: "buah",
    icon: "🥭",
    porsi: "1 buah sedang (150g)",
    kalori: 99,
    giziBaik: {
      protein: 1.2,
      serat: 2.4,
      vitamin: ["Vitamin A (Beta-karoten)", "Vitamin C", "Mangiferin"],
      khasiat: "Mangiferin berfungsi sebagai anti-inflamasi kuat. Beta-karoten dan lutein melindungi kornea mata dan menjaga daya tahan selaput lendir saluran napas."
    },
    giziJelek: {
      lemakJenuh: 0.1,
      gula: 21.0,
      natrium: 2,
      catatan: "Cukup manis, nikmati secukupnya bagi yang menjaga kadar gula darah."
    },
    status: "sehat"
  },
  {
    id: "buah_buahnaga",
    nama: "Buah Naga Merah",
    kategori: "buah",
    icon: "🌺",
    porsi: "1/2 buah (150g)",
    kalori: 90,
    giziBaik: {
      protein: 1.8,
      serat: 4.5,
      vitamin: ["Betasianin", "Zat Besi", "Magnesium", "Prebiotik"],
      khasiat: "Pigmen merah betasianin adalah antioksidan penangkal radikal bebas. Biji hitamnya mengandung lemak esensial dan serat prebiotik untuk bakteri baik usus."
    },
    giziJelek: {
      lemakJenuh: 0.1,
      gula: 12.0,
      natrium: 3,
      catatan: "Rendah kalori, sangat cocok untuk menu detoks dan diet harian."
    },
    status: "sangat-sehat"
  },
  {
    id: "buah_nanas",
    nama: "Nanas Madu",
    kategori: "buah",
    icon: "🍍",
    porsi: "1 mangkok iris (160g)",
    kalori: 82,
    giziBaik: {
      protein: 0.9,
      serat: 2.3,
      vitamin: ["Enzim Bromelain", "Vitamin C", "Mangan"],
      khasiat: "Enzim bromelain membantu mengurai protein makanan berat, meredakan peradangan sendi dan sinusitis, serta menjaga kesehatan gusi."
    },
    giziJelek: {
      lemakJenuh: 0.0,
      gula: 16.0,
      natrium: 2,
      catatan: "Bagus dikonsumsi setelah makan daging atau makanan berlemak."
    },
    status: "sangat-sehat"
  },

  // ==================== SAYURAN ====================
  {
    id: "sayur_bayam",
    nama: "Sayur Bening Bayam",
    kategori: "sayur",
    icon: "🥬",
    porsi: "1 mangkok (150g)",
    kalori: 35,
    giziBaik: {
      protein: 2.8,
      serat: 2.5,
      vitamin: ["Zat Besi Alami", "Folat", "Vitamin K", "Kalsium", "Lutein"],
      khasiat: "Mencegah anemia (kurang darah), menguatkan tulang berkat vitamin K, serta melindungi penglihatan dari degenerasi makula."
    },
    giziJelek: {
      lemakJenuh: 0.1,
      gula: 0.8,
      natrium: 120,
      catatan: "Sangat rendah kalori, kaya mikronutrisi vital tubuh."
    },
    status: "sangat-sehat"
  },
  {
    id: "sayur_brokoli",
    nama: "Brokoli Kukus",
    kategori: "sayur",
    icon: "🥦",
    porsi: "1 mangkok (100g)",
    kalori: 34,
    giziBaik: {
      protein: 2.8,
      serat: 2.6,
      vitamin: ["Sulforaphane", "Vitamin C", "Vitamin K", "Kromium"],
      khasiat: "Sulforaphane adalah senyawa antikanker dan anti-inflamasi super. Mengoptimalkan detoksifikasi organ hati dan menyeimbangkan kadar gula darah."
    },
    giziJelek: {
      lemakJenuh: 0.0,
      gula: 1.4,
      natrium: 33,
      catatan: "Superfood hijau, disarankan dimasak kukus agar enzimnya tidak rusak."
    },
    status: "sangat-sehat"
  },
  {
    id: "sayur_wortel",
    nama: "Wortel Segar / Sup",
    kategori: "sayur",
    icon: "🥕",
    porsi: "1 mangkok (100g)",
    kalori: 41,
    giziBaik: {
      protein: 0.9,
      serat: 2.8,
      vitamin: ["Beta-karoten (Vit A)", "Biotin", "Kalium", "Lutein"],
      khasiat: "Mempertajam penglihatan saat remang/malam, menjaga regenerasi sel kulit, dan memelihara kesehatan dinding pembuluh darah."
    },
    giziJelek: {
      lemakJenuh: 0.0,
      gula: 4.7,
      natrium: 69,
      catatan: "Bagus untuk mata dan regenerasi sel epitel."
    },
    status: "sangat-sehat"
  },
  {
    id: "sayur_kangkung",
    nama: "Tumis Kangkung Terasi",
    kategori: "sayur",
    icon: "🍲",
    porsi: "1 piring kecil (120g)",
    kalori: 110,
    giziBaik: {
      protein: 3.0,
      serat: 2.2,
      vitamin: ["Zat Besi", "Vitamin A", "Zink", "Fosfor"],
      khasiat: "Kaya zat besi untuk kebugaran tubuh, mengandung mineral penenang alami yang membuat istirahat lebih berkualitas."
    },
    giziJelek: {
      lemakJenuh: 1.5,
      gula: 1.5,
      natrium: 380,
      catatan: "Perhatikan penggunaan garam dan minyak saat menumis."
    },
    status: "sehat"
  },
  {
    id: "sayur_sayurasem",
    nama: "Sayur Asem Khas Sunda/Jawa",
    kategori: "sayur",
    icon: "🥣",
    porsi: "1 mangkok sedang (200g)",
    kalori: 85,
    giziBaik: {
      protein: 3.5,
      serat: 3.8,
      vitamin: ["Asam Jawa", "Kacang Tanah Sehat", "Folat", "Mineral Sayur"],
      khasiat: "Kombinasi serat aneka sayuran (labu siam, kacang panjang, jagung) menyegarkan saluran cerna dan melancarkan buang air besar."
    },
    giziJelek: {
      lemakJenuh: 0.5,
      gula: 4.0,
      natrium: 310,
      catatan: "Kuah asam segar bebas minyak jenuh, sangat ramah diet."
    },
    status: "sangat-sehat"
  },
  {
    id: "sayur_gadogado",
    nama: "Gado-Gado Komplit",
    kategori: "sayur",
    icon: "🥗",
    porsi: "1 porsi (250g)",
    kalori: 340,
    giziBaik: {
      protein: 14.0,
      serat: 7.5,
      vitamin: ["Aneka Sayur Segar", "Tahu & Tempe Protein", "Lemak Sehat Kacang"],
      khasiat: "Menu seimbang kaya serat sayuran hijau, tauge, tahu, dan telur. Bumbu kacang memberi lemak tak jenuh nabati dan vitamin E."
    },
    giziJelek: {
      lemakJenuh: 3.8,
      gula: 8.5,
      natrium: 420,
      catatan: "Sangat bernutrisi, batasi kerupuk berlebih bila ingin hemat kalori."
    },
    status: "sehat"
  },

  // ==================== LAUK PAUK & PROTEIN ====================
  {
    id: "lauk_telurrebus",
    nama: "Telur Ayam Rebus",
    kategori: "lauk",
    icon: "🥚",
    porsi: "1 butir (50g)",
    kalori: 74,
    giziBaik: {
      protein: 6.3,
      serat: 0.0,
      vitamin: ["Kolin Otak", "Vitamin B12", "Vitamin D", "Lutein"],
      khasiat: "Sumber protein bernilai biologis tertinggi (asam amino esensial lengkap). Kolin penting untuk memori otak dan metabolisme lemak di liver."
    },
    giziJelek: {
      lemakJenuh: 1.6,
      gula: 0.6,
      natrium: 62,
      catatan: "Bebas minyak goreng tambahan, pilihan sarapan protein terbaik."
    },
    status: "sangat-sehat"
  },
  {
    id: "lauk_dadaayam",
    nama: "Dada Ayam Panggang / Rebus",
    kategori: "lauk",
    icon: "🍗",
    porsi: "1 potong (100g)",
    kalori: 165,
    giziBaik: {
      protein: 31.0,
      serat: 0.0,
      vitamin: ["Niasin (B3)", "Vitamin B6", "Selenium", "Fosfor"],
      khasiat: "Protein murni pembangun massa otot dan pembakar lemak tubuh. Niasin membantu mengubah makanan menjadi energi sel."
    },
    giziJelek: {
      lemakJenuh: 1.0,
      gula: 0.0,
      natrium: 74,
      catatan: "Sangat tinggi protein tanpa lemak jenuh berbahaya."
    },
    status: "sangat-sehat"
  },
  {
    id: "lauk_tempebacem",
    nama: "Tempe Bacem / Rebus",
    kategori: "lauk",
    icon: "🧈",
    porsi: "2 potong sedang (80g)",
    kalori: 145,
    giziBaik: {
      protein: 15.0,
      serat: 4.8,
      vitamin: ["Isoflavon Kedelai", "Probiotik Fermentasi", "Kalsium", "Zat Besi"],
      khasiat: "Superfood asli Indonesia. Isoflavon melindungi kesehatan pembuluh darah dan tulang, sementara proses fermentasinya sangat ramah usus."
    },
    giziJelek: {
      lemakJenuh: 1.2,
      gula: 5.0,
      natrium: 150,
      catatan: "Alternatif protein nabati paling kaya serat dan ramah kolesterol."
    },
    status: "sangat-sehat"
  },
  {
    id: "lauk_tempegoreng",
    nama: "Tempe Goreng Tepung / Krispi",
    kategori: "lauk",
    icon: "🥞",
    porsi: "2 potong (80g)",
    kalori: 220,
    giziBaik: {
      protein: 11.0,
      serat: 3.5,
      vitamin: ["Isoflavon Kedelai", "Kalsium"],
      khasiat: "Tetap kaya protein nabati dan kalsium, namun menyerap minyak saat proses penggorengan."
    },
    giziJelek: {
      lemakJenuh: 3.5,
      gula: 1.0,
      natrium: 280,
      catatan: "Minyak goreng menambah kalori dan lemak jenuh."
    },
    status: "sedang"
  },
  {
    id: "lauk_tahuputih",
    nama: "Tahu Putih Kukus / Sup",
    kategori: "lauk",
    icon: "🤍",
    porsi: "1 potong besar (100g)",
    kalori: 76,
    giziBaik: {
      protein: 8.2,
      serat: 1.2,
      vitamin: ["Kalsium Tinggi", "Isoflavon", "Fosfor", "Magnesium"],
      khasiat: "Membantu kepadatan tulang dan gigi, rendah kalori, dan bebas kolesterol hewani."
    },
    giziJelek: {
      lemakJenuh: 0.7,
      gula: 0.5,
      natrium: 14,
      catatan: "Sangat lembut dan mudah dicerna, ideal untuk semua usia."
    },
    status: "sangat-sehat"
  },
  {
    id: "lauk_ikankembung",
    nama: "Ikan Kembung Bakar / Kukus",
    kategori: "lauk",
    icon: "🐟",
    porsi: "1 ekor sedang (100g)",
    kalori: 167,
    giziBaik: {
      protein: 21.0,
      serat: 0.0,
      vitamin: ["Omega-3 Tinggi (DHA/EPA)", "Vitamin D", "B12", "Yodium"],
      khasiat: "Kandungan Omega-3 lebih tinggi daripada ikan salmon impor! Mengurangi plak arteri jantung dan meningkatkan kecerdasan otak."
    },
    giziJelek: {
      lemakJenuh: 2.2,
      gula: 0.0,
      natrium: 90,
      catatan: "Pilihan ikan laut lokal terbaik untuk kesehatan jantung."
    },
    status: "sangat-sehat"
  },
  {
    id: "lauk_ayamgoreng",
    nama: "Ayam Goreng Paha / Dada Tepung",
    kategori: "lauk",
    icon: "🍗",
    porsi: "1 potong (100g)",
    kalori: 260,
    giziBaik: {
      protein: 23.0,
      serat: 0.5,
      vitamin: ["Zink", "Vitamin B Kompleks", "Zat Besi"],
      khasiat: "Mengenyangkan dan sumber protein pembentuk antibodi tubuh."
    },
    giziJelek: {
      lemakJenuh: 4.8,
      gula: 0.2,
      natrium: 390,
      catatan: "Kulit dan tepung menyerap minyak, tingkatkan konsumsi sayur sebagai penyeimbang."
    },
    status: "sedang"
  },
  {
    id: "lauk_rendangsapi",
    nama: "Rendang Daging Sapi",
    kategori: "lauk",
    icon: "🥩",
    porsi: "1 potong sedang (70g)",
    kalori: 210,
    giziBaik: {
      protein: 19.5,
      serat: 1.2,
      vitamin: ["Zat Besi Heme", "Zink", "Rempah Antioksidan (Kunyit, Jahe, Lengkuas)"],
      khasiat: "Zat besi hewani sangat mudah diserap tubuh untuk mencegah lemas & anemia. Rempah-rempahnya kaya senyawa antimikroba alami."
    },
    giziJelek: {
      lemakJenuh: 5.5,
      gula: 2.0,
      natrium: 350,
      catatan: "Tinggi lemak jenuh dari santan masak lama, konsumsi dengan porsi wajar."
    },
    status: "sedang"
  },

  // ==================== MAKANAN POKOK & KARBOHIDRAT ====================
  {
    id: "pokok_nasiputih",
    nama: "Nasi Putih Matang",
    kategori: "pokok",
    icon: "🍚",
    porsi: "1 centong penuh (100g)",
    kalori: 130,
    giziBaik: {
      protein: 2.7,
      serat: 0.4,
      vitamin: ["Karbohidrat Kompleks", "Tiamin (B1)", "Mangan"],
      khasiat: "Sumber bahan bakar energi primer bagi kerja otak dan aktivitas fisik harian."
    },
    giziJelek: {
      lemakJenuh: 0.1,
      gula: 0.1,
      natrium: 1,
      catatan: "Indeks glikemik cukup tinggi, imbangi dengan lauk tinggi serat dan sayuran hijau."
    },
    status: "sehat"
  },
  {
    id: "pokok_nasimerah",
    nama: "Nasi Merah",
    kategori: "pokok",
    icon: "🥣",
    porsi: "1 centong penuh (100g)",
    kalori: 111,
    giziBaik: {
      protein: 2.6,
      serat: 1.8,
      vitamin: ["Serat Bekatul", "Magnesium", "Antosianin", "Vitamin B Kompleks"],
      khasiat: "Menjaga pelepasan gula darah stabil (low GI), membuat kenyang lebih awet, dan antosianin melindungi dinding sel dari oksidasi."
    },
    giziJelek: {
      lemakJenuh: 0.2,
      gula: 0.2,
      natrium: 2,
      catatan: "Pilihan karbohidrat terbaik untuk pencegahan diabetes dan diet defisit kalori."
    },
    status: "sangat-sehat"
  },
  {
    id: "pokok_kentangrebus",
    nama: "Kentang Rebus / Kukus",
    kategori: "pokok",
    icon: "🥔",
    porsi: "1 buah sedang (150g)",
    kalori: 130,
    giziBaik: {
      protein: 3.0,
      serat: 3.2,
      vitamin: ["Kalium Tinggi", "Vitamin C", "Vitamin B6"],
      khasiat: "Memiliki indeks kenyang (satiety index) tertinggi di dunia makanan pokok. Kaliumnya membantu pembuangan kelebihan natrium dari tubuh."
    },
    giziJelek: {
      lemakJenuh: 0.1,
      gula: 1.2,
      natrium: 8,
      catatan: "Bebas lemak jenuh saat direbus tanpa mentega berlebih."
    },
    status: "sangat-sehat"
  },
  {
    id: "pokok_oatmeal",
    nama: "Oatmeal / Bubur Gandum",
    kategori: "pokok",
    icon: "🌾",
    porsi: "1 mangkok saji (40g kering dimasak)",
    kalori: 150,
    giziBaik: {
      protein: 5.0,
      serat: 4.0,
      vitamin: ["Beta-Glukan", "Zat Besi", "Magnesium", "Antioksidan Avenanthramide"],
      khasiat: "Beta-glukan terbukti klinis menyerap dan membuang kolesterol jahat serta menstabilkan gula darah sepanjang pagi."
    },
    giziJelek: {
      lemakJenuh: 0.5,
      gula: 1.0,
      natrium: 2,
      catatan: "Pilihan sarapan jantung sehat nomor satu dunia."
    },
    status: "sangat-sehat"
  },
  {
    id: "pokok_rotigandum",
    nama: "Roti Tawar Gandum Utuh (Whole Wheat)",
    kategori: "pokok",
    icon: "🍞",
    porsi: "1 lembar (40g)",
    kalori: 95,
    giziBaik: {
      protein: 4.0,
      serat: 2.5,
      vitamin: ["Serat Gandum", "Vitamin B1 & B2", "Zat Besi"],
      khasiat: "Mencegah lonjakan insulin mendadak, lebih padat nutrisi dan serat daripada roti putih olahan."
    },
    giziJelek: {
      lemakJenuh: 0.3,
      gula: 2.0,
      natrium: 140,
      catatan: "Lebih tahan kenyang dibanding roti putih biasa."
    },
    status: "sehat"
  },
  {
    id: "pokok_mieinstan",
    nama: "Mie Instan Kuah / Goreng",
    kategori: "pokok",
    icon: "🍜",
    porsi: "1 bungkus (85g)",
    kalori: 380,
    giziBaik: {
      protein: 7.0,
      serat: 1.5,
      vitamin: ["Fortifikasi Zat Besi & Vit A"],
      khasiat: "Praktis dan cepat mengganjal rasa lapar ketika darurat."
    },
    giziJelek: {
      lemakJenuh: 7.0,
      gula: 3.5,
      natrium: 1420, // SANGAT TINGGI
      catatan: "Tinggi lemak jenuh & natrium. Disarankan kurangi bumbu asin separuh dan tambah sayur & telur rebus!"
    },
    status: "perhatian"
  },
  {
    id: "pokok_nasigoreng",
    nama: "Nasi Goreng Spesial Telur",
    kategori: "pokok",
    icon: "🍳",
    porsi: "1 piring sedang (250g)",
    kalori: 450,
    giziBaik: {
      protein: 12.0,
      serat: 1.8,
      vitamin: ["Protein Telur", "Vitamin B Kompleks"],
      khasiat: "Mengenyangkan dengan kalori tinggi untuk aktivitas fisik."
    },
    giziJelek: {
      lemakJenuh: 5.2,
      gula: 4.0,
      natrium: 680,
      catatan: "Cukup berminyak dan gurih, imbangi dengan lalapan timun dan tomat segar."
    },
    status: "sedang"
  },
  {
    id: "pokok_baksosapi",
    nama: "Bakso Sapi Kuah + Bihun",
    kategori: "pokok",
    icon: "🥣",
    porsi: "1 mangkok (5 butir + kuah)",
    kalori: 325,
    giziBaik: {
      protein: 16.0,
      serat: 1.5,
      vitamin: ["Zat Besi Sapi", "Zink", "Kalsium Kuah Tulang"],
      khasiat: "Protein daging sapi membantu perbaikan sel jaringan tubuh dan menghangatkan badan."
    },
    giziJelek: {
      lemakJenuh: 4.5,
      gula: 1.8,
      natrium: 890,
      catatan: "Kuah kaldu gurih mengandung natrium tinggi, hindari menyeruput kuah sampai habis."
    },
    status: "sedang"
  },

  // ==================== CAMILAN & JAJANAN ====================
  {
    id: "camilan_gorengan",
    nama: "Gorengan Bakwan / Bala-Bala",
    kategori: "camilan",
    icon: "🥟",
    porsi: "1 buah (50g)",
    kalori: 140,
    giziBaik: {
      protein: 2.0,
      serat: 1.0,
      vitamin: ["Sedikit serat sayur kol & wortel"],
      khasiat: "Rasa gurih renyah memanjakan lidah sebagai teman minum teh hangat."
    },
    giziJelek: {
      lemakJenuh: 4.2,
      gula: 0.8,
      natrium: 220,
      catatan: "Minyak goreng berulang memicu radikal bebas dan kolesterol LDL. Batasi 1-2 buah saja."
    },
    status: "perhatian"
  },
  {
    id: "camilan_pisanggoreng",
    nama: "Pisang Goreng Tepung",
    kategori: "camilan",
    icon: "🍌",
    porsi: "1 potong (70g)",
    kalori: 175,
    giziBaik: {
      protein: 1.5,
      serat: 1.8,
      vitamin: ["Kalium Pisang", "Vitamin B6"],
      khasiat: "Rasa manis alami pisang tetap memberi sedikit asupan kalium."
    },
    giziJelek: {
      lemakJenuh: 3.8,
      gula: 12.0,
      natrium: 110,
      catatan: "Proses penggorengan melipatgandakan kalori dibanding pisang segar."
    },
    status: "sedang"
  },
  {
    id: "camilan_martabakmanis",
    nama: "Martabak Manis Cokelat Keju",
    kategori: "camilan",
    icon: "🥞",
    porsi: "1 potong tebal (100g)",
    kalori: 370,
    giziBaik: {
      protein: 6.0,
      serat: 1.0,
      vitamin: ["Kalsium dari keju"],
      khasiat: "Sangat lezat dan cepat mendongkrak tenaga (karbohidrat padat)."
    },
    giziJelek: {
      lemakJenuh: 9.8,
      gula: 28.0,
      natrium: 260,
      catatan: "Bom gula dan mentega! Nikmati sepotong kecil sesekali saja."
    },
    status: "perhatian"
  },
  {
    id: "camilan_keripik",
    nama: "Keripik Kentang Kemasan",
    kategori: "camilan",
    icon: "🥔",
    porsi: "1 bungkus kecil (50g)",
    kalori: 270,
    giziBaik: {
      protein: 3.0,
      serat: 1.5,
      vitamin: ["Kalium kentang"],
      khasiat: "Camilan renyah penahan kantuk saat berkegiatan."
    },
    giziJelek: {
      lemakJenuh: 5.5,
      gula: 1.2,
      natrium: 320,
      catatan: "Padat kalori kosong dari lemak gorengan, mudah bikin kalap makan berlebih."
    },
    status: "perhatian"
  },
  {
    id: "camilan_donat",
    nama: "Donat Cokelat Tabur",
    kategori: "camilan",
    icon: "🍩",
    porsi: "1 buah sedang (65g)",
    kalori: 260,
    giziBaik: {
      protein: 3.5,
      serat: 1.1,
      vitamin: ["Zat Besi dari terigu"],
      khasiat: "Mood booster cepat saat lelah mental."
    },
    giziJelek: {
      lemakJenuh: 6.0,
      gula: 18.0,
      natrium: 210,
      catatan: "Tepung olahan dipadu gula dan gorengan minyak jenuh."
    },
    status: "perhatian"
  },

  // ==================== MINUMAN ====================
  {
    id: "minuman_airkelapa",
    nama: "Air Kelapa Muda Murni",
    kategori: "minuman",
    icon: "🥥",
    porsi: "1 gelas (250ml)",
    kalori: 45,
    giziBaik: {
      protein: 1.0,
      serat: 1.5,
      vitamin: ["Elektrolit Alami", "Kalium Super", "Magnesium", "Kalsium"],
      khasiat: "Isotonik alami terbaik di bumi. Menyeimbangkan ion tubuh yang hilang karena dehidrasi, demam, atau olahraga, dan menjaga fungsi ginjal."
    },
    giziJelek: {
      lemakJenuh: 0.1,
      gula: 6.0,
      natrium: 65,
      catatan: "Konsumsi murni tanpa tambahan sirup manis untuk manfaat optimal."
    },
    status: "sangat-sehat"
  },
  {
    id: "minuman_kopihitam",
    nama: "Kopi Hitam Tanpa Gula (Americano)",
    kategori: "minuman",
    icon: "☕",
    porsi: "1 cangkir (200ml)",
    kalori: 5,
    giziBaik: {
      protein: 0.3,
      serat: 0.0,
      vitamin: ["Asam Klorogenat", "Kafein", "Antioksidan Polifenol"],
      khasiat: "Meningkatkan fokus dan kewaspadaan mental. Asam klorogenat membantu pembakaran lemak dan sensitivitas insulin."
    },
    giziJelek: {
      lemakJenuh: 0.0,
      gula: 0.0,
      natrium: 5,
      catatan: "Hampir nol kalori. Hindari minum berlebihan jika sensitif lambung/asam lambung."
    },
    status: "sangat-sehat"
  },
  {
    id: "minuman_kopisusu",
    nama: "Es Kopi Susu Gula Aren",
    kategori: "minuman",
    icon: "🧋",
    porsi: "1 cup (300ml)",
    kalori: 230,
    giziBaik: {
      protein: 4.5,
      serat: 0.5,
      vitamin: ["Kalsium dari susu sapi", "Fokus Kafein"],
      khasiat: "Menyegarkan, menghilangkan kantuk dengan rasa gurih manis."
    },
    giziJelek: {
      lemakJenuh: 4.0,
      gula: 24.0,
      natrium: 95,
      catatan: "Tinggi gula tersembunyi dari sirup gula aren dan krimer kental manis."
    },
    status: "perhatian"
  },
  {
    id: "minuman_bobatea",
    nama: "Boba Milk Tea Brown Sugar",
    kategori: "minuman",
    icon: "🧋",
    porsi: "1 cup (450ml)",
    kalori: 380,
    giziBaik: {
      protein: 3.0,
      serat: 0.5,
      vitamin: ["Antioksidan teh hitam (minimal)"],
      khasiat: "Rasa kenyal manis yang memuaskan nafsu ngemil manis."
    },
    giziJelek: {
      lemakJenuh: 5.5,
      gula: 38.0,
      natrium: 120,
      catatan: "Gula sangat tinggi dari mutiara tapioka dan sirup gula. Jangan dijadikan konsumsi rutin!"
    },
    status: "perhatian"
  },
  {
    id: "minuman_estehmanis",
    nama: "Es Teh Manis Warung",
    kategori: "minuman",
    icon: "🍹",
    porsi: "1 gelas (300ml)",
    kalori: 110,
    giziBaik: {
      protein: 0.0,
      serat: 0.0,
      vitamin: ["Polifenol Teh"],
      khasiat: "Menyegarkan dahaga setelah makan siang."
    },
    giziJelek: {
      lemakJenuh: 0.0,
      gula: 22.0,
      natrium: 10,
      catatan: "Teh tanpa gula sangat sehat, namun gula pasir membuatnya menjadi kalori cair cepat."
    },
    status: "sedang"
  },
  {
    id: "minuman_susumurni",
    nama: "Susu Sapi Segar UHT Plain",
    kategori: "minuman",
    icon: "🥛",
    porsi: "1 gelas (200ml)",
    kalori: 125,
    giziBaik: {
      protein: 6.8,
      serat: 0.0,
      vitamin: ["Kalsium Tinggi", "Vitamin D", "Vitamin B12", "Fosfor"],
      khasiat: "Fondasi utama kepadatan tulang dan gigi, mendukung kontraksi otot dan kesehatan syaraf."
    },
    giziJelek: {
      lemakJenuh: 3.2,
      gula: 9.0,
      natrium: 105,
      catatan: "Gula alami (laktosa), baik untuk pertumbuhan anak dan pemeliharaan tulang dewasa."
    },
    status: "sangat-sehat"
  }
];
