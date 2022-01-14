export interface IFieldValidation {
	field: string;
	validate(data: unknown): string | undefined;
}