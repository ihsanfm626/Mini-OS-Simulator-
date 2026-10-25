# DESAIN.md — Mini OS Simulator

Dokumen ini menjadi acuan UI/UX Mini OS Simulator berdasarkan `FITUR.md`. Aplikasi dibuat dengan HTML, CSS, dan Vanilla JavaScript. Arah visual diperbarui menjadi **retro seimbang terinspirasi Poolsuite**: nuansa web editorial tropis, tipografi display bergaya vintage, warna krem dengan aksen coral dan teal, serta panel yang terasa playful. Referensi dipakai sebagai inspirasi suasana, bukan untuk menyalin layout atau asetnya. Keterbacaan materi dan ketepatan visualisasi algoritma tetap menjadi prioritas.

## 1. Arah visual

Karakter desain:
- **Retro-modern, bukan replika.** Gunakan suasana editorial dan santai ala Poolsuite: warna hangat, aksen tropis, tipografi display, dan komposisi berani yang tetap rapi.
- **Tetap terasa seperti alat belajar.** Konten teknis, tabel, label proses, angka waktu, dan status algoritma harus lebih mudah dibaca daripada dekorasi.
- **Krem sebagai kanvas utama.** Gunakan warna gelap untuk teks dan struktur, sementara coral, teal, serta kuning dipakai sebagai aksen terpilih.
- **Bentuk grafis sederhana.** Garis tebal, lingkaran, pola garis/grid tipis, label kapsul, dan blok warna dapat memberi karakter tanpa memerlukan gambar stok.
- **Interaksi terasa langsung.** Hover, pilihan menu, dan langkah aktif mendapat respons cepat dan konsisten.
- **Gunakan ilustrasi yang menjelaskan konsep OS.** Contohnya antrean proses, timeline Gantt, dan frame memori. Hindari statistik dekoratif dan ilustrasi yang tidak menambah pemahaman.

Hindari meniru logo, identitas merek, atau aset Poolsuite secara langsung. Hindari pula glassmorphism, glow berlebihan, gradien di setiap panel, bayangan tebal, animasi latar, serta penggunaan banyak warna aksen sekaligus. Gunakan tekstur atau pola retro hanya pada area yang tidak mengganggu konten.

## 2. Palet warna

| Token CSS | Hex | Fungsi |
|---|---|---|
| `--color-bg` | `#F7F0E2` | Latar utama krem hangat |
| `--color-surface` | `#FFFDF7` | Panel utama dan tabel |
| `--color-surface-alt` | `#EFE3CF` | Panel sekunder dan blok materi |
| `--color-sidebar` | `#172D3A` | Sidebar biru gelap |
| `--color-sidebar-hover` | `#254553` | Hover menu |
| `--color-text` | `#172D3A` | Teks utama |
| `--color-text-muted` | `#64716F` | Teks sekunder |
| `--color-border` | `#D9CEBA` | Border dan garis tabel |
| `--color-primary` | `#087E83` | Tombol utama, tautan aktif |
| `--color-primary-hover` | `#06666B` | Hover tombol utama |
| `--color-primary-soft` | `#D9EFEB` | Pilihan aktif berlatar lembut |
| `--color-coral` | `#F07861` | Aksen visual, label, ilustrasi |
| `--color-yellow` | `#F2C75C` | Aksen kecil dan sorotan materi |
| `--color-success` | `#247A55` | Page Hit dan status berhasil |
| `--color-success-soft` | `#E2F1E5` | Latar status berhasil |
| `--color-warning` | `#A85B20` | Page Fault dan peringatan |
| `--color-warning-soft` | `#FBE9D2` | Latar status peringatan |
| `--color-danger` | `#B54747` | Error validasi/tindakan berisiko |
| `--color-danger-soft` | `#F8E2DD` | Latar pesan error |
| `--color-info` | `#4169A1` | Informasi netral |

Aturan:
1. Gunakan krem sebagai latar global dan putih-krem untuk permukaan konten. Jangan membuat semua area menjadi panel.
2. Sidebar tetap gelap agar navigasi mudah dibedakan dari konten; menu aktif diberi aksen teal dan penanda coral kecil.
3. Coral dan kuning adalah aksen, bukan warna untuk seluruh teks atau tabel. Usahakan hanya satu aksen dekoratif dominan dalam satu area.
4. Tombol utama memakai teal. Tombol sekunder memakai latar krem/putih dengan border.
5. Page Hit memakai hijau dan Page Fault memakai oranye; status harus tetap ditulis sebagai teks, bukan dibedakan dari warna saja.
6. Merah khusus untuk error, bukan Page Fault.
7. Warna setiap proses pada Gantt Chart harus konsisten antar-render dan disertai label Process ID. Pilih palet yang tetap kontras di atas latar krem.
8. Pola garis, bentuk matahari/lingkaran, atau garis tebal boleh digunakan di hero Materi; jangan meletakkannya di belakang tabel padat.

## 3. Tipografi

Font display yang ditambahkan ke proyek adalah **VCR OSD Mono** (`VCR_OSD_MONO_1.001.ttf`). Gunakan sebagai font display untuk judul besar, nomor bagian, dan label pendek bergaya retro. Karena bentuk monospaced display dapat melelahkan untuk teks panjang, jangan gunakan untuk paragraf materi, form, tabel padat, atau penjelasan langkah. Isi utama menggunakan sans-serif yang mudah dibaca.

Contoh pemuatan font lokal (sesuaikan lokasi file dengan struktur proyek; rancangan folder menggunakan `assets/fonts/`):

```css
@font-face {
  font-family: "VCR OSD Mono";
  src: url("../assets/fonts/VCR_OSD_MONO_1.001.ttf") format("truetype");
  font-style: normal;
  font-weight: 400;
  font-display: swap;
}

:root {
  --font-display: "VCR OSD Mono", "Courier New", monospace;
  --font-body: "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

body {
  font-family: var(--font-body);
}

h1,
.hero-title,
.section-number,
.wordmark {
  font-family: var(--font-display);
  font-weight: 400;
  letter-spacing: 0.015em;
}
```

Path `../assets/fonts/` di atas berlaku jika CSS berada di folder `css/` dan file font disimpan di `assets/fonts/`. Bila file font saat ini berada di lokasi lain, sesuaikan path `src` tanpa mengubah nama font.

| Elemen | Ukuran | Penggunaan |
|---|---:|---|
| Judul hero Materi | 32–44 px | VCR OSD Mono, gunakan seperlunya |
| Judul halaman simulator | 26–32 px | VCR OSD Mono atau sans-serif tebal jika judul panjang |
| Judul bagian | 18–21 px | Sans-serif semibold |
| Judul panel | 15–17 px | Sans-serif semibold |
| Isi materi | 15–17 px | Sans-serif reguler, line-height 1.6–1.75 |
| Label form/tabel | 13–14 px | Sans-serif medium |
| Keterangan | 12–13 px | Sans-serif reguler |
| Angka metrik utama | 24–30 px | Sans-serif semibold atau monospace yang jelas |

Gunakan kapitalisasi kalimat biasa. Batasi font display untuk judul dan aksen; jangan memakainya pada semua teks hanya demi konsistensi retro. Pastikan kontras teks cukup tinggi.

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
│ MINI OS          │ Breadcrumb / nama halaman                     │
│                  ├───────────────────────────────────────────────┤
│ Materi           │ Judul halaman                                 │
│ CPU Scheduling   │ Deskripsi singkat                             │
│ Page Replacement │                                               │
│ Perbandingan     │ Konten utama                                  │
│                  │                                               │
│                  │                                               │
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
Menu: Materi, CPU Scheduling, Page Replacement, Perbandingan. Materi menjadi halaman awal aplikasi dan berisi pilihan topik belajar. Item menu setinggi 42–46 px, ikon garis sederhana 18–20 px, dan penanda aktif yang jelas. Hindari banyak sub-menu.

### Header halaman
Setiap halaman menampilkan nama modul, judul, dan deskripsi satu kalimat. Hindari header tinggi yang membuat konten utama harus digulir terlalu jauh.

### Panel
- Krem terang dengan border `1px solid var(--color-border)`.
- Radius sekitar 8–14 px; hindari semua komponen berbentuk kapsul.
- Bayangan boleh berupa offset tipis, misalnya `0 3px 0 rgb(23 45 58 / 8%)`, agar terasa grafis dan retro.
- Panel materi boleh memakai latar `--color-surface-alt` atau aksen coral/kuning pada bagian kecil.
- Hindari panel bertumpuk tanpa alasan.

### Tombol

| Jenis | Tampilan | Contoh |
|---|---|---|
| Primary | Teal solid, teks putih, border tegas | Jalankan simulasi, Tambah proses |
| Secondary | Krem terang, border warna utama | Reset, Kembali |
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

## Halaman 1 — Materi

**Tujuan:** menjadi pusat belajar sebelum pengguna mencoba simulasi. Halaman ini memiliki banyak ilustrasi konseptual yang membantu menjelaskan mekanisme OS, tetapi setiap ilustrasi harus relevan dan memiliki fungsi edukatif.

Urutan konten:
1. Judul: **“Pahami konsepnya. Lalu coba simulasinya.”**
2. Deskripsi singkat bahwa halaman ini menyediakan materi visual CPU Scheduling dan Page Replacement.
3. Dua pilihan materi: **CPU Scheduling** dan **Page Replacement**.
4. Di dalam setiap materi, gunakan bagian-bagian pendek dengan judul, teks ringkas, ilustrasi, contoh, dan ringkasan.
5. Sediakan tombol **Coba Simulasi CPU** dan **Coba Simulasi Page Replacement** pada materi terkait.

Wireframe:

```text
┌───────────────────────────────────────────────────────────────────┐
│ Materi                                                             │
│ Pahami konsepnya. Lalu coba simulasinya.                           │
│ Pilih topik untuk belajar melalui penjelasan dan ilustrasi.        │
├─────────────────────────────────┬─────────────────────────────────┤
│ CPU Scheduling                  │ Page Replacement                │
│ Ilustrasi antrean proses,       │ Ilustrasi page, frame,          │
│ CPU, dan Gantt Chart            │ reference string, dan fault    │
│ [Pelajari CPU Scheduling →]     │ [Pelajari Page Replacement →]  │
└─────────────────────────────────┴─────────────────────────────────┘
│ Materi terpilih: konsep → diagram → contoh langkah → ringkasan     │
│ [Coba Simulasi]                                                    │
└───────────────────────────────────────────────────────────────────┘
```

Gunakan diagram atau ilustrasi buatan sendiri yang menjelaskan konsep, bukan gambar stok besar. Terapkan nuansa retro pada hero Materi melalui judul display, label kecil seperti “OS FIELD NOTES”, blok coral/kuning, dan bentuk lingkaran atau garis sederhana. Jangan sampai ornamen mengalahkan materi. Materi CPU Scheduling sebaiknya memiliki ilustrasi antrean proses dan Gantt Chart. Materi Page Replacement sebaiknya memiliki ilustrasi reference string dan frame memori yang berubah per langkah. Setiap ilustrasi diberi label, keterangan, dan urutan baca yang jelas. Hindari statistik dekoratif.

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
1. Judul dan keterangan bahwa input yang sama digunakan untuk semua algoritma dalam satu topik.
2. Dua tab/segmented control: **CPU Scheduling** dan **Page Replacement**.
3. Tabel hasil lengkap untuk seluruh algoritma pada topik terpilih.
4. Grafik batang terpisah untuk metrik yang relevan jika membantu.
5. Catatan singkat tentang cara membaca hasil dan keterbatasan kesimpulan.

Tabel CPU Scheduling — metrik wajib:

| Algoritma | Rata-rata Waiting Time | Rata-rata Turnaround Time |
|---|---:|---:|
| FCFS | hasil hitung | hasil hitung |
| SJF Non-Preemptive | hasil hitung | hasil hitung |
| Round Robin | hasil hitung | hasil hitung |

Tabel Page Replacement — metrik wajib:

| Algoritma | Page Hit | Page Fault |
|---|---:|---:|
| FIFO | hasil hitung | hasil hitung |
| LRU | hasil hitung | hasil hitung |
| Optimal | hasil hitung | hasil hitung |

Response Time, Hit Ratio, Fault Ratio, dan Gantt Chart boleh menjadi informasi tambahan, tetapi tidak boleh menggantikan metrik wajib di atas. Gunakan tabel sebagai media utama. Jangan membandingkan metrik dengan satuan berbeda pada satu sumbu grafik. Jika memberi label hasil terbaik, sebutkan metrik yang menjadi dasar: rata-rata WT/TAT lebih rendah, Page Hit lebih tinggi, atau Page Fault lebih rendah. Jangan menyatakan satu algoritma selalu terbaik untuk semua input. Perbarui semua hasil jika input berubah.

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
- Materi: “Pilih topik untuk mulai belajar.”
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

Gunakan transisi 120–200 ms untuk hover tombol, menu aktif, dan highlight langkah. Efek yang sesuai: perubahan warna, pergeseran 1–2 px, atau garis aksen yang muncul. Hindari partikel, glow, parallax, animasi latar, serta gerakan yang membuat pengguna menunggu. Hormati `prefers-reduced-motion`.

## 10. Responsif

- **Desktop (≥1024 px):** sidebar tetap, form dapat dua kolom, tabel menggunakan ruang tersedia.
- **Tablet (768–1023 px):** sidebar dipersempit atau menjadi navigasi ringkas; form menyesuaikan ruang.
- **Ponsel (<768 px):** navigasi ringkas, form vertikal, tombol mudah dijangkau, tabel/Gantt/frame dapat scroll horizontal dalam area khusus.

## 11. Token CSS awal

Letakkan token global di `css/style.css`. Contoh:

```css
:root {
  --color-bg: #F7F0E2;
  --color-surface: #FFFDF7;
  --color-surface-alt: #EFE3CF;
  --color-sidebar: #172D3A;
  --color-sidebar-hover: #254553;
  --color-text: #172D3A;
  --color-text-muted: #64716F;
  --color-border: #D9CEBA;
  --color-primary: #087E83;
  --color-primary-hover: #06666B;
  --color-primary-soft: #D9EFEB;
  --color-coral: #F07861;
  --color-yellow: #F2C75C;
  --color-success: #247A55;
  --color-success-soft: #E2F1E5;
  --color-warning: #A85B20;
  --color-warning-soft: #FBE9D2;
  --color-danger: #B54747;
  --color-danger-soft: #F8E2DD;

  --font-display: "VCR OSD Mono", "Courier New", monospace;
  --font-body: "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 14px;
  --shadow-panel: 0 3px 0 rgb(23 45 58 / 8%);
}
```

Pembagian file:
- `style.css`: token, reset ringan, font, layout, tombol, input, tabel, status.
- `materi.css`: tampilan khusus halaman Materi dan pilihan topik.
- `simulator.css`: form simulasi, Gantt Chart, frame, metrik, tabel langkah, kontrol.

Hindari mengulang aturan tombol dan input di banyak file.

## 12. Checklist desain

- [ ] Halaman Materi memiliki hierarki visual yang jelas.
- [ ] Navigasi konsisten di semua halaman.
- [ ] Warna aksen coral dan kuning digunakan secara hemat.
- [ ] VCR OSD Mono hanya dipakai untuk judul/aksen, bukan paragraf dan tabel padat.
- [ ] Nuansa retro tidak mengganggu keterbacaan visualisasi algoritma.
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

Desain boleh terasa santai dan retro, tetapi bukan berarti setiap bagian harus ramai. Gunakan VCR OSD Mono sebagai aksen display, krem sebagai kanvas, teal untuk aksi utama, dan coral/kuning untuk penekanan visual yang terukur. Tampilan akan terasa matang jika hierarki informasi jelas, komponen konsisten, visualisasi tepat, dan interaksi dapat diprediksi. Bangun struktur dasar dahulu, lalu poles detail visual setelah fungsi inti berjalan.
