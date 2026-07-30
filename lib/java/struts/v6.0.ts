export function generate(params: any): string {
	return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE struts PUBLIC
    "-//Apache Software Foundation//DTD Struts Configuration 6.0//EN"
    "http://struts.apache.org/dtds/struts-6.0.dtd">

<struts>
    <constant name="struts.devMode" value="true" />
    <constant name="struts.enable.DynamicMethodInvocation" value="false" />
    <constant name="struts.convention.package.locators" value="action" />
    <constant name="struts.convention.result.path" value="/WEB-INF/views/" />
    
    <package name="default" extends="struts-default" namespace="/">
        
        <action name="index" class="com.example.action.IndexAction">
            <result>/WEB-INF/views/index.jsp</result>
        </action>
        
        <action name="users" class="com.example.action.UserAction" method="list">
            <result name="success">/WEB-INF/views/users/list.jsp</result>
        </action>
        
        <action name="user-*" class="com.example.action.UserAction" method="{1}">
            <result name="success">/WEB-INF/views/users/{1}.jsp</result>
            <result name="input">/WEB-INF/views/users/form.jsp</result>
            <result name="error">/WEB-INF/views/error.jsp</result>
        </action>
        
    </package>
    
    <package name="api" extends="json-default" namespace="/api">
        
        <action name="users" class="com.example.action.api.UserApiAction" method="getAll">
            <result type="json">
                <param name="root">users</param>
            </result>
        </action>
        
    </package>
</struts>`;
}
