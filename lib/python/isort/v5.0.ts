export function generate(params: any): string {
	return `[settings]
profile = black
line_length = 100
multi_line_output = 3
include_trailing_comma = true
force_grid_wrap = 0
use_parentheses = true
ensure_newline_before_comments = true
skip = migrations
skip_glob = **/migrations/**
known_first_party = myapp
known_third_party = django,rest_framework,celery
sections = FUTURE,STDLIB,THIRDPARTY,FIRSTPARTY,LOCALFOLDER`;
}
