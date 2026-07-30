export function generate(params: any): string {
	return `Args = --enable-https --enable-url-protocols=http,https
-H:+ReportExceptionStackTraces
-H:ReflectionConfigurationResources=\${.}/reflect-config.json
-H:ResourceConfigurationResources=\${.}/resource-config.json
-H:JNIConfigurationResources=\${.}/jni-config.json
-H:SerializationConfigurationResources=\${.}/serialization-config.json
--initialize-at-build-time=org.slf4j,ch.qos.logback
--trace-class-initialization=org.hibernate
-H:+AllowFoldMethods`;
}
