export function generate(params: any): string {
	return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE hibernate-configuration PUBLIC
    "-//Hibernate/Hibernate Configuration DTD 3.0//EN"
    "http://www.hibernate.org/dtd/hibernate-configuration-3.0.dtd">

<hibernate-configuration>
    <session-factory>
        <property name="hibernate.connection.driver_class">com.mysql.cj.jdbc.Driver</property>
        <property name="hibernate.connection.url">jdbc:mysql://localhost:3306/mydb?useSSL=false&amp;serverTimezone=UTC&amp;allowPublicKeyRetrieval=true</property>
        <property name="hibernate.connection.username">root</property>
        <property name="hibernate.connection.password">root</property>
        
        <property name="hibernate.c3p0.min_size">5</property>
        <property name="hibernate.c3p0.max_size">20</property>
        <property name="hibernate.c3p0.timeout">300</property>
        <property name="hibernate.c3p0.max_statements">50</property>
        <property name="hibernate.c3p0.idle_test_period">3000</property>
        
        <property name="hibernate.dialect">org.hibernate.dialect.MySQL8Dialect</property>
        <property name="hibernate.hbm2ddl.auto">update</property>
        <property name="hibernate.show_sql">true</property>
        <property name="hibernate.format_sql">true</property>
        <property name="hibernate.use_sql_comments">true</property>
        <property name="hibernate.generate_statistics">false</property>
        <property name="hibernate.jdbc.batch_size">50</property>
        <property name="hibernate.jdbc.fetch_size">50</property>
        <property name="hibernate.order_inserts">true</property>
        <property name="hibernate.order_updates">true</property>
        <property name="hibernate.batch_versioned_data">true</property>
        <property name="hibernate.cache.use_second_level_cache">true</property>
        <property name="hibernate.cache.use_query_cache">true</property>
        <property name="hibernate.cache.region.factory_class">org.hibernate.cache.jcache.JCacheRegionFactory</property>
        
        <mapping class="com.example.entity.User"/>
        <mapping class="com.example.entity.Product"/>
        <mapping class="com.example.entity.Order"/>
        <mapping class="com.example.entity.Category"/>
    </session-factory>
</hibernate-configuration>`;
}
