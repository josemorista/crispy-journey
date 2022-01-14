import { Cpf } from "./Cpf";
import { User } from "./User";

export class Client extends User {
	producerCard: string | null;
	birthDate: Date;
	firstname: string;
	lastname: string;
	private userCpf: Cpf;

	get cpf() {
		return this.userCpf.value;
	}

	constructor(
		id: number,
		email: string,
		password: string,
		firstname: string,
		lastname: string,
		cpf: string,
		birthDate: Date,
		producerCard?: string | null,
		createdAt?: Date,
		updatedAt?: Date
	) {
		super(id, email, password, "client", createdAt, updatedAt);
		this.firstname = firstname;
		this.lastname = lastname;
		this.userCpf = new Cpf(cpf);
		this.birthDate = birthDate;
		this.producerCard = producerCard || null;
	}
}