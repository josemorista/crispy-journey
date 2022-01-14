import { DocumentNumber } from "./DocumentNumber";

export class Cpf extends DocumentNumber {
	private getSumVerifier(digits: Array<number>, start: number): number {
		let sum = 0;
		for (let i = start; i >= 2; i--) {
			sum += (digits[start - i] * i);
		}
		const rest = sum % 11;
		return rest < 2 ? 0 : (11 - rest);
	}

	validateDocument(value: string) {
		const digits = this.getDigits(value);
		const [firstVerifier, secondVerifier] = this.getVerifierDigits(value);
		return (this.getSumVerifier(digits, 10) === firstVerifier && this.getSumVerifier(digits, 11) === secondVerifier);
	}

	constructor(value: string) {
		super("cpf", value);
	}
}