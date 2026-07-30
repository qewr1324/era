export function generate(params: any): string {
	return JSON.stringify(
		{
			$schema: "https://raw.githubusercontent.com/nicepage/nicepage-tauri/dev/cli/schema.json",
			build: {
				beforeDevCommand: "npm run dev",
				beforeBuildCommand: "npm run build",
				devUrl: "http://localhost:5173",
				frontendDist: "../dist",
			},
			productName: "My App",
			version: "1.0.0",
			identifier: "com.example.myapp",
			app: {
				withGlobalTauri: true,
				windows: [
					{
						title: "My App",
						width: 1280,
						height: 720,
						resizable: true,
						fullscreen: false,
					},
				],
				security: {
					csp: "default-src 'self'",
				},
			},
			bundle: {
				active: true,
				targets: "all",
				icon: ["icons/32x32.png", "icons/128x128.png", "icons/128x128@2x.png", "icons/icon.icns", "icons/icon.ico"],
			},
		},
		null,
		2,
	);
}
