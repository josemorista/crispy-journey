import { Client } from "../../../../domain/entities/Client";
import { Enterprise } from "../../../../domain/entities/Enterprise";
import { User } from "../../../../domain/entities/User";
import { UsersRepository } from "../../../repositories/UsersRepository";

const users: Array<User> = [];
let inserts = 0;

export class MemUsersRepository implements UsersRepository {

	private incrementInserts() {
		inserts++;
	}

	async saveEnterprise(enterprise: Enterprise): Promise<void> {
		users.push(enterprise);
		this.incrementInserts();
	}

	async saveClient(client: Client): Promise<void> {
		users.push(client);
		this.incrementInserts();
	}

	async existsWithEmail(email: string): Promise<boolean> {
		return users.some(el => el.email === email);
	}

	async getSequentialId(): Promise<number> {
		return (inserts + 1);
	}

}