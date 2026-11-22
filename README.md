# Mini OS Simulator

Aplikasi simulator edukasi sistem operasi interaktif berbasis web untuk memvisualisasikan dan membandingkan algoritma penjadwalan CPU (*CPU Scheduling*) dan manajemen memori virtual (*Page Replacement*).

---

## 1. Deskripsi

**Mini OS Simulator** dirancang untuk membantu mahasiswa dan pembelajar memahami mekanisme internal sistem operasi secara visual, transparan, dan interaktif. Aplikasi ini dibangun murni menggunakan **HTML5, CSS3, dan Vanilla JavaScript (ES6+)** tanpa menggunakan framework eksternal atau database.

### Fitur Utama:
- **Pusat Materi OS**: Penjelasan konsep dasar siklus hidup proses, antrean CPU, dan arsitektur memori virtual yang dilengkapi diagram visual.
- **CPU Scheduling**: Simulasi algoritma **FCFS** (*First-Come, First-Served*), **SJF Non-Preemptive** (*Shortest Job First*), dan **Round Robin** dengan kuantum waktu dinamis, visualisasi Gantt Chart retro, serta perhitungan metrik lengkap (CT, TAT, WT, RT).
- **Page Replacement**: Simulasi algoritma **FIFO** (*First-In, First-Out*), **LRU** (*Least Recently Used*), dan **Optimal (OPT)** dengan visualisasi matriks 2D frame memori, deteksi Page Hit/Fault, dan analisis rasio efisiensi.
- **Kontrol Simulasi Bertahap (*Interactive Stepper*)**: Fitur Auto Play, Pause, Step Next, Step Back, Reset, dan pengatur kecepatan animasi.
- **Perbandingan Algoritma (*Benchmark*)**: Evaluasi komparatif performa seluruh algoritma secara langsung (*head-to-head*) menggunakan dataset masukan yang identik.

---

## 2. Cara Instalasi & Akses Aplikasi

Karena aplikasi ini sepenuhnya berbasis web (*web-based*), Anda dapat langsung menggunakannya secara daring tanpa memerlukan instalasi apa pun:

### 1. Akses Langsung (Online / Web)
Aplikasi telah di-deploy dan dapat langsung diakses melalui tautan resmi berikut:  
👉 **[https://mini-os-simulator-eta.vercel.app](https://mini-os-simulator-eta.vercel.app)**

---

### 2. Menjalankan Secara Lokal (Offline / Komputer Lokal)
Jika Anda ingin menjalankan aplikasi secara mandiri atau luring (*offline*) di komputer lokal tanpa koneksi internet:

1. **Clone atau Unduh Repositori**
   ```bash
   git clone https://github.com/username/mini-os-simulator.git
   ```
2. **Buka Aplikasi**
   - **Buka Langsung:** Klik dua kali (*double click*) berkas `index.html` untuk langsung membukanya di peramban web modern apa pun (Google Chrome, Microsoft Edge, Mozilla Firefox).

---

## 3. Cara Penggunaan

### Navigasi Modul
Gunakan **Top Header** di bagian atas atau **Floating Dock** di bagian bawah layar untuk berpindah modul:
1. **Materi (`menu_book`)**: Membaca rangkuman konsep penjadwalan CPU dan penggantian halaman memori.
2. **CPU Scheduling (`memory`)**: Masuk ke laboratorium simulasi proses CPU.
3. **Page Replacement (`storage`)**: Masuk ke laboratorium simulasi memori fisik dan frame.
4. **Perbandingan (`analytics`)**: Membuka tabel komparasi performa algoritma.

### Menjalankan Simulasi CPU Scheduling
1. Buka modul **CPU Scheduling**.
2. Masukkan parameter proses pada form: **Process ID** (misal: P1), **Arrival Time** (AT), dan **Burst Time** (BT), lalu klik **Tambah Proses** (atau klik tombol **Preset Contoh** untuk memuat data sampel cepat).
3. Pilih algoritma yang diinginkan (**FCFS**, **SJF Non-Preemptive**, atau **Round Robin**). Jika memilih Round Robin, tentukan nilai **Time Quantum**.
4. Gunakan panel kontrol simulator:
   - Klik **Jalankan Otomatis** untuk memutar simulasi secara otomatis.
   - Klik **Next Step** untuk menjalankan simulasi langkah demi langkah.
   - Klik **Step Back** untuk kembali ke langkah sebelumnya.
   - Klik **Reset** untuk mengulang simulasi dari awal.
5. Amati perubahan linimasa pada **Gantt Chart**, status proses pada tabel, serta ringkasan nilai rata-rata **WT** dan **TAT**.

### Menjalankan Simulasi Page Replacement
1. Buka modul **Page Replacement**.
2. Masukkan urutan referensi halaman pada kolom **Reference String** (angka dipisahkan koma atau spasi, contoh: `7, 0, 1, 2, 0, 3, 0, 4`).
3. Tentukan **Jumlah Frame** memori fisik yang dialokasikan (antara 1 hingga 8 frame).
4. Pilih algoritma yang diinginkan (**FIFO**, **LRU**, atau **Optimal**).
5. Gunakan tombol kontrol stepper untuk mengamati pengisian frame baris demi baris pada **Tabel Matriks Memori**.
6. Perhatikan indikator hijau untuk **PAGE HIT** dan indikator merah untuk **PAGE FAULT**, serta ringkasan **Hit Ratio** yang dihasilkan.

### Menjalankan Perbandingan Algoritma
1. Buka modul **Perbandingan**.
2. Pilih tab perbandingan: **CPU Scheduling** atau **Page Replacement**.
3. Aplikasi akan secara otomatis menghitung dan menyajikan perbandingan metrik seluruh algoritma dalam tabel komparasi serta menandai algoritma paling efisien untuk dataset yang digunakan.

---

## 4. Anggota Tim

| No | Nama Lengkap | NIM | Peran / Tanggung Jawab |
|:--:|:---|:---:|:---|
| 1 | [Nama Anggota 1] | [NIM 1] | [Peran / Tugas Anggota 1] |
| 2 | [Nama Anggota 2] | [NIM 2] | [Peran / Tugas Anggota 2] |
| 3 | [Nama Anggota 3] | [NIM 3] | [Peran / Tugas Anggota 3] |
| 4 | [Nama Anggota 4] | [NIM 4] | [Peran / Tugas Anggota 4] |
| 5 | [Nama Anggota 5] | [NIM 5] | [Peran / Tugas Anggota 5] |
| 6 | [Nama Anggota 6] | [NIM 6] | [Peran / Tugas Anggota 6] |
