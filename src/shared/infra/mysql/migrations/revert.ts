
import path from "path";
import fs from "fs/promises";
import { createConnection, RowDataPacket } from "mysql2/promise";
import { ENV } from "../../../../ENV";

const migrationsPath = path.join(__dirname, "down");

export default async (): Promise<void> => {
	const client = await createConnection({
		host: ENV.DB_HOST,
		password: ENV.DB_PASSWORD,
		port: Number(ENV.DB_PORT),
		user: ENV.DB_USER,
		database: ENV.DB_DB
	});

	const [rows,] = <RowDataPacket[]>await client.query("select * from Migrations order by name desc limit 1;");

	if (rows.length === 0) {
		console.log("No migrations to revert");
		return;
	}

	const sql = (await fs.readFile(path.join(migrationsPath, `${rows[0].name}.sql`), { encoding: "utf-8" }))
		.replace(/\n|\t/g, "").split(";");


	await client.beginTransaction();
	try {
		for (const query of sql) {
			const trimmed = query.trim();
			if (trimmed.length) {
				console.log(trimmed);
				await client.execute(trimmed);
			}
		}
		await client.query("delete from Migrations where name like ?;", [rows[0].name]);
		await client.commit();
		console.log(`\n* Reverted ${rows[0].name}\n`);
	} catch (error) {
		console.error(error);
		await client.rollback();
	}

	await client.end();

};