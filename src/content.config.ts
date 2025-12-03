import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  
  // ZMIANA TUTAJ:
  // Zamiast: schema: z.object({...})
  // Musi być funkcja strzałkowa: schema: ({ image }) => z.object({...})
  schema: ({ image }) => z.object({
    title: z.string(),
    subtitle: z.string(),
    cluster: z.enum(['engineering', 'modern_web', 'ecommerce', 'deep_tech']),
    metrics: z.string(),
    technologies: z.array(z.string()),
    isFeatured: z.boolean().default(false),
    liveUrl: z.string().url().optional(),
    order: z.number().default(99),
    
    // Teraz 'image()' zadziała, bo pochodzi z argumentu funkcji powyżej
    image: image().optional(),  }),
});

export const collections = { projects };