import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
  // Use a subdirectory base when building for production (e.g. GitHub Pages)
  // but fall back to root during local development to avoid redirect issues.
  base: command === 'serve' ? '/' : '/boardbid-ui/',
  plugins: [react()],
}));
