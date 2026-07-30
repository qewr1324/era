export function generate(params: any): string {
	return `/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'My Project',
  tagline: 'Documentation for My Project',
  url: 'https://docs.example.com',
  baseUrl: '/',
  
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/user/repo/edit/main/docs/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  
  themeConfig: {
    navbar: {
      title: 'My Project',
      items: [
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://github.com/user/repo',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: \`Copyright © \${new Date().getFullYear()} My Project\`,
    },
  },
};

module.exports = config;`;
}
