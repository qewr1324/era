export function generate(params: any): string {
	return `<?xml version="1.0" encoding="UTF-8"?>
<mapper-config xmlns="http://mapstruct.org/mapper-config"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://mapstruct.org/mapper-config
    http://mapstruct.org/mapper-config-1.0.xsd">
    
    <settings>
        <setting name="defaultComponentModel" value="spring" />
        <setting name="unmappedTargetPolicy" value="WARN" />
        <setting name="unmappedSourcePolicy" value="IGNORE" />
    </settings>
    
</mapper-config>`;
}
