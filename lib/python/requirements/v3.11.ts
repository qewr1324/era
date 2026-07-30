export function generate(params: any): string {
	return `# Web Framework
django==4.2
djangorestframework==3.14.0
flask==2.3.0

# Database
psycopg2-binary==2.9.9
sqlalchemy==2.0.23

# Async
celery==5.3.4
redis==5.0.1

# Testing
pytest==7.4.4
coverage==7.3.2

# Development
black==23.11.0
flake8==6.1.0

# Utilities
python-dotenv==1.0.0
pydantic==2.5.3
requests==2.31.0`;
}
