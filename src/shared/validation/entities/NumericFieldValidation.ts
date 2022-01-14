import { IFieldValidation } from "./IFieldValidation";

export class NumericFieldValidation implements IFieldValidation {
	field: string;

	constructor(field: string) {
		this.field = field;
	}

	validate(data: unknown): string | undefined {
		if (!data) return;
		if (typeof data !== "number") return `${this.field} must be numeric.`;
	}

}