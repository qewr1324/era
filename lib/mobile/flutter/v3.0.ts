export function generate(params: any): string {
	return `name: my_app
description: A Flutter application
publish_to: 'none'
version: 1.0.0+1

environment:
  sdk: '>=3.0.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  
  cupertino_icons: ^1.0.5
  http: ^1.0.0
  provider: ^6.0.5

dev_dependencies:
  flutter_test:
    sdk: flutter
  
  flutter_lints: ^2.0.0

flutter:
  uses-material-design: true`;
}
