import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      ignored: [
        '**/design-references/**',
        '**/.git/**',
        '**/backups/**',
        '**/*.bak',
        '**/public/**',
        '**/room-screenshots/**',
        '**/docs/**',
        '**/scripts/**',
        '**/*.md',
        '**/*.png',
        '**/*.jpg',
        '**/*.glb',
        '**/*.log'
      ]
    }
  }
});
