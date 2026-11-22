# DESAIN.md — Mini OS Simulator

Dokumen ini menjadi acuan UI/UX Mini OS Simulator berdasarkan `FITUR.md`. Aplikasi dibuat dengan HTML, CSS, dan Vanilla JavaScript. Arah visual diperbarui menjadi **Retro Desktop System Lab (terinspirasi dari Stitch)**: nuansa workstation GUI vintage edisi akademik, wallpaper berpola polka-dot retro dusty pink (`#E8A9B8`), bingkai jendela (*window frame*) retro dengan bilah judul berwarna tematik dan 3 titik kontrol jendela, sistem navigasi ganda (Top Sticky Header + Floating Bottom Dock), tipografi *dual-monospace* (**Space Mono** & **JetBrains Mono**), serta ikon lokal **Material Symbols Outlined**. Keterbacaan materi dan ketepatan visualisasi algoritma tetap menjadi prioritas utama.

---

## 1. Arah visual

Karakter desain:
- **Retro Desktop System Lab, bukan sekadar replika.** Mengusung estetika antarmuka sistem operasi klasik/vintage: kanvas krem bertekstur, wallpaper polka-dot retro, border tegas `#453B47`, dan bingkai jendela retro lengkap dengan titlebar dan footer status.
- **Tetap terasa seperti laboratorium belajar yang presisi.** Konten teknis, tabel parameter, input proses, diagram antrean, timeline Gantt Chart, dan matriks frame memori disusun rapi dan memiliki kontras tinggi sehingga mudah dianalisis.
- **Palet Warna Hangat & Pastel Retro.** Menggunakan dusty pink (`#E8A9B8`) sebagai wallpaper desktop, krem gading (`#FFF9EC`) sebagai kanvas jendela, beige hangat (`#F5EEDC`) untuk panel kontrol, serta warna pastel tematik untuk membedakan tiap modul:
  - Lavender (`#C9B8E8`) untuk Modul Materi.
  - Mint / Sage (`#B9D9C4`) untuk Penjadwalan CPU.
  - Peach / Coral (`#F1C49D`) untuk Manajemen Memori.
  - Sky Blue (`#AFCDE0`) untuk Benchmark Komparatif.
- **Bentuk Grafis Tegas & Hard Shadow.** Menggunakan bayangan keras (*hard retro drop shadow* tanpa blur: `1px 1px 0px #453B47`, `2px 2px 0px #453B47`, dan `6px 6px 0px #453B47`), radius sudut tajam (`2px` – `12px`), tombol timbul dengan efek tekan (*active press transform* `translate(1px, 1px)`), dan input berbayangan inset.
- **Sistem Navigasi Ganda yang Fleksibel.** Pengguna dapat berpindah halaman melalui navigasi teks di Top Header maupun bilah dock mengambang (*floating pill dock*) di bagian bawah layar.
- **Visualisasi Konseptual Edukatif.** Diagram siklus hidup CPU, diagram alur frame memori, Gantt Chart dengan sumbu waktu mendetail, dan matriks frame memori dengan penanda status Hit/Fault yang jelas.

---

## 2. Palet warna

| Token CSS | Hex / Value | Fungsi & Penempatan |
|---|---|---|
| `--color-bg` | `#E8A9B8` | Wallpaper desktop retro dengan pola titik radial ganda |
| `--color-surface` / `--color-surface-main` | `#FFF9EC` | Latar utama kanvas dan bodi jendela retro |
| `--color-surface-panel` | `#F5EEDC` | Latar panel kontrol form, toolbar stepper, dan kartu metrik |
| `--color-surface-alt` | `#f3ede1` | Latar selang-seling / kontainer sekunder |
| `--color-surface-high` | `#ede8db` | Latar bilah status footer jendela |
| `--color-surface-highest` | `#e8e2d5` | Header tabel data dan blok idle Gantt Chart |
| `--color-text` / `--color-ink-text` | `#302A35` | Teks utama warna ungu-arang pekat (*deep charcoal/eggplant*) |
| `--color-text-muted` / `--color-ink-muted` | `#6D6570` | Teks sekunder, label hint, dan keterangan waktu |
| `--color-border` / `--color-border-dark` | `#453B47` | Garis tepi (*border*) utama, garis pembatas, dan bayangan retro |
| `--color-border-light` | `#dac0c5` | Garis tepi sekunder/halus |
| `--color-primary` | `#892b4e` | Tombol utama, tab aktif materi, dan warna identitas sistem (*deep berry*) |
| `--color-primary-container` | `#a74366` | Aksen tombol aktif navigasi dan dock item aktif |
| `--color-on-primary` | `#ffffff` | Teks di atas warna primary |
| `--color-on-primary-container` | `#ffdbe3` | Teks kontras di atas primary container |
| `--color-secondary` | `#8f485f` | Warna aksen sekunder / grafik TAT |
| `--color-secondary-container` | `#fda5bf` | Sorotan seleksi teks dan aksen interaktif |
| `--color-success` | `#32765B` | Page Hit, status SIMULATOR SIAP, dan metrik terbaik |
| `--color-success-soft` | `rgba(50, 118, 91, 0.15)` | Latar sel Page Hit dan status sukses |
| `--color-warning` | `#A75B24` | Status peringatan, kuantum Round Robin, dan Page Fault sekunder |
| `--color-warning-soft` | `rgba(167, 91, 36, 0.15)` | Latar slot frame yang baru diperbarui |
| `--color-danger` | `#A43D46` | Page Fault, pesan validasi error, dan tombol dot merah jendela |
| `--color-danger-soft` | `rgba(164, 61, 70, 0.15)` | Latar pesan error dan sel status fault |
| `--color-titlebar-materi` | `#C9B8E8` | Aksen bilah judul jendela Modul Materi (lavender) |
| `--color-titlebar-cpu` | `#B9D9C4` | Aksen bilah judul jendela Penjadwalan CPU (sage/mint) |
| `--color-titlebar-memory` | `#F1C49D` | Aksen bilah judul jendela Manajemen Memori (peach) |
| `--color-titlebar-compare` | `#AFCDE0` | Aksen bilah judul jendela Benchmark Komparatif (sky blue) |

Aturan Penggunaan Warna:
1. Border `#453B47` selalu digunakan untuk mempertegas batas antarkomponen dengan ketebalan 1px atau 2px agar memberi nuansa retro-komputer.
2. Setiap modul memiliki warna titlebar unik yang konsisten antara header jendela dan ikon dock di bagian bawah.
3. Page Hit selalu menggunakan hijau (`#32765B`) dan Page Fault menggunakan merah/crimson (`#A43D46`); status wajib dituliskan secara eksplisit dalam teks (`HIT` / `FAULT`), bukan warna semata.
4. Gantt Chart menggunakan palet proses retro yang kontras dan harmonis (Deep Berry, Forest Green, Amber, Mauve, Dark Eggplant, Slate Blue, Plum, Sage Green) dengan pembatas `#453B47`.
5. Waktu *Idle* pada CPU memakai latar abu-krem netral (`#e8e2d5`) dengan pola garis silang (*crosshatch*).

---

## 3. Tipografi

Sistem tipografi menggunakan kombinasi **Space Mono** dan **JetBrains Mono** yang dimuat secara **100% lokal** di folder `assets/fonts/`, ditambah font ikon **Material Symbols Outlined** di `assets/iconts/`.

Pemuatan font lokal di `css/style.css`:
```css
@font-face {
  font-family: 'Space Mono';
  src: url('../assets/fonts/SpaceMono-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Space Mono';
  src: url('../assets/fonts/SpaceMono-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'JetBrains Mono';
  src: url('../assets/fonts/JetBrainsMono.woff2') format('woff2');
  font-weight: 100 800;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Material Symbols Outlined';
  src: url('../assets/iconts/MaterialSymbolsOutlined.woff2') format('woff2');
  font-weight: 100 700;
  font-style: normal;
  font-display: swap;
}
```

Hierarki Tipografi:

| Peran | Font Family | Bobot / Ukuran | Penggunaan |
|---|---|---|---|
| Judul Hero | Space Mono | 700 / 26–32 px | Judul halaman materi dan simulator |
| Judul Jendela (*Window Title*) | Space Mono | 700 / 12–14 px | Bilah atas jendela (*uppercase*, tracking lebar) |
| Judul Bagian / Panel | Space Mono | 700 / 15–18 px | Judul panel dan artikel materi |
| Label & Badge Retro | Space Mono | 700 / 10–12 px | Badge status, tombol filter, tag modul |
| Tombol (*Button Text*) | Space Mono | 700 / 11–13 px | Teks tombol aksi (`.btn`), tab topik, dan tab perbandingan |
| Angka Metrik Besar | Space Mono | 700 / 24–36 px | Angka statistik ringkasan WT, TAT, Hit, dan Fault |
| Isi Teks / Narasi (*Body*) | JetBrains Mono | 400 / 13–15 px | Paragraf materi, deskripsi alur, dan catatan edukatif |
| Data Tabular & Input | JetBrains Mono | 500 / 12–14 px | Sel tabel, form input, dan penanda waktu Gantt Chart |
| Ikon Visual | Material Symbols | 400 / 16–22 px | Ikon navigasi, aksi simulator, jam, dan profil |

---

## 4. Tata letak (*Layout*)

Aplikasi menggunakan tata letak bergaya **Retro Desktop**:
1. **Top Header Bar (Fixed, Tinggi 48 px):**
   * Sisi Kiri: Tombol mobile toggle, logo brand (`assets/iconts/Logo.png`), judul `MINI OS / SYSTEM LAB`, subjudul `EDISI AKADEMIK v1.0`, dan badge hijau `SIMULATOR SIAP`.
   * Tengah: Tautan navigasi desktop (`MODUL TEORI`, `PENJADWALAN CPU`, `MANAJEMEN MEMORI`, `BENCHMARK KOMPARATIF`).
   * Sisi Kanan: Jam digital live (*real-time clock*) dan ikon avatar profil.
2. **Area Konten Utama (`<main class="content-wrapper">`):**
   * Terpusat di tengah layar dengan lebar maksimal 1360 px.
   * Padding atas 64 px (memberi ruang bagi Top Header) dan padding bawah 100 px (memberi ruang bagi Floating Dock).
   * Setiap modul dibungkus dalam **Retro Desktop Window Frame**.
3. **Floating Bottom Dock (Fixed, Mengambang di Bawah):**
   * Kapsul horizontal mengambang (*pill dock*) berlatar putih-krem dengan border `2px solid #453B47` dan bayangan tebal.
   * Berisi 4 item navigasi dengan kotak ikon pastel dan label ganda (Materi, CPU, Memori, Bandingkan).
4. **Mobile Navigation Drawer:**
   * Laci menu vertikal yang muncul dari bawah header saat tombol hamburger ditekan di layar kecil (<1024 px).

Wireframe Tata Letak Desktop:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ [Logo] MINI OS / SYSTEM LAB  [● SIAP]    MODUL TEORI  CPU  MEMORI  BANDINGKAN   [10:42 AM] [👤] │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   ┌── [● ● ●] PUSAT MATERI OS — KONSEP & ALGORITMA ─────────── [MODUL #01] ─┐   │
│   │                                                                         │   │
│   │   [ MATERI DASAR ]                                                      │   │
│   │   Pahami Konsepnya. Lalu Coba Simulasinya.                              │   │
│   │   [01 CPU Scheduling]  [02 Page Replacement]                            │   │
│   │                                                                         │   │
│   │   ┌─────────────────────────────────────────────────────────────────┐   │   │
│   │   │ Konten materi, diagram antrean, kartu metrik, dan CTA simulasi  │   │   │
│   │   └─────────────────────────────────────────────────────────────────┘   │   │
│   │                                                                         │   │
│   ├── [● MODUL TEORI SIAP] ─────────────────────────── [EDISI AKADEMIK v1.0]┤   │
│   └─────────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│          ┌───────────────────────────────────────────────────────┐          │
│          │ [📖 Materi]   [🔲 CPU]   [🖥️ Memori]   [📊 Bandingkan] │          │
│          └───────────────────────────────────────────────────────┘          │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Komponen bersama

### Bingkai Jendela Retro (*Retro Window Frame*)
* Seluruh section utama dibungkus elemen `.retro-window` dengan border `2px solid #453B47` dan bayangan `6px 6px 0px #453B47`.
* Memiliki bilah judul (*window titlebar*) setinggi 44 px dengan 3 lingkaran dot (merah, kuning, hijau), judul uppercase, dan tag status lingkungan (*environment badge*).
* Memiliki bilah status footer di bagian bawah setinggi 36 px berlatar `#ede8db`.

### Panel Konten
* Menggunakan kelas `.panel` dengan latar `#F5EEDC`, border `1px solid #453B47`, radius `8px`, dan bayangan `3px 3px 0px #453B47`.
* Judul panel menggunakan Space Mono bold dengan garis pembatas tipis di bawahnya.

### Tombol (*Buttons*)
* Memiliki sudut retro tegas (`radius 4px`), border `1px solid #453B47`, bayangan `2px 2px 0px #453B47`, dan teks Space Mono bold.
* Efek interaksi: saat di-hover bergeser `(-1px, -1px)` dengan bayangan membesar `3px 3px 0px #453B47`; saat diklik/aktif menekan ke dalam `(1px, 1px)` dengan bayangan mengecil `1px 1px 0px #453B47`.
* Varian:
  * **Primary**: Latar `#892b4e`, teks putih.
  * **Secondary**: Latar `#FFF9EC`, teks `#302A35`.
  * **Table Action**: Tanpa bayangan default, muncul latar lembut saat di-hover.

### Form Input & Dropdown
* Menggunakan font monospace *JetBrains Mono* untuk teks nilai.
* Tinggi 40 px dengan bayangan inset tipis `shadow-inset-input`.
* Status fokus menghasilkan outline berry lembut dan border warna primary.

### Tabel Data
* Menggunakan kelas `.data-table` dengan header berlatar `#e8e2d5` dan font Space Mono uppercase.
* Garis tabel tipis berwarna `#453B47` dengan baris hover berlatar krem lembut.
* Format angka ditampilkan presisi dengan desimal yang konsisten.

---

## 6. Rancangan halaman

### Halaman 1 — Modul Teori (Materi)
* **Titlebar Jendela:** Warna `#C9B8E8` (Lavender), judul `PUSAT MATERI OS — KONSEP & ALGORITMA`.
* **Hero Banner:** Berlatar `#F5EEDC` dengan badge `MATERI DASAR` dan aksen lingkaran radial.
* **Topik Pembelajaran:** Tab selektor interaktif antara Topik 01 (CPU Scheduling) dan Topik 02 (Page Replacement).
* **Diagram Alur Visual:**
  * Diagram antrean CPU: Blok Antrean Siap ➔ Dispatcher CPU ➔ Status Akhir.
  * Diagram memori virtual: Deretan pill reference string ➔ Tumpukan slot frame fisik RAM dengan penanda Page Hit/Fault.
* **Kartu Definisi Metrik:** Grid kartu berbingkai `#453B47` yang menjelaskan singkatan (FCFS, SJF, RR, CT, TAT, WT, RT, FIFO, LRU, OPT) beserta rumus perhitungannya.
* **Kotak Ajakan Simulasi (*CTA Box*):** Menghubungkan langsung pembelajar ke simulator terkait via fungsi `navigateToModule()`.

### Halaman 2 — Penjadwalan CPU
* **Titlebar Jendela:** Warna `#B9D9C4` (Sage/Mint), judul `SIMULASI CPU — PENJADWALAN PROSES`.
* **Panel Data Proses:**
  * Form input Process ID, Arrival Time (AT), dan Burst Time (BT).
  * Tombol aksi "Gunakan Contoh Data" dan "Kosongkan".
  * Tabel antrean proses dengan tombol hapus/edit.
* **Panel Pengaturan Algoritma:** Dropdown pilihan FCFS, SJF Non-Preemptive, dan Round Robin (input Time Quantum otomatis muncul khusus mode RR).
* **Hasil Simulasi & Gantt Chart:**
  * Bilah kontrol bertahap (*stepper toolbar*): Mulai, Jeda, Lanjutkan, Sebelumnya, Berikutnya, Reset.
  * Kotak penjelasan naratif langkah demi langkah (*step explanation box*).
  * Gantt Chart eksekusi CPU dengan blok warna proses retro dan penanda waktu di sumbu horizontal.
  * Kartu angka metrik besar untuk Rata-rata Waiting Time dan Turnaround Time.
  * Tabel metrik komprehensif per proses (AT, BT, CT, TAT, WT, RT) beserta baris rata-rata.

### Halaman 3 — Page Replacement (Memori)
* **Titlebar Jendela:** Warna `#F1C49D` (Peach), judul `SIMULASI MEMORI — PAGE REPLACEMENT`.
* **Panel Parameter Memori:** Input Reference String (dipisahkan koma), kapasitas jumlah frame fisik (1–10 slot), dan pilihan algoritma (FIFO, LRU, Optimal).
* **Hasil Simulasi & Matriks Frame:**
  * Toolbar kontrol langkah bertahap (*stepper*).
  * Kartu metrik ringkasan: Total Page Fault, Page Hit, Hit Ratio (%), dan Fault Ratio (%).
  * Matriks perubahan isi frame memori: Baris referensi atas, baris frame 1..N, baris status HIT/FAULT, dan baris halaman korban (*victim page*), dengan kolom pertama terkunci (*sticky*).
  * Kolom langkah aktif disorot dengan cincin warna primary.

### Halaman 4 — Benchmark Komparatif (Perbandingan)
* **Titlebar Jendela:** Warna `#AFCDE0` (Sky Blue), judul `PERBANDINGAN ALGORITMA — EVALUASI KINERJA OS`.
* **Tab Komparasi:** Tab pilihan antara komparasi CPU Scheduling dan komparasi Page Replacement.
* **Card Data Uji Bersama:** Menampilkan dataset input aktif yang sedang diuji secara deterministik ke seluruh algoritma, dengan opsi sinkronisasi langsung dari simulator.
* **Tabel Perbandingan & Mini-Bar Tracks:** Menampilkan hasil metrik seluruh algoritma berdampingan dengan batang progres mini (*mini-bar*) per metrik. Sel dengan performa terbaik diberi penanda khusus `.cell-best`.
* **Kotak Analisis Otomatis:** Memberikan evaluasi algoritmik objektif mengenai keunggulan dan trade-off tiap metode.

---

## 7. Responsivitas

* **Desktop (≥1024 px):** Top header menampilkan navigasi teks lengkap, jendela retro tampil maksimal dengan lebar hingga 1360 px, form berjajar rapi dalam grid.
* **Tablet (768–1023 px):** Menu teks header disederhanakan, pengguna dipandu menggunakan Floating Bottom Dock, form menyesuaikan kolom.
* **Ponsel (<768 px):**
  * Tombol menu mobile toggle di header mengaktifkan laci navigasi (*drawer*).
  * Gantt Chart dan Matriks Frame memori dapat digulir horizontal (*overflow-x auto*) secara independen tanpa merusak layout layar.
  * Teks dock disederhanakan hanya menampilkan ikon dan judul ringkas.

---

## 8. Checklist desain

- [x] Nuansa Retro Desktop System Lab konsisten di seluruh halaman.
- [x] Menggunakan wallpaper pola polka-dot ganda (`#E8A9B8`).
- [x] Seluruh section dibungkus bingkai jendela retro dengan bilah judul berwarna tematik.
- [x] Sistem navigasi ganda berfungsi sinkron: Top Header, Floating Bottom Dock, dan Mobile Drawer.
- [x] Font teks (**Space Mono** & **JetBrains Mono**) dan font ikon (**Material Symbols Outlined**) tersimpan secara lokal dan berfungsi 100% offline.
- [x] Tidak ada ketergantungan link eksternal (CDN/Google Fonts).
- [x] Jam digital header atas berjalan waktu nyata (*real-time*).
- [x] Kontrol bertahap (*stepper*), Gantt Chart, dan Matriks Frame memori berjalan interaktif dan tepat secara algoritmik.
- [x] Seluruh fungsionalitas dan ID elemen JavaScript dipertahankan tanpa ada fitur yang rusak.
- [x] Tidak ada penambahan file atau folder yang tidak perlu.
