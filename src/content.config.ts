import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  // LOADER GLOB:
  // pattern: Szukamy plików .md ORAZ .mdx
  // base: Ścieżka relatywna od pliku konfiguracyjnego do folderu z plikami
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    cluster: z.enum(['engineering', 'modern_web', 'ecommerce', 'deep_tech']),
    metrics: z.string(),
    technologies: z.array(z.string()),
    isFeatured: z.boolean().default(false),
    liveUrl: z.string().url().optional(),
    order: z.number().default(99),
  }),
});

export const collections = { projects };