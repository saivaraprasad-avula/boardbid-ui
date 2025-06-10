import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/boardbid-ui/', // 👈 VERY IMPORTANT
  plugins: [react()],
});
