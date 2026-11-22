# FITUR.md — Mini OS Simulator

Dokumen ini menjadi panduan spesifikasi fitur, arsitektur teknis, dan urutan pengerjaan proyek **Mini OS Simulator** untuk mata kuliah Sistem Operasi. Aplikasi dibangun menggunakan **HTML5, CSS3 murni, dan Vanilla JavaScript** tanpa ketergantungan framework eksternal serta beroperasi **100% offline dan mandiri (self-hosted assets)** dengan konsep visual **Retro Desktop System Lab**.

---

## 1. Gambaran Umum

Mini OS Simulator adalah aplikasi edukasi interaktif berbasis peramban (*web-based educational simulator*) yang dirancang untuk membedah dan memvisualisasikan mekanisme fundamental internal sistem operasi. Aplikasi ini menyajikan perpaduan antara **pusat materi konseptual bergambar**, **laboratorium simulasi interaktif langkah-demi-langkah (*step-by-step interactive lab*)**, dan **modul perbandingan performa (*benchmark*)** untuk dua pilar utama manajemen sumber daya sistem operasi:

1. **CPU Scheduling (Penjadwalan Proses)**:
   - **FCFS** (*First-Come, First-Served*)
   - **SJF Non-Preemptive** (*Shortest Job First*)
   - **Round Robin (RR)** dengan *Time Quantum* dinamis
2. **Page Replacement (Manajemen Memori Virtual)**:
   - **FIFO** (*First-In, First-Out*)
   - **LRU** (*Least Recently Used*)
   - **Optimal (OPT)** / *Belady's Algorithm*

Pengguna dapat mengonfigurasi dataset proses maupun *reference string* halaman secara bebas, mengamati alur pengambilan keputusan algoritma melalui diagram visual (Gantt Chart & Matriks Frame Memori), mengontrol jalannya simulasi secara bertahap, serta menganalisis metrik efisiensi matematis secara objektif.

### Konsep Visual & Karakteristik Sistem

- **Retro Desktop System Lab Aesthetic**: Mengusung antarmuka stasiun kerja (*workstation*) GUI retro-klasik dengan kanvas meja kerja berpola *polka-dot* dusty pink (`#E8A9B8`), bingkai jendela retro (*window frames*) berkontur tegas dengan tombol kontrol tiga titik (*window dots*), bilah judul tematik warna pastel, tombol berbayangan keras (*3D hard drop shadow*), serta tipografi *dual-monospace* (**Space Mono** & **JetBrains Mono**).
- **Sistem Navigasi Ganda (*Dual Navigation System*)**: Navigasi intuitif yang menyinkronkan bilah atas (*Top Sticky Header* dengan jam digital *real-time*), bilah dok melayang (*Floating Pill Bottom Dock* berikonik), serta laci navigasi responsif (*Mobile Drawer*).
- **100% Mandiri & Siap Dijalankan Offline (*Zero External CDN Dependencies*)**: Seluruh berkas grafis, *font*, dan ikon font (*Material Symbols Outlined*) tersimpan secara lokal di dalam direktori proyek, menjamin simulator dapat dioperasikan penuh pada komputer laboratorium tanpa akses jaringan internet.
- **Pemisahan Logika & Visual (*Separation of Concerns*)**: Seluruh modul kalkulasi algoritma diisolasi di direktori `js/algoritma/`, sementara pembaruan DOM, animasi grafik, dan manajemen status ditangani oleh modul UI terkait (`cpu-ui.js`, `memory-ui.js`, `visualization.js`).

### Tujuan Aplikasi

1. **Pemahaman Konseptual Mendalam**: Menyajikan analogi, diagram siklus hidup proses, dan alur pemuatan memori dalam bahasa visual yang mudah dipahami sebelum masuk ke simulator teknis.
2. **Transparansi Logika Algoritma**: Menghilangkan kesan "kotak hitam" (*black box*) dengan menyediakan kontrol *stepper* bertahap dan panel penjelasan logis pada setiap siklus eksekusi CPU atau pergantian halaman memori.
3. **Analisis Komparatif Objektif**: Menghitung metrik performa formal secara otomatis dan menyajikan perbandingan *head-to-head* untuk membuktikan trade-off karakteristik masing-masing algoritma pada kondisi data yang sama.

### Batasan Versi Proyek

- **Tanpa Database / Autentikasi**: Seluruh status aplikasi bersifat *client-side in-memory*; data tidak disimpan ke server dan akan kembali ke kondisi awal saat halaman dimuat ulang.
- **Karakteristik Penjadwalan CPU**:
  - SJF yang diimplementasikan adalah **Non-Preemptive SJF** (proses yang telah menerima alokasi CPU berjalan hingga selesai tanpa disela oleh proses baru dengan burst time lebih kecil).
  - Round Robin mengeksekusi proses dalam antrean siap (*ready queue*) dengan kuantum waktu bilangan bulat positif.
  - Simulator menangani kondisi CPU menganggur (*CPU Idle Time*) secara eksplisit apabila belum ada proses yang tiba pada suatu satuan waktu.
- **Karakteristik Penggantian Halaman**:
  - Simulasi memori mengasumsikan alokasi frame fisik statis berkapasitas $N$ frame ($1 \le N \le 8$).
  - Algoritma Optimal memanfaatkan pembacaan data ke masa depan (*future reference lookahead*) sebagai standar pembanding teoretis terbaik (*gold standard*).
- **Lingkungan Eksekusi**: Simulasi berjalan murni pada mesin JavaScript peramban (*web browser sandbox*) tanpa memanipulasi proses atau alokasi memori fisik komputer pengguna.

---

## 2. Daftar Fitur

| ID | Fitur | Prioritas | Modul Terkait | Keterangan |
|---|---|---|---|---|
| **F01** | **Pusat Materi Edukasi OS** | Wajib | Materi Window (`#C9B8E8`) | Pusat pembelajaran interaktif berisi modul CPU Scheduling & Page Replacement, dilengkapi diagram alur, ilustrasi antrean, dan jalan pintas ke simulator. |
| **F02** | **Sistem Navigasi Ganda** | Wajib | Header, Dock, Drawer | Navigasi sinkron multi-perangkat melalui Top Sticky Header (dengan indikator status & jam digital), Floating Bottom Dock berikonik, dan Mobile Drawer. |
| **F03** | **Manajemen Input Data Proses** | Wajib | CPU Simulator (`#B9D9C4`) | Input parameter proses (Process ID, Arrival Time, Burst Time), penambahan dinamis, pengeditan langsung, penghapusan baris, dan penyediaan dataset sampel. |
| **F04** | **Eksekutor Algoritma CPU** | Wajib | CPU Simulator & Engine | Mesin eksekusi algoritma FCFS, Non-Preemptive SJF, dan Round Robin dengan validasi kuantum waktu dinamis dan penanganan waktu *idle*. |
| **F05** | **Visualisasi Gantt Chart CPU** | Wajib | CPU Simulator & Viz | Visualisasi linimasa eksekusi CPU bertema retro workstation, segmen blok berwarna pastel per proses, penanda CPU idle bergaris, dan sumbu waktu presisi. |
| **F06** | **Kalkulasi Metrik CPU** | Wajib | CPU Simulator | Perhitungan otomatis metrik per proses: Completion Time (CT), Turnaround Time (TAT), Waiting Time (WT), Response Time (RT), serta rata-ratanya. |
| **F07** | **Manajemen Input Referensi Halaman** | Wajib | Memory Simulator (`#F1C49D`) | Form konfigurasi *reference string* (pemisah koma/spasi), pemilihan jumlah alokasi frame (1–8), validasi format, dan tombol dataset uji coba. |
| **F08** | **Matriks Visual Page Replacement** | Wajib | Memory Simulator & Viz | Visualisasi matriks 2D frame memori per langkah referensi, badge status HIT/FAULT retro, dan penanda visual slot frame yang mengalami pembaruan (*victim replacement*). |
| **F09** | **Kalkulasi Metrik Memori** | Wajib | Memory Simulator | Penghitungan presisi kuantitatif: Total Page Fault, Total Page Hit, Hit Ratio (%), Fault Ratio (%), dan ringkasan efisiensi memori. |
| **F10** | **Kontrol Simulasi Bertahap (*Stepper*)** | Wajib | Stepper Toolbar | Panel kontrol simulasi: Auto Play (Mulai), Jeda (Pause), Lanjut (Resume), Langkah Maju (Next Step), Langkah Mundur (Step Back), Reset Awal, dan Pengatur Kecepatan. |
| **F11** | **Benchmark & Komparasi Algoritma** | Wajib | Compare Window (`#AFCDE0`) | Halaman evaluasi komparatif multi-algoritma menggunakan dataset seragam untuk menganalisis trade-off efisiensi CPU dan Page Replacement secara berdampingan. |
| **F12** | **Log Penjelasan Keputusan Langkah** | Wajib | Detail Panel / Log Box | Catatan inspeksi dan penalaran logis pada setiap langkah (alasan mengapa suatu proses dipilih atau halaman tertentu digantikan pada slot frame). |
| **F13** | **Validasi Input & Sistem Notifikasi** | Wajib | Global Input Handler | Pencegahan eksekusi input korup (nilai kosong, nilai negatif, non-integer, ID duplikat, reference string invalid) dengan pesan galat retro yang informatif. |

---

## 3. Detail Fitur dan Langkah Penggunaan

### F01 — Pusat Materi Edukasi OS

**Tujuan:** Memberikan landasan teoretis komprehensif bagi mahasiswa/pengguna sebelum mengeksekusi simulasi, menghubungkan konsep abstrak buku teks dengan representasi visual konkret.

#### Karakteristik & Antarmuka
- Disajikan di dalam jendela retro bertema **Lavender** (`#C9B8E8`) dengan *window header* vintage, status badge "LAB MATERI AKTIF", dan tab pemilih topik interaktif.
- **Dua Topik Utama**:
  1. **CPU Scheduling**:
     - Definisi proses, siklus hidup CPU/IO burst, dan tujuan penjadwalan (maksimalkan utilisasi CPU, minimalkan waktu tunggu).
     - Diagram siklus hidup proses (New $\rightarrow$ Ready $\rightarrow$ Running $\rightarrow$ Terminated/Waiting).
     - Pembahasan karakteristik FCFS (konvoi efek), SJF Non-Preemptive (optimal untuk WT rata-rata pada burst diketahui), dan Round Robin (keadilan kuantum waktu).
     - Anatomi Gantt Chart dan panduan matematis perhitungan CT, TAT, WT, dan RT.
  2. **Page Replacement**:
     - Arsitektur memori virtual: pemetaan Halaman (*Page*) ke Bingkai (*Frame* fisik).
     - Fenomena Page Hit vs Page Fault (*miss*).
     - Pembahasan algoritma FIFO (antrean antrian sederhana vs Anomali Belady), LRU (prinsip lokalitas temporal), dan Optimal (patokan teoretis jarak terjauh di masa depan).
- **Aksi Cepat (*Quick Navigation Links*)**: Kartu materi dilengkapi tombol pintas berikon (misal: "Buka Simulator CPU", "Coba Simulasi Memori") untuk langsung membuka modul lab terkait tanpa harus memuat ulang aplikasi.

#### Kriteria Selesai
- Kedua materi dapat diakses bergantian melalui tab interaktif dengan animasi transisi yang mulus.
- Seluruh diagram konseptual tampil tajam menggunakan elemen HTML/CSS lokal tanpa gambar eksternal yang pecah atau gagal muat.
- Penjelasan formula matematis selaras dengan rumus yang dihitung oleh modul simulator.

---

### F02 — Sistem Navigasi Ganda (*Dual Navigation System*)

**Tujuan:** Memberikan mobilitas navigasi yang fleksibel, cepat, dan adaptif bagi pengguna desktop workstation maupun perangkat layar kecil.

#### Komponen Navigasi
1. **Top Sticky Header**:
   - Menampilkan identitas retro workstation: `MINI OS LAB v2.0`.
   - Lencana status sistem (*badge*): `OFFLINE READY` dengan titik status hijau aktif.
   - Jam digital *real-time* (*Digital Clock*) berformat `HH:MM:SS` yang diperbarui setiap detik menggunakan JavaScript lokal.
   - Tombol tautan menu navigasi desktop dengan penanda aktif (*active pill indicator*).
2. **Floating Pill Bottom Dock**:
   - Bilah dermaga (*dock*) mengambang di bagian bawah layar yang terinspirasi dari antarmuka OS modern retro.
   - Terdiri dari 4 tombol ikon lokal Material Symbols:
     - `menu_book` — Pusat Materi
     - `memory` — CPU Scheduling
     - `storage` — Page Replacement
     - `analytics` — Perbandingan Algoritma
   - Memiliki efek melayang (*hover bounce & 3D active press*) serta indikator lencana aktif.
3. **Mobile Drawer (Layar Sentuh / Responsif)**:
   - Tombol *hamburger toggle* pada layar $< 768\text{ px}$ yang membuka bilah navigasi vertikal samping retro dengan latar krem gading dan batas arang pekat.

#### Kriteria Selesai
- Pengalihan tampilan antar modul berlangsung secara instan (*Single Page Architecture*) dengan menyembunyikan/menampilkan *section* target.
- Status aktif pada Top Header, Floating Dock, dan Mobile Drawer selalu tersinkronisasi secara otomatis saat pengguna berpindah halaman.
- Jam digital di bilah atas berjalan konsisten tanpa lag dan bebas kebocoran memori (*memory leak*).

---

### F03 — Manajemen Input Data Proses (CPU)

**Tujuan:** Mengelola daftar kumpulan proses (*process workload*) yang akan dijadwalkan oleh CPU.

#### Struktur Data Proses
- **Process ID**: Pengenal unik proses (contoh: `P1`, `P2`, `P3`).
- **Arrival Time (AT)**: Waktu kedatangan proses dalam antrean siap ($\ge 0$).
- **Burst Time (BT)**: Durasi waktu pemrosesan CPU yang dibutuhkan ($> 0$).

#### Alur & Fitur Interaktif
1. **Form Tambah Cepat**: Baris input dengan validasi langsung; menekan tombol "Tambah Proses" menyisipkan data baru ke dalam tabel antrean.
2. **Tabel Antrean Dinamis**: Menampilkan nomor urut, ID proses, AT, BT, dan tombol aksi individual (Edit / Hapus).
3. **Preset Sample Data**: Tombol cepat untuk memuat sekumpulan proses standar praktikum guna mempermudah pengujian instan tanpa mengetik manual.
4. **Tombol Bersihkan**: Mengosongkan seluruh antrean proses kembali ke status awal.

#### Kriteria Selesai
- Menolak penambahan jika Process ID kosong atau telah ada dalam tabel (duplikat).
- Menolak Arrival Time negatif atau non-numerik.
- Menolak Burst Time nol, negatif, atau non-numerik.
- Tabel memperbarui tampilan seketika setelah penambahan, pengubahan, atau penghapusan data.

---

### F04 — Eksekutor Algoritma CPU Scheduling

**Tujuan:** Menjalankan pemrosesan algoritma penjadwalan CPU pada antrean proses secara presisi matematis.

#### Spesifikasi Algoritma
1. **FCFS (First-Come, First-Served)**:
   - Proses diurutkan berdasarkan $AT$ terkecil.
   - Jika terdapat $AT$ yang sama, diprioritaskan berdasarkan urutan entri input ($PID$).
   - Eksekusi berlangsung non-preemptive hingga $BT$ tuntas.
2. **SJF Non-Preemptive (Shortest Job First)**:
   - Pada setiap momen selesainya suatu proses, CPU memeriksa seluruh proses yang telah tiba ($AT \le \text{Current Time}$) dan belum selesai.
   - Proses dengan $BT$ terpendek dipilih untuk dieksekusi hingga selesai.
   - Jika terdapat beberapa proses dengan $BT$ identik, kriteria pemutus adalah $AT$ lebih awal, lalu $PID$.
3. **Round Robin (RR)**:
   - Menggunakan struktur antrean melingkar (*circular ready queue*).
   - Setiap proses aktif memperoleh jatah waktu eksekusi maksimal sebesar **Time Quantum ($Q$)**.
   - Jika sisa burst proses $> Q$, proses disela (*preempted*), dimasukkan kembali ke ujung belakang *ready queue*, dan CPU dialokasikan ke proses berikutnya.
   - Proses baru yang tiba tepat pada waktu penyelesaian kuantum dimasukkan ke antrean sebelum proses yang baru saja disela.

#### Penanganan CPU Idle
- Apabila pada waktu $T$, CPU telah selesai memproses antrean namun belum ada proses berikutnya yang tiba ($T < \min(AT)$ dari proses yang tersisa), mesin penjadwal mencatat segmen **IDLE** dari waktu $T$ hingga kedatangan proses berikutnya.

#### Kriteria Selesai
- Menghasilkan urutan segmen linimasa eksekusi yang valid dan bebas tumpang tindih waktu.
- Round Robin memvalidasi nilai Time Quantum wajib bilangan bulat positif ($Q \ge 1$).

---

### F05 — Visualisasi Gantt Chart CPU

**Tujuan:** Memvisualisasikan linimasa pembagian waktu CPU (*time-slice timeline*) secara grafis dan interaktif.

#### Karakteristik Visual
- Blok segmen eksekusi horisontal bergaya retro dengan garis tepi arang pekat (`#453B47`) dan bayangan keras (*retro shadow*).
- Pewarnaan proses menggunakan palet warna pastel bertema retro workstation (P1: Raspberry Pink, P2: Sage Green, P3: Pastel Blue, P4: Warm Amber, P5: Lavender, dll.).
- **Segmen CPU Idle**: Ditampilkan dengan latar abu-abu netral berarsir diagonal khas terminal vintage (`#e8e2d5`) berlabel tegas `[IDLE]`.
- **Sumbu Waktu (Time Markers)**: Nilai waktu mulai (*start time*) dan waktu selesai (*end time*) tercantum jelas di bawah setiap blok batas segmen.
- Responsif terhadap panjang total waktu eksekusi dengan bilah geser horisontal (*smooth horizontal scroll*) jika rentang waktu melampaui lebar jendela kontainer.

#### Kriteria Selesai
- Lebar relatif setiap blok segmen sebanding dengan durasi eksekusinya.
- Transisi rendering mulus dan dapat diperbarui secara dinamis baik pada eksekusi langsung maupun saat tombol *stepper* ditekan.

---

### F06 — Kalkulasi Metrik CPU Scheduling

**Tujuan:** Menyediakan hasil evaluasi kuantitatif dari jadwal CPU yang terbentuk.

#### Rumus & Definisi Formal

$$\text{Turnaround Time (TAT)} = \text{Completion Time (CT)} - \text{Arrival Time (AT)}$$

$$\text{Waiting Time (WT)} = \text{Turnaround Time (TAT)} - \text{Burst Time (BT)}$$

$$\text{Response Time (RT)} = \text{First CPU Start Time} - \text{Arrival Time (AT)}$$

$$\text{Rata-rata Metrik} = \frac{\sum_{i=1}^{N} \text{Metrik}_i}{N}$$

#### Komponen Tampilan Metrik
1. **Tabel Ringkasan Per Proses**: Kolom Process ID, AT, BT, CT, TAT, WT, dan RT untuk setiap proses.
2. **Kartu Statistik Utama (*Summary Cards*)**:
   - Rata-rata Waiting Time (*Avg. WT*)
   - Rata-rata Turnaround Time (*Avg. TAT*)
   - Rata-rata Response Time (*Avg. RT*)
   - Total Waktu Eksekusi (*Makespan / Finish Time*)
   - Utilisasi CPU ($\% = \frac{\text{Total Busy Time}}{\text{Finish Time}} \times 100\%$)

#### Kriteria Selesai
- Hasil perhitungan matematis akurat 100% dan dapat diverifikasi secara manual.
- Nilai rata-rata diformat rapi dengan pembulatan 2 desimal (misal: `4.33 ms`).

---

### F07 — Manajemen Input Referensi Halaman (Memori)

**Tujuan:** Mengonfigurasi antrean permintaan halaman (*page reference stream*) dan kapasitas memori fisik yang dialokasikan.

#### Parameter Input
- **Reference String**: Urutan nomor halaman yang diminta proses, dipisahkan oleh tanda koma atau spasi (contoh: `7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1`).
- **Jumlah Frame Fisik**: Kapasitas slot frame memori RAM yang dialokasikan, bernilai antara $1$ hingga $8$ frame (standar umum laboratorium: 3 atau 4 frame).

#### Fitur Pendukung
- **Tombol Preset Klasik**:
  - *Belady Anomaly Sample* (string khusus pembuktian anomali FIFO).
  - *Standard Textbook Sample* (dataset baku buku Silberschatz).
  - *Random Generator* (pembuatan string acak terstruktur dengan 1 klik).
- **Validasi Parsing Real-Time**: Otomatis membersihkan karakter non-angka dan spasi ganda sebelum simulasi dijalankan.

#### Kriteria Selesai
- Mencegah eksekusi jika input string kosong atau mengandung karakter non-numerik.
- Membatasi jumlah frame pada rentang valid $1 \le \text{Frame} \le 8$.

---

### F08 — Matriks Visual Page Replacement

**Tujuan:** Menyajikan rekaman visual kondisi frame memori fisik pada setiap urutan pemanggilan halaman secara transparan.

#### Format Matriks Visual 2D
- **Sumbu Horisontal**: Urutan langkah pemanggilan halaman ($1, 2, 3, \dots, M$) disertai nomor halaman yang sedang diminta.
- **Sumbu Vertikal**: Slot frame fisik memori (`Frame 0`, `Frame 1`, `Frame 2`, dst.).
- **Sel Status Langkah**:
  - Lencana **HIT** (Latar hijau retro soft `rgba(50, 118, 91, 0.15)` dengan teks hijau pekat `#32765B`).
  - Lencana **FAULT** (Latar merah bata soft `rgba(164, 61, 70, 0.15)` dengan teks merah pekat `#A43D46`).
- **Penyorotan Slot Aktif (*Victim Highlight*)**:
  - Sel slot frame yang baru saja diisi atau ditimpa (*page replaced*) diberi batas aksen khusus dan indikator visual untuk memudahkan analisis pergerakan halaman.
  - Untuk Page Hit, halaman yang diakses diberi tanda sorot penanda akses sukses.

#### Algoritma yang Disimulasikan
1. **FIFO**: Halaman yang digantikan adalah halaman tertua yang pertama kali dimasukkan ke frame fisik (*head of queue*).
2. **LRU**: Halaman yang digantikan adalah halaman yang waktu akses terakhirnya (*timestamp/recency*) paling lampau.
3. **Optimal**: Halaman yang digantikan adalah halaman yang tidak akan digunakan lagi, atau yang pemakaian berikutnya berada pada posisi paling jauh di masa depan.

#### Kriteria Selesai
- Matriks tabel 2D merender seluruh riwayat langkah secara lengkap dan terstruktur.
- Keputusan penggantian halaman terbukti akurat untuk FIFO, LRU, dan Optimal pada seluruh variasi dataset.

---

### F09 — Kalkulasi Metrik Page Replacement

**Tujuan:** Memberikan ukuran performa kuantitatif atas efektivitas manajemen memori virtual.

#### Formula & Hubungan Metrik

$$\text{Total Permintaan (References)} = \text{Total Page Hit} + \text{Total Page Fault}$$

$$\text{Hit Ratio (\%)} = \left( \frac{\text{Total Page Hit}}{\text{Total References}} \right) \times 100\%$$

$$\text{Fault Ratio (\%)} = \left( \frac{\text{Total Page Fault}}{\text{Total References}} \right) \times 100\%$$

#### Komponen Antarmuka Metrik
- Kartu ringkasan metrik retro: Total References, Total Faults, Total Hits, dan Hit Ratio.
- Indikator bar visual perbandingan rasio Hit vs Fault dengan proporsi warna hijau dan merah retro.

#### Kriteria Selesai
- Nilai Total Hit + Total Fault selalu identik dengan panjang *reference string*.
- Persentase ditampilkan dengan ketelitian 2 angka desimal (contoh: `65.00%`).

---

### F10 — Kontrol Simulasi Bertahap (*Stepper Toolbar*)

**Tujuan:** Memberikan kendali penuh kepada pengguna untuk mengatur laju simulasi sehingga detail transisi status dapat dianalisis secara mikroskopis.

#### Tombol Kontrol & Fungsionalitas
- **Langkah Mundur (`Step Back` / Ikon `undo`)**: Membatalkan langkah aktif dan mengembalikan kondisi memori/CPU ke langkah $N-1$.
- **Jalankan Otomatis (`Auto Play` / Ikon `play_arrow`)**: Memulai pemutaran simulasi otomatis langkah demi langkah dengan interval waktu teratur.
- **Jeda (`Pause` / Ikon `pause`)**: Menghentikan simulasi otomatis sementara waktu tanpa mereset data.
- **Lanjut (`Resume`)**: Melanjutkan pemutaran otomatis dari langkah tempat jeda dilakukan.
- **Langkah Maju (`Next Step` / Ikon `redo` / `skip_next`)**: Mengeksekusi dan memvisualisasikan tepat 1 langkah berikutnya secara manual.
- **Reset Awal (`Reset` / Ikon `restart_alt`)**: Mengembalikan seluruh visualisasi, tabel langkah, dan metrik ke kondisi langkah $0$ (sebelum eksekusi).
- **Pengatur Kecepatan (`Speed Slider`)**: Slider kontrol kecepatan jeda antar langkah otomatis (rentang: Lambat `0.5x` / $1500\text{ ms}$, Normal `1.0x` / $800\text{ ms}$, Cepat `2.0x` / $300\text{ ms}$).

#### Kriteria Selesai
- Tombol *Next Step* dinonaktifkan secara otomatis saat simulasi telah mencapai langkah terakhir.
- Tombol *Step Back* dinonaktifkan secara otomatis saat simulasi berada di langkah awal ($0$).
- Transisi antara mode otomatis (*auto-play*) dan manual (*stepper*) tidak menimbulkan konflik *timer* (`setInterval`/`requestAnimationFrame`) atau penggandaan langkah.

---

### F11 — Benchmark & Komparasi Algoritma

**Tujuan:** Memfasilitasi studi komparasi performa menyeluruh dengan mengeksekusi seluruh algoritma pada dataset yang sama secara serentak.

#### Antarmuka & Ruang Lingkup
- Terletak di dalam jendela retro bertema **Sky Blue** (`#AFCDE0`) dengan navigasi tab pemisah antara:
  1. **Komparasi CPU Scheduling**:
     - Menjalankan **FCFS vs SJF Non-Preemptive vs Round Robin** pada kumpulan proses yang sama.
     - Tabel perbandingan komparatif dengan kolom: Algoritma, Makespan, Rata-rata Waiting Time, Rata-rata Turnaround Time, dan Rata-rata Response Time.
     - Lencana rekomendasi pintar (*Smart Recommendation Badge*) yang menyorot algoritma dengan rata-rata waktu tunggu terendah.
  2. **Komparasi Page Replacement**:
     - Menjalankan **FIFO vs LRU vs Optimal** pada *reference string* dan kapasitas frame yang sama.
     - Tabel perbandingan komparatif dengan kolom: Algoritma, Page Fault, Page Hit, Hit Ratio (%), dan Fault Ratio (%).
     - Lencana rekomendasi performa untuk algoritma dengan Page Fault paling sedikit.

#### Kriteria Selesai
- Setiap algoritma dalam satu sesi perbandingan menerima salinan (*deep clone*) dataset input yang identik tanpa saling memengaruhi.
- Pembaruan pada form input simulator CPU atau Memori secara otomatis menyinkronkan data pembanding pada modul komparasi.
- Kesimpulan perbandingan disajikan secara objektif berbasis metrik matematis tanpa klaim sepihak.

---

### F12 — Log Penjelasan Keputusan Langkah

**Tujuan:** Menyediakan narasi logis terstruktur mengenai dasar penalaran algoritma pada setiap momen transisi eksekusi.

#### Format Konten Penjelasan
- **Pada CPU Scheduling**:
  - Contoh FCFS: *"Waktu t=4: Proses P2 mulai dieksekusi karena tiba paling awal (AT=1) di antara seluruh proses yang ada di antrean siap."*
  - Contoh SJF: *"Waktu t=7: CPU memilih proses P3 karena memiliki Burst Time tersisa paling kecil (BT=2) dibandingkan P1 (BT=6)."*
  - Contoh Round Robin: *"Waktu t=6: Kuantum waktu (Q=2) untuk P1 telah habis. P1 disela dengan sisa burst 4 dan dipindahkan ke ujung belakang antrean siap."*
  - Contoh CPU Idle: *"Waktu t=2: Tidak ada proses yang telah tiba di antrean siap. CPU berada dalam status IDLE hingga proses berikutnya (P1) tiba pada t=3."*
- **Pada Page Replacement**:
  - Contoh Page Hit: *"Halaman 0 diminta. Halaman 0 sudah tersedia di Frame 1 $\rightarrow$ PAGE HIT (tidak memerlukan operasi I/O pemuatan halaman)."*
  - Contoh Page Fault (Frame Kosong): *"Halaman 2 diminta. Frame 2 masih kosong $\rightarrow$ PAGE FAULT (Halaman 2 langsung dimuat ke Frame 2)."*
  - Contoh Page Fault (Penggantian FIFO): *"Halaman 4 diminta dan seluruh frame penuh. Halaman 7 digantikan dari Frame 0 karena merupakan halaman yang paling lama berada di memori (dimasukkan pada langkah 1)."*
  - Contoh Page Fault (Penggantian LRU): *"Halaman 3 diminta. Halaman 1 di Frame 2 digantikan karena paling lama tidak diakses kembali oleh CPU (terakhir diakses pada langkah 3)."*
  - Contoh Page Fault (Penggantian Optimal): *"Halaman 2 diminta. Halaman 7 digantikan karena pada referensi mendatang, halaman 7 tidak akan digunakan lagi."*

#### Kriteria Selesai
- Teks penjelasan diperbarui secara sinkron setiap kali langkah aktif berubah (baik melalui *Next Step*, *Step Back*, maupun pemutaran otomatis).
- Bahasa penjelasan komunikatif, menggunakan istilah baku Sistem Operasi, dan mudah dipahami oleh mahasiswa.

---

### F13 — Validasi Input & Sistem Notifikasi

**Tujuan:** Menjaga integritas data dan mencegah peramban mengalami galat kalkulasi (*unhandled runtime exceptions*).

#### Aturan Validasi Formal
1. **Validasi Input CPU**:
   - `Process ID`: Wajib diisi, karakter alfanumerik, tidak boleh duplikat dengan proses yang sudah ada di tabel.
   - `Arrival Time`: Wajib numerik bulat $\ge 0$.
   - `Burst Time`: Wajib numerik bulat $\ge 1$.
   - `Time Quantum` (Round Robin): Wajib numerik bulat $\ge 1$.
   - Batas Minimum: Simulasi tidak dapat dimulai jika jumlah proses dalam antrean $= 0$.
2. **Validasi Input Memori**:
   - `Reference String`: Wajib diisi, hanya boleh berisi angka yang dipisahkan oleh tanda koma `,` atau spasi. String tidak boleh kosong setelah proses pembersihan.
   - `Jumlah Frame`: Wajib numerik bulat dalam rentang $1 \le N \le 8$.

#### Perilaku Sistem saat Terjadi Galat
- Elemen form yang bermasalah diberikan penanda visual garis tepi merah retro (`#A43D46`).
- Kotak pesan notifikasi retro muncul menginformasikan secara spesifik letak dan penyebab kesalahan pengisian.
- Data yang telah valid tidak direset secara sepihak saat kesalahan pengisian terjadi.

---

## 4. Urutan Pengerjaan yang Disarankan

Pengerjaan proyek disarankan mengikuti alur modular 10 tahap agar arsitektur logika dan tampilan visual retro dapat dibangun secara kokoh dan terkendali:

```
[Tahap 1: Setup & Shell] ──> [Tahap 2: Navigasi & Materi] ──> [Tahap 3: Input CPU]
                                                                     │
[Tahap 6: Input Memori] <── [Tahap 5: Gantt Chart] <── [Tahap 4: Engine CPU]
         │
         ▼
[Tahap 7: Engine Memori] ──> [Tahap 8: Visual Matriks] ──> [Tahap 9: Stepper & Log]
                                                                     │
[Tahap 11: Laporan & Demo] <── [Tahap 10: Benchmark Lab] <───────────┘
```

### Tahap 1 — Fondasi Proyek, Konfigurasi Offline, & Kerangka Layar
1. Inisialisasi struktur berkas proyek sesuai standar: `index.html`, folder `css/`, `js/`, dan `assets/`.
2. Unduh dan pasang berkas font lokal (**Space Mono**, **JetBrains Mono**) ke `assets/fonts/`.
3. Pasang font ikon lokal (**Material Symbols Outlined**) ke `assets/iconts/`.
4. Deklarasikan token CSS `:root` pada `style.css` (palet warna dusty pink, surface krem, border arang pekat, dan retro shadow).
5. Pastikan halaman dapat dibuka secara mandiri (*standalone*) di peramban tanpa koneksi internet.

### Tahap 2 — Antarmuka Navigasi Ganda & Pusat Materi (F01, F02)
1. Bangun komponen Top Sticky Header (dengan jam digital dinamis), Floating Bottom Dock, dan Mobile Drawer.
2. Buat jendela Pusat Materi (`#C9B8E8`) dengan tab selektor CPU Scheduling dan Page Replacement.
3. Rancang diagram siklus proses dan antrean memori menggunakan elemen HTML/CSS semantik.
4. Uji kelancaran perpindahan modul secara instan (*single-page navigation*).

### Tahap 3 — Manajemen Input & Validasi CPU (F03, Bagian CPU F13)
1. Rancang form entri proses: Process ID, Arrival Time, Burst Time, dan tombol preset sampel data.
2. Bangun tabel antrean proses interaktif dengan aksi edit dan hapus baris.
3. Terapkan fungsi validasi masukan untuk mencegah ID duplikat, burst time nol, atau nilai negatif.

### Tahap 4 — Mesin Logika Algoritma CPU (F04)
1. Implementasikan algoritma FCFS di `js/algoritma/fcfs.js`.
2. Implementasikan Non-Preemptive SJF di `js/algoritma/sjf.js`.
3. Implementasikan Round Robin dengan kuantum dinamis di `js/algoritma/round-robin.js`.
4. Uji logika penanganan *CPU Idle Time* dan verifikasi hasil kalkulasi secara manual.

### Tahap 5 — Visualisasi Gantt Chart & Kalkulasi Metrik CPU (F05, F06)
1. Hubungkan output segmen eksekusi CPU ke modul visualisasi `js/visualization.js`.
2. Render Gantt Chart retro dengan blok berwarna pastel dan label sumbu waktu yang presisi.
3. Hitung metrik CT, TAT, WT, RT setiap proses dan tampilkan di tabel hasil serta kartu statistik.

### Tahap 6 — Manajemen Input & Validasi Page Replacement (F07, Bagian Memori F13)
1. Buat form masukan Reference String dan kapasitas Frame Memori di `memory-ui.js`.
2. Bangun parser pembersih string (pemisah koma/spasi) dan validasi batas jumlah frame ($1 \dots 8$).
3. Sediakan tombol preset string pengujian klasik (Belady Anomaly dan Standard Sample).

### Tahap 7 — Mesin Logika Algoritma Page Replacement (F08, F09)
1. Implementasikan FIFO di `js/algoritma/fifo.js`.
2. Implementasikan LRU di `js/algoritma/lru.js` dengan pencatatan riwayat pemakaian.
3. Implementasikan Optimal di `js/algoritma/optimal.js` dengan algoritma pemindaian masa depan (*lookahead*).
4. Hitung kuantitas Page Hit, Page Fault, Hit Ratio (%), dan Fault Ratio (%).

### Tahap 8 — Matriks Visualisasi Frame & Status Memori (F08, F09)
1. Rancang tabel visual matriks 2D frame memori per langkah referensi di `simulator.css`.
2. Tampilkan penanda status visual (badge hijau HIT dan badge merah FAULT).
3. Tambahkan penyorotan sel (*highlight*) pada frame yang mengalami pergantian halaman (*victim page*).

### Tahap 9 — Integrasi Kontrol Simulasi Bertahap & Log Keputusan (F10, F12)
1. Rancang bilah toolbar *stepper* retro (Start/Auto Play, Pause, Resume, Next Step, Step Back, Reset, Speed Slider).
2. Sinkronkan visualisasi Gantt Chart dan Matriks Memori agar dapat maju/mundur satu langkah secara konsisten.
3. Hubungkan panel catatan penjelasan (*decision log box*) untuk memaparkan alasan di balik setiap keputusan algoritma.

### Tahap 10 — Modul Benchmark Komparasi, Pengujian, & Finalisasi (F11)
1. Bangun jendela komparasi algoritma (`#AFCDE0`) untuk mengevaluasi FCFS vs SJF vs RR serta FIFO vs LRU vs Optimal secara simultan.
2. Tampilkan tabel perbandingan metrik komparatif beserta lencana rekomendasi performa terbaik.
3. Lakukan pengujian komprehensif pada berbagai skenario kasus ekstrem (*edge cases*).
4. Lengkapi dokumentasi teknis, laporan tugas akhir, dan video presentasi produk.

---

## 5. Struktur Berkas Proyek Aktual

Struktur berkas proyek diorganisasikan secara modular untuk memisahkan antara aset lokal, lembar gaya CSS, logika murni algoritma, dan pengendali visualisasi antarmuka:

```text
Mini OS Simulator_coba/
├── index.html                  # Berkas HTML utama (struktur Single-Page Application & window frames)
├── README.md                   # Dokumentasi umum repositori & petunjuk pengoperasian
├── FITUR.md                    # Dokumen spesifikasi fitur, tahapan, dan panduan teknis (berkas ini)
├── DESAIN.md                   # Dokumen acuan desain visual Retro Desktop System Lab & token CSS
│
├── assets/                     # Direktori aset lokal (100% mandiri, bebas CDN eksternal)
│   ├── fonts/                  # Berkas font lokal self-hosted
│   │   ├── JetBrainsMono.woff2         # Font monospace pembaca data kode & tabel
│   │   ├── SpaceMono-Regular.woff2     # Font retro judul & tombol reguler
│   │   ├── SpaceMono-Bold.woff2        # Font retro judul tebal berkarakter
│   │   └── VCR_OSD_MONO_1.001.ttf      # Font display digital retro
│   ├── iconts/                 # Berkas ikon font lokal self-hosted
│   │   ├── Logo.png                    # Berkas logo grafis retro workstation
│   │   └── MaterialSymbolsOutlined.woff2 # Font ikon ligatur simbol Google
│   └── image/                  # Berkas ilustrasi & aset grafis tambahan
│       └── .gitkeep
│
├── css/                        # Lembar gaya modular
│   ├── style.css               # Gaya global, token warna retro :root, window frame, header, dock
│   ├── materi.css              # Gaya spesifik modul materi OS, diagram antrean, & tab navigasi
│   └── simulator.css           # Gaya form simulator, Gantt Chart, matriks frame, & kartu metrik
│
└── js/                         # Skrip JavaScript modular (Vanilla JS ES6+)
    ├── app.js                  # Inisialisasi utama, sinkronisasi navigasi, jam digital, drawer mobile
    ├── cpu-ui.js               # Pengendali form input proses CPU, tabel proses, & event handler
    ├── memory-ui.js            # Pengendali form input memori, reference string parser, & event handler
    ├── comparison.js           # Pengendali komparasi performa multi-algoritma berdampingan
    ├── visualization.js        # Utilitas rendering visual: Gantt Chart, matriks memori, & stepper engine
    └── algoritma/              # Logika murni matematika & algoritma (decoupled dari antarmuka DOM)
        ├── fcfs.js             # Implementasi algoritma First-Come, First-Served
        ├── sjf.js              # Implementasi algoritma Shortest Job First (Non-Preemptive)
        ├── round-robin.js      # Implementasi algoritma Round Robin dengan kuantum dinamis
        ├── fifo.js             # Implementasi algoritma First-In, First-Out
        ├── lru.js              # Implementasi algoritma Least Recently Used
        └── optimal.js          # Implementasi algoritma Optimal (Belady's Min)
```

---

## 6. Rencana Pengembangan Terjadwal (4 Minggu)

| Periode | Fokus Pengerjaan | Target Luaran (*Deliverables*) |
|---|---|---|
| **Minggu 1** | Setup arsitektur berkas, font/ikon offline lokal, token CSS retro, navigasi ganda (Header & Dock), dan modul Pusat Materi OS. | Kerangka dasar SPA selesai, aset 100% offline berjalan, materi CPU & Memori tampil lengkap beserta ilustrasi. |
| **Minggu 2** | Modul CPU Scheduling: Form input proses, validasi data, algoritma FCFS, SJF Non-Preemptive, Round Robin, visualisasi Gantt Chart, dan tabel metrik. | Simulator CPU Scheduling berfungsi penuh dengan kalkulasi metrik CT, TAT, WT, RT yang terverifikasi. |
| **Minggu 3** | Modul Page Replacement: Form reference string, parser koma/spasi, algoritma FIFO, LRU, Optimal, visualisasi matriks 2D frame memori, dan metrik Fault/Hit. | Simulator Page Replacement berfungsi penuh dengan status HIT/FAULT dan indikator pembaruan frame yang jelas. |
| **Minggu 4** | Kontrol bertahap (*stepper toolbar*), log penjelasan keputusan langkah, modul komparasi algoritma (*benchmark*), pengujian kasus ekstrem, dokumentasi, dan video demo. | Aplikasi tuntas 100%, bebas *bug*, dokumen `FITUR.md` & `DESAIN.md` sinkron, laporan akhir dan video presentasi siap diserahkan. |

---

## 7. Checklist Kelayakan & Progres Implementasi

Gunakan daftar periksa (*checklist*) ini untuk memverifikasi kelengkapan seluruh fitur aplikasi:

### Fondasi & Antarmuka Retro
- [x] Struktur berkas dan folder proyek tertata rapi.
- [x] Berkas font (`Space Mono`, `JetBrains Mono`) dan ikon (`MaterialSymbolsOutlined`) tersimpan dan dimuat lokal dari `assets/`.
- [x] Tidak ada ketergantungan link eksternal / CDN luar (100% *Offline Capable*).
- [x] Desain retro desktop dengan pola *polka-dot* dusty pink (`#E8A9B8`), bingkai jendela vintage, dan bayangan keras (*hard shadow*) terpasang konsisten.
- [x] Bilah atas (*Top Sticky Header*) menampilkan judul sistem, status lencana, dan jam digital *real-time* `HH:MM:SS`.
- [x] Bilah dok melayang (*Floating Pill Bottom Dock*) berfungsi mulus untuk berpindah modul.
- [x] Menu drawer responsif berfungsi dengan baik pada layar ponsel/tablet.
- [x] Modul Pusat Materi OS menyajikan materi CPU Scheduling dan Page Replacement disertai diagram alur konsep.

### CPU Scheduling
- [x] Form input proses (Process ID, Arrival Time, Burst Time) berfungsi dengan validasi lengkap.
- [x] Fitur penambahan, pengeditan, penghapusan data baris proses pada tabel berfungsi normal.
- [x] Tombol pemuatan dataset sampel (*preset sample*) berfungsi memuat data uji secara instan.
- [x] Algoritma FCFS menghasilkan urutan linimasa eksekusi yang benar.
- [x] Algoritma SJF Non-Preemptive menghasilkan urutan eksekusi yang benar.
- [x] Algoritma Round Robin menangani antrean siap (*ready queue*) dan pemotongan kuantum secara tepat.
- [x] Kondisi CPU Idle tertangani dan divisualisasikan secara eksplisit.
- [x] Visualisasi Gantt Chart retro merender blok proses dengan warna pastel kontras dan label waktu yang presisi.
- [x] Perhitungan Completion Time (CT), Turnaround Time (TAT), Waiting Time (WT), dan Response Time (RT) akurat beserta nilai rata-ratanya.

### Page Replacement
- [x] Form input Reference String mendukung pemisah koma maupun spasi secara fleksibel.
- [x] Konfigurasi alokasi frame memori fisik tervalidasi pada rentang $1 \le \text{Frame} \le 8$.
- [x] Tombol preset string pengujian klasik (Belady Anomaly & Standard Sample) berfungsi dengan baik.
- [x] Algoritma FIFO menggantikan halaman tertua secara tepat.
- [x] Algoritma LRU menggantikan halaman yang paling lama tidak diakses secara tepat.
- [x] Algoritma Optimal menggantikan halaman dengan jarak pemakaian masa depan paling jauh secara tepat.
- [x] Matriks visualisasi 2D frame memori menampilkan riwayat langkah per langkah secara terstruktur.
- [x] Penanda badge visual HIT (hijau) dan FAULT (merah bata) tampil akurat.
- [x] Slot frame yang mengalami pembaruan halaman (*victim page*) memiliki penyorotan visual khusus.
- [x] Perhitungan kuantitatif Page Fault, Page Hit, Hit Ratio (%), dan Fault Ratio (%) akurat 100%.

### Fitur Lanjutan & Benchmark
- [x] Toolbar *stepper* interaktif (Auto Play, Pause, Resume, Next Step, Step Back, Reset) beroperasi mulus.
- [x] Slider pengatur kecepatan animasi menyesuaikan tempo pemutaran simulasi otomatis secara dinamis.
- [x] Kotak log penjelasan keputusan langkah menampilkan narasi penalaran yang sinkron dengan langkah aktif.
- [x] Modul Benchmark Komparasi mengeksekusi multi-algoritma secara simultan menggunakan dataset yang identik.
- [x] Tabel komparasi menampilkan perbandingan metrik kunci CPU (Avg. WT, Avg. TAT, Avg. RT) dan Memori (Page Fault, Page Hit, Hit Ratio).
- [x] Lencana rekomendasi pintar menyoroti algoritma dengan efisiensi performa terbaik.
- [x] Validasi input mencegah crash sistem dan menampilkan pesan galat bergaya retro yang komunikatif.

---

## 8. Prinsip Rekayasa Perangkat Lunak

1. **Pemisahan Logika Bisnis & Tampilan Visual (*Decoupling*)**: Berkas algoritma di dalam `js/algoritma/` dirancang murni (*pure functions*) yang menerima parameter data mentah dan mengembalikan struktur data riwayat langkah (*state history array*). Tidak diperkenankan melakukan manipulasi DOM langsung di dalam berkas algoritma.
2. **Determinisme & Keandalan Benchmark**: Setiap simulasi komparasi wajib beroperasi pada salinan objek data yang independen (*deep clone*) agar eksekusi satu algoritma tidak memodifikasi atau mengontaminasi status algoritma lainnya.
3. **Kemandirian Penuh (*Self-Containment & Zero External Dependencies*)**: Seluruh dependensi, termasuk berkas font tipografi dan font glif ikon, wajib di-hosting secara mandiri di repositori lokal. Sistem tidak boleh bergantung pada jaringan pihak ketiga (*third-party CDN*) yang rentan terhadap pemblokiran jaringan atau masalah konektivitas saat demonstrasi luring.
4. **Desain Aksesibel & Kontras Tinggi**: Meskipun mengusung tema retro workstation klasik, seluruh elemen teks, tabel data, label Gantt Chart, dan matriks frame memori wajib memenuhi standar rasio kontras warna yang nyaman dibaca (*WCAG standard*) guna mendukung efektivitas pembelajaran mahasiswa.
5. **Kejujuran Evaluasi Akademik**: Simulator memaparkan kelebihan dan kekurangan masing-masing algoritma secara transparan berdasarkan metrik matematis nyata, tanpa membuat klaim universal bahwa satu algoritma selalu lebih unggul dari algoritma lainnya pada semua variasi kasus.
