export function generate(params: any): string {
	return `#!/bin/sh

COMMIT_MSG_FILE=$1
COMMIT_MSG=$(cat $COMMIT_MSG_FILE)

PATTERN="^(feat|fix|docs|style|refactor|perf|test|chore|ci|build|revert)(\(.+\))?: .{1,50}"

if ! echo "$COMMIT_MSG" | grep -qE "$PATTERN"; then
  echo "Invalid commit message format!"
  echo ""
  echo "Format: <type>(<scope>): <description>"
  echo ""
  echo "Types: feat, fix, docs, style, refactor, perf, test, chore, ci, build, revert"
  echo "Example: feat(auth): add login functionality"
  exit 1
fi

exit 0`;
}
