import { Cnpj } from "./Cnpj";
import { User } from "./User";

export class Enterprise extends User {

	foundationDate: Date;
	name: string;
	private enterpriseCnpj: Cnpj;

	get cnpj() {
		return this.enterpriseCnpj.value;
	}

	constructor(
		id: number,
		email: string,
		password: string,
		name: string,
		cnpj: string,
		foundationDate: Date,
		createdAt?: Date,
		updatedAt?: Date
	) {
		super(id, email, password, "enterprise", createdAt, updatedAt);
		this.name = name;
		this.foundationDate = foundationDate;
		this.enterpriseCnpj = new Cnpj(cnpj);
	}
}