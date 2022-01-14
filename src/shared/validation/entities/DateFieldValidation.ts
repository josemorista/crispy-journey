import { IFieldValidation } from "./IFieldValidation";

export class DateFieldValidation implements IFieldValidation {

	field: string;
	past: boolean;

	constructor(field: string, past?: boolean) {
		this.field = field;
		this.past = !!past;
	}

	validate(data: any): string | undefined {
		if (!data) return;
		try {
			const ts = new Date(data).getTime();
			if (this.past && ts >= Date.now()) throw new Error();
		} catch {
			return `Invalid date at field ${this.field}`;
		}
	}
}