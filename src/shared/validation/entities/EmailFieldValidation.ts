import { IFieldValidation } from "./IFieldValidation";

export class EmailFieldValidation implements IFieldValidation {

	field: string;

	constructor(field: string) {
		this.field = field;
	}

	validate(data: unknown): string | undefined {
		if (!data) return;
		return !(/([a-z0-9!#$%&'*+=?^_`{|}~.]+)@([a-z0-9!#$%&'*+=?^_`{|}~.]+)\.\w+$/gi.test(String(data))) ?
			`Invalid email at field ${this.field}` : undefined;
	}
}