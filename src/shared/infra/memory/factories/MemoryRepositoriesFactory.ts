import { MemUsersRepository } from "../../../../modules/users/application/infra/memory/repositories/MemUsersRepository";
import { UsersRepository } from "../../../../modules/users/application/repositories/UsersRepository";
import { RepositoriesFactory } from "../../../application/factories/RepositoriesFactory";

export class MemoryRepositoriesFactory implements RepositoriesFactory {
	createUsersRepository(): UsersRepository {
		return new MemUsersRepository();
	}

}