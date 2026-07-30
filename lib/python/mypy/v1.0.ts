export function generate(params: any): string {
	return `[mypy]
python_version = 3.12
warn_return_any = true
warn_unused_configs = true
disallow_untyped_defs = true
disallow_any_unimported = false
no_implicit_optional = true
check_untyped_defs = true
warn_redundant_casts = true
warn_unused_ignores = true
warn_no_return = true
strict_equality = true

[mypy.plugins.django-stubs.*]
django_settings_module = config.settings

[mypy-*.migrations.*]
ignore_errors = true

[mypy-*.tests.*]
disallow_untyped_defs = false`;
}
