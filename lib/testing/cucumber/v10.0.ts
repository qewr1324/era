export function generate(params: any): string {
	return `module.exports = {
  default: {
    require: [
      'features/step_definitions/**/*.js',
      'features/support/**/*.js',
    ],
    format: [
      'progress',
      'json:reports/cucumber-report.json',
      'html:reports/cucumber-report.html',
    ],
    publishQuiet: true,
    retry: 2,
    parallel: 4,
  },
};`;
}
