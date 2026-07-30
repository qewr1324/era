export function generate(params: any): string {
	return `# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - ${new Date().toISOString().split("T")[0]}

### Added
- Initial release
- Basic API endpoints
- User authentication
- Database integration

### Changed
- None

### Deprecated
- None

### Removed
- None

### Fixed
- None

### Security
- None

## [0.9.0] - 2024-01-01

### Added
- Beta version
- Core functionality

[1.0.0]: https://github.com/user/repo/releases/tag/v1.0.0
[0.9.0]: https://github.com/user/repo/releases/tag/v0.9.0`;
}
