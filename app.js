/**
 * Gizipedia — App Logic (Human-Crafted Editorial Experience)
 * Fitur: Pustaka Pangan, Khasiat Gizi, Log Konsumsi Harian, Keseimbangan Gizi & Kalori
 */

(function () {
  'use strict';

  // ==================== STATE MANAGEMENT ====================
  const STORAGE_KEY_DIARY = 'gizipedia_diary_items';
  const STORAGE_KEY_CUSTOM = 'gizipedia_custom_foods';

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

  // Overview / Metrics DOM
  const elTotalCalories = document.getElementById('total-calories');
  const elCalorieRemainingText = document.getElementById('calorie-remaining-text');
  const elCalorieProgressBar = document.getElementById('calorie-progress-bar');
  const elCaloriePercentText = document.getElementById('calorie-percent-text');
  const elCalorieStatusBadge = document.getElementById('calorie-status-badge');

  const elTotalProtein = document.getElementById('total-protein');
  const elTotalFiber = document.getElementById('total-fiber');
  const elBarProtein = document.getElementById('bar-protein');
  const elBarFiber = document.getElementById('bar-fiber');
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

  // Diary Stream DOM
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

  // Toast Stack DOM
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
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
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
      customFoods = [];
    }

    try {
      const savedDiary = localStorage.getItem(STORAGE_KEY_DIARY);
      if (savedDiary) {
        diary = JSON.parse(savedDiary);
      }
    } catch (e) {
      diary = [];
    }
  }

  function saveDiary() {
    try {
      localStorage.setItem(STORAGE_KEY_DIARY, JSON.stringify(diary));
    } catch (e) {}
  }

  function saveCustomFoods() {
    try {
      localStorage.setItem(STORAGE_KEY_CUSTOM, JSON.stringify(customFoods));
    } catch (e) {}
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
      mobileTabSwitcher.querySelectorAll('.segmented-btn').forEach(btn => {
        if (btn.getAttribute('data-tab') === tabName) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    }

    updateMobileFloatingBar();
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

  // ==================== TOAST NOTIFICATION ====================
  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-pill';
    toast.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      <span>${escapeHtml(message)}</span>
    `;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.2s ease';
      setTimeout(() => toast.remove(), 200);
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

  // ==================== KATALOG PANGAN ====================
  function renderCatalog() {
    const query = searchQuery.toLowerCase().trim();

    const filtered = allFoods.filter(food => {
      // 1. Kategori
      const matchesCategory = (activeCategory === 'all') || (food.kategori === activeCategory);

      // 2. Quick Filter
      let matchesQuick = true;
      if (activeQuickFilter === 'low-cal') {
        matchesQuick = food.kalori < 100;
      } else if (activeQuickFilter === 'high-protein') {
        matchesQuick = food.giziBaik && food.giziBaik.protein >= 10;
      } else if (activeQuickFilter === 'high-fiber') {
        matchesQuick = food.giziBaik && food.giziBaik.serat >= 3;
      }

      // 3. Search query
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
        <div style="grid-column: 1 / -1; text-align: center; padding: 48px 16px; color: var(--ink-muted); background: #ffffff; border-radius: var(--radius-md); border: 1px solid var(--line-hairline);">
          <h3 style="font-size: 15px; color: var(--ink-primary); margin-bottom: 4px; font-weight: 700;">Pangan tidak ditemukan</h3>
          <p style="font-size: 12px; color: var(--ink-secondary);">Coba kata kunci lain atau gunakan tombol <strong>"Entri Mandiri"</strong>.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(food => {
      const card = document.createElement('div');
      card.className = 'catalogue-card';
      card.setAttribute('data-id', food.id);

      const benefitSnippet = (food.giziBaik && food.giziBaik.khasiat) 
        ? food.giziBaik.khasiat 
        : 'Pangan bernutrisi untuk pemenuhan gizi seimbang harian.';

      card.innerHTML = `
        <div>
          <div class="card-top">
            <div class="card-glyph">${food.icon || '🍽️'}</div>
            <div class="card-headings">
              <h3 class="card-name">${escapeHtml(food.nama)}</h3>
              <p class="card-serv">${escapeHtml(food.porsi)}</p>
              <span class="cal-pill">${food.kalori} kkal</span>
            </div>
          </div>
          <p class="khasiat-summary" title="${escapeHtml(benefitSnippet)}">
            ${escapeHtml(benefitSnippet)}
          </p>
        </div>
        <div class="card-actions">
          <button type="button" class="btn-inspect" data-id="${food.id}">Detail Gizi</button>
          <button type="button" class="btn-commit" data-id="${food.id}">+ Catat</button>
        </div>
      `;

      // Tap card body to open details
      card.addEventListener('click', (e) => {
        if (e.target.closest('.btn-commit')) return;
        openDetailModal(food.id);
      });

      // Tap "+ Catat"
      const btnCommit = card.querySelector('.btn-commit');
      btnCommit.addEventListener('click', (e) => {
        e.stopPropagation();
        addToDiary(food.id);
      });

      foodCardsGrid.appendChild(card);
    });
  }

  // ==================== LOG KONSUMSI (DIARY) ====================
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
    showToast(`${food.nama} dicatat`);
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
      showToast(`${food.nama} dihapus`);
    }
  }

  function renderDiary() {
    diaryContainer.innerHTML = '';
    const totalItemsCount = diary.reduce((acc, item) => acc + item.qty, 0);
    diaryItemCount.textContent = `${totalItemsCount} item`;

    if (mobileDiaryBadge) {
      mobileDiaryBadge.textContent = totalItemsCount;
    }

    if (diary.length === 0) {
      diaryContainer.innerHTML = `
        <div class="empty-state">
          <svg class="empty-mark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 6v6l4 2"/>
          </svg>
          <p>Belum ada konsumsi yang dicatat hari ini.<br>Pilih pangan di katalog lalu klik <strong>"+ Catat"</strong>.</p>
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

      const rowEl = document.createElement('div');
      rowEl.className = 'stream-row';
      rowEl.innerHTML = `
        <div class="row-left">
          <div class="row-icon-box">${food.icon || '🍽️'}</div>
          <div class="row-text">
            <h4 class="row-name" title="${escapeHtml(food.nama)}">${escapeHtml(food.nama)}</h4>
            <div class="row-sub">
              <span><strong>${itemTotalCal}</strong> kkal</span>
              <span>• (${food.kalori} kkal/porsi)</span>
            </div>
          </div>
        </div>
        <div class="stepper-cluster">
          <button type="button" class="step-btn btn-decrease" data-id="${food.id}" title="Kurangi">-</button>
          <span class="step-count">${entry.qty}</span>
          <button type="button" class="step-btn btn-increase" data-id="${food.id}" title="Tambah">+</button>
          <button type="button" class="del-btn" data-id="${food.id}" title="Hapus">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      `;

      diaryContainer.appendChild(rowEl);
    });

    diaryContainer.querySelectorAll('.btn-decrease').forEach(btn => {
      btn.addEventListener('click', () => changePortion(btn.getAttribute('data-id'), -1));
    });

    diaryContainer.querySelectorAll('.btn-increase').forEach(btn => {
      btn.addEventListener('click', () => changePortion(btn.getAttribute('data-id'), 1));
    });

    diaryContainer.querySelectorAll('.del-btn').forEach(btn => {
      btn.addEventListener('click', () => removeFromDiary(btn.getAttribute('data-id')));
    });

    updateSummaryTotals();
    updateMobileFloatingBar();
  }

  // ==================== KALKULATOR TOTAL & CLINICAL NOTE ====================
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

    // Overview Numbers
    elTotalCalories.textContent = calTotal.toLocaleString('id-ID');
    elTotalProtein.textContent = proteinTotal.toFixed(1);
    elTotalFiber.textContent = fiberTotal.toFixed(1);
    elTotalBenefitsCount.textContent = `${healthyFoodNames.length} pangan sehat`;

    // Mini Bars (Target: Protein 60g, Serat 30g)
    if (elBarProtein) elBarProtein.style.width = `${Math.min(Math.round((proteinTotal / 60) * 100), 100)}%`;
    if (elBarFiber) elBarFiber.style.width = `${Math.min(Math.round((fiberTotal / 30) * 100), 100)}%`;

    elTotalSugar.textContent = `${sugarTotal.toFixed(1)}g`;
    elTotalSatFat.textContent = `${satFatTotal.toFixed(1)}g`;
    elTotalSodium.textContent = `${Math.round(sodiumTotal)}mg`;

    // Floating bar values
    if (floatingTotalCal) floatingTotalCal.textContent = calTotal.toLocaleString('id-ID');
    if (floatingItemSub) floatingItemSub.textContent = `${totalItems} item tercatat`;

    // Progress Bar Kalori (Standar 2000 kkal)
    const TARGET_CALORIE = 2000;
    const remaining = TARGET_CALORIE - calTotal;
    const percentage = Math.round((calTotal / TARGET_CALORIE) * 100);
    const barWidth = Math.min(percentage, 100);
    elCalorieProgressBar.style.width = `${barWidth}%`;
    elCaloriePercentText.textContent = `${percentage}% dari batas anjuran harian`;

    if (remaining > 0) {
      elCalorieRemainingText.textContent = `Tersisa ${remaining.toLocaleString('id-ID')} kkal`;
      elCalorieRemainingText.style.color = 'var(--forest-800)';
    } else if (remaining === 0) {
      elCalorieRemainingText.textContent = 'Mencapai target tepat 2.000 kkal';
      elCalorieRemainingText.style.color = 'var(--forest-800)';
    } else {
      elCalorieRemainingText.textContent = `Lebih ${Math.abs(remaining).toLocaleString('id-ID')} kkal`;
      elCalorieRemainingText.style.color = 'var(--status-rose-text)';
    }

    if (calTotal > TARGET_CALORIE) {
      elCalorieProgressBar.classList.add('over-limit');
      elCalorieStatusBadge.textContent = 'Batas Terlampaui';
      elCalorieStatusBadge.className = 'badge-status over';
    } else {
      elCalorieProgressBar.classList.remove('over-limit');
      elCalorieStatusBadge.textContent = 'Ideal Terkendali';
      elCalorieStatusBadge.className = 'badge-status in-limit';
    }

    // Status Zat Perhatian
    let badWarnings = [];
    if (sugarTotal > 50) badWarnings.push('Gula >50g');
    if (satFatTotal > 17) badWarnings.push('Lemak Jenuh >17g');
    if (sodiumTotal > 2000) badWarnings.push('Natrium >2000mg');

    if (badWarnings.length > 0) {
      elBadNutrientsWarning.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9f1239" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        <span style="color: #9f1239;">Perhatian: ${badWarnings.join(', ')} melebihi anjuran harian.</span>
      `;
    } else if (cautionFoodsCount > 0) {
      elBadNutrientsWarning.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <span>${cautionFoodsCount} porsi gorengan/makanan manis perlu diimbangi hidrasi.</span>
      `;
    } else {
      elBadNutrientsWarning.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#15803d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        <span style="color: #15803d;">Kadar gula & lemak terkendali dengan baik.</span>
      `;
    }

    generateHealthInsight(calTotal, proteinTotal, fiberTotal, sugarTotal, satFatTotal, healthyFoodNames);
  }

  function generateHealthInsight(cal, protein, fiber, sugar, satFat, healthyFoods) {
    if (diary.length === 0) {
      elHealthInsightMessage.textContent = 'Belum ada makanan yang dicatat hari ini. Telusuri pustaka di bawah untuk melihat khasiat pangan dan mencatat konsumsi Anda.';
      return;
    }

    let notes = [];

    if (healthyFoods.length > 0) {
      notes.push(`Asupan fitonutrisi hari ini ditunjang oleh konsumsi <strong>${healthyFoods.slice(0, 3).join(', ')}</strong>.`);
    }

    if (fiber >= 20) {
      notes.push(`Kandungan serat mencukupi (<strong>${fiber.toFixed(1)}g</strong>), mendukung mikrobioma usus dan metabolisme glukosa.`);
    } else if (fiber < 8 && cal > 500) {
      notes.push(`Asupan serat masih di bawah target (<strong>${fiber.toFixed(1)}g</strong>). Disarankan menambah buah utuh seperti apel atau sayuran berserat.`);
    }

    if (protein >= 45) {
      notes.push(`Kebutuhan protein terpenuhi baik (<strong>${protein.toFixed(1)}g</strong>) untuk perbaikan jaringan sel.`);
    }

    if (satFat > 17) {
      notes.push(`Perhatian: Lemak jenuh telah mencapai <strong>${satFat.toFixed(1)}g</strong>, batasi makanan bersantan pekat atau gorengan.`);
    }

    if (sugar > 45) {
      notes.push(`Kadar gula mendekati batas kritis (<strong>${sugar.toFixed(1)}g</strong>). Utamakan konsumsi air mineral.`);
    }

    if (cal > 2100) {
      notes.push(`Kelebihan kalori terdeteksi. Imbangi dengan aktivitas aerobik 20-30 menit.`);
    }

    if (notes.length === 0) {
      elHealthInsightMessage.innerHTML = 'Pola konsumsi harian tercatat dalam batas proporsional. Pertahankan asupan cairan minimal 2 liter per hari.';
    } else {
      elHealthInsightMessage.innerHTML = notes.join(' ');
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
      : 'Nutrisi pangan esensial untuk pemeliharaan metabolisme tubuh.';

    modalVitaminsTags.innerHTML = '';
    if (food.giziBaik && food.giziBaik.vitamin && food.giziBaik.vitamin.length > 0) {
      food.giziBaik.vitamin.forEach(vit => {
        const chip = document.createElement('span');
        chip.className = 'vit-chip';
        chip.textContent = vit;
        modalVitaminsTags.appendChild(chip);
      });
    }

    const satFatVal = (food.giziJelek && food.giziJelek.lemakJenuh) ? food.giziJelek.lemakJenuh : 0;
    const sugarVal = (food.giziJelek && food.giziJelek.gula) ? food.giziJelek.gula : 0;
    const sodiumVal = (food.giziJelek && food.giziJelek.natrium) ? food.giziJelek.natrium : 0;

    modalTagSatFat.textContent = `Lemak Jenuh: ${satFatVal}g`;
    modalTagSugar.textContent = `Gula: ${sugarVal}g`;
    modalTagSodium.textContent = `Natrium: ${sodiumVal}mg`;

    modalBadDesc.textContent = (food.giziJelek && food.giziJelek.catatan)
      ? food.giziJelek.catatan
      : 'Konsumsi dalam porsi wajar dan seimbang.';

    modalDetail.classList.add('open');
  }

  function closeDetailModal() {
    modalDetail.classList.remove('open');
    selectedFoodForModal = null;
  }

  // ==================== MODAL ENTRI MANDIRI ====================
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
    const catatan = document.getElementById('custom-catatan').value.trim() || 'Entri mandiri pengguna.';

    if (!nama || !khasiat) {
      alert('Mohon isi nama makanan dan uraian khasiat.');
      return;
    }

    const iconMap = {
      buah: '🍏',
      sayur: '🥦',
      lauk: '🍗',
      pokok: '🍚',
      camilan: '🥪',
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

    showToast(`${nama} ditambahkan ke pustaka`);
  }

  // ==================== EVENT LISTENERS ====================
  function setupEventListeners() {
    if (mobileTabSwitcher) {
      mobileTabSwitcher.querySelectorAll('.segmented-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const targetTab = btn.getAttribute('data-tab');
          setMobileTab(targetTab);
        });
      });
    }

    if (btnFloatingViewDiary) {
      btnFloatingViewDiary.addEventListener('click', () => {
        setMobileTab('diary');
      });
    }

    if (quickFilterTags) {
      quickFilterTags.querySelectorAll('.sub-chip').forEach(btn => {
        btn.addEventListener('click', () => {
          const filterType = btn.getAttribute('data-filter');
          if (activeQuickFilter === filterType) {
            activeQuickFilter = null;
            btn.classList.remove('active');
          } else {
            quickFilterTags.querySelectorAll('.sub-chip').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeQuickFilter = filterType;
          }
          renderCatalog();
        });
      });
    }

    foodSearchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderCatalog();
    });

    categoryPillsContainer.querySelectorAll('.category-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        categoryPillsContainer.querySelectorAll('.category-chip').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeCategory = btn.getAttribute('data-category');
        renderCatalog();
      });
    });

    btnResetDiary.addEventListener('click', () => {
      if (diary.length === 0) {
        showToast('Catatan konsumsi masih kosong');
        return;
      }
      if (confirm('Mulai catatan baru untuk hari ini? Data konsumsi hari ini akan dibersihkan.')) {
        diary = [];
        saveDiary();
        renderDiary();
        showToast('Catatan hari ini telah direset');
      }
    });

    window.addEventListener('resize', () => {
      updateMobileFloatingBar();
    });

    btnCloseDetail.addEventListener('click', closeDetailModal);
    btnCancelDetail.addEventListener('click', closeDetailModal);
    modalDetail.addEventListener('click', (e) => {
      if (e.target === modalDetail) closeDetailModal();
    });

    btnEatFromModal.addEventListener('click', () => {
      if (selectedFoodForModal) {
        addToDiary(selectedFoodForModal.id);
        closeDetailModal();
      }
    });

    btnOpenCustomModal.addEventListener('click', openCustomModal);
    btnCloseCustom.addEventListener('click', closeCustomModal);
    btnCancelCustom.addEventListener('click', closeCustomModal);
    modalCustom.addEventListener('click', (e) => {
      if (e.target === modalCustom) closeCustomModal();
    });

    formCustomFood.addEventListener('submit', handleAddCustomFood);

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeDetailModal();
        closeCustomModal();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
