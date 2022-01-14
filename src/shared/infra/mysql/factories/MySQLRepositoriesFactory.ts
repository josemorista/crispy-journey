import { MySQLUsersRepository } from "../../../../modules/users/application/infra/mysql/repositories/MySQLUsersRepository";
import { UsersRepository } from "../../../../modules/users/application/repositories/UsersRepository";
import { RepositoriesFactory } from "../../../application/factories/RepositoriesFactory";

export class MySQLRepositoriesFactory implements RepositoriesFactory {
	createUsersRepository(): UsersRepository {
		return new MySQLUsersRepository();
	}

}