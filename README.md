# Petualangan Mufradat

Website permainan edukasi kosakata bahasa Arab untuk anak-anak Indonesia. Proyek dibuat menggunakan **React + Vite** dan disiapkan agar dapat dijalankan secara lokal, diunggah ke GitHub, lalu di-deploy ke Vercel.

## Fitur yang tersedia

- Seluruh halaman memakai identitas visual galaxy glowing dengan dominasi biru elektrik dan aksen warna cerah.
- Dua maskot anak Muslim melambaikan tangan di halaman utama; tidak menggunakan karakter robot.
- Ilustrasi tema, permainan, kosakata, dan level dibuat sebagai aset SVG khusus, bukan emoji keyboard.
- Pilihan level Mudah, Sedang, dan Sulit (semua level terbuka).
- Empat permainan: Memory Game, Word Search, Arrange The Letter, dan Catch Character.
- Sembilan tema: Buah-buahan, Hewan, Keluarga & Rumah, Sekolah & Kelas, Makanan & Minuman, Waktu & Hari, Angka 1–50, Profesi, dan Tempat Umum.
- Halaman pengenalan kosakata dengan gambar/ilustrasi, arti Indonesia, tulisan Arab berharakat, dan tombol audio.
- Word Search memakai timer per kosakata pada level sulit: 60 detik, petunjuk dan tambahan 30 detik, lalu tetap boleh mencoba tanpa tekanan waktu.
- Arrange The Letter menambahkan 0, 2, atau 4 huruf pengecoh sesuai level.
- Catch Character meminta pemain menangkap tiga gambar target pada setiap babak; petunjuk ditampilkan dalam bahasa Arab dan dibantu ilustrasi gambar.
- Semua objek dan kontrol empat permainan diperbesar serta diatur responsif agar mudah dilihat dan disentuh.
- Memory Game menampilkan 10 kartu dalam susunan 5 × 2 pada desktop untuk level mudah; tata letak menyesuaikan tablet dan ponsel.
- Tema Waktu & Hari memiliki 24 waktu bulat (00.00–23.00), tujuh hari, dan empat periode hari. Ilustrasi jam analog menampilkan angka 1–12, jarum sesuai jam digital, serta dekorasi pagi, siang, sore, dan malam.
- Skor maksimal 10 poin per kosakata; penggunaan petunjuk pada Word Search memberi 7 poin. Kecepatan tidak mengurangi skor.
- Halaman hasil dengan skor 0–100, bintang, dan pilihan bermain lagi.
- Tata letak responsif untuk desktop dan ponsel.

## Menjalankan di komputer

Pastikan Node.js versi 18 atau lebih baru sudah terpasang.

```bash
npm install
npm run dev
```

Buka alamat lokal yang ditampilkan Vite (biasanya `http://localhost:5173`).

Untuk membuat build produksi:

```bash
npm run build
npm run preview
```

Hasil build berada di folder `dist/`.

## Mengganti proyek di repository GitHub yang sudah ada

Paket ini adalah **pengganti seluruh isi proyek website**, bukan proyek tambahan. Repository GitHub lama tetap digunakan dan tidak perlu dihapus.

1. Unduh dan ekstrak ZIP ini.
2. Buat salinan cadangan folder repository lokal yang sekarang, untuk berjaga-jaga.
3. Buka repository lama melalui GitHub Desktop, lalu pilih **Repository → Show in Explorer**.
4. Tutup server lokal jika sedang berjalan.
5. Di folder repository lokal, ganti file-file proyek lama dengan **seluruh isi** folder `petualangan-mufradat` hasil ekstraksi. Pastikan `package.json`, `index.html`, `src/`, dan `public/` berada langsung di root repository. Jangan menaruhnya di dalam folder bertingkat `petualangan-mufradat/petualangan-mufradat`.
6. **Pertahankan folder tersembunyi `.git`** milik repository lama. Jangan menyalin `.git` dari paket ZIP (paket ini memang tidak menyertakannya).
7. Buka GitHub Desktop. Periksa daftar perubahan, lalu isi ringkasan commit, misalnya `Update full Petualangan Mufradat project`.
8. Klik **Commit to main**, kemudian **Push origin**.

Dengan cara ini, repository GitHub lama tetap sama; yang diperbarui hanya isi proyek website di dalamnya.

## Deploy ke Vercel

1. Masuk ke https://vercel.com dan pilih **Add New → Project**.
2. Hubungkan akun GitHub jika belum terhubung.
3. Pilih repository `petualangan-mufradat`.
4. Pastikan pengaturan build berikut:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
5. Tekan **Deploy**. Setelah selesai, Vercel memberikan URL website yang dapat dibagikan.

File `vercel.json` sudah disertakan untuk mendukung navigasi aplikasi satu halaman.

## Audio dan materi bahasa Arab

### Audio kosakata

- ZIP ini sudah menyertakan **225 file MP3** untuk seluruh 225 entri kosakata pada sembilan tema.
- File audio berada di `public/audio/vocabulary/<topic-id>/<item-id>.mp3`.
- Saat tombol speaker ditekan, website memutar MP3 terlebih dahulu. Jika file tidak tersedia atau gagal diputar, website mencoba suara bahasa Arab bawaan browser sebagai cadangan.
- Suara penyemangat berbahasa Indonesia tetap menggunakan suara Indonesia dari browser.
- Kecepatan audio mengikuti hasil batch TTS yang telah didengarkan dan diterima untuk prototipe.

**Catatan penting untuk penggunaan pembelajaran:** audio ini merupakan hasil text-to-speech (TTS), bukan rekaman penutur manusia. Teks Arab, harakat, dan ketepatan pelafalan tetap perlu ditinjau oleh dosen/guru atau penutur bahasa Arab yang kompeten sebelum dipakai sebagai materi final. Beberapa istilah serapan dan frasa perlu perhatian khusus.

### Lokasi file audio

Contoh: `public/audio/vocabulary/fruits/apple.mp3`. Nama folder mengikuti `topic-id`, sedangkan nama MP3 mengikuti `item-id` pada `src/data.js`. Daftar pemetaan seluruh audio tersedia di `docs/audio-recording-checklist.csv`.

## Catatan materi

Daftar bahasa Indonesia dan padanan Arab dalam proyek ini adalah **draf awal untuk prototipe**. Beberapa kata serapan, istilah profesi, ungkapan waktu, dan frasa yang terdiri dari beberapa kata perlu ditinjau ulang sebelum penilaian akademik atau publikasi. Data kosakata terpusat di `src/data.js`, sehingga koreksi cukup dilakukan di satu tempat dan otomatis digunakan oleh empat game.

## Struktur proyek

```text
petualangan-mufradat/
├── public/
│   ├── audio/
│   │   ├── vocabulary/
│   │   └── feedback/
│   └── mascots/duo.svg
├── src/
│   ├── App.jsx
│   ├── Illustrations.jsx
│   ├── audio.js
│   ├── backgroundMusic.js
│   ├── data.js
│   ├── main.jsx
│   └── styles.css
├── index.html
├── package.json
├── vercel.json
└── vite.config.js
```


## Pembaruan maskot

Halaman utama menggunakan ilustrasi dua anak Muslim yang dipilih pengguna (`public/mascots/duo-reference.png`). Pada halaman utama, kedua telapak tangan dipisahkan sebagai lapisan gambar dan digerakkan bergantian dengan animasi CSS agar tampak melambai. Badan karakter bergerak naik-turun secara halus; animasi otomatis dinonaktifkan pada perangkat yang meminta pengurangan gerakan (`prefers-reduced-motion`).

## Audio kosakata

Paket ini memuat 225 file MP3 pada `public/audio/vocabulary/`. Pastikan nama file dan folder audio tetap dipertahankan ketika mengunggah proyek ke GitHub/Vercel.

## Musik halaman utama dan palet warna cerah

- Musik latar instrumental orisinal berada di `public/audio/music/home-cheerful-original.mp3`.
- Musik mulai setelah tombol **Putar musik** ditekan (sesuai kebijakan autoplay browser), dapat dimatikan dari tombol yang sama, dan berhenti otomatis saat pengguna memilih tema untuk masuk ke halaman pengenalan kosakata.
- Tombol musik memiliki efek bunyi singkat yang dibuat langsung melalui Web Audio API.
- Palet warna diperkuat agar lebih cerah dan ceria dengan dominasi biru serta aksen kuning, pink, hijau, ungu, dan oranye.

## Revisi visual Galaxy Glowing

Versi revisi ini menerapkan identitas visual galaxy glowing pada seluruh halaman: latar ruang angkasa biru navy, bintang dan nebula, panel glass-neon, tombol bercahaya, serta aksen warna berbeda untuk halaman level, pilihan permainan, tema, belajar, gameplay, dan hasil. Maskot dua anak Muslim tetap digunakan tanpa karakter robot. Musik latar tetap khusus halaman utama dan berhenti saat tema dipilih.

Catatan pemeriksaan paket: seluruh 225 file kosakata telah dikonversi dan diverifikasi sebagai MP3 yang valid; semua jalur audio cocok dengan 225 entri pada data. Sintaks JSX/JavaScript, parsing CSS, dan konfigurasi JSON telah diperiksa. Build Vite belum dijalankan di lingkungan penyusunan karena instalasi dependensi mengalami timeout; Vercel akan memasang dependensi dari `package.json` saat proses deployment.
