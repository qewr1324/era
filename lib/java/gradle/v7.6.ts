export function generate(params: any): string {
	return `plugins {
    id 'java'
    id 'application'
}

group = 'com.example'
version = '1.0.0'

java {
    sourceCompatibility = JavaVersion.VERSION_17
    targetCompatibility = JavaVersion.VERSION_17
}

repositories {
    mavenCentral()
}

dependencies {
    testImplementation 'org.junit.jupiter:junit-jupiter-api:5.10.2'
    testRuntimeOnly 'org.junit.jupiter:junit-jupiter-engine:5.10.2'
}

application {
    mainClass = 'com.example.Main'
}

test {
    useJUnitPlatform()
}

tasks.withType(JavaCompile) {
    options.encoding = 'UTF-8'
}`;
}
