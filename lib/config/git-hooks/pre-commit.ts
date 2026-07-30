export function generate(params: any): string {
	return `#!/bin/sh

echo "Running pre-commit checks..."

STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(js|jsx|ts|tsx|py|java)$')

if [ -z "$STAGED_FILES" ]; then
  echo "No staged files to check."
  exit 0
fi

echo "Running linter..."
npm run lint

if [ $? -ne 0 ]; then
  echo "Linting failed. Please fix errors before committing."
  exit 1
fi

echo "Running tests..."
npm test -- --bail --findRelatedTests $STAGED_FILES

if [ $? -ne 0 ]; then
  echo "Tests failed. Please fix tests before committing."
  exit 1
fi

echo "Pre-commit checks passed!"
exit 0`;
}
