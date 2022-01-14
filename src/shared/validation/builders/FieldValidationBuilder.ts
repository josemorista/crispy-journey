import { DateFieldValidation } from "../entities/DateFieldValidation";
import { EmailFieldValidation } from "../entities/EmailFieldValidation";
import { IFieldValidation } from "../entities/IFieldValidation";
import { MinMaxLengthFieldValidation } from "../entities/MinMaxLengthFieldValidation";
import { NumericFieldValidation } from "../entities/NumericFieldValidation";
import { RequiredFieldValidation } from "../entities/RequiredFieldValidation";

export class FieldValidationBuilder {

	private validations: Array<IFieldValidation>;

	constructor(private field: string) {
		this.validations = [];
	}

	required(): FieldValidationBuilder {
		this.validations.push(new RequiredFieldValidation(this.field));
		return this;
	}

	numeric(): FieldValidationBuilder {
		this.validations.push(new NumericFieldValidation(this.field));
		return this;
	}

	email(): FieldValidationBuilder {
		this.validations.push(new EmailFieldValidation(this.field));
		return this;
	}

	minmaxLength(min: number, max: number | undefined = undefined): FieldValidationBuilder {
		this.validations.push(new MinMaxLengthFieldValidation(this.field, min, max));
		return this;
	}

	date(past?: boolean) {
		this.validations.push(new DateFieldValidation(this.field, past));
		return this;
	}

	build(): Array<IFieldValidation> {
		return this.validations;
	}
}