export function generate(params: any): string {
	return `import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://example.com',
  integrations: [
    react(),
    tailwind(),
    sitemap(),
  ],
  output: 'hybrid',
  server: {
    port: 3000,
    host: true,
  },
  vite: {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
});`;
}
