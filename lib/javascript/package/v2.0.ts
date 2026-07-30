export function generate(params: any): string {
	return JSON.stringify(
		{
			name: "my-project",
			version: "1.0.0",
			description: "A Node.js project",
			main: "index.js",
			scripts: {
				start: "node index.js",
				test: "jest",
				dev: "nodemon index.js",
			},
			keywords: ["node"],
			author: "Developer",
			license: "MIT",
			dependencies: {
				express: "^4.17.1",
			},
			devDependencies: {
				jest: "^29.0.0",
				nodemon: "^2.0.20",
			},
		},
		null,
		2,
	);
}
