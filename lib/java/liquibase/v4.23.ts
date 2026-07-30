export function generate(params: any): string {
	return `<?xml version="1.0" encoding="UTF-8"?>
<databaseChangeLog
    xmlns="http://www.liquibase.org/xml/ns/dbchangelog"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:pro="http://www.liquibase.org/xml/ns/pro"
    xsi:schemaLocation="http://www.liquibase.org/xml/ns/dbchangelog
    http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-4.23.xsd">
    
    <changeSet id="1" author="developer" context="development">
        <comment>Create users table</comment>
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
            <column name="role" type="VARCHAR(20)" defaultValue="USER"/>
            <column name="status" type="VARCHAR(20)" defaultValue="ACTIVE"/>
            <column name="created_at" type="TIMESTAMP" defaultValueComputed="CURRENT_TIMESTAMP"/>
            <column name="updated_at" type="TIMESTAMP" defaultValueComputed="CURRENT_TIMESTAMP"/>
        </createTable>
        <rollback>
            <dropTable tableName="users"/>
        </rollback>
    </changeSet>
    
    <changeSet id="2" author="developer">
        <comment>Create products table</comment>
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
            <column name="stock_quantity" type="INT" defaultValue="0"/>
            <column name="sku" type="VARCHAR(50)" unique="true"/>
            <column name="is_active" type="BOOLEAN" defaultValueBoolean="true"/>
            <column name="category_id" type="BIGINT"/>
            <column name="created_at" type="TIMESTAMP" defaultValueComputed="CURRENT_TIMESTAMP"/>
            <column name="updated_at" type="TIMESTAMP" defaultValueComputed="CURRENT_TIMESTAMP"/>
        </createTable>
        <rollback>
            <dropTable tableName="products"/>
        </rollback>
    </changeSet>
    
    <changeSet id="3" author="developer">
        <comment>Create categories table</comment>
        <createTable tableName="categories">
            <column name="id" type="BIGINT" autoIncrement="true">
                <constraints primaryKey="true" nullable="false"/>
            </column>
            <column name="name" type="VARCHAR(50)">
                <constraints nullable="false" unique="true"/>
            </column>
            <column name="description" type="VARCHAR(255)"/>
            <column name="parent_id" type="BIGINT"/>
        </createTable>
        <rollback>
            <dropTable tableName="categories"/>
        </rollback>
    </changeSet>
    
    <changeSet id="4" author="developer">
        <comment>Add foreign key constraints</comment>
        <addForeignKeyConstraint
            baseTableName="products"
            baseColumnNames="category_id"
            constraintName="fk_products_category"
            referencedTableName="categories"
            referencedColumnNames="id"
            onDelete="SET NULL"/>
    </changeSet>
    
    <changeSet id="5" author="developer">
        <comment>Create indexes for performance</comment>
        <createIndex tableName="users" indexName="idx_users_email">
            <column name="email"/>
        </createIndex>
        <createIndex tableName="users" indexName="idx_users_status">
            <column name="status"/>
        </createIndex>
        <createIndex tableName="products" indexName="idx_products_name">
            <column name="name"/>
        </createIndex>
        <createIndex tableName="products" indexName="idx_products_sku">
            <column name="sku"/>
        </createIndex>
        <createIndex tableName="products" indexName="idx_products_category">
            <column name="category_id"/>
        </createIndex>
        <createIndex tableName="products" indexName="idx_products_active">
            <column name="is_active"/>
        </createIndex>
    </changeSet>
    
    <changeSet id="6" author="developer" context="production">
        <comment>Insert default categories</comment>
        <insert tableName="categories">
            <column name="name" value="Electronics"/>
            <column name="description" value="Electronic devices and accessories"/>
        </insert>
        <insert tableName="categories">
            <column name="name" value="Clothing"/>
            <column name="description" value="Apparel and fashion items"/>
        </insert>
        <insert tableName="categories">
            <column name="name" value="Books"/>
            <column name="description" value="Books and publications"/>
        </insert>
    </changeSet>
</databaseChangeLog>`;
}
