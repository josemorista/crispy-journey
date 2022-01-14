import { IFieldValidation } from "./IFieldValidation";

export class RequiredFieldValidation implements IFieldValidation {
	field: string;

	constructor(field: string) {
		this.field = field;
	}

	validate(data: unknown): string | undefined {
		if (!data && data !== 0) return `Missing required field ${this.field}`;
	}

}