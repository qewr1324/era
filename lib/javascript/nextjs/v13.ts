export function generate(params: any): string {
	return `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['example.com'],
  },
  experimental: {
    appDir: true,
  },
  env: {
    API_URL: process.env.API_URL,
  },
};

module.exports = nextConfig;`;
}
