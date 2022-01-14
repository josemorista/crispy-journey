import { AppError } from "../../../../../shared/application/errors/AppError";
import { RepositoriesFactory } from "../../../../../shared/application/factories/RepositoriesFactory";
import { FieldValidationBuilder } from "../../../../../shared/validation/builders/FieldValidationBuilder";
import { FormValidationCompositor } from "../../../../../shared/validation/compositors/FormValidationCompositor";
import { Enterprise } from "../../../domain/entities/Enterprise";
import { HashProvider } from "../../providers/HashProvider";
import { UsersRepository } from "../../repositories/UsersRepository";
import { CreateEnterpriseInput } from "./CreateEnterpriseInput";

export class CreateEnterprise {

	private usersRepository: UsersRepository;

	constructor(
		repositoriesFactory: RepositoriesFactory,
		private readonly hashProvider: HashProvider
	) {
		this.usersRepository = repositoriesFactory.createUsersRepository();
	}

	async execute(input: CreateEnterpriseInput) {
		const error = (new FormValidationCompositor([
			...new FieldValidationBuilder("name").required().build(),
			...new FieldValidationBuilder("email").required().email().build(),
			...new FieldValidationBuilder("password").required().minmaxLength(6).build(),
			...new FieldValidationBuilder("cnpj").required().minmaxLength(6).build(),
			...new FieldValidationBuilder("foundationDate").required().date(true).build()
		])).validate(input);

		if (error) throw new AppError(error, 400);

		if (await this.usersRepository.existsWithEmail(input.email)) {
			throw new AppError("User already exists", 409);
		}

		const enterprise = new Enterprise(
			await this.usersRepository.getSequentialId(),
			input.email,
			await this.hashProvider.hash(input.password),
			input.name,
			input.cnpj,
			input.foundationDate
		);

		await this.usersRepository.saveEnterprise(enterprise);
		return { id: enterprise.id };
	}
}