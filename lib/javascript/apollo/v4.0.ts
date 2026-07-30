export function generate(params: any): string {
	return `module.exports = {
  client: {
    service: {
      name: 'my-app',
      url: 'http://localhost:4000/graphql',
    },
    includes: [
      'src/**/*.{ts,tsx,js,jsx,graphql}',
    ],
    excludes: [
      '**/node_modules/**',
      '**/__tests__/**',
    ],
  },
};`;
}
