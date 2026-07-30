export function generate(params: any): string {
	return `<?xml version="1.0" encoding="UTF-8"?>
<databaseChangeLog
    xmlns="http://www.liquibase.org/xml/ns/dbchangelog"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.liquibase.org/xml/ns/dbchangelog
    http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-4.20.xsd">
    
    <changeSet id="1" author="developer">
        <createTable tableName="users">
            <column name="id" type="BIGINT" autoIncrement="true">
                <constraints primaryKey="true" nullable="false"/>
            </column>
            <column name="username" type="VARCHAR(50)">
                <constraints nullable="false" unique="true"/>
            </column>
            <column name="email" type="VARCHAR(100)">
                <constraints nullable="false" unique="true"/>
            </column>
            <column name="password" type="VARCHAR(255)">
                <constraints nullable="false"/>
            </column>
            <column name="first_name" type="VARCHAR(50)"/>
            <column name="last_name" type="VARCHAR(50)"/>
            <column name="created_at" type="TIMESTAMP" defaultValueComputed="CURRENT_TIMESTAMP"/>
            <column name="updated_at" type="TIMESTAMP" defaultValueComputed="CURRENT_TIMESTAMP"/>
        </createTable>
    </changeSet>
    
    <changeSet id="2" author="developer">
        <createTable tableName="products">
            <column name="id" type="BIGINT" autoIncrement="true">
                <constraints primaryKey="true" nullable="false"/>
            </column>
            <column name="name" type="VARCHAR(100)">
                <constraints nullable="false"/>
            </column>
            <column name="description" type="TEXT"/>
            <column name="price" type="DECIMAL(10,2)">
                <constraints nullable="false"/>
            </column>
            <column name="stock" type="INT" defaultValue="0"/>
            <column name="created_at" type="TIMESTAMP" defaultValueComputed="CURRENT_TIMESTAMP"/>
        </createTable>
    </changeSet>
    
    <changeSet id="3" author="developer">
        <addColumn tableName="products">
            <column name="category" type="VARCHAR(50)"/>
        </addColumn>
    </changeSet>
    
    <changeSet id="4" author="developer">
        <createIndex tableName="users" indexName="idx_users_email">
            <column name="email"/>
        </createIndex>
        <createIndex tableName="products" indexName="idx_products_name">
            <column name="name"/>
        </createIndex>
    </changeSet>
</databaseChangeLog>`;
}
