export function generate(params: any): string {
	return JSON.stringify(
		{
			compilerOptions: {
				target: "ES2020",
				module: "commonjs",
				strict: true,
				esModuleInterop: true,
				skipLibCheck: true,
				forceConsistentCasingInFileNames: true,
				resolveJsonModule: true,
				declaration: true,
				sourceMap: true,
				outDir: "./dist",
				rootDir: "./src",
			},
			include: ["src/**/*"],
			exclude: ["node_modules", "dist"],
		},
		null,
		2,
	);
}
