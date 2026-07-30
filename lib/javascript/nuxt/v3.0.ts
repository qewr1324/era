export function generate(params: any): string {
	return `export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
  ],
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || 'http://localhost:3000/api',
    },
  },
  app: {
    head: {
      title: 'My Nuxt App',
      meta: [
        { name: 'description', content: 'My Nuxt application' },
      ],
    },
  },
});`;
}
