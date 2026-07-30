export function generate(params: any): string {
	return JSON.stringify(
		{
			name: "my-project",
			version: "1.0.0",
			description: "A Node.js project",
			main: "src/index.js",
			type: "module",
			scripts: {
				start: "node src/index.js",
				dev: "nodemon src/index.js",
				test: "jest",
				build: "webpack --mode production",
				lint: "eslint src/",
				format: "prettier --write src/",
			},
			keywords: ["node", "javascript"],
			author: "Developer",
			license: "MIT",
			dependencies: {
				express: "^4.18.2",
				dotenv: "^16.3.1",
				cors: "^2.8.5",
			},
			devDependencies: {
				jest: "^30.0.0",
				eslint: "^9.0.0",
				prettier: "^3.1.0",
				nodemon: "^3.0.2",
				webpack: "^5.89.0",
			},
			engines: {
				node: ">=18.0.0",
				npm: ">=9.0.0",
			},
		},
		null,
		2,
	);
}
