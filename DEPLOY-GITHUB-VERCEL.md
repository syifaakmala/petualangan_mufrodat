# Panduan memperbarui Petualangan Mufradat di GitHub dan Vercel

## Penting
- ZIP ini mengganti **seluruh isi proyek website**.
- Gunakan repository GitHub yang sekarang; jangan menghapus repository lama.
- Jangan mengunggah file ZIP mentah ke repository. Ekstrak dahulu.
- Folder `.git` adalah penghubung repository lokal ke GitHub. Pertahankan folder `.git` yang sudah ada.

## A. Siapkan berkas
1. Unduh ZIP `petualangan-mufradat-paket-pengganti-github-vercel.zip`.
2. Klik kanan ZIP → **Extract All**.
3. Buka folder hasil ekstraksi, lalu buka folder `petualangan-mufradat`.
4. Pastikan di dalamnya terlihat `package.json`, `index.html`, `src`, dan `public`.

## B. Ganti isi proyek pada repository lama
1. Buka GitHub Desktop dan pilih repository Petualangan Mufradat yang lama.
2. Pilih **Repository → Show in Explorer** untuk membuka folder repository lokal.
3. Buat salinan cadangan folder repository tersebut.
4. Tutup server lokal jika sedang berjalan.
5. Ganti isi folder repository lokal dengan seluruh isi folder `petualangan-mufradat` hasil ekstraksi.
6. Pertahankan folder tersembunyi `.git` milik repository lokal. Jangan menghapus atau menggantinya.
7. Pastikan `package.json` berada langsung di root repository, bukan di dalam folder bertingkat.
8. Kembali ke GitHub Desktop. Periksa perubahan, buat commit, lalu klik **Push origin**.

## C. Vercel
Jika proyek Vercel sudah terhubung ke repository GitHub tersebut, push terbaru biasanya memicu deployment otomatis.

Periksa pengaturan proyek Vercel:
- Framework Preset: **Vite**
- Root Directory: `./` (folder root repository, tempat `package.json` berada)
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `dist`

Jika deployment tidak berjalan otomatis, buka proyek Vercel → **Deployments** → jalankan ulang deployment dari commit terbaru.

## D. Menjalankan lokal (opsional)
Pastikan Node.js 18 atau lebih baru sudah terpasang. Buka terminal pada root proyek, lalu jalankan:

```bash
npm install
npm run dev
```

Untuk menguji build produksi:

```bash
npm run build
npm run preview
```

## Catatan pemeriksaan
Paket berisi kode sumber React + Vite, konfigurasi Vercel, aset maskot dan ilustrasi, musik halaman utama, serta 225 audio kosakata MP3. Build produksi belum berhasil diuji di lingkungan penyusunan karena proses instalasi dependensi mengalami timeout. Vercel akan memasang dependensi saat deployment.
