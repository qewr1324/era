export function generate(params: any): string {
	return `[tox]
envlist = py310,py311,py312,lint,coverage
isolated_build = true

[testenv]
deps =
    pytest
    pytest-cov
    pytest-django
commands =
    pytest tests/ {posargs}

[testenv:py310]
basepython = python3.10

[testenv:py311]
basepython = python3.11

[testenv:py312]
basepython = python3.12

[testenv:lint]
deps =
    black
    flake8
    mypy
commands =
    black --check .
    flake8 src/
    mypy src/

[testenv:coverage]
deps =
    pytest
    pytest-cov
commands =
    pytest --cov=src --cov-report=html --cov-report=term tests/
    coverage report --fail-under=80`;
}
