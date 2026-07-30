export function generate(params: any): string {
	return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE configuration
    PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
    "http://mybatis.org/dtd/mybatis-3-config.dtd">

<configuration>
    <settings>
        <setting name="cacheEnabled" value="true"/>
        <setting name="lazyLoadingEnabled" value="true"/>
        <setting name="aggressiveLazyLoading" value="false"/>
        <setting name="multipleResultSetsEnabled" value="true"/>
        <setting name="useColumnLabel" value="true"/>
        <setting name="useGeneratedKeys" value="true"/>
        <setting name="autoMappingBehavior" value="FULL"/>
        <setting name="defaultExecutorType" value="REUSE"/>
        <setting name="defaultStatementTimeout" value="30"/>
        <setting name="defaultFetchSize" value="100"/>
        <setting name="mapUnderscoreToCamelCase" value="true"/>
        <setting name="logImpl" value="SLF4J"/>
        <setting name="jdbcTypeForNull" value="NULL"/>
        <setting name="callSettersOnNulls" value="true"/>
        <setting name="returnInstanceForEmptyRow" value="true"/>
    </settings>
    
    <typeAliases>
        <package name="com.example.entity"/>
    </typeAliases>
    
    <typeHandlers>
        <package name="com.example.handler"/>
    </typeHandlers>
    
    <plugins>
        <plugin interceptor="com.github.pagehelper.PageInterceptor">
            <property name="helperDialect" value="mysql"/>
            <property name="reasonable" value="true"/>
            <property name="supportMethodsArguments" value="true"/>
        </plugin>
    </plugins>
    
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://localhost:3306/mydb?useSSL=false&amp;serverTimezone=UTC&amp;allowPublicKeyRetrieval=true"/>
                <property name="username" value="root"/>
                <property name="password" value="root"/>
                <property name="poolMaximumActiveConnections" value="20"/>
                <property name="poolMaximumIdleConnections" value="10"/>
                <property name="poolMaximumCheckoutTime" value="20000"/>
                <property name="poolTimeToWait" value="20000"/>
                <property name="poolPingEnabled" value="true"/>
                <property name="poolPingQuery" value="SELECT 1"/>
            </dataSource>
        </environment>
    </environments>
    
    <mappers>
        <mapper resource="mapper/UserMapper.xml"/>
        <mapper resource="mapper/ProductMapper.xml"/>
        <mapper resource="mapper/OrderMapper.xml"/>
    </mappers>
</configuration>`;
}