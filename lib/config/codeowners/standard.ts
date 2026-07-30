export function generate(params: any): string {
	return `# Default owners for everything in the repo
* @org/core-team

# Frontend code
/frontend/ @org/frontend-team
/src/components/ @org/frontend-team

# Backend code
/backend/ @org/backend-team
/src/api/ @org/backend-team

# Documentation
/docs/ @org/docs-team
*.md @org/docs-team

# Configuration files
*.config.js @org/devops-team
Dockerfile @org/devops-team
docker-compose.yml @org/devops-team

# CI/CD
.github/workflows/ @org/devops-team
.gitlab-ci.yml @org/devops-team

# Security
/.github/security/ @org/security-team`;
}
