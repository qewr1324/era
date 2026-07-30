export function generate(params: any): string {
	return `parameters:
    level: 8
    paths:
        - src
    excludePaths:
        - src/Migrations
        - tests
    ignoreErrors:
        - '#Access to an undefined property#'
    checkMissingIterableValueType: false
    checkGenericClassInNonGenericObjectType: false`;
}