import { UsersRepository } from "../../../modules/users/application/repositories/UsersRepository";

export interface RepositoriesFactory {
	createUsersRepository(): UsersRepository;
}