export function generate(params: any): string {
	return JSON.stringify(
		{
			compilerOptions: {
				target: "ES2022",
				module: "ESNext",
				moduleResolution: "bundler",
				strict: true,
				esModuleInterop: true,
				skipLibCheck: true,
				forceConsistentCasingInFileNames: true,
				resolveJsonModule: true,
				isolatedModules: true,
				declaration: true,
				declarationMap: true,
				sourceMap: true,
				outDir: "./dist",
				rootDir: "./src",
				baseUrl: ".",
				paths: {
					"@/*": ["./src/*"],
				},
				lib: ["ES2022", "DOM", "DOM.Iterable"],
				jsx: "react-jsx",
			},
			include: ["src/**/*"],
			exclude: ["node_modules", "dist"],
		},
		null,
		2,
	);
}
