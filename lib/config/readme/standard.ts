export function generate(params: any): string {
	return `# My Project

A brief description of what this project does.

## Installation

\`\`\`bash
npm install
\`\`\`

## Usage

\`\`\`bash
npm start
\`\`\`

## API Reference

| Endpoint | Method | Description |
|----------|--------|-------------|
| /api/users | GET | Get all users |
| /api/users | POST | Create a user |

## License

[MIT](LICENSE)`;
}
