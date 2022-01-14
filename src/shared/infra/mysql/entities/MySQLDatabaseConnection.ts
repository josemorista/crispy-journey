import { createPool, Pool } from "mysql2/promise";
import { ENV } from "../../../../ENV";

export class MySqlDatabaseConnection {
	private pool: Pool;
	static instance: MySqlDatabaseConnection;

	private constructor(connectionConfig = {
		host: ENV.DB_HOST,
		user: ENV.DB_USER,
		port: Number(ENV.DB_PORT),
		password: ENV.DB_PASSWORD,
		database: ENV.DB_DB
	}) {
		this.pool = createPool(connectionConfig);
	}

	static getInstance(): MySqlDatabaseConnection {
		if (!this.instance) {
			this.instance = new MySqlDatabaseConnection();
		}
		return this.instance;
	}

	getConnectionPool() {
		return this.pool;
	}
}