import { IFieldValidation } from "../entities/IFieldValidation";

export class FormValidationCompositor {
	validations: Array<IFieldValidation>;
	keys: Set<string>;

	constructor(validations: Array<IFieldValidation>) {
		this.validations = validations;
		this.keys = new Set([...this.validations.map(el => el.field)]);
	}

	validate(data: Record<string, any>): string | undefined {
		for (const key of this.keys.values()) {
			const validations = this.validations.filter(el => el.field === key);
			for (const validation of validations) {
				const validationResult = validation.validate(data[key]);
				if (validationResult) return validationResult;
			}
		}
	}
}