export function generate(params: any): string {
	return `# My Project

[![Build Status](https://img.shields.io/github/actions/workflow/status/user/repo/main.yml)](https://github.com/user/repo/actions)
[![Version](https://img.shields.io/github/package-json/v/user/repo)](https://github.com/user/repo/releases)
[![License](https://img.shields.io/github/license/user/repo)](LICENSE)

## Description

A detailed description of what this project does and why it exists.

## Features

- Feature 1
- Feature 2
- Feature 3

## Prerequisites

- Node.js >= 20
- PostgreSQL >= 16
- Redis >= 7

## Installation

\`\`\`bash
git clone https://github.com/user/repo.git
cd repo
npm install
cp .env.example .env
npm run migrate
npm run seed
\`\`\`

## Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 3000 |
| DB_HOST | Database host | localhost |

## Usage

### Development

\`\`\`bash
npm run dev
\`\`\`

### Production

\`\`\`bash
npm run build
npm start
\`\`\`

### Testing

\`\`\`bash
npm test
npm run test:coverage
\`\`\`

## API Documentation

API documentation is available at \`/api/docs\` when running in development mode.

## Deployment

\`\`\`bash
docker build -t my-app .
docker run -p 3000:3000 my-app
\`\`\`

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- Author: Developer
- Email: dev@example.com
- GitHub: [@user](https://github.com/user)`;
}
