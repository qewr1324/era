export function generate(params: any): string {
	return `appId: com.example.myapp
productName: My App
copyright: Copyright © 2024

directories:
  output: dist
  buildResources: build

files:
  - "**/*"
  - "!src/**/*"
  - "!test/**/*"

mac:
  category: public.app-category.productivity
  target:
    - dmg
    - zip
  icon: build/icon.icns

win:
  target:
    - nsis
    - portable
  icon: build/icon.ico

linux:
  target:
    - AppImage
    - deb
  category: Utility
  icon: build/icon.png

nsis:
  oneClick: false
  allowToChangeInstallationDirectory: true`;
}
