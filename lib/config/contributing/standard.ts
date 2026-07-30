export function generate(params: any): string {
	return `# Contributing

## Getting Started

1. Fork the repository
2. Clone your fork
3. Create a new branch
4. Make your changes
5. Push to your fork
6. Submit a pull request

## Development Setup

\`\`\`bash
git clone https://github.com/your-username/repo.git
cd repo
npm install
cp .env.example .env
\`\`\`

## Code Style

- Follow the existing code style
- Use ESLint and Prettier
- Write meaningful commit messages

## Testing

- Write tests for new features
- Ensure all tests pass before submitting PR
- Run \`npm test\` to execute tests

## Pull Request Process

1. Update documentation if needed
2. Add tests for new functionality
3. Ensure CI passes
4. Get review from maintainers`;
}
