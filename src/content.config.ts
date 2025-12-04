import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 1. Kolekcja Główna (Karty)
const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    subtitle: z.string(),
    cluster: z.enum(['engineering', 'modern_web', 'ecommerce', 'deep_tech']),
    metrics: z.string(),
    technologies: z.array(z.string()),
    isFeatured: z.boolean().default(false),
    liveUrl: z.string().url().optional(),
    order: z.number().default(99),
    image: image().optional(),
  }),
});

// 2. Kolekcja Detali (Opisy do Modala)
// Tu trzymamy tylko tekst (body), więc schema może być puste
const details = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/details" }),
});

export const collections = { projects, details };