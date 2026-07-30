export function generate(params: any): string {
	return `# Dependencies
node_modules/
.npm

# Build output
dist/
build/
.next/
out/

# Environment
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Coverage
coverage/
.nyc_output/

# Cache
.cache/
.parcel-cache/
.eslintcache`;
}
