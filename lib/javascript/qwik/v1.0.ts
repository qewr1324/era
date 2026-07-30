export function generate(params: any): string {
	return `import { defineConfig } from '@builder.io/qwik';

export default defineConfig(() => {
  return {
    build: {
      target: 'es2020',
      platform: 'browser',
    },
    dev: {
      recalculateBuilds: true,
    },
    server: {
      renderStrategy: 'streaming',
    },
  };
});`;
}
