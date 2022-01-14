import { RowDataPacket, PoolConnection } from "mysql2/promise";
import { MySqlDatabaseConnection } from "../../../../../../shared/infra/mysql/entities/MySQLDatabaseConnection";
import { Client } from "../../../../domain/entities/Client";
import { Enterprise } from "../../../../domain/entities/Enterprise";
import { User } from "../../../../domain/entities/User";
import { UsersRepository } from "../../../repositories/UsersRepository";

export class MySQLUsersRepository implements UsersRepository {
	constructor(
		private readonly pool = MySqlDatabaseConnection.getInstance().getConnectionPool()
	) { }

	private async saveUser(connection: PoolConnection, data: User) {
		await connection.query<RowDataPacket[]>("insert into Users(id, email, kind, password, createdAt, updatedAt) values (?,?,?,?,?,?);", [
			data.id,
			data.email,
			data.kind,
			data.password,
			data.createdAt,
			data.updatedAt
		]);
	}

	async saveClient(client: Client): Promise<void> {
		const connection = await this.pool.getConnection();
		try {
			await connection.query("START TRANSACTION;");
			await this.saveUser(connection, client);
			await connection.query("insert into Clients(userId, firstname, lastname, cpf, birthDate, producerCard) values (?,?,?,?,?,?);", [
				client.id,
				client.firstname,
				client.lastname,
				client.cpf,
				client.birthDate,
				client.producerCard
			]);
			await connection.query("COMMIT;");
		} catch (error) {
			connection.query("ROLLBACK;");
			throw error;
		} finally {
			connection.release();
		}
	}

	async saveEnterprise(enterprise: Enterprise): Promise<void> {
		const connection = await this.pool.getConnection();
		try {
			await connection.query("START TRANSACTION;");
			await this.saveUser(connection, enterprise);
			await connection.query("insert into Enterprises(userId, name, foundationDate, cnpj) values (?,?,?,?);", [
				enterprise.id,
				enterprise.name,
				enterprise.foundationDate,
				enterprise.cnpj
			]);
			await connection.query("COMMIT;");
		} catch (error) {
			connection.query("ROLLBACK;");
			throw error;
		} finally {
			connection.release();
		}
	}

	async existsWithEmail(email: string): Promise<boolean> {
		const [rows] = await this.pool.query<RowDataPacket[]>("select id from Users where email=? limit 1;", [email]);
		return !!rows.length;
	}

	async getSequentialId(): Promise<number> {
		const [rows] = await this.pool.query<RowDataPacket[]>("select id from Users u order by id desc limit 1;", []);
		return (rows[0]?.id || 0) + 1;
	}

}