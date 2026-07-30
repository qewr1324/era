export function generate(params: any): string {
	return `<?xml version="1.0" encoding="UTF-8"?>
<Context>
    <Resource name="jdbc/MyDB"
              auth="Container"
              type="javax.sql.DataSource"
              maxTotal="100"
              maxIdle="30"
              maxWaitMillis="10000"
              username="postgres"
              password="password"
              driverClassName="org.postgresql.Driver"
              url="jdbc:postgresql://localhost:5432/mydb"/>
</Context>`;
}
