export function generate(params: any): string {
	return `const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8080,
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "@/styles/variables.scss";',
      },
    },
  },
});`;
}
