import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';

export default defineConfig({
  integrations: [svelte(), mdx()],
  vite: {
    plugins: [
      tailwindcss(),
    ],
    resolve: {
      // To zostawiamy, bo naprawia błędy Three.js "instanceof"
      dedupe: ['three', '@threlte/core', '@threlte/extras']
    },
    optimizeDeps: {
      // To zostawiamy, bo naprawia "biały ekran" na mobile
      include: ['three', '@threlte/core', '@threlte/extras', '@threlte/extras > three']
    },
    build: {
      // ZMIANA: Usuwamy 'target'. 
      // Pozwalamy Astro/Vite użyć domyślnych ustawień ('modules'), 
      // co naprawia błąd "import.meta outside a module".
      cssCodeSplit: true,
      chunkSizeWarningLimit: 2000,
    }
  },
});