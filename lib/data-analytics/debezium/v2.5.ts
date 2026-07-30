export function generate(params: any): string {
	return JSON.stringify(
		{
			name: "postgres-connector",
			config: {
				"connector.class": "io.debezium.connector.postgresql.PostgresConnector",
				"database.hostname": "postgres",
				"database.port": "5432",
				"database.user": "postgres",
				"database.password": "password",
				"database.dbname": "mydb",
				"database.server.name": "dbserver1",
				"table.include.list": "public.users,public.orders",
				"plugin.name": "pgoutput",
				"slot.name": "debezium_slot",
				"publication.name": "dbz_publication",
				"topic.prefix": "mydb",
				transforms: "unwrap",
				"transforms.unwrap.type": "io.debezium.transforms.ExtractNewRecordState",
				"transforms.unwrap.drop.tombstones": "false",
			},
		},
		null,
		2,
	);
}
