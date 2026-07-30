export function generate(params: any): string {
	return `<?xml version="1.0" encoding="UTF-8"?>
<faces-config version="2.3"
    xmlns="http://xmlns.jcp.org/xml/ns/javaee"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee
    http://xmlns.jcp.org/xml/ns/javaee/web-facesconfig_2_3.xsd">
    
    <application>
        <locale-config>
            <default-locale>en</default-locale>
        </locale-config>
    </application>
    
    <managed-bean>
        <managed-bean-name>userBean</managed-bean-name>
        <managed-bean-class>com.example.bean.UserBean</managed-bean-class>
        <managed-bean-scope>session</managed-bean-scope>
    </managed-bean>
    
</faces-config>`;
}
