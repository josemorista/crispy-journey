import { AppError } from "../../../../shared/application/errors/AppError";

export abstract class DocumentNumber {
	value: string;
	name: string;

	private format(value: string) {
		return value.replace(/\D/g, "");
	}

	protected getDigits(value: string) {
		return value.split("").map(el => Number(el));
	}

	protected getVerifierDigits(value: string) {
		return this.getDigits(value.slice(-2));
	}

	private validate() {
		if (!this.validateDocument(this.value)) {
			throw new AppError(`Invalid ${this.name}`);
		}
	}

	abstract validateDocument(value: string): boolean;

	constructor(name: string, value: string) {
		this.name = name;
		this.value = this.format(value);
		this.validate();
	}
}