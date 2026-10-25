# FITUR.md — Mini OS Simulator

Dokumen ini menjadi panduan fitur dan urutan pengerjaan proyek **Mini OS Simulator** untuk UAS Sistem Operasi. Aplikasi dibuat menggunakan **HTML, CSS, dan JavaScript murni (Vanilla JavaScript)** tanpa framework.

## 1. Gambaran Umum

Mini OS Simulator adalah aplikasi edukasi yang menyediakan halaman materi bergambar, simulasi interaktif, dan perbandingan algoritma untuk dua topik Sistem Operasi:

1. **CPU Scheduling**: FCFS, SJF Non-Preemptive, dan Round Robin.
2. **Page Replacement**: FIFO, LRU, dan Optimal.

Pengguna dapat memasukkan data sendiri, menjalankan simulasi, melihat urutan proses atau perubahan isi frame, memahami alasan keputusan algoritma, serta membandingkan hasil dan metriknya.

### Tujuan aplikasi

- Membantu pengguna memahami cara kerja enam algoritma Sistem Operasi.
- Memvisualisasikan setiap langkah simulasi.
- Menunjukkan metrik hasil setiap algoritma agar hasilnya dapat dibandingkan.

### Batasan versi proyek

- Tidak menggunakan login, akun pengguna, atau database.
- Data simulasi berasal dari input pengguna atau contoh yang disediakan aplikasi.
- SJF yang digunakan adalah **Non-Preemptive SJF**.
- Round Robin menggunakan **Time Quantum** yang dapat diubah pengguna.
- Simulasi berjalan di browser dan tidak mengubah proses atau memori komputer yang sebenarnya.

---

## 2. Daftar Fitur

| ID | Fitur | Prioritas | Keterangan |
|---|---|---|---|
| F01 | Halaman Materi | Wajib | Halaman belajar dengan pilihan materi CPU Scheduling dan Page Replacement, dilengkapi ilustrasi |
| F02 | Navigasi sidebar | Wajib | Navigasi ke Materi, CPU Scheduling, Page Replacement, dan Perbandingan |
| F03 | Input proses | Wajib | Menambah, mengubah, dan menghapus data proses |
| F04 | Pemilihan algoritma CPU | Wajib | Memilih FCFS, SJF, atau Round Robin |
| F05 | Gantt Chart | Wajib | Menampilkan urutan dan rentang waktu eksekusi CPU |
| F06 | Metrik CPU | Wajib | Menghitung CT, TAT, WT, RT, serta nilai rata-rata |
| F07 | Input referensi halaman | Wajib | Mengisi reference string dan jumlah frame |
| F08 | Simulasi page replacement | Wajib | Menampilkan kondisi frame pada setiap referensi |
| F09 | Metrik memori | Wajib | Menghitung page fault, page hit, dan hit ratio |
| F10 | Kontrol simulasi | Pengembangan | Start, Pause, Resume, Next Step, dan Reset |
| F11 | Perbandingan algoritma | Wajib | Membandingkan algoritma menggunakan input yang sama |
| F12 | Penjelasan langkah | Pengembangan | Menjelaskan alasan pemilihan proses atau penggantian halaman |
| F13 | Validasi input | Wajib | Mencegah data kosong atau tidak valid |

Prioritas dapat disesuaikan dengan waktu pengerjaan. Fitur inti sebaiknya diselesaikan terlebih dahulu sebelum menambahkan animasi atau penyempurnaan visual.

---

## 3. Detail Fitur dan Langkah Penggunaan

## F01 — Halaman Materi

**Tujuan:** Menjadi pusat belajar sebelum pengguna mencoba simulasi. Halaman ini menyajikan konsep Sistem Operasi dengan penjelasan singkat dan banyak ilustrasi yang membantu memahami alur, bukan sekadar teks panjang.

### Pilihan materi
1. **Materi CPU Scheduling** — pengertian proses dan penjadwalan CPU, tujuan scheduling, cara kerja FCFS, SJF Non-Preemptive, dan Round Robin, contoh antrean proses, contoh Gantt Chart, serta penjelasan metrik CT, TAT, WT, dan RT.
2. **Materi Page Replacement** — pengertian page, frame, reference string, page hit, page fault, serta ilustrasi langkah FIFO, LRU, dan Optimal.

### Bentuk konten dan ilustrasi
- Diagram alur sederhana untuk menjelaskan proses kerja algoritma.
- Ilustrasi antrean proses dan CPU untuk materi scheduling.
- Contoh Gantt Chart dengan penanda waktu.
- Ilustrasi frame memori yang berubah dari satu referensi halaman ke referensi berikutnya.
- Tabel kecil berisi contoh input dan hasil, disertai keterangan.
- Ringkasan konsep penting dan tombol menuju modul simulasi terkait.

Ilustrasi harus menjelaskan konsep yang sedang dibahas. Hindari gambar dekoratif yang tidak membantu pembelajaran.

### Langkah penggunaan
1. Pengguna membuka menu **Materi** pada sidebar.
2. Aplikasi menampilkan pengantar singkat dan dua pilihan materi.
3. Pengguna memilih **CPU Scheduling** atau **Page Replacement**.
4. Aplikasi menampilkan materi dalam bagian-bagian terstruktur dengan ilustrasi, contoh, dan ringkasan.
5. Pengguna dapat membuka halaman simulasi yang sesuai melalui tombol seperti **Coba Simulasi CPU** atau **Coba Simulasi Page Replacement**.

### Kriteria selesai
- Halaman Materi memiliki dua pilihan materi yang jelas.
- Setiap materi memuat penjelasan konsep dan ilustrasi yang relevan.
- Ilustrasi dan contoh sesuai dengan konsep yang diterangkan.
- Terdapat jalur yang jelas dari materi menuju simulasi terkait.
- Tampilan nyaman dibaca di desktop dan layar kecil.

## F02 — Navigasi Sidebar

**Tujuan:** Memudahkan pengguna berpindah ke empat bagian utama aplikasi.

### Menu sidebar
1. **Materi** — pusat belajar dan pilihan dua topik.
2. **CPU Scheduling** — halaman simulasi FCFS, SJF, dan Round Robin.
3. **Page Replacement** — halaman simulasi FIFO, LRU, dan Optimal.
4. **Perbandingan** — perbandingan metrik seluruh algoritma dalam kedua topik.

### Langkah penggunaan
1. Pengguna memilih menu pada sidebar.
2. Aplikasi menampilkan halaman yang sesuai tanpa memuat ulang seluruh aplikasi secara tidak perlu.
3. Menu aktif diberi penanda visual.
4. Dari halaman Materi, pengguna juga dapat masuk ke simulasi melalui tombol terkait.

### Kriteria selesai
- Keempat menu berfungsi dan konsisten.
- Menu aktif mudah dikenali.
- Navigasi dapat digunakan pada desktop dan layar kecil.
- Tidak ada menu Dashboard terpisah; halaman Materi menjadi titik awal aplikasi.

## F03 — Input Data Proses

**Tujuan:** Menyediakan data yang akan diproses oleh algoritma CPU Scheduling.

### Data setiap proses
- **Process ID**: identitas proses, misalnya P1.
- **Arrival Time (AT)**: waktu ketika proses tiba dalam antrean.
- **Burst Time (BT)**: jumlah waktu CPU yang dibutuhkan proses.

### Langkah penggunaan
1. Pengguna membuka modul CPU Scheduling.
2. Pengguna mengisi Process ID, Arrival Time, dan Burst Time.
3. Pengguna menekan tombol **Tambah Proses**.
4. Data proses muncul pada tabel.
5. Pengguna dapat mengubah atau menghapus proses jika tersedia kontrol edit dan hapus.
6. Pengguna memeriksa kembali data sebelum menjalankan simulasi.

### Aturan input
- Process ID wajib diisi dan tidak boleh duplikat.
- Arrival Time harus berupa angka bulat nol atau lebih.
- Burst Time harus berupa angka bulat lebih dari nol.
- Minimal terdapat satu proses.
- Data yang tidak valid tidak boleh masuk ke tabel.

### Kriteria selesai
- Pengguna dapat menambah proses.
- Data yang ditampilkan sesuai dengan input.
- Edit dan hapus memperbarui tabel dengan benar.
- Validasi menampilkan pesan yang mudah dipahami.

## F04 — Pemilihan Algoritma CPU Scheduling

**Tujuan:** Memungkinkan pengguna menjalankan algoritma CPU yang berbeda pada kumpulan proses yang sama.

### Algoritma yang tersedia
1. **FCFS (First Come, First Served)**: proses yang lebih dahulu siap akan dilayani lebih dahulu.
2. **SJF Non-Preemptive (Shortest Job First)**: ketika CPU akan memilih proses baru, proses siap dengan Burst Time terpendek dipilih. Setelah mulai berjalan, proses tersebut berjalan sampai selesai.
3. **Round Robin (RR)**: proses mendapat giliran CPU selama paling lama sebesar Time Quantum, kemudian dapat kembali ke antrean jika belum selesai.

### Langkah penggunaan
1. Pengguna memasukkan data proses.
2. Pengguna memilih FCFS, SJF, atau Round Robin.
3. Jika memilih Round Robin, pengguna mengisi Time Quantum.
4. Pengguna menekan tombol **Jalankan Simulasi**.
5. Aplikasi menghitung hasil berdasarkan algoritma yang dipilih.
6. Hasil ditampilkan pada Gantt Chart dan tabel metrik.

### Aturan khusus
- Time Quantum wajib berupa bilangan bulat lebih dari nol untuk Round Robin.
- Time Quantum tidak diperlukan untuk FCFS dan SJF.
- Semua algoritma perbandingan harus menggunakan salinan input proses yang sama.
- Jika tidak ada proses yang siap, simulasi perlu menangani waktu CPU menganggur (*idle time*).

### Kriteria selesai
- Ketiga algoritma menghasilkan urutan eksekusi yang sesuai dengan aturannya.
- Input Round Robin ditolak jika Time Quantum tidak valid.
- Data awal pengguna tidak berubah hanya karena simulasi dijalankan.

## F05 — Gantt Chart CPU

**Tujuan:** Memvisualisasikan kapan setiap proses menggunakan CPU.

### Informasi yang ditampilkan
- Label proses, misalnya P1 atau P2.
- Waktu mulai dan waktu selesai setiap segmen.
- Segmen **Idle** jika tidak ada proses yang siap.
- Skala waktu yang konsisten.

### Langkah penggunaan
1. Pengguna menjalankan algoritma CPU Scheduling.
2. Aplikasi menghitung urutan eksekusi dan waktu setiap segmen.
3. Aplikasi menggambar Gantt Chart dari hasil perhitungan.
4. Pengguna membaca urutan proses dan rentang waktunya.
5. Pengguna dapat membandingkan Gantt Chart setelah mengganti algoritma.

### Kriteria selesai
- Urutan blok sesuai hasil algoritma.
- Waktu mulai dan selesai ditampilkan dengan benar.
- Waktu idle tidak disamarkan sebagai waktu eksekusi proses.
- Gantt Chart diperbarui ketika simulasi baru dijalankan.

## F06 — Metrik CPU Scheduling

**Tujuan:** Menunjukkan hasil perhitungan setiap proses dan nilai rata-rata untuk mengevaluasi algoritma.

### Metrik dan rumus

| Metrik | Singkatan | Rumus | Arti |
|---|---|---|---|
| Completion Time | CT | Waktu proses selesai | Waktu saat proses selesai dieksekusi |
| Turnaround Time | TAT | `CT - AT` | Total waktu sejak proses tiba sampai selesai |
| Waiting Time | WT | `TAT - BT` | Total waktu proses menunggu di antrean |
| Response Time | RT | `Waktu mulai pertama - AT` | Waktu dari kedatangan sampai pertama kali mendapat CPU |

Nilai rata-rata dihitung dengan menjumlahkan nilai suatu metrik semua proses lalu membaginya dengan jumlah proses.

### Langkah penggunaan
1. Pengguna menjalankan simulasi CPU.
2. Aplikasi menghitung CT, TAT, WT, dan RT untuk setiap proses.
3. Aplikasi menampilkan hasil per proses dalam tabel.
4. Aplikasi menghitung dan menampilkan rata-rata setiap metrik.
5. Pengguna menggunakan hasil tersebut untuk membandingkan algoritma.

### Kriteria selesai
- Setiap proses memiliki nilai metrik.
- Rumus diterapkan konsisten.
- Rata-rata sesuai dengan nilai pada tabel.
- Hasil diperbarui setelah input atau algoritma berubah.

## F07 — Input Page Reference

**Tujuan:** Menyediakan data halaman yang akan digunakan untuk simulasi Page Replacement.

### Data input
- **Reference String**: urutan halaman yang diminta, misalnya `7, 0, 1, 2, 0, 3, 0, 4`.
- **Jumlah Frame**: jumlah slot memori yang tersedia untuk menampung halaman.

### Langkah penggunaan
1. Pengguna membuka modul Page Replacement.
2. Pengguna mengisi reference string.
3. Pengguna memasukkan jumlah frame.
4. Pengguna menekan tombol **Jalankan Simulasi**.
5. Aplikasi memvalidasi input dan membuat urutan permintaan halaman.

### Aturan input
- Reference string wajib diisi.
- Setiap nilai halaman harus berupa bilangan bulat nol atau lebih.
- Pemisah antarhalaman dapat berupa koma atau spasi, tetapi format yang diterima harus konsisten.
- Jumlah frame harus berupa bilangan bulat lebih dari nol.
- Reference string yang gagal diparsing tidak boleh dijalankan.

### Kriteria selesai
- Input berhasil diubah menjadi daftar halaman.
- Jumlah frame divalidasi.
- Input tidak valid menghasilkan pesan yang jelas.

## F08 — Simulasi Page Replacement

**Tujuan:** Memperlihatkan isi frame setelah setiap halaman diminta dan keputusan algoritma ketika frame penuh.

### Algoritma yang tersedia
1. **FIFO (First In, First Out)**: mengganti halaman yang paling dahulu masuk ke memori.
2. **LRU (Least Recently Used)**: mengganti halaman yang paling lama tidak digunakan.
3. **Optimal**: mengganti halaman yang pemakaian berikutnya paling jauh di masa depan, atau tidak digunakan lagi. Algoritma ini digunakan sebagai pembanding teoretis karena membutuhkan pengetahuan atas urutan referensi berikutnya.

### Informasi setiap langkah
- Nomor langkah.
- Halaman yang diminta.
- Isi setiap frame setelah permintaan.
- Status **Page Hit** atau **Page Fault**.
- Halaman yang diganti jika terjadi penggantian.

### Langkah penggunaan
1. Pengguna memasukkan reference string dan jumlah frame.
2. Pengguna memilih FIFO, LRU, atau Optimal.
3. Aplikasi memproses halaman sesuai urutan input.
4. Setelah setiap referensi, aplikasi menyimpan kondisi seluruh frame.
5. Aplikasi menandai Page Hit atau Page Fault.
6. Jika frame penuh dan halaman yang diminta belum ada, aplikasi menentukan halaman yang diganti berdasarkan algoritma.
7. Aplikasi menampilkan tabel atau visualisasi urutan langkah.

### Kriteria selesai
- Kondisi frame ditampilkan setelah setiap referensi.
- Page Hit dan Page Fault ditandai dengan benar.
- Halaman yang diganti sesuai dengan aturan algoritma.
- Algoritma menggunakan reference string dan jumlah frame yang sama saat dibandingkan.

## F09 — Metrik Page Replacement

**Tujuan:** Merangkum jumlah keberhasilan dan kegagalan pencarian halaman dalam frame.

### Metrik dan rumus

| Metrik | Rumus | Arti |
|---|---|---|
| Page Fault | Jumlah referensi yang tidak ditemukan di frame | Halaman perlu dimuat ke frame; jika frame penuh, mungkin terjadi penggantian |
| Page Hit | Jumlah referensi yang sudah tersedia di frame | Halaman ditemukan tanpa perlu dimuat ulang |
| Hit Ratio | `(Page Hit / Total Reference) × 100%` | Persentase referensi yang menjadi hit |
| Fault Ratio | `(Page Fault / Total Reference) × 100%` | Persentase referensi yang menjadi fault |

Jumlah Page Hit ditambah Page Fault harus sama dengan total halaman dalam reference string.

### Langkah penggunaan
1. Pengguna menjalankan simulasi Page Replacement.
2. Aplikasi menghitung Page Hit dan Page Fault.
3. Aplikasi menghitung Hit Ratio dan Fault Ratio.
4. Aplikasi menampilkan metrik di dekat tabel langkah.
5. Pengguna membandingkan hasil dari algoritma yang berbeda.

### Kriteria selesai
- Total hit dan fault sesuai dengan jumlah referensi.
- Rasio ditampilkan dalam format persentase yang konsisten.
- Hasil metrik diperbarui untuk simulasi baru.

## F10 — Kontrol Simulasi Bertahap

**Tujuan:** Memberikan kendali kepada pengguna agar proses algoritma dapat dipelajari satu langkah demi satu langkah.

### Kontrol
- **Start**: memulai simulasi.
- **Pause**: menghentikan sementara simulasi otomatis.
- **Resume**: melanjutkan simulasi yang dijeda.
- **Next Step**: maju satu langkah.
- **Reset**: kembali ke keadaan awal simulasi.

### Langkah penggunaan
1. Pengguna mengisi input dan memilih algoritma.
2. Pengguna menekan Start atau Next Step.
3. Aplikasi menampilkan keadaan pada langkah saat ini.
4. Pengguna dapat menekan Pause untuk berhenti sementara.
5. Pengguna menekan Resume untuk melanjutkan, atau Next Step untuk maju manual.
6. Pengguna menekan Reset untuk mengulang simulasi dari awal.

### Kriteria selesai
- Next Step hanya memajukan satu langkah.
- Pause benar-benar menghentikan gerak otomatis.
- Resume melanjutkan dari posisi terakhir, bukan mengulang dari awal.
- Reset mengembalikan frame/urutan dan metrik ke kondisi awal.
- Kontrol tidak menyebabkan langkah ganda atau hasil perhitungan berubah.

**Catatan implementasi:** fitur ini dapat dikerjakan setelah perhitungan algoritma dasar selesai. Fungsi algoritma sebaiknya menghasilkan daftar langkah terlebih dahulu, lalu UI menampilkan langkah-langkah tersebut.

## F11 — Perbandingan Algoritma

**Tujuan:** Memudahkan pengguna membandingkan hasil beberapa algoritma secara adil.

### Perbandingan CPU Scheduling
Semua algoritma menggunakan kumpulan proses yang sama: **FCFS, SJF Non-Preemptive, dan Round Robin**. Perbandingan wajib menampilkan:
- **Rata-rata Waiting Time (Avg. WT)**.
- **Rata-rata Turnaround Time (Avg. TAT)**.

Untuk membantu penjelasan tambahan, aplikasi boleh menampilkan rata-rata Response Time dan Gantt Chart, tetapi dua metrik wajib di atas harus selalu ada.

### Perbandingan Page Replacement
Semua algoritma menggunakan reference string dan jumlah frame yang sama: **FIFO, LRU, dan Optimal**. Perbandingan wajib menampilkan:
- **Page Hit** (jumlah).
- **Page Fault** (jumlah).

Hit Ratio dan Fault Ratio boleh ditampilkan sebagai metrik tambahan, tetapi tidak menggantikan Page Hit dan Page Fault.

### Bentuk tampilan perbandingan lengkap
- Sediakan pilihan bagian **CPU Scheduling** dan **Page Replacement** di halaman Perbandingan.
- Masing-masing bagian menampilkan seluruh algoritma untuk topik tersebut, bukan hanya algoritma yang sedang dipilih di halaman simulasi.
- Tampilkan tabel komparasi dengan kolom metrik wajib.
- Gunakan grafik batang terpisah bila membantu, dengan label dan satuan yang jelas.
- Berikan penanda hasil terbaik hanya jika berdasarkan metrik yang jelas: nilai rata-rata WT/TAT lebih rendah untuk metrik tersebut; Page Fault lebih sedikit atau Page Hit lebih banyak untuk data referensi yang sama. Jangan menyatakan satu algoritma selalu terbaik untuk semua input.

### Langkah penggunaan
1. Pengguna membuka menu **Perbandingan**.
2. Pengguna memilih bagian CPU Scheduling atau Page Replacement.
3. Aplikasi menggunakan input yang sama untuk seluruh algoritma dalam bagian tersebut. Jika input belum tersedia, aplikasi meminta pengguna mengisi input atau mengarahkan pengguna ke modul terkait.
4. Aplikasi menghitung hasil semua algoritma dan menampilkan tabel lengkap.
5. Bagian CPU menampilkan rata-rata WT dan rata-rata TAT untuk FCFS, SJF, dan Round Robin.
6. Bagian Page Replacement menampilkan Page Hit dan Page Fault untuk FIFO, LRU, dan Optimal.
7. Pengguna dapat mengubah input dan menjalankan ulang perbandingan.

### Kriteria selesai
- Semua algoritma dalam satu perbandingan menerima input yang setara.
- CPU Scheduling selalu menampilkan Avg. WT dan Avg. TAT untuk FCFS, SJF, dan Round Robin.
- Page Replacement selalu menampilkan Page Hit dan Page Fault untuk FIFO, LRU, dan Optimal.
- Metrik ditampilkan dalam tabel dengan format yang jelas.
- Perbandingan diperbarui ketika input berubah.
- Penanda hasil terbaik didasarkan pada metrik tertentu, bukan klaim universal.

## F12 — Penjelasan Setiap Langkah

**Tujuan:** Membantu pengguna memahami alasan di balik keputusan algoritma.

### Contoh penjelasan CPU
- FCFS: proses ini dipilih karena memiliki waktu kedatangan paling awal di antara proses yang siap.
- SJF: proses ini dipilih karena memiliki Burst Time paling pendek di antara proses yang siap.
- Round Robin: proses berjalan selama paling lama satu Time Quantum; jika belum selesai, proses kembali ke antrean.

### Contoh penjelasan Page Replacement
- FIFO: halaman tertentu diganti karena merupakan halaman yang paling dahulu masuk ke frame.
- LRU: halaman tertentu diganti karena paling lama tidak digunakan.
- Optimal: halaman tertentu diganti karena pemakaian berikutnya paling jauh di masa depan atau tidak muncul lagi.

### Langkah penggunaan
1. Pengguna menjalankan simulasi.
2. Pengguna memilih atau melihat salah satu langkah.
3. Aplikasi menampilkan penjelasan yang terkait dengan keputusan pada langkah tersebut.
4. Saat pengguna maju ke langkah berikutnya, penjelasan ikut diperbarui.

### Kriteria selesai
- Penjelasan sesuai dengan data dan keputusan algoritma.
- Penjelasan tidak hanya menampilkan nama algoritma.
- Untuk Optimal, penjelasan dapat melihat referensi yang tersisa dalam input.

## F13 — Validasi Input dan Penanganan Kesalahan

**Tujuan:** Mencegah simulasi dijalankan dengan input yang tidak dapat diproses.

### Validasi CPU
- Process ID kosong atau duplikat.
- Arrival Time kosong, bukan angka, negatif, atau bukan bilangan bulat.
- Burst Time kosong, bukan angka, negatif, nol, atau bukan bilangan bulat.
- Tidak ada proses.
- Time Quantum kosong, nol, negatif, atau bukan bilangan bulat saat RR dipilih.

### Validasi Page Replacement
- Reference string kosong.
- Nilai halaman bukan bilangan bulat nol atau lebih.
- Jumlah frame kosong, nol, negatif, atau bukan bilangan bulat.
- Format reference string tidak dikenali.

### Langkah penggunaan
1. Pengguna mengisi data.
2. Saat menekan tombol tambah atau jalankan, aplikasi memvalidasi input.
3. Jika input valid, proses dilanjutkan.
4. Jika input tidak valid, aplikasi menampilkan pesan dekat kolom atau di area pesan.
5. Input yang valid sebelumnya tidak perlu dihapus hanya karena satu nilai salah.

### Kriteria selesai
- Input invalid tidak menyebabkan aplikasi crash.
- Pesan menjelaskan kolom yang bermasalah.
- Validasi dilakukan sebelum algoritma dijalankan.

---

## 4. Urutan Pengerjaan yang Disarankan

Pengerjaan dilakukan bertahap agar struktur proyek dan konsep algoritma dapat dipahami sebelum visualisasi dibuat.

### Tahap 1 — Persiapan proyek dan kerangka halaman
**Target:** aplikasi dapat dibuka dan navigasi dasar berfungsi.

1. Buat folder utama `mini-os-simulator`.
2. Buat `index.html` dan `README.md`.
3. Buat folder `css/`, `js/`, dan `assets/`.
4. Di dalam `assets/`, buat `images/`, `icons/`, dan `fonts/`.
5. Buat file CSS: `style.css`, `materi.css`, dan `simulator.css`.
6. Hubungkan CSS ke `index.html`.
7. Buat kerangka halaman Materi dan menu sidebar.
8. Uji halaman melalui browser.

**Selesai jika:** halaman tampil, CSS terhubung, dan menu utama dapat digunakan.

### Tahap 2 — Halaman Materi dan navigasi
**Target:** F01 dan F02.

1. Susun header, deskripsi, dan kartu modul.
2. Buat bagian Materi, CPU Scheduling, Page Replacement, dan Perbandingan.
3. Hubungkan tombol menu dengan bagian yang sesuai menggunakan JavaScript.
4. Beri penanda pada menu aktif.
5. Uji perpindahan menu.

### Tahap 3 — Input CPU dan validasi
**Target:** F03 dan bagian CPU dari F13.

1. Buat form Process ID, Arrival Time, dan Burst Time.
2. Buat tabel daftar proses.
3. Implementasikan tambah proses.
4. Implementasikan edit dan hapus.
5. Tambahkan validasi input.
6. Uji dengan input valid dan tidak valid.

### Tahap 4 — Algoritma CPU
**Target:** F04 dan perhitungan dasar F06.

1. Pelajari aturan FCFS dan uji secara manual dengan contoh kecil.
2. Implementasikan FCFS sebagai fungsi terpisah.
3. Implementasikan SJF Non-Preemptive.
4. Implementasikan Round Robin dan Time Quantum.
5. Tangani Arrival Time serta waktu CPU idle.
6. Periksa hasil menggunakan contoh yang dihitung secara manual.

### Tahap 5 — Visualisasi dan metrik CPU
**Target:** F05 dan F06.

1. Simpan hasil algoritma sebagai data segmen eksekusi.
2. Gambar Gantt Chart dari data hasil tersebut.
3. Hitung CT, TAT, WT, dan RT setiap proses.
4. Hitung nilai rata-rata.
5. Tampilkan tabel metrik.
6. Uji apakah hasil berubah dengan benar ketika algoritma atau input diganti.

### Tahap 6 — Input dan validasi Page Replacement
**Target:** F07 dan bagian memori dari F13.

1. Buat kolom Reference String.
2. Buat input jumlah frame.
3. Ubah string menjadi daftar nomor halaman.
4. Validasi setiap nilai dan jumlah frame.
5. Tampilkan input yang telah dibaca sebelum simulasi jika diperlukan.
6. Uji berbagai panjang reference string.

### Tahap 7 — Algoritma Page Replacement
**Target:** F08 dan F09.

1. Implementasikan FIFO.
2. Simpan kondisi frame pada setiap langkah.
3. Implementasikan LRU dengan melacak penggunaan terakhir setiap halaman.
4. Implementasikan Optimal dengan memeriksa referensi berikutnya.
5. Hitung Page Hit dan Page Fault.
6. Hitung Hit Ratio dan Fault Ratio.
7. Uji ketiga algoritma dengan reference string dan jumlah frame yang sama.

### Tahap 8 — Kontrol langkah dan penjelasan
**Target:** F10 dan F12.

1. Pastikan setiap algoritma menghasilkan daftar langkah yang lengkap.
2. Tampilkan keadaan langkah pertama.
3. Implementasikan Next Step.
4. Implementasikan Reset.
5. Tambahkan Start, Pause, dan Resume untuk mode otomatis jika waktu memungkinkan.
6. Buat penjelasan keputusan untuk tiap algoritma.
7. Uji agar langkah tidak terlewati atau terulang secara tidak sengaja.

### Tahap 9 — Perbandingan
**Target:** F11.

1. Buat dua bagian di halaman Perbandingan: CPU Scheduling dan Page Replacement.
2. Jalankan FCFS, SJF, dan Round Robin dengan input proses yang sama.
3. Tampilkan setidaknya rata-rata Waiting Time dan rata-rata Turnaround Time setiap algoritma CPU.
4. Jalankan FIFO, LRU, dan Optimal dengan reference string serta jumlah frame yang sama.
5. Tampilkan Page Hit dan Page Fault setiap algoritma memori.
6. Tambahkan grafik terpisah jika fitur inti sudah stabil.
7. Pastikan perubahan input memperbarui seluruh hasil perbandingan.

### Tahap 10 — Pengujian, dokumentasi, dan demo
**Target:** memastikan produk siap diserahkan.

1. Uji setiap algoritma dengan contoh sederhana yang hasilnya dapat diperiksa manual.
2. Uji input kosong, negatif, nol, duplikat, dan format salah.
3. Uji kasus Arrival Time yang berbeda dan CPU idle.
4. Uji kasus frame belum penuh, page hit, dan penggantian halaman.
5. Rapikan tampilan dan periksa konsistensi istilah.
6. Lengkapi `README.md` dengan deskripsi, fitur, cara menjalankan, dan anggota kelompok.
7. Unggah kode ke GitHub/GitLab.
8. Siapkan laporan 10–20 halaman sesuai ketentuan tugas.
9. Rekam demo produk berdurasi 3–5 menit.
10. Siapkan slide presentasi.

---

## 5. Struktur Folder yang Disarankan

```text
mini-os-simulator/
├── index.html
├── README.md
├── FITUR.md
├── assets/
│   ├── images/
│   ├── icons/
│   └── fonts/
├── css/
│   ├── style.css
│   ├── materi.css
│   └── simulator.css
└── js/
    ├── app.js
    ├── algorithms/
    │   ├── fcfs.js
    │   ├── sjf.js
    │   ├── round-robin.js
    │   ├── fifo.js
    │   ├── lru.js
    │   └── optimal.js
    ├── cpu-ui.js
    ├── memory-ui.js
    ├── comparison.js
    └── visualization.js
```

**Catatan:** file boleh dibuat bertahap sesuai urutan pengerjaan. Tidak perlu mengisi semua file sejak awal. File algoritma sebaiknya berisi logika perhitungan, sedangkan file UI menangani input, tombol, dan tampilan hasil.

---

## 6. Rencana Pengembangan Selama 4 Minggu

| Minggu | Fokus | Target |
|---|---|---|
| Minggu 1 | Struktur folder, HTML, CSS, halaman Materi, navigasi, dan kerangka form | Kerangka aplikasi dapat digunakan |
| Minggu 2 | FCFS, SJF, Round Robin, Gantt Chart, metrik CPU | Modul CPU Scheduling berfungsi |
| Minggu 3 | FIFO, LRU, Optimal, visualisasi frame, metrik memori | Modul Page Replacement berfungsi |
| Minggu 4 | Kontrol langkah, penjelasan, perbandingan, pengujian, dokumentasi, demo | Produk siap dipresentasikan |

Jadwal ini merupakan target awal. Jika satu tahap membutuhkan waktu lebih lama, selesaikan dan uji fitur inti terlebih dahulu sebelum berpindah ke fitur tambahan.

---

## 7. Checklist Progres

Gunakan checklist ini untuk mencatat pekerjaan yang sudah selesai.

### Persiapan dan navigasi
- [ ] Folder dan file awal dibuat.
- [ ] `index.html` dapat dibuka.
- [ ] CSS terhubung dengan benar.
- [ ] Halaman Materi selesai.
- [ ] Navigasi antar modul berfungsi.

### CPU Scheduling
- [ ] Input proses, edit, dan hapus berfungsi.
- [ ] Validasi input proses berfungsi.
- [ ] FCFS berfungsi.
- [ ] SJF Non-Preemptive berfungsi.
- [ ] Round Robin berfungsi.
- [ ] Time Quantum divalidasi.
- [ ] Gantt Chart tampil benar.
- [ ] CT, TAT, WT, RT dan rata-ratanya benar.

### Page Replacement
- [ ] Input reference string dan jumlah frame berfungsi.
- [ ] Validasi input memori berfungsi.
- [ ] FIFO berfungsi.
- [ ] LRU berfungsi.
- [ ] Optimal berfungsi.
- [ ] Kondisi frame per langkah tampil benar.
- [ ] Page Hit dan Page Fault benar.
- [ ] Hit Ratio dan Fault Ratio benar.

### Fitur lanjutan dan penyerahan
- [ ] Start, Pause, Resume, Next Step, dan Reset berfungsi.
- [ ] Penjelasan langkah sesuai dengan keputusan algoritma.
- [ ] Perbandingan CPU berfungsi.
- [ ] Perbandingan Page Replacement berfungsi.
- [ ] Pengujian kasus normal dan input invalid selesai.
- [ ] README lengkap.
- [ ] Repository GitHub/GitLab tersedia.
- [ ] Laporan selesai.
- [ ] Video demo 3–5 menit selesai.
- [ ] Slide presentasi selesai.

---

## 8. Prinsip Implementasi

1. **Pisahkan logika dan tampilan.** Fungsi algoritma menghitung hasil; kode UI menampilkan hasil.
2. **Gunakan input yang sama saat membandingkan algoritma.** Jangan mengubah data di antara satu algoritma dan algoritma lain.
3. **Uji per bagian.** Pastikan satu algoritma benar sebelum menambahkan visualisasi yang lebih rumit.
4. **Jangan langsung membuat seluruh aplikasi sekaligus.** Kerjakan tahap demi tahap dan pahami fungsi setiap bagian.
5. **Utamakan ketepatan algoritma.** Tampilan menarik tidak menggantikan hasil simulasi yang benar.
6. **Catat keputusan dan batasan.** Penjelasan algoritma, cara menjalankan, dan batasan proyek perlu dicantumkan di README dan laporan.

Dokumen ini adalah acuan fitur dan progres. Jika terjadi perubahan ruang lingkup, perbarui bagian daftar fitur, urutan pengerjaan, dan checklist agar tetap konsisten.
