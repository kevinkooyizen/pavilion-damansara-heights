import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// One entry per localized article. The folder (en|ja|zh) encodes the locale,
// so an entry id looks like "en/malaysia-property-guide-japanese-buyers".
const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    // Full article H1 + <title>/meta.
    title: z.string(),
    description: z.string(),
    // Short, hand-written copy shown on the article-index cards.
    cardTitle: z.string(),
    excerpt: z.string(),
    // Reference only — not rendered (see plan "Behavior changes").
    keywords: z.string().optional(),
    // Shared across the 3 locale versions of a topic; drives hreflang + switcher.
    translationKey: z.string(),
    // Preserves the article-index display order.
    order: z.number(),
  }),
});

export const collections = { articles };
