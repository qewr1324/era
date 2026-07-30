export function generate(params: any): string {
	return `# Lombok Configuration
config.stopBubbling = true

lombok.accessors.chain = true
lombok.accessors.fluent = true

lombok.tostring.includeFieldNames = true
lombok.tostring.doNotUseGetters = true

lombok.equalsandhashcode.callSuper = call
lombok.equalsandhashcode.doNotUseGetters = true

lombok.data.flagUsage = warning

lombok.log.fieldName = log
lombok.log.fieldIsStatic = true

lombok.builder.flagUsage = allow

lombok.nonNull.flagUsage = error`;
}
