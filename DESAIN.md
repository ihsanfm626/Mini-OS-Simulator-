# DESAIN.md — Mini OS Simulator

Dokumen ini menjadi acuan UI/UX Mini OS Simulator berdasarkan `FITUR.md`. Aplikasi dibuat dengan HTML, CSS, dan Vanilla JavaScript. Arah desainnya adalah **Practical Learning Lab**: terasa seperti laboratorium praktikum digital yang rapi, tenang, mudah dipahami, dan berfokus pada visualisasi algoritma. Bukan dashboard penuh dekorasi.

## 1. Arah visual

Karakter:
- Terstruktur dan mudah dipindai.
- Teknis, tetapi ramah untuk mahasiswa yang sedang belajar.
- Warna digunakan untuk menandai status dan fokus, bukan sebagai hiasan.
- Interaksi konsisten dan setiap tombol memiliki fungsi yang jelas.
- Visualisasi algoritma menjadi pusat perhatian.

Hindari gradien mencolok, glassmorphism, glow, bayangan tebal, animasi berlebihan, emoji sebagai ikon, terlalu banyak kartu bulat, statistik dekoratif, dan teks pemasaran berlebihan. Tampilan yang matang berasal dari hierarki informasi dan konsistensi, bukan dari banyak efek.

## 2. Palet warna

Gunakan latar terang, biru tinta sebagai warna struktural, teal sebagai aksen utama, dan hijau/oranye untuk status simulasi.

| Token CSS | Hex | Fungsi |
|---|---|---|
| `--color-bg` | `#F5F7FA` | Latar utama |
| `--color-surface` | `#FFFFFF` | Panel dan tabel |
| `--color-sidebar` | `#172B3A` | Sidebar |
| `--color-sidebar-hover` | `#223D50` | Hover menu |
| `--color-text` | `#172B3A` | Teks utama |
| `--color-text-muted` | `#64748B` | Teks sekunder |
| `--color-border` | `#E2E8F0` | Border dan garis tabel |
| `--color-primary` | `#167D8D` | Tombol utama, tautan aktif |
| `--color-primary-hover` | `#116775` | Hover tombol utama |
| `--color-primary-soft` | `#E5F4F5` | Pilihan aktif berlatar lembut |
| `--color-success` | `#247A55` | Page Hit dan status berhasil |
| `--color-success-soft` | `#E8F5EE` | Latar status berhasil |
| `--color-warning` | `#B96A20` | Page Fault dan peringatan |
| `--color-warning-soft` | `#FFF3E5` | Latar status peringatan |
| `--color-danger` | `#B54747` | Error validasi/tindakan berisiko |
| `--color-danger-soft` | `#FCECEC` | Latar pesan error |
| `--color-info` | `#4169A1` | Informasi netral |

Aturan:
1. Latar halaman memakai `--color-bg`, panel memakai putih.
2. Sidebar berwarna biru tinta; menu aktif memakai latar lebih terang dan penanda teal di sisi kiri.
3. Tombol utama memakai teal; tombol sekunder putih dengan border.
4. Page Hit memakai hijau dan Page Fault memakai oranye. Selalu tampilkan teks “Hit” atau “Fault”, jangan hanya mengandalkan warna.
5. Merah khusus untuk error, bukan Page Fault.
6. Warna setiap proses pada Gantt Chart harus konsisten antar-render dan disertai label Process ID.
7. Jangan mewarnai semua panel dengan warna aksen.

## 3. Tipografi

Gunakan font sistem agar aplikasi ringan dan tidak bergantung pada layanan eksternal.

```css
font-family: Inter, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
```

| Elemen | Ukuran | Bobot |
|---|---:|---|
| Judul halaman | 28–32 px | 650–700 |
| Judul bagian | 18–20 px | 600–650 |
| Judul panel | 15–17 px | 600 |
| Isi | 14–16 px | 400 |
| Label form/tabel | 13–14 px | 500–600 |
| Keterangan | 12–13 px | 400 |
| Angka metrik utama | 24–30 px | 650–700 |

Gunakan kapitalisasi kalimat biasa. Batasi bold untuk judul, label penting, dan angka kunci. Pastikan kontras teks cukup tinggi.

## 4. Tata letak

### Desktop
- Sidebar kiri sekitar 228 px.
- Header konten sekitar 72 px.
- Padding konten 28–32 px.
- Jarak antarbagiannya sekitar 24 px.
- Padding panel 18–24 px.
- Jarak antarkolom form 14–16 px.
- Lebar konten fleksibel, maksimum sekitar 1440 px.

```text
┌──────────────────┬───────────────────────────────────────────────┐
│ MINI OS SIMULATOR│ Breadcrumb / nama halaman                     │
│                  ├───────────────────────────────────────────────┤
│ Ikhtisar         │ Judul halaman                                 │
│ CPU Scheduling   │ Deskripsi singkat                             │
│ Page Replacement │                                               │
│ Perbandingan     │ Konten utama                                  │
│                  │                                               │
│ Tentang          │                                               │
└──────────────────┴───────────────────────────────────────────────┘
```

Tidak perlu foto profil atau menu akun karena aplikasi tidak memiliki login. Area kanan atas bisa berisi label sederhana seperti “Mode pembelajaran”.

### Tablet dan ponsel
- Sidebar dipersempit atau diubah menjadi navigasi ringkas.
- Form menjadi satu kolom pada layar sempit.
- Tabel, Gantt Chart, dan frame memori boleh scroll horizontal di area masing-masing.
- Jangan mengecilkan teks berlebihan hanya agar semua kolom muat.
- Tombol aksi utama harus tetap mudah ditemukan.

## 5. Komponen bersama

### Sidebar
Menu: Ikhtisar, CPU Scheduling, Page Replacement, Perbandingan. Item menu setinggi 42–46 px, ikon garis sederhana 18–20 px, dan penanda aktif yang jelas. Hindari banyak sub-menu.

### Header halaman
Setiap halaman menampilkan nama modul, judul, dan deskripsi satu kalimat. Hindari header tinggi yang membuat konten utama harus digulir terlalu jauh.

### Panel
- Putih dengan border `1px solid var(--color-border)`.
- Radius 10–12 px.
- Bayangan tidak wajib; jika digunakan, sangat lembut.
- Hindari panel bertumpuk tanpa alasan.

### Tombol

| Jenis | Tampilan | Contoh |
|---|---|---|
| Primary | Teal solid, teks putih | Jalankan simulasi, Tambah proses |
| Secondary | Putih, border abu-abu | Reset, Kembali |
| Tertiary | Tanpa latar, teks warna utama | Edit, Lihat detail |

Tinggi tombol sekitar 40 px. Gunakan kata kerja yang jelas. Tombol nonaktif harus terlihat nonaktif. Tombol hapus tidak perlu merah mencolok sebelum diarahkan atau dikonfirmasi.

### Input
- Label berada di atas input.
- Placeholder hanya contoh, bukan pengganti label.
- Tinggi sekitar 42 px.
- Fokus memakai border teal dan focus ring tipis.
- Pesan validasi diletakkan dekat input yang bermasalah.
- Jangan hanya menampilkan border merah tanpa penjelasan.

### Tabel
- Header berlatar `#F8FAFC`.
- Garis horizontal tipis, padding sel 12–14 px.
- Angka disejajarkan konsisten.
- Hindari garis vertikal berlebihan.
- Gunakan status dengan teks jelas.
- Keadaan kosong harus memberi petunjuk tindakan selanjutnya.

### Status dan pesan
- Berhasil: hijau lembut.
- Peringatan: oranye lembut.
- Error: merah lembut.
- Informasi: biru lembut.

Contoh pesan:
- “Burst Time harus lebih besar dari 0.”
- “Tambahkan minimal satu proses sebelum menjalankan simulasi.”
- “Simulasi selesai. Periksa tabel metrik di bawah.”
- “Time Quantum diperlukan untuk Round Robin.”

### Ikon
Gunakan satu gaya ikon garis secara konsisten. Jika tidak memakai pustaka ikon, gunakan SVG lokal sederhana. Jangan mencampur ikon outline, ikon solid, emoji, dan ilustrasi dengan gaya berbeda.

## 6. Rancangan halaman

## Halaman 1 — Ikhtisar (Dashboard)

**Tujuan:** memperkenalkan aplikasi dan membantu pengguna memilih modul.

Urutan konten:
1. Judul: **“Belajar cara kerja algoritma OS.”**
2. Deskripsi: “Simulasikan penjadwalan CPU dan penggantian halaman memori, langkah demi langkah.”
3. Dua panel modul: CPU Scheduling dan Page Replacement.
4. Daftar ringkas algoritma yang tersedia.
5. Tombol “Buka modul” pada masing-masing panel.

Wireframe:

```text
┌───────────────────────────────────────────────────────────────────┐
│ Ikhtisar                                                           │
│ Belajar cara kerja algoritma OS.                                   │
│ Simulasikan mekanisme OS, satu langkah pada satu waktu.            │
├─────────────────────────────────┬─────────────────────────────────┤
│ CPU Scheduling                  │ Page Replacement                │
│ FCFS · SJF · Round Robin        │ FIFO · LRU · Optimal            │
│                                 │                                 │
│ Pelajari bagaimana proses       │ Lihat bagaimana halaman         │
│ mendapat giliran CPU.           │ diganti saat frame terbatas.    │
│ [Buka modul →]                  │ [Buka modul →]                  │
└─────────────────────────────────┴─────────────────────────────────┘
```

Gunakan ikon kecil yang relevan, bukan gambar stok besar. Jangan menambahkan statistik historis seperti “total simulasi” kecuali aplikasi benar-benar menyimpan data tersebut.

## Halaman 2 — CPU Scheduling

**Tujuan:** memasukkan proses, memilih algoritma, menjalankan simulasi, dan membaca hasil.

Urutan:
1. Header halaman.
2. Panel Data Proses.
3. Panel Pengaturan Simulasi.
4. Gantt Chart.
5. Tabel metrik per proses.
6. Ringkasan dan penjelasan algoritma.

Wireframe:

```text
┌───────────────────────────────────────────────────────────────────┐
│ CPU Scheduling                                                     │
│ Bandingkan cara FCFS, SJF, dan Round Robin mengatur giliran CPU.  │
├───────────────────────────────────────────────────────────────────┤
│ DATA PROSES                                                        │
│ Process ID     Arrival Time     Burst Time                         │
│ [P1         ]  [0            ]  [5          ] [Tambah proses]      │
│ ID             Arrival Time     Burst Time          Aksi            │
│ P1             0                5                   Edit  Hapus     │
├───────────────────────────────────────────────────────────────────┤
│ PENGATURAN SIMULASI                                                │
│ Algoritma [Round Robin ▼]       Time Quantum [2]                   │
│                                  [Reset] [Jalankan simulasi]       │
├───────────────────────────────────────────────────────────────────┤
│ GANTT CHART                                                        │
│ 0       2       4       6       8       10                         │
│ ├── P1 ──┼── P2 ──┼── P1 ──┼── P2 ──┼── P1 ──┤                   │
├───────────────────────────────────────────────────────────────────┤
│ METRIK PROSES                                                      │
│ Process       CT       TAT       WT       RT                       │
│ P1            ...      ...       ...      ...                      │
│ P2            ...      ...       ...      ...                      │
│ Rata-rata     ...      ...       ...      ...                      │
└───────────────────────────────────────────────────────────────────┘
```

Wireframe ini hanya menunjukkan tata letak, bukan data hasil yang harus ditiru.

Aturan:
- Data proses ditampilkan sebelum hasil.
- Time Quantum hanya muncul ketika Round Robin dipilih.
- Gantt Chart memiliki label proses dan waktu mulai/selesai.
- Warna proses konsisten; waktu idle ditampilkan sebagai blok abu-abu “Idle”.
- Metrik rinci ditampilkan dalam tabel.
- Tombol Reset harus memiliki perilaku yang konsisten dan jelas.
- Hindari animasi lama sebelum hasil muncul.

## Halaman 3 — Page Replacement

**Tujuan:** memperlihatkan perubahan isi frame pada setiap permintaan halaman.

Urutan:
1. Header halaman.
2. Input Reference String dan jumlah frame.
3. Pilihan FIFO, LRU, atau Optimal.
4. Ringkasan metrik.
5. Tabel langkah.
6. Penjelasan langkah yang sedang dipilih.

Wireframe:

```text
┌───────────────────────────────────────────────────────────────────┐
│ Page Replacement                                                   │
│ Ikuti perubahan isi frame setiap kali sebuah halaman diminta.     │
├───────────────────────────────────────────────────────────────────┤
│ Reference String                                                   │
│ [7, 0, 1, 2, 0, 3, 0, 4                           ]                │
│ Jumlah frame [3]    Algoritma [FIFO ▼]                             │
│                               [Reset] [Jalankan simulasi]          │
├─────────────────┬─────────────────┬───────────────────────────────┤
│ PAGE FAULT      │ PAGE HIT        │ HIT RATIO                     │
│ hasil hitung    │ hasil hitung    │ hasil hitung                  │
├───────────────────────────────────────────────────────────────────┤
│ URUTAN REFERENSI                                                   │
│ Referensi       7     0     1     2     0     3     0     4        │
│ Frame 1         …     …     …     …     …     …     …     …        │
│ Frame 2         …     …     …     …     …     …     …     …        │
│ Frame 3         …     …     …     …     …     …     …     …        │
│ Status          F     F     F     F     H     F     F     F        │
├───────────────────────────────────────────────────────────────────┤
│ PENJELASAN LANGKAH                                                 │
│ Penjelasan sesuai algoritma dan keadaan frame pada langkah ini.    │
│                       [← Sebelumnya] [Langkah berikutnya →]        │
└───────────────────────────────────────────────────────────────────┘
```

Angka pada wireframe bukan hasil acuan; semua nilai di aplikasi nyata harus berasal dari algoritma yang benar.

Aturan:
- Setiap kolom merepresentasikan satu permintaan halaman.
- Frame kosong ditampilkan dengan `—`.
- Status ditulis sebagai Hit/Fault, selain diberi warna.
- Langkah aktif diberi highlight lembut.
- Perubahan halaman dapat ditandai secara halus.
- Reference string panjang menggunakan scroll horizontal di area tabel, tanpa menggeser label baris frame.

Kontrol:
- **Mulai:** tampilkan langkah awal atau mulai mode otomatis.
- **Jeda:** hentikan mode otomatis sementara.
- **Lanjutkan:** teruskan dari langkah terakhir.
- **Langkah berikutnya:** maju tepat satu langkah.
- **Reset:** kembali ke kondisi awal.
- Nonaktifkan kontrol yang tidak relevan pada keadaan saat ini.

## Halaman 4 — Perbandingan Algoritma

**Tujuan:** membandingkan performa beberapa algoritma dengan input yang sama.

Susunan:
1. Judul dan keterangan bahwa input yang sama digunakan.
2. Pilihan perbandingan CPU Scheduling atau Page Replacement.
3. Tabel hasil.
4. Grafik batang sederhana jika benar-benar membantu.
5. Catatan interpretasi metrik.

Tabel CPU:

| Algoritma | Avg. Waiting Time | Avg. Turnaround Time | Avg. Response Time |
|---|---:|---:|---:|
| FCFS | hasil hitung | hasil hitung | hasil hitung |
| SJF | hasil hitung | hasil hitung | hasil hitung |
| Round Robin | hasil hitung | hasil hitung | hasil hitung |

Tabel Page Replacement:

| Algoritma | Page Fault | Page Hit | Hit Ratio |
|---|---:|---:|---:|
| FIFO | hasil hitung | hasil hitung | hasil hitung |
| LRU | hasil hitung | hasil hitung | hasil hitung |
| Optimal | hasil hitung | hasil hitung | hasil hitung |

Gunakan tabel sebagai media utama. Jangan membandingkan metrik dengan satuan berbeda pada satu sumbu grafik. Jangan menyebut algoritma “terbaik” tanpa menjelaskan metrik yang digunakan. Perbarui semua hasil jika input berubah.

## 7. Visualisasi algoritma

### Gantt Chart
- Tinggi blok sekitar 42–48 px.
- Process ID berada di tengah blok.
- Waktu mulai dan selesai terlihat pada sumbu waktu.
- Warna tiap proses konsisten dan cukup kontras.
- Garis pembatas memisahkan blok yang berdekatan.
- Idle memakai abu-abu netral dan label “Idle”.
- Sediakan scroll horizontal untuk rentang waktu panjang.

### Frame memori
- Setiap frame menjadi baris tetap.
- Setiap referensi menjadi kolom.
- Kolom aktif diberi latar lembut.
- Status Hit/Fault selalu tertulis.
- Jangan hanya memakai warna untuk menjelaskan perubahan.
- Scroll horizontal berlaku pada tabel, bukan seluruh halaman.

### Metrik
- Angka besar hanya untuk ringkasan penting.
- Detail tiap proses tetap dalam tabel.
- Gunakan format angka dan desimal secara konsisten.
- Tampilkan satuan waktu bila relevan.

## 8. Feedback interaksi dan keadaan kosong

| Tindakan | Respons |
|---|---|
| Tambah proses | Baris baru muncul jika input valid |
| Input salah | Pesan kesalahan dekat input terkait |
| Jalankan simulasi | Hasil dan metrik diperbarui |
| Ganti algoritma | Pengaturan yang relevan diperlihatkan |
| Pilih langkah | Highlight dan penjelasan ikut berubah |
| Reset | Simulasi kembali ke kondisi awal |
| Semua langkah selesai | Tampilkan “Simulasi selesai” |

Contoh empty state:
- Dashboard: “Pilih modul untuk mulai belajar.”
- Tabel proses: “Belum ada proses. Tambahkan data proses terlebih dahulu.”
- Hasil CPU: “Jalankan simulasi untuk melihat Gantt Chart dan metrik.”
- Page Replacement: “Masukkan reference string dan jumlah frame untuk memulai.”
- Perbandingan: “Hasil akan muncul setelah input valid tersedia.”

Aksesibilitas dasar:
- Semua input memiliki label.
- Tombol dapat digunakan dengan keyboard.
- Fokus keyboard terlihat.
- Teks memiliki kontras yang cukup.
- Status tidak hanya dibedakan berdasarkan warna.
- Gunakan elemen semantik seperti `header`, `nav`, `main`, `section`, `form`, dan `table`.

## 9. Animasi

Gunakan transisi 120–200 ms untuk hover tombol, menu aktif, dan highlight langkah. Hindari partikel, glow, parallax, animasi latar, serta gerakan yang membuat pengguna menunggu. Hormati `prefers-reduced-motion`.

## 10. Responsif

- **Desktop (≥1024 px):** sidebar tetap, form dapat dua kolom, tabel menggunakan ruang tersedia.
- **Tablet (768–1023 px):** sidebar dipersempit atau menjadi navigasi ringkas; form menyesuaikan ruang.
- **Ponsel (<768 px):** navigasi ringkas, form vertikal, tombol mudah dijangkau, tabel/Gantt/frame dapat scroll horizontal dalam area khusus.

## 11. Token CSS awal

Letakkan token global di `css/style.css`. Contoh:

```css
:root {
  --color-bg: #F5F7FA;
  --color-surface: #FFFFFF;
  --color-sidebar: #172B3A;
  --color-text: #172B3A;
  --color-text-muted: #64748B;
  --color-border: #E2E8F0;
  --color-primary: #167D8D;
  --color-primary-hover: #116775;
  --color-primary-soft: #E5F4F5;
  --color-success: #247A55;
  --color-success-soft: #E8F5EE;
  --color-warning: #B96A20;
  --color-warning-soft: #FFF3E5;
  --color-danger: #B54747;
  --color-danger-soft: #FCECEC;

  --font-body: Inter, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 12px;
  --shadow-panel: 0 2px 8px rgb(23 43 58 / 4%);
}
```

Pembagian file:
- `style.css`: token, reset ringan, font, layout, tombol, input, tabel, status.
- `dashboard.css`: tampilan khusus Ikhtisar.
- `simulator.css`: form simulasi, Gantt Chart, frame, metrik, tabel langkah, kontrol.

Hindari mengulang aturan tombol dan input di banyak file.

## 12. Checklist desain

- [ ] Dashboard memiliki hierarki visual yang jelas.
- [ ] Navigasi konsisten di semua halaman.
- [ ] Warna aksen digunakan secara hemat.
- [ ] Form dan pesan validasi mudah dipahami.
- [ ] Gantt Chart mudah dibaca.
- [ ] Tabel frame memperlihatkan perubahan per langkah.
- [ ] Hit dan Fault dibedakan dengan teks serta warna.
- [ ] Tabel perbandingan memiliki label yang jelas.
- [ ] Tidak ada dekorasi yang menghalangi informasi.
- [ ] Tampilan berfungsi di desktop, tablet, dan ponsel.
- [ ] Semua tombol memiliki fungsi nyata.
- [ ] Data contoh tidak disamarkan sebagai hasil simulasi nyata.

## 13. Prinsip akhir

Desain tidak perlu terlihat mewah. Tampilan akan terasa matang jika hierarki informasi jelas, komponen konsisten, visualisasi tepat, dan interaksi dapat diprediksi. Bangun struktur dasar dahulu, lalu poles visual setelah fungsi inti berjalan.
