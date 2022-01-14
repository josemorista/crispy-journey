import { IFieldValidation } from "./IFieldValidation";

export class MinMaxLengthFieldValidation implements IFieldValidation {

	field: string;

	constructor(field: string, private min: number | undefined, private max: number | undefined) {
		this.field = field;
	}

	validate(data: string): string | undefined {
		if (!data) return;
		const size = data.length;
		if (this.min && size < this.min) return `Field ${this.field} does not satisfy minimum length`;
		if (this.max && size > this.max) return `Field ${this.field} does not satisfy maximum length`;
	}
}