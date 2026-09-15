# Gizipedia - Aplikasi Web Cek Gizi & Pelacak Makanan Harian

Aplikasi web modern, simpel, dan responsif untuk mengecek kandungan gizi dan khasiat makanan (seperti buah apel, sayuran, lauk, dll.), serta mencatat pola makan harian dengan kalkulator otomatis:
- **Total Kalori Harian** (dengan indikator batas rekomendasi 2000 kkal).
- **Gizi Baik**: Akumulasi Protein, Serat, dan ragam buah & makanan sehat berkhasiat.
- **Zat yang Perlu Dibatasi ("Jelek" / Perhatian)**: Gula, Lemak Jenuh, dan Garam/Natrium lengkap dengan peringatan otomatis jika melebihi anjuran Kemenkes RI.
- **Saran & Evaluasi Sehat Pintar**: Analisis otomatis pola makan harian Anda.

---

## 🚀 Cara Membuka & Menjalankan Aplikasi

Aplikasi ini dibuat murni menggunakan **HTML5, CSS3, dan JavaScript** tanpa framework rumit, sehingga sangat ringan dan fleksibel untuk dijalankan:

### Opsi 1: Langsung Buka di Browser (Paling Mudah)
1. Buka folder: `c:\xampp\htdocs\TUGAS GERALD KALKULATOR\`
2. Klik ganda pada file `index.html`.
3. Aplikasi langsung terbuka dan siap digunakan di browser favorit Anda (Google Chrome, Edge, Firefox, dll.).

### Opsi 2: Menggunakan XAMPP Apache
1. Buka aplikasi **XAMPP Control Panel**.
2. Klik tombol **Start** pada modul **Apache**.
3. Buka browser dan ketik alamat:
   ```
   http://localhost/TUGAS GERALD KALKULATOR/
   ```

---

## ✨ Fitur-Fitur Utama

1. **Katalog & Database Makanan Indonesia Lengkap (`data.js`)**:
   - Puluhan makanan sehari-hari terbagi dalam kategori:
     - 🍎 **Buah-buahan** (Apel, Pisang, Alpukat, Pepaya, Jeruk, Jambu Biji, Semangka, Mangga, Buah Naga, Nanas, dll.).
     - 🥦 **Sayuran** (Sayur Bening Bayam, Brokoli Kukus, Wortel, Tumis Kangkung, Sayur Asem, Gado-Gado).
     - 🍗 **Lauk & Protein** (Telur Rebus, Dada Ayam, Tempe Bacem/Goreng, Tahu, Ikan Kembung Bakar, Rendang Sapi, dll.).
     - 🍚 **Makanan Pokok** (Nasi Putih, Nasi Merah, Kentang Rebus, Oatmeal, Roti Gandum, Mie Instan, Nasi Goreng, Bakso).
     - 🍟 **Camilan & Fast Food** (Gorengan Bakwan, Pisang Goreng, Martabak Manis, Keripik Kentang, Donat).
     - 🥤 **Minuman** (Air Kelapa Muda, Kopi Hitam, Es Kopi Susu Gula Aren, Boba Milk Tea, Es Teh Manis, Susu Murni).
2. **Pencarian Cepat & Filter Pintar**:
   - Ketik nama makanan (misal: `apel`, `mie`) atau **khasiatnya** (misal: ketik `kolesterol`, `vitamin c`, `pencernaan`, `jantung`), maka makanan yang berkhasiat untuk hal tersebut akan langsung muncul!
3. **Detail Khasiat & Gizi (Tombol "Lihat Gizi")**:
   - Popup interaktif menampilkan makronutrisi, khasiat medis lengkap, daftar vitamin/antioksidan, serta zat yang perlu diwaspadai.
4. **Log Konsumsi Harian (Tombol "+ Makan")**:
   - Sekali klik, makanan langsung masuk ke daftar konsumsi hari ini.
   - Tersedia tombol `+` dan `-` untuk mengatur jumlah porsi yang dimakan, serta tombol `✕` untuk menghapus.
5. **Kalkulator Nutrisi Otomatis**:
   - Menghitung kalori, protein, serat, gula, lemak jenuh, dan natrium secara instan saat porsi bertambah atau berkurang.
6. **Tambah Makanan Sendiri**:
   - Pengguna bisa memasukkan makanan kustom lengkap dengan kalori dan khasiatnya, langsung tersimpan di browser.
7. **Penyimpanan Otomatis (LocalStorage)**:
   - Data harian tersimpan aman di browser dan tidak hilang saat halaman di-refresh.
   - Tombol **"Reset Hari Ini"** untuk mengulang catatan di hari baru.

---

## 📂 Struktur File
```
c:\xampp\htdocs\TUGAS GERALD KALKULATOR\
├── index.html   # Tampilan antarmuka utama (semantik, SEO-friendly)
├── style.css    # Desain modern, responsive UI, glassmorphism & cards
├── data.js      # Database gizi & khasiat terverifikasi Kemenkes/USDA
├── app.js       # Logika kalkulator, filter pencarian, dan LocalStorage
└── README.md    # Panduan penggunaan
```
