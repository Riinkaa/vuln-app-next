# REVISI: Menggunakan image Node.js versi 20 (memenuhi syarat >=20.9.0)
FROM node:20-alpine

# Menetapkan direktori kerja di dalam container
WORKDIR /app

# Menyalin file konfigurasi dependensi
COPY package*.json ./

# Menginstal dependensi aplikasi
RUN npm install

# Menyalin seluruh kode sumber
COPY . .

# Menginisialisasi database SQLite dummy
RUN node init-db.js

# Melakukan kompilasi build Next.js
RUN npm run build

# Membuka akses ke port 3000
EXPOSE 3000

# Menjalankan aplikasi
CMD ["npm", "start"]