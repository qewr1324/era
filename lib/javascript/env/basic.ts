export function generate(params: any): string {
	return `# App
NODE_ENV=development
PORT=3000
APP_NAME=MyApp

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=mydb

# API
API_URL=http://localhost:8080/api`;
}
