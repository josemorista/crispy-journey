import { AppError } from "../../../../../shared/application/errors/AppError";
import { RepositoriesFactory } from "../../../../../shared/application/factories/RepositoriesFactory";
import { FieldValidationBuilder } from "../../../../../shared/validation/builders/FieldValidationBuilder";
import { FormValidationCompositor } from "../../../../../shared/validation/compositors/FormValidationCompositor";
import { Client } from "../../../domain/entities/Client";
import { HashProvider } from "../../providers/HashProvider";
import { UsersRepository } from "../../repositories/UsersRepository";
import { CreateClientInput } from "./CreateClientInput";

export class CreateClient {

	private usersRepository: UsersRepository;

	constructor(
		repositoriesFactory: RepositoriesFactory,
		private readonly hashProvider: HashProvider
	) {
		this.usersRepository = repositoriesFactory.createUsersRepository();
	}

	async execute(input: CreateClientInput) {
		const error = (new FormValidationCompositor([
			...new FieldValidationBuilder("firstname").required().build(),
			...new FieldValidationBuilder("lastname").required().build(),
			...new FieldValidationBuilder("email").required().email().build(),
			...new FieldValidationBuilder("password").required().minmaxLength(6).build(),
			...new FieldValidationBuilder("cpf").required().minmaxLength(6).build(),
		])).validate(input);

		if (error) throw new AppError(error, 400);

		if (await this.usersRepository.existsWithEmail(input.email)) {
			throw new AppError("User already exists", 409);
		}

		const client = new Client(
			await this.usersRepository.getSequentialId(),
			input.email,
			await this.hashProvider.hash(input.password),
			input.firstname,
			input.lastname,
			input.cpf,
			input.birthDate
		);

		await this.usersRepository.saveClient(client);
		return { id: client.id };
	}
}