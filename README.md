# Movie Search App

Aplikasi pencarian film sederhana berbasis HTML, CSS, dan JavaScript. Data pencarian dan detail film diambil dari [OMDb API](https://www.omdbapi.com/).

## Fitur

- Mencari film berdasarkan judul dengan jeda debounce 500 ms.
- Menampilkan poster, judul, dan tahun rilis.
- Menampilkan detail film dalam modal.
- Mendukung penutupan modal melalui tombol, klik di luar modal, atau tombol `Escape`.
- Menampilkan placeholder saat poster tidak tersedia.
- Membatalkan permintaan pencarian sebelumnya saat kata kunci berubah.

## Teknologi

- HTML
- CSS
- JavaScript 
- OMDb API

## Menjalankan aplikasi

1. Clone atau unduh repository ini.
2. Siapkan API key OMDb dan pasang pada konfigurasi di `js/api.js` (lihat bagian [Konfigurasi API key](#konfigurasi-api-key)).
3. Jalankan aplikasi melalui server lokal. Contohnya:
   - **VS Code:** buka folder proyek, lalu jalankan `index.html` menggunakan ekstensi Live Server.
   - **Python:** buka terminal di folder proyek dan jalankan:
     ```bash
     python -m http.server 8000
     ```
     Kemudian kunjungi `http://localhost:8000`.
4. Ketik judul film pada kotak pencarian. Hasil diperbarui otomatis setelah jeda singkat.

> Jangan membuka `index.html` langsung sebagai file (`file://`). Aplikasi menggunakan JavaScript modules dan request `fetch`, yang sebaiknya dijalankan melalui server lokal.

## Konfigurasi API key

Daftar API key di [OMDb API](https://www.omdbapi.com/apikey.aspx), lalu masukkan key ke konstanta `API_KEY` di `js/api.js`. Jangan menaruh key asli di README atau membagikannya di repository publik.

> **Catatan keamanan:** API key yang ditulis dalam JavaScript browser dapat dilihat oleh siapa pun yang mengakses aplikasi. Untuk deployment publik, simpan key di backend dan teruskan permintaan melalui server.

## Struktur proyek

```text
.
├── index.html
├── css/
│   └── style.css
└── js/
    ├── api.js
    ├── main.js
    ├── modal.js
    ├── ui.js
    ├── utils.js
    └── data/
        └── movies.json
```

### Tanggung jawab file

- `index.html` — kerangka halaman dan elemen yang dipakai aplikasi.
- `css/style.css` — tampilan, layout, modal, dan indikator loading.
- `js/api.js` — request pencarian dan detail film ke OMDb API.
- `js/main.js` — alur pencarian, pengelolaan hasil, dan event aplikasi.
- `js/ui.js` — membuat dan menampilkan kartu film ke DOM.
- `js/modal.js` — membuka dan menutup modal detail film.
- `js/utils.js` — fungsi debounce untuk membatasi frekuensi pencarian saat pengguna mengetik.
- `js/data/movies.json` — data film lokal; alur pencarian OMDb saat ini tidak menggunakan file ini.

## Troubleshooting

- **Hasil tidak muncul:** pastikan server lokal berjalan dan periksa tab Console serta Network di DevTools.
- **API menolak permintaan:** periksa API key, status aktivasi, batas penggunaan, dan koneksi internet.
- **Film tidak ditemukan:** coba kata kunci lain. OMDb mencari berdasarkan judul dan dapat mengembalikan beberapa hasil yang perlu dipilih.
- **Request diblokir atau gagal:** pastikan browser dapat mengakses `www.omdbapi.com`.

