export function generate(params: any): string {
	return JSON.stringify(
		{
			compilerOptions: {
				target: "ES2021",
				module: "ESNext",
				moduleResolution: "node",
				strict: true,
				esModuleInterop: true,
				skipLibCheck: true,
				forceConsistentCasingInFileNames: true,
				resolveJsonModule: true,
				declaration: true,
				sourceMap: true,
				outDir: "./dist",
				rootDir: "./src",
				baseUrl: ".",
				paths: {
					"@/*": ["./src/*"],
				},
				lib: ["ES2021", "DOM"],
				jsx: "react-jsx",
			},
			include: ["src/**/*"],
			exclude: ["node_modules", "dist"],
		},
		null,
		2,
	);
}
