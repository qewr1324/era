export function generate(params: any): string {
	return `<?xml version="1.0" encoding="UTF-8"?>
<ruleset name="Custom Rules"
    xmlns="http://pmd.sourceforge.net/ruleset/2.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://pmd.sourceforge.net/ruleset/2.0.0
    http://pmd.sourceforge.net/ruleset_2_0_0.xsd">
    
    <description>PMD Rules for My Project</description>
    
    <rule ref="category/java/bestpractices.xml">
        <exclude name="GuardLogStatement"/>
        <exclude name="JUnitAssertionsShouldIncludeMessage"/>
    </rule>
    
    <rule ref="category/java/codestyle.xml">
        <exclude name="ShortVariable"/>
        <exclude name="LongVariable"/>
        <exclude name="OnlyOneReturn"/>
    </rule>
    
    <rule ref="category/java/design.xml">
        <exclude name="LawOfDemeter"/>
    </rule>
    
    <rule ref="category/java/errorprone.xml">
        <exclude name="BeanMembersShouldSerialize"/>
    </rule>
    
    <rule ref="category/java/performance.xml"/>
    
    <rule ref="category/java/security.xml"/>
    
    <rule ref="category/java/multithreading.xml"/>
    
</ruleset>`;
}
