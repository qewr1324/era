export function generate(params: any): string {
	return `[[source]]
url = "https://pypi.org/simple"
verify_ssl = true
name = "pypi"

[packages]
django = "==5.0"
djangorestframework = "==3.14.0"
psycopg2-binary = "==2.9.9"
celery = "==5.3.4"
redis = "==5.0.1"
python-dotenv = "==1.0.0"

[dev-packages]
pytest = "==7.4.4"
pytest-django = "==4.7.0"
black = "==23.11.0"
flake8 = "==6.1.0"
mypy = "==1.7.1"
pre-commit = "==3.6.0"

[requires]
python_version = "3.12"

[pipenv]
allow_prereleases = false`;
}
