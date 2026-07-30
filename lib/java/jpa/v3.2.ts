export function generate(params: any): string {
	return `<?xml version="1.0" encoding="UTF-8"?>
<persistence version="3.2"
    xmlns="https://jakarta.ee/xml/ns/persistence"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="https://jakarta.ee/xml/ns/persistence
    https://jakarta.ee/xml/ns/persistence/persistence_3_2.xsd">
    
    <persistence-unit name="postgresql-unit" transaction-type="RESOURCE_LOCAL">
        <provider>org.hibernate.jpa.HibernatePersistenceProvider</provider>
        
        <class>com.example.entity.User</class>
        <class>com.example.entity.Product</class>
        
        <properties>
            <!-- Database Config -->
            <!-- PostgreSQL -->
            <property name="jakarta.persistence.jdbc.driver" value="org.postgresql.Driver"/>
            <property name="jakarta.persistence.jdbc.url" value="jdbc:postgresql://localhost:5432/mydb?currentSchema=public&amp;ssl=false"/>
            <property name="jakarta.persistence.jdbc.user" value="postgres"/>
            <property name="jakarta.persistence.jdbc.password" value="your_password"/>

            <!-- MySQL -->
            <!-- <property name="jakarta.persistence.jdbc.driver" value="com.mysql.cj.jdbc.Driver"/> -->
            <!-- <property name="jakarta.persistence.jdbc.url" value="jdbc:mysql://localhost:3306/mydb?useSSL=false&amp;serverTimezone=UTC&amp;allowPublicKeyRetrieval=true"/> -->
            <!-- <property name="jakarta.persistence.jdbc.user" value="root"/> -->
            <!-- <property name="jakarta.persistence.jdbc.password" value="your_password"/> -->

            <!-- Oracle -->
            <!-- <property name="jakarta.persistence.jdbc.driver" value="oracle.jdbc.OracleDriver"/> -->
            <!-- <property name="jakarta.persistence.jdbc.url" value="jdbc:oracle:thin:@localhost:1521:xe"/> -->
            <!-- <property name="jakarta.persistence.jdbc.url" value="jdbc:oracle:thin:@//localhost:1521/XEPDB1"/> -->
            <!-- <property name="jakarta.persistence.jdbc.user" value="system"/> -->
            <!-- <property name="jakarta.persistence.jdbc.password" value="your_password"/> -->
            
            <!-- Hibernate Config For Database -->
            <!-- PostgreSQL -->
            <property name="hibernate.dialect" value="org.hibernate.dialect.PostgreSQLDialect"/>
            <!-- MySQL -->
            <!-- <property name="hibernate.dialect" value="org.hibernate.dialect.MySQL8Dialect"/> -->
            <!-- Oracle -->
            <!-- <property name="hibernate.dialect" value="org.hibernate.dialect.OracleDialect"/> -->
            <property name="hibernate.hbm2ddl.auto" value="update"/>
            <property name="hibernate.show_sql" value="true"/>
            <property name="hibernate.format_sql" value="true"/>
            
            <!-- Connection Pool Config (C3P0) -->
            <property name="hibernate.c3p0.min_size" value="5"/>
            <property name="hibernate.c3p0.max_size" value="20"/>
            <property name="hibernate.c3p0.timeout" value="300"/>
            <property name="hibernate.c3p0.max_statements" value="50"/>
            <property name="hibernate.c3p0.idle_test_period" value="3000"/>
        </properties>
    </persistence-unit>
</persistence>`;
}
