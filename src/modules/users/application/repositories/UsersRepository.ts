import { Client } from "../../domain/entities/Client";
import { Enterprise } from "../../domain/entities/Enterprise";

export interface UsersRepository {
	saveEnterprise(enterprise: Enterprise): Promise<void>;
	saveClient(client: Client): Promise<void>;
	existsWithEmail(email: string): Promise<boolean>;
	getSequentialId(): Promise<number>;
}