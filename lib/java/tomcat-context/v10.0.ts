export function generate(params: any): string {
	return `<?xml version="1.0" encoding="UTF-8"?>
<Context>
    <WatchedResource>WEB-INF/web.xml</WatchedResource>
    <WatchedResource>\${catalina.base}/conf/web.xml</WatchedResource>
    
    <Resource name="jdbc/MyDB"
              auth="Container"
              type="javax.sql.DataSource"
              maxTotal="100"
              maxIdle="30"
              maxWaitMillis="10000"
              username="postgres"
              password="password"
              driverClassName="org.postgresql.Driver"
              url="jdbc:postgresql://localhost:5432/mydb"
              validationQuery="SELECT 1"
              testOnBorrow="true"/>
    
    <Environment name="app.env" 
                 value="production" 
                 type="java.lang.String" 
                 override="false"/>
    
    <Valve className="org.apache.catalina.valves.AccessLogValve"
           directory="logs"
           prefix="localhost_access_log"
           suffix=".txt"
           pattern="%h %l %u %t &quot;%r&quot; %s %b" />
    
</Context>`;
}
