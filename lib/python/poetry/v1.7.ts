export function generate(params: any): string {
	return `[tool.poetry]
name = "my-project"
version = "1.0.0"
description = "A Python project"
authors = ["Developer <dev@example.com>"]
license = "MIT"
readme = "README.md"
packages = [{include = "src"}]

[tool.poetry.dependencies]
python = "^3.12"
fastapi = "^0.104.1"
uvicorn = {extras = ["standard"], version = "^0.24.0"}
sqlalchemy = "^2.0.23"
alembic = "^1.12.1"
python-dotenv = "^1.0.0"
pydantic = "^2.5.3"
requests = "^2.31.0"

[tool.poetry.group.dev.dependencies]
pytest = "^8.0.0"
pytest-cov = "^4.1.0"
black = "^23.11.0"
flake8 = "^6.1.0"
mypy = "^1.7.1"
pre-commit = "^3.6.0"

[build-system]
requires = ["poetry-core"]
build-backend = "poetry.core.masonry.api"

[tool.black]
line-length = 100
target-version = ['py312']

[tool.mypy]
python_version = "3.12"
strict = true

[tool.pytest.ini_options]
testpaths = ["tests"]`;
}
