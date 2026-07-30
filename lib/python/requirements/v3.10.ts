export function generate(params: any): string {
	return `# Web Framework
django==4.1
flask==2.2.0

# Database
psycopg2-binary==2.9.5
sqlalchemy==1.4.46

# Testing
pytest==7.2.0

# Utilities
python-dotenv==0.21.0
requests==2.28.0`;
}
