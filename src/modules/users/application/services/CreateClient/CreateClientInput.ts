export class CreateClientInput {
	constructor(
		readonly email: string,
		readonly password: string,
		readonly firstname: string,
		readonly lastname: string,
		readonly cpf: string,
		readonly birthDate: Date,
		readonly producerCard: string | null | undefined
	) { }
}