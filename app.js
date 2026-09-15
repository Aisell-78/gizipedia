/**
 * NutriTracker - App Logic (Interactive & Mobile-Optimized)
 * Fitur: Pencarian makanan, Cek Khasiat, Log Harian, Kalkulator Kalori & Gizi Baik vs Buruk,
 *        Mobile Tab Switcher, Quick Nutri Filter, Bottom Floating Bar, Touch Feedback
 */

(function () {
  'use strict';

  // ==================== STATE MANAGEMENT ====================
  const STORAGE_KEY_DIARY = 'nutritracker_diary_items';
  const STORAGE_KEY_CUSTOM = 'nutritracker_custom_foods';

  let customFoods = [];
  let allFoods = [];
  let diary = []; // Array of { id, qty }
  let activeCategory = 'all';
  let activeQuickFilter = null; // 'low-cal' | 'high-protein' | 'high-fiber' | null
  let searchQuery = '';
  let selectedFoodForModal = null;
  let activeMobileTab = 'catalog'; // 'catalog' | 'diary'

  // DOM Elements
  const currentDateText = document.getElementById('current-date-text');
  const btnResetDiary = document.getElementById('btn-reset-diary');

  // Dashboard DOM
  const elTotalCalories = document.getElementById('total-calories');
  const elCalorieProgressBar = document.getElementById('calorie-progress-bar');
  const elCaloriePercentText = document.getElementById('calorie-percent-text');
  const elCalorieStatusBadge = document.getElementById('calorie-status-badge');

  const elTotalProtein = document.getElementById('total-protein');
  const elTotalFiber = document.getElementById('total-fiber');
  const elTotalBenefitsCount = document.getElementById('total-benefits-count');

  const elTotalSugar = document.getElementById('total-sugar');
  const elTotalSatFat = document.getElementById('total-sat-fat');
  const elTotalSodium = document.getElementById('total-sodium');
  const elBadNutrientsWarning = document.getElementById('bad-nutrients-warning');

  const elHealthInsightMessage = document.getElementById('health-insight-message');

  // Layout & Mobile DOM
  const mainContentLayout = document.getElementById('main-content-layout');
  const mobileTabSwitcher = document.getElementById('mobile-tab-switcher');
  const mobileDiaryBadge = document.getElementById('mobile-diary-badge');
  const mobileFloatingBar = document.getElementById('mobile-floating-bar');
  const floatingTotalCal = document.getElementById('floating-total-cal');
  const floatingItemSub = document.getElementById('floating-item-sub');
  const btnFloatingViewDiary = document.getElementById('btn-floating-view-diary');
  const quickFilterTags = document.getElementById('quick-filter-tags');

  // Diary DOM
  const diaryContainer = document.getElementById('diary-items-container');
  const diaryItemCount = document.getElementById('diary-item-count');

  // Catalog DOM
  const foodSearchInput = document.getElementById('food-search-input');
  const categoryPillsContainer = document.getElementById('category-filter-pills');
  const foodCardsGrid = document.getElementById('food-cards-grid');

  // Modal Detail DOM
  const modalDetail = document.getElementById('modal-food-detail');
  const btnCloseDetail = document.getElementById('btn-close-detail');
  const btnCancelDetail = document.getElementById('btn-cancel-detail');
  const btnEatFromModal = document.getElementById('btn-eat-from-modal');
  const modalFoodIcon = document.getElementById('modal-food-icon');
  const modalFoodName = document.getElementById('modal-food-name');
  const modalFoodPortion = document.getElementById('modal-food-portion');
  const modalMacroCal = document.getElementById('modal-macro-cal');
  const modalMacroProtein = document.getElementById('modal-macro-protein');
  const modalMacroFiber = document.getElementById('modal-macro-fiber');
  const modalGoodDesc = document.getElementById('modal-good-desc');
  const modalVitaminsTags = document.getElementById('modal-vitamins-tags');
  const modalBadDesc = document.getElementById('modal-bad-desc');
  const modalTagSugar = document.getElementById('modal-tag-sugar');
  const modalTagSatFat = document.getElementById('modal-tag-satfat');
  const modalTagSodium = document.getElementById('modal-tag-sodium');

  // Modal Custom Food DOM
  const modalCustom = document.getElementById('modal-custom-food');
  const btnOpenCustomModal = document.getElementById('btn-open-custom-modal');
  const btnCloseCustom = document.getElementById('btn-close-custom');
  const btnCancelCustom = document.getElementById('btn-cancel-custom');
  const formCustomFood = document.getElementById('form-custom-food');

  // Toast DOM
  const toastContainer = document.getElementById('toast-container');

  // ==================== INITIALIZATION ====================
  function init() {
    renderCurrentDate();
    loadStoredData();
    combineFoodDatabase();
    setupEventListeners();
    setMobileTab('catalog');
    renderCatalog();
    renderDiary();
  }

  function renderCurrentDate() {
    const now = new Date();
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    if (currentDateText) {
      currentDateText.textContent = now.toLocaleDateString('id-ID', options);
    }
  }

  function loadStoredData() {
    try {
      const savedCustom = localStorage.getItem(STORAGE_KEY_CUSTOM);
      if (savedCustom) {
        customFoods = JSON.parse(savedCustom);
      }
    } catch (e) {
      console.error('Gagal memuat custom foods', e);
      customFoods = [];
    }

    try {
      const savedDiary = localStorage.getItem(STORAGE_KEY_DIARY);
      if (savedDiary) {
        diary = JSON.parse(savedDiary);
      }
    } catch (e) {
      console.error('Gagal memuat diary', e);
      diary = [];
    }
  }

  function saveDiary() {
    try {
      localStorage.setItem(STORAGE_KEY_DIARY, JSON.stringify(diary));
    } catch (e) {
      console.error('Gagal menyimpan diary', e);
    }
  }

  function saveCustomFoods() {
    try {
      localStorage.setItem(STORAGE_KEY_CUSTOM, JSON.stringify(customFoods));
    } catch (e) {
      console.error('Gagal menyimpan custom foods', e);
    }
  }

  function combineFoodDatabase() {
    const defaultList = (typeof DEFAULT_FOODS !== 'undefined') ? DEFAULT_FOODS : [];
    allFoods = [...defaultList, ...customFoods];
  }

  function getFoodById(id) {
    return allFoods.find(item => item.id === id);
  }

  // ==================== MOBILE NAVIGATION ====================
  function setMobileTab(tabName) {
    activeMobileTab = tabName;
    if (mainContentLayout) {
      mainContentLayout.setAttribute('data-active-tab', tabName);
    }

    if (mobileTabSwitcher) {
      mobileTabSwitcher.querySelectorAll('.mobile-tab-btn').forEach(btn => {
        if (btn.getAttribute('data-tab') === tabName) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    }

    // Toggle mobile floating bar
    updateMobileFloatingBar();

    // Scroll to top smoothly when changing tabs on mobile
    if (window.innerWidth <= 960) {
      window.scrollTo({ top: 180, behavior: 'smooth' });
    }
  }

  function updateMobileFloatingBar() {
    if (!mobileFloatingBar) return;
    const totalItems = diary.reduce((acc, item) => acc + item.qty, 0);

    if (window.innerWidth <= 960 && activeMobileTab === 'catalog' && totalItems > 0) {
      mobileFloatingBar.classList.add('show');
    } else {
      mobileFloatingBar.classList.remove('show');
    }
  }

  // ==================== INTERACTIVE FEEDBACK (+1 PARTICLE) ====================
  function triggerPlusOneEffect(x, y) {
    const particle = document.createElement('div');
    particle.className = 'plus-one-particle';
    particle.textContent = '+1 Dipilih! 🥗';
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    document.body.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 700);
  }

  // ==================== TOAST NOTIFICATION ====================
  function showToast(message, icon = '✅') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${icon}</span> <span>${escapeHtml(message)}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.25s ease';
      setTimeout(() => toast.remove(), 250);
    }, 2200);
  }

  function escapeHtml(text) {
    if (!text) return '';
    return text.toString()
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // ==================== KATALOG MAKANAN ====================
  function renderCatalog() {
    const query = searchQuery.toLowerCase().trim();

    const filtered = allFoods.filter(food => {
      // 1. Filter kategori
      const matchesCategory = (activeCategory === 'all') || (food.kategori === activeCategory);

      // 2. Quick Filter Tags
      let matchesQuick = true;
      if (activeQuickFilter === 'low-cal') {
        matchesQuick = food.kalori < 100;
      } else if (activeQuickFilter === 'high-protein') {
        matchesQuick = food.giziBaik && food.giziBaik.protein >= 10;
      } else if (activeQuickFilter === 'high-fiber') {
        matchesQuick = food.giziBaik && food.giziBaik.serat >= 3;
      }

      // 3. Filter pencarian (Nama, Kategori, Khasiat, Vitamin)
      let matchesSearch = true;
      if (query) {
        const inName = food.nama.toLowerCase().includes(query);
        const inKhasiat = food.giziBaik && food.giziBaik.khasiat && food.giziBaik.khasiat.toLowerCase().includes(query);
        const inVitamins = food.giziBaik && food.giziBaik.vitamin && food.giziBaik.vitamin.some(v => v.toLowerCase().includes(query));
        const inCat = food.kategori.toLowerCase().includes(query);
        matchesSearch = inName || inKhasiat || inVitamins || inCat;
      }

      return matchesCategory && matchesQuick && matchesSearch;
    });

    foodCardsGrid.innerHTML = '';

    if (filtered.length === 0) {
      foodCardsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px 16px; color: var(--text-muted); background: #ffffff; border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
          <div style="font-size: 38px; margin-bottom: 8px;">🔍</div>
          <h3 style="font-size: 15px; color: var(--text-main); margin-bottom: 4px;">Makanan tidak ditemukan</h3>
          <p style="font-size: 12px;">Coba kata kunci lain atau gunakan tombol <strong>"+ Tambah Makanan"</strong>.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(food => {
      const card = document.createElement('div');
      card.className = 'food-card';
      card.setAttribute('data-id', food.id);

      const benefitSnippet = (food.giziBaik && food.giziBaik.khasiat) 
        ? food.giziBaik.khasiat 
        : 'Makanan bernutrisi untuk konsumsi harian.';

      card.innerHTML = `
        <div>
          <div class="food-card-top">
            <div class="food-avatar">${food.icon || '🍽️'}</div>
            <div class="food-meta">
              <h3 class="food-title">${escapeHtml(food.nama)}</h3>
              <p class="food-portion">${escapeHtml(food.porsi)}</p>
              <div class="food-cal-badge">🔥 ${food.kalori} kkal</div>
            </div>
          </div>
          <p class="food-benefit-snippet" title="${escapeHtml(benefitSnippet)}">
            🌿 <strong>Khasiat:</strong> ${escapeHtml(benefitSnippet)}
          </p>
        </div>
        <div class="food-card-actions">
          <button type="button" class="btn-detail" data-id="${food.id}">Lihat Gizi</button>
          <button type="button" class="btn-eat" data-id="${food.id}">+ Makan</button>
        </div>
      `;

      // Tap anywhere on card to view detail, except when clicking "+ Makan"
      card.addEventListener('click', (e) => {
        if (e.target.closest('.btn-eat')) return;
        openDetailModal(food.id);
      });

      // Click "+ Makan" button with coordinate particle feedback
      const btnEat = card.querySelector('.btn-eat');
      btnEat.addEventListener('click', (e) => {
        e.stopPropagation();
        const rect = btnEat.getBoundingClientRect();
        triggerPlusOneEffect(rect.left + rect.width / 2, rect.top);
        addToDiary(food.id);
      });

      foodCardsGrid.appendChild(card);
    });
  }

  // ==================== LOG HARIAN (DIARY) ====================
  function addToDiary(foodId) {
    const food = getFoodById(foodId);
    if (!food) return;

    const existingIndex = diary.findIndex(item => item.id === foodId);
    if (existingIndex > -1) {
      diary[existingIndex].qty += 1;
    } else {
      diary.push({ id: foodId, qty: 1 });
    }

    saveDiary();
    renderDiary();
    showToast(`"${food.nama}" ditambahkan ke catatan!`, food.icon || '✅');
  }

  function changePortion(foodId, delta) {
    const index = diary.findIndex(item => item.id === foodId);
    if (index === -1) return;

    diary[index].qty += delta;
    if (diary[index].qty <= 0) {
      removeFromDiary(foodId);
      return;
    }

    saveDiary();
    renderDiary();
  }

  function removeFromDiary(foodId) {
    const food = getFoodById(foodId);
    diary = diary.filter(item => item.id !== foodId);
    saveDiary();
    renderDiary();
    if (food) {
      showToast(`"${food.nama}" dihapus dari catatan.`, '🗑️');
    }
  }

  function renderDiary() {
    diaryContainer.innerHTML = '';
    const totalItemsCount = diary.reduce((acc, item) => acc + item.qty, 0);
    diaryItemCount.textContent = `${totalItemsCount} item`;

    // Update Mobile Badge
    if (mobileDiaryBadge) {
      mobileDiaryBadge.textContent = totalItemsCount;
    }

    if (diary.length === 0) {
      diaryContainer.innerHTML = `
        <div class="empty-diary">
          <span class="empty-diary-icon">🍽️</span>
          <p>Belum ada makanan yang dicatat hari ini.<br>Pilih dari katalog di sebelah kanan lalu klik <strong>"+ Makan"</strong>!</p>
        </div>
      `;
      updateSummaryTotals();
      updateMobileFloatingBar();
      return;
    }

    diary.forEach(entry => {
      const food = getFoodById(entry.id);
      if (!food) return;

      const itemTotalCal = food.kalori * entry.qty;

      const itemEl = document.createElement('div');
      itemEl.className = 'diary-item';
      itemEl.innerHTML = `
        <div class="diary-item-left">
          <div class="diary-icon">${food.icon || '🍴'}</div>
          <div class="diary-info">
            <h4 class="diary-name" title="${escapeHtml(food.nama)}">${escapeHtml(food.nama)}</h4>
            <div class="diary-cal">
              <span><strong>${itemTotalCal}</strong> kkal</span>
              <span>• (${food.kalori} kkal/porsi)</span>
            </div>
          </div>
        </div>
        <div class="portion-control">
          <button type="button" class="btn-portion btn-decrease" data-id="${food.id}" title="Kurangi porsi">-</button>
          <span class="portion-qty">${entry.qty}</span>
          <button type="button" class="btn-portion btn-increase" data-id="${food.id}" title="Tambah porsi">+</button>
          <button type="button" class="btn-delete-item" data-id="${food.id}" title="Hapus dari daftar">✕</button>
        </div>
      `;

      diaryContainer.appendChild(itemEl);
    });

    // Event listeners porsi
    diaryContainer.querySelectorAll('.btn-decrease').forEach(btn => {
      btn.addEventListener('click', () => changePortion(btn.getAttribute('data-id'), -1));
    });

    diaryContainer.querySelectorAll('.btn-increase').forEach(btn => {
      btn.addEventListener('click', () => changePortion(btn.getAttribute('data-id'), 1));
    });

    diaryContainer.querySelectorAll('.btn-delete-item').forEach(btn => {
      btn.addEventListener('click', () => removeFromDiary(btn.getAttribute('data-id')));
    });

    updateSummaryTotals();
    updateMobileFloatingBar();
  }

  // ==================== KALKULATOR TOTAL & INSIGHT ====================
  function updateSummaryTotals() {
    let calTotal = 0;
    let proteinTotal = 0;
    let fiberTotal = 0;
    let sugarTotal = 0;
    let satFatTotal = 0;
    let sodiumTotal = 0;
    let healthyFoodNames = [];
    let cautionFoodsCount = 0;
    const totalItems = diary.reduce((acc, item) => acc + item.qty, 0);

    diary.forEach(entry => {
      const food = getFoodById(entry.id);
      if (!food) return;

      const qty = entry.qty;
      calTotal += (food.kalori || 0) * qty;

      if (food.giziBaik) {
        proteinTotal += (food.giziBaik.protein || 0) * qty;
        fiberTotal += (food.giziBaik.serat || 0) * qty;
      }

      if (food.giziJelek) {
        sugarTotal += (food.giziJelek.gula || 0) * qty;
        satFatTotal += (food.giziJelek.lemakJenuh || 0) * qty;
        sodiumTotal += (food.giziJelek.natrium || 0) * qty;
      }

      if (food.status === 'sangat-sehat' || food.kategori === 'buah' || food.kategori === 'sayur') {
        if (!healthyFoodNames.includes(food.nama)) {
          healthyFoodNames.push(food.nama);
        }
      }

      if (food.status === 'perhatian' || (food.giziJelek && food.giziJelek.lemakJenuh >= 5)) {
        cautionFoodsCount += qty;
      }
    });

    // Update UI Stats
    elTotalCalories.textContent = calTotal;
    elTotalProtein.textContent = proteinTotal.toFixed(1);
    elTotalFiber.textContent = fiberTotal.toFixed(1);
    elTotalBenefitsCount.textContent = `${healthyFoodNames.length} Makanan Sehat`;

    elTotalSugar.textContent = sugarTotal.toFixed(1);
    elTotalSatFat.textContent = satFatTotal.toFixed(1);
    elTotalSodium.textContent = Math.round(sodiumTotal);

    // Floating bar values
    if (floatingTotalCal) floatingTotalCal.textContent = calTotal;
    if (floatingItemSub) floatingItemSub.textContent = `${totalItems} item dicatat`;

    // Progress Bar Kalori
    const TARGET_CALORIE = 2000;
    const percentage = Math.round((calTotal / TARGET_CALORIE) * 100);
    const barWidth = Math.min(percentage, 100);
    elCalorieProgressBar.style.width = `${barWidth}%`;
    elCaloriePercentText.textContent = `${percentage}% dari anjuran (2000 kkal)`;

    if (calTotal > TARGET_CALORIE) {
      elCalorieProgressBar.classList.add('over-limit');
      elCalorieStatusBadge.textContent = 'Melebihi Batas';
      elCalorieStatusBadge.className = 'nutrient-tag rose';
    } else if (calTotal >= 1500) {
      elCalorieProgressBar.classList.remove('over-limit');
      elCalorieStatusBadge.textContent = 'Ideal Seimbang';
      elCalorieStatusBadge.className = 'nutrient-tag green';
    } else {
      elCalorieProgressBar.classList.remove('over-limit');
      elCalorieStatusBadge.textContent = 'Dalam Batas';
      elCalorieStatusBadge.className = 'nutrient-tag amber';
    }

    // Status Zat Perhatian
    let badWarnings = [];
    if (sugarTotal > 50) badWarnings.push('Gula tinggi (>50g)');
    if (satFatTotal > 17) badWarnings.push('Lemak jenuh tinggi (>17g)');
    if (sodiumTotal > 2000) badWarnings.push('Natrium tinggi (>2000mg)');

    if (badWarnings.length > 0) {
      elBadNutrientsWarning.innerHTML = `⚠️ <strong style="color: var(--bad-rose);">${badWarnings.join(', ')}</strong>`;
    } else if (cautionFoodsCount > 0) {
      elBadNutrientsWarning.innerHTML = `⚠️ Ada ${cautionFoodsCount} porsi gorengan/makanan manis dicatat.`;
    } else {
      elBadNutrientsWarning.innerHTML = `✅ <span style="color: var(--good-green-text);">Kadar gula & lemak masih dalam batas aman.</span>`;
    }

    // Insight
    generateHealthInsight(calTotal, proteinTotal, fiberTotal, sugarTotal, satFatTotal, healthyFoodNames);
  }

  function generateHealthInsight(cal, protein, fiber, sugar, satFat, healthyFoods) {
    if (diary.length === 0) {
      elHealthInsightMessage.textContent = 'Pilih makanan dari katalog di sebelah kanan untuk mencatat apa yang Anda makan hari ini!';
      return;
    }

    let insights = [];

    if (healthyFoods.length > 0) {
      insights.push(`Hebat! Anda mengonsumsi khasiat alami dari <strong>${healthyFoods.slice(0, 3).join(', ')}</strong>.`);
    }

    if (fiber >= 20) {
      insights.push(`Asupan serat Anda sangat tinggi (<strong>${fiber.toFixed(1)}g</strong>), ini sangat menyehatkan organ cerna dan jantung.`);
    } else if (fiber < 8 && cal > 600) {
      insights.push(`Asupan serat masih kurang (<strong>${fiber.toFixed(1)}g</strong>). Coba tambahkan buah seperti apel atau sayur hijau.`);
    }

    if (protein >= 45) {
      insights.push(`Asupan protein sangat baik (<strong>${protein.toFixed(1)}g</strong>) untuk menjaga massa otot dan rasa kenyang.`);
    }

    if (satFat > 17) {
      insights.push(`Perhatian: Lemak jenuh sudah mencapai <strong>${satFat.toFixed(1)}g</strong>. Kurangi gorengan atau santan kental hari ini.`);
    }

    if (sugar > 45) {
      insights.push(`Asupan gula mendekati batas harian (<strong>${sugar.toFixed(1)}g</strong>). Utamakan air putih dingin daripada minuman manis.`);
    }

    if (cal > 2100) {
      insights.push(`Total kalori telah melebihi anjuran standar 2000 kkal. Luangkan waktu jalan kaki 20-30 menit untuk pembakaran energi.`);
    } else if (cal >= 1500 && cal <= 2000) {
      insights.push(`Pola asupan kalori hari ini berada di rentang yang sangat seimbang.`);
    }

    if (insights.length === 0) {
      elHealthInsightMessage.innerHTML = 'Asupan hari ini tercatat dengan baik. Jaga hidrasi dengan minum 8 gelas air putih!';
    } else {
      elHealthInsightMessage.innerHTML = insights.join(' ');
    }
  }

  // ==================== MODAL DETAIL KHASIAT ====================
  function openDetailModal(foodId) {
    const food = getFoodById(foodId);
    if (!food) return;

    selectedFoodForModal = food;

    modalFoodIcon.textContent = food.icon || '🍽️';
    modalFoodName.textContent = food.nama;
    modalFoodPortion.textContent = `Ukuran porsi: ${food.porsi}`;

    modalMacroCal.textContent = food.kalori;
    modalMacroProtein.textContent = `${food.giziBaik ? food.giziBaik.protein : 0}g`;
    modalMacroFiber.textContent = `${food.giziBaik ? food.giziBaik.serat : 0}g`;

    modalGoodDesc.textContent = (food.giziBaik && food.giziBaik.khasiat) 
      ? food.giziBaik.khasiat 
      : 'Kandungan nutrisi alami yang baik untuk menunjang aktivitas tubuh.';

    // Tags vitamin
    modalVitaminsTags.innerHTML = '';
    if (food.giziBaik && food.giziBaik.vitamin && food.giziBaik.vitamin.length > 0) {
      food.giziBaik.vitamin.forEach(vit => {
        const span = document.createElement('span');
        span.className = 'nutrient-tag green';
        span.textContent = `✨ ${vit}`;
        modalVitaminsTags.appendChild(span);
      });
    }

    // Zat Perhatian
    const satFatVal = (food.giziJelek && food.giziJelek.lemakJenuh) ? food.giziJelek.lemakJenuh : 0;
    const sugarVal = (food.giziJelek && food.giziJelek.gula) ? food.giziJelek.gula : 0;
    const sodiumVal = (food.giziJelek && food.giziJelek.natrium) ? food.giziJelek.natrium : 0;

    modalTagSatFat.textContent = `Lemak Jenuh: ${satFatVal}g`;
    modalTagSugar.textContent = `Gula: ${sugarVal}g`;
    modalTagSodium.textContent = `Natrium: ${sodiumVal}mg`;

    modalBadDesc.textContent = (food.giziJelek && food.giziJelek.catatan)
      ? food.giziJelek.catatan
      : 'Konsumsi dalam porsi seimbang sesuai kebutuhan energi harian.';

    modalDetail.classList.add('open');
  }

  function closeDetailModal() {
    modalDetail.classList.remove('open');
    selectedFoodForModal = null;
  }

  // ==================== MODAL TAMBAH MAKANAN KUSTOM ====================
  function openCustomModal() {
    formCustomFood.reset();
    modalCustom.classList.add('open');
  }

  function closeCustomModal() {
    modalCustom.classList.remove('open');
  }

  function handleAddCustomFood(e) {
    e.preventDefault();

    const nama = document.getElementById('custom-nama').value.trim();
    const kategori = document.getElementById('custom-kategori').value;
    const porsi = document.getElementById('custom-porsi').value.trim() || '1 porsi';
    const kalori = parseInt(document.getElementById('custom-kalori').value, 10) || 0;
    const protein = parseFloat(document.getElementById('custom-protein').value) || 0;
    const serat = parseFloat(document.getElementById('custom-serat').value) || 0;
    const khasiat = document.getElementById('custom-khasiat').value.trim();
    const gula = parseFloat(document.getElementById('custom-gula').value) || 0;
    const lemakJenuh = parseFloat(document.getElementById('custom-lemakjenuh').value) || 0;
    const catatan = document.getElementById('custom-catatan').value.trim() || 'Dibuat oleh pengguna.';

    if (!nama || !khasiat) {
      alert('Mohon isi nama makanan dan khasiat kesehatannya.');
      return;
    }

    const iconMap = {
      buah: '🍏',
      sayur: '🥦',
      lauk: '🍗',
      pokok: '🍚',
      camilan: '🍟',
      minuman: '🥤'
    };

    const newFood = {
      id: 'custom_' + Date.now(),
      nama: nama,
      kategori: kategori,
      icon: iconMap[kategori] || '🍽️',
      porsi: porsi,
      kalori: kalori,
      giziBaik: {
        protein: protein,
        serat: serat,
        vitamin: ['Nutrisi Alami'],
        khasiat: khasiat
      },
      giziJelek: {
        lemakJenuh: lemakJenuh,
        gula: gula,
        natrium: 10,
        catatan: catatan
      },
      status: 'sehat'
    };

    customFoods.push(newFood);
    saveCustomFoods();
    combineFoodDatabase();
    renderCatalog();
    closeCustomModal();

    showToast(`"${nama}" berhasil disimpan ke katalog!`, newFood.icon);
  }

  // ==================== EVENT LISTENERS ====================
  function setupEventListeners() {
    // Mobile View Tab Switcher
    if (mobileTabSwitcher) {
      mobileTabSwitcher.querySelectorAll('.mobile-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const targetTab = btn.getAttribute('data-tab');
          setMobileTab(targetTab);
        });
      });
    }

    // Floating Button: "Lihat Catatan 📋"
    if (btnFloatingViewDiary) {
      btnFloatingViewDiary.addEventListener('click', () => {
        setMobileTab('diary');
      });
    }

    // Quick Filter Tags
    if (quickFilterTags) {
      quickFilterTags.querySelectorAll('.quick-tag-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const filterType = btn.getAttribute('data-filter');
          if (activeQuickFilter === filterType) {
            // Toggle off
            activeQuickFilter = null;
            btn.classList.remove('active');
          } else {
            quickFilterTags.querySelectorAll('.quick-tag-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeQuickFilter = filterType;
          }
          renderCatalog();
        });
      });
    }

    // Search input real-time
    foodSearchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderCatalog();
    });

    // Filter Kategori Pills
    categoryPillsContainer.querySelectorAll('.pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        categoryPillsContainer.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeCategory = btn.getAttribute('data-category');
        renderCatalog();
      });
    });

    // Reset Hari Ini
    btnResetDiary.addEventListener('click', () => {
      if (diary.length === 0) {
        showToast('Catatan harian masih kosong.', 'ℹ️');
        return;
      }
      if (confirm('Apakah Anda yakin ingin mereset catatan makanan hari ini?')) {
        diary = [];
        saveDiary();
        renderDiary();
        showToast('Catatan hari ini berhasil direset!', '🔄');
      }
    });

    // Window Resize listener for floating bar visibility
    window.addEventListener('resize', () => {
      updateMobileFloatingBar();
    });

    // Modal Detail triggers
    btnCloseDetail.addEventListener('click', closeDetailModal);
    btnCancelDetail.addEventListener('click', closeDetailModal);
    modalDetail.addEventListener('click', (e) => {
      if (e.target === modalDetail) closeDetailModal();
    });

    btnEatFromModal.addEventListener('click', (e) => {
      if (selectedFoodForModal) {
        const rect = btnEatFromModal.getBoundingClientRect();
        triggerPlusOneEffect(rect.left + rect.width / 2, rect.top);
        addToDiary(selectedFoodForModal.id);
        closeDetailModal();
      }
    });

    // Modal Custom Food triggers
    btnOpenCustomModal.addEventListener('click', openCustomModal);
    btnCloseCustom.addEventListener('click', closeCustomModal);
    btnCancelCustom.addEventListener('click', closeCustomModal);
    modalCustom.addEventListener('click', (e) => {
      if (e.target === modalCustom) closeCustomModal();
    });

    formCustomFood.addEventListener('submit', handleAddCustomFood);

    // Escape key closes modals
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeDetailModal();
        closeCustomModal();
      }
    });
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
