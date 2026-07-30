export function generate(params: any): string {
	return `sonar.projectKey=my-project
sonar.projectName=My Project
sonar.projectVersion=1.0.0
sonar.sourceEncoding=UTF-8

sonar.sources=src
sonar.tests=tests
sonar.test.inclusions=**/*.test.*,**/*.spec.*

sonar.coverage.exclusions=tests/**,**/*.test.*,**/*.spec.*,**/migrations/**

sonar.javascript.lcov.reportPaths=coverage/lcov.info
sonar.python.coverage.reportPaths=coverage.xml

sonar.issue.ignore.multicriteria=e1,e2

sonar.issue.ignore.multicriteria.e1.ruleKey=typescript:S1134
sonar.issue.ignore.multicriteria.e1.resourceKey=**/*.test.*

sonar.issue.ignore.multicriteria.e2.ruleKey=typescript:S1135
sonar.issue.ignore.multicriteria.e2.resourceKey=**/*`;
}
