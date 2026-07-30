export function generate(params: any): string {
	return `module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('postcss-import'),
    require('postcss-nested'),
    require('postcss-preset-env')({
      stage: 3,
      features: {
        'nesting-rules': true,
      },
    }),
    process.env.NODE_ENV === 'production' && require('cssnano')({
      preset: 'default',
    }),
  ].filter(Boolean),
};`;
}
