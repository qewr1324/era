export function generate(params: any): string {
	return `<?xml version="1.0" encoding="UTF-8"?>
<Configuration status="WARN" monitorInterval="30">
    <Properties>
        <Property name="LOG_PATTERN">%d{yyyy-MM-dd HH:mm:ss.SSS} [%t] %-5level %logger{36} - %msg%n</Property>
        <Property name="CONSOLE_PATTERN">%highlight{%d{HH:mm:ss.SSS} [%t] %-5level %logger{36} - %msg%n}</Property>
        <Property name="LOG_PATH">logs</Property>
    </Properties>
    
    <Appenders>
        <Console name="Console" target="SYSTEM_OUT">
            <PatternLayout pattern="\${CONSOLE_PATTERN}"/>
        </Console>
        
        <RollingFile name="File" fileName="\${LOG_PATH}/application.log"
            filePattern="\${LOG_PATH}/application.%d{yyyy-MM-dd}.%i.log.gz">
            <PatternLayout pattern="\${LOG_PATTERN}"/>
            <Policies>
                <TimeBasedTriggeringPolicy interval="1"/>
                <SizeBasedTriggeringPolicy size="10 MB"/>
            </Policies>
            <DefaultRolloverStrategy max="30">
                <Delete basePath="\${LOG_PATH}" maxDepth="1">
                    <IfFileName glob="application.*.log.gz"/>
                    <IfLastModified age="30d"/>
                </Delete>
            </DefaultRolloverStrategy>
        </RollingFile>
        
        <RollingFile name="ErrorFile" fileName="\${LOG_PATH}/application-error.log"
            filePattern="\${LOG_PATH}/application-error.%d{yyyy-MM-dd}.log">
            <PatternLayout pattern="\${LOG_PATTERN}"/>
            <ThresholdFilter level="ERROR" onMatch="ACCEPT" onMismatch="DENY"/>
            <Policies>
                <TimeBasedTriggeringPolicy interval="1"/>
            </Policies>
            <DefaultRolloverStrategy max="30"/>
        </RollingFile>
        
        <Async name="AsyncFile" bufferSize="1000" includeLocation="true">
            <AppenderRef ref="File"/>
        </Async>
    </Appenders>
    
    <Loggers>
        <Logger name="com.example" level="DEBUG" additivity="false">
            <AppenderRef ref="Console"/>
            <AppenderRef ref="AsyncFile"/>
        </Logger>
        <Logger name="org.springframework" level="INFO" additivity="false">
            <AppenderRef ref="Console"/>
            <AppenderRef ref="AsyncFile"/>
        </Logger>
        <Logger name="org.springframework.web" level="DEBUG" additivity="false">
            <AppenderRef ref="Console"/>
            <AppenderRef ref="AsyncFile"/>
        </Logger>
        <Logger name="org.hibernate" level="WARN" additivity="false">
            <AppenderRef ref="Console"/>
            <AppenderRef ref="AsyncFile"/>
        </Logger>
        <Logger name="org.hibernate.SQL" level="DEBUG" additivity="false">
            <AppenderRef ref="Console"/>
            <AppenderRef ref="AsyncFile"/>
        </Logger>
        <Logger name="org.hibernate.type.descriptor.sql.BasicBinder" level="TRACE" additivity="false">
            <AppenderRef ref="Console"/>
            <AppenderRef ref="AsyncFile"/>
        </Logger>
        
        <Root level="INFO">
            <AppenderRef ref="Console"/>
            <AppenderRef ref="AsyncFile"/>
            <AppenderRef ref="ErrorFile"/>
        </Root>
    </Loggers>
</Configuration>`;
}
