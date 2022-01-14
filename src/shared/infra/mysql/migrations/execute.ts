import "dotenv/config";
import fs from "fs/promises";
import path from "path";
import { createConnection, RowDataPacket } from "mysql2/promise";
import { ENV } from "../../../../ENV";

const migrationsPath = path.join(__dirname, "up");

export default async (): Promise<void> => {
	const client = await createConnection({
		host: ENV.DB_HOST,
		password: ENV.DB_PASSWORD,
		port: Number(ENV.DB_PORT),
		user: ENV.DB_USER,
		database: ENV.DB_DB
	});

	await client.query(`create table if not exists Migrations (
		name varchar(255) unique not null,
		createdAt timestamp not null default current_timestamp
	) default charset=UTF8MB4;`);

	const migrations = await fs.readdir(migrationsPath);

	for (const migration of migrations) {

		const migrationName = migration.split(".sql")[0];
		const [rows,] = <RowDataPacket[]>(await client.query("select * from Migrations where name like ?;", [migrationName]));

		if (rows.length === 0) {
			await client.beginTransaction();
			try {
				const sql = (await fs.readFile(path.join(migrationsPath, migration), { encoding: "utf-8" })).replace(/\n|\t/g, "").split(";");
				for (const query of sql) {
					const trimmed = query.trim();
					if (trimmed.length) {
						console.log(trimmed);
						await client.execute(trimmed);
					}
				}
				console.log(`\n* Executed ${migrationName}\n`);
				await client.query("insert ignore into Migrations(name) values(?);", [migrationName]);
				await client.commit();
			} catch (error) {
				console.error("Rolling back");
				await client.rollback();
				throw error;
			}
		}

	}

	await client.end();

};