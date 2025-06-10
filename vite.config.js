// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' && process.env.PREPROD
    ? '/boardbid-ui/'  // for GitHub Pages preprod
    : '/',             // for production hosting
  plugins: [react()],
});
