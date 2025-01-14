import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Ensures the build output is in the correct directory for Firebase Hosting
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Local development proxy
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
