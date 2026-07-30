export function generate(params: any): string {
	return `module github.com/username/myproject

go 1.21

require (
	github.com/gin-gonic/gin v1.9.1
	github.com/go-sql-driver/mysql v1.7.1
	github.com/joho/godotenv v1.5.1
)`;
}
