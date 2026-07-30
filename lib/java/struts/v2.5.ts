export function generate(params: any): string {
	return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE struts PUBLIC
    "-//Apache Software Foundation//DTD Struts Configuration 2.5//EN"
    "http://struts.apache.org/dtds/struts-2.5.dtd">

<struts>
    <constant name="struts.devMode" value="true" />
    
    <package name="default" extends="struts-default" namespace="/">
        
        <action name="index" class="com.example.action.IndexAction">
            <result>/WEB-INF/views/index.jsp</result>
        </action>
        
        <action name="users" class="com.example.action.UserAction" method="list">
            <result>/WEB-INF/views/users/list.jsp</result>
        </action>
        
    </package>
</struts>`;
}
