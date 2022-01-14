export class User {

	id: number;
	email: string;
	password: string;
	kind: "enterprise" | "client";
	createdAt: Date;
	updatedAt: Date;

	constructor(
		id: number,
		email: string,
		password: string,
		kind: "enterprise" | "client",
		createdAt?: Date,
		updatedAt?: Date
	) {
		this.id = id;
		this.email = email;
		this.password = password;
		this.kind = kind;

		const date = createdAt || updatedAt || new Date();
		this.createdAt = createdAt || date;
		this.updatedAt = updatedAt || date;
	}
}