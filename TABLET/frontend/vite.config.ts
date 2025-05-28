import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5171,
    strictPort: true,
    host: 'localhost', // Forza l'uso di localhost invece di 127.0.0.1
  },
});
