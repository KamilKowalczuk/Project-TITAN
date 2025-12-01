import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite'; //
import mdx from '@astrojs/mdx';

export default defineConfig({
  integrations: [svelte(), mdx()],
  vite: {
    plugins: [
      tailwindcss(), //
    ],
    // FIX DLA PRODUKCJI:
    resolve: {
      dedupe: ['three', '@threlte/core', '@threlte/extras']
    },
    optimizeDeps: {
      include: ['three', '@threlte/core', '@threlte/extras', '@threlte/extras > three']
    },
    build: {
      // ZMIANA: 'esnext' -> 'es2020'
      // To naprawia błąd "Cannot use import.meta outside a module"
      target: 'es2020',
      cssCodeSplit: true,
      chunkSizeWarningLimit: 2000,
    }
  },
});