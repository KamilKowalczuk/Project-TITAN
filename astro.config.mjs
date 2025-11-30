import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite'; // [cite: 11]

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), mdx()],
  vite: {
    plugins: [
      tailwindcss(), // [cite: 11]
    ],
  },
});