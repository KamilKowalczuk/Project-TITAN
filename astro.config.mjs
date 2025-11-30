import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), mdx()],
  vite: {
    plugins: [
      tailwindcss(),
    ],
    // ROZWIĄZANIE PROBLEMU PRODUKCJI:
    resolve: {
      // Wymuszamy jedną instancję bibliotek. To naprawia błędy "instanceof" w Three.js
      dedupe: ['three', '@threlte/core', '@threlte/extras']
    },
    // Konfiguracja SSR (Server Side Rendering) dla builda
    ssr: {
      // Mówimy Vite, żeby przetworzył te paczki podczas budowania, zamiast zostawiać je jako zewnętrzne
      noExternal: ['three', '@threlte/core', '@threlte/extras']
    },
    build: {
      // Zwiększamy limit ostrzeżeń, bo Three.js jest duży
      chunkSizeWarningLimit: 1600,
    }
  },
});