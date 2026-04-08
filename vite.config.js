import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/bp-transport-plan/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          leaflet: ['leaflet'],
          vendor: ['react', 'react-dom', 'zustand'],
        },
      },
    },
  },
});
