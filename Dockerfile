# Menggunakan image Node.js versi ringan
FROM node:18-alpine

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