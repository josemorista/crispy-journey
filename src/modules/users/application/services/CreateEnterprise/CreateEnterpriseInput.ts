export class CreateEnterpriseInput {
	constructor(
		readonly email: string,
		readonly password: string,
		readonly name: string,
		readonly cnpj: string,
		readonly foundationDate: Date,
	) { }
}