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
    // FIX DLA PRODUKCJI I MOBILE:
    resolve: {
      // Zapobiega duplikowaniu Three.js (crashuje scenę, gdy są dwie kopie)
      dedupe: ['three', '@threlte/core', '@threlte/extras']
    },
    optimizeDeps: {
      // Wymuszamy wstępne przetworzenie tych paczek.
      // To rozwiązuje problem "białego ekranu" na mobile po deployu.
      include: ['three', '@threlte/core', '@threlte/extras', '@threlte/extras > three']
    },
    build: {
      // Upewniamy się, że kod jest zgodny ze starszymi przeglądarkami mobilnymi
      target: 'esnext' 
    }
  },
});