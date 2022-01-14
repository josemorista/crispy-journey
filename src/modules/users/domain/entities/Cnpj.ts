import { DocumentNumber } from "./DocumentNumber";

export class Cnpj extends DocumentNumber {
	private getSumVerifier(digits: Array<number>, verifierArray: Array<number>): number {
		let sum = 0;
		verifierArray.forEach((v, i) => {
			sum += v * digits[i];
		});
		const rest = sum % 11;
		return rest < 2 ? 0 : (11 - rest);
	}

	validateDocument(value: string) {
		const digits = this.getDigits(value);
		const [firstVerifier, secondVerifier] = this.getVerifierDigits(value);
		return (
			this.getSumVerifier(digits, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]) === firstVerifier
			&& this.getSumVerifier(digits, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]) === secondVerifier);
	}

	constructor(value: string) {
		super("cnpj", value);
	}

}