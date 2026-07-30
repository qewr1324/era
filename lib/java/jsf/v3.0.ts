export function generate(params: any): string {
	return `<?xml version="1.0" encoding="UTF-8"?>
<faces-config version="3.0"
    xmlns="https://jakarta.ee/xml/ns/jakartaee"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="https://jakarta.ee/xml/ns/jakartaee
    https://jakarta.ee/xml/ns/jakartaee/web-facesconfig_3_0.xsd">
    
    <application>
        <locale-config>
            <default-locale>en</default-locale>
            <supported-locale>fa</supported-locale>
        </locale-config>
        
        <resource-bundle>
            <base-name>messages</base-name>
            <var>msg</var>
        </resource-bundle>
        
        <navigation-handler>
            com.example.config.CustomNavigationHandler
        </navigation-handler>
    </application>
    
    <managed-bean>
        <managed-bean-name>userBean</managed-bean-name>
        <managed-bean-class>com.example.bean.UserBean</managed-bean-class>
        <managed-bean-scope>session</managed-bean-scope>
    </managed-bean>
    
    <navigation-rule>
        <from-view-id>/login.xhtml</from-view-id>
        <navigation-case>
            <from-action>#{loginBean.login}</from-action>
            <from-outcome>success</from-outcome>
            <to-view-id>/dashboard.xhtml</to-view-id>
        </navigation-case>
        <navigation-case>
            <from-outcome>failure</from-outcome>
            <to-view-id>/login.xhtml</to-view-id>
        </navigation-case>
    </navigation-rule>
    
</faces-config>`;
}
