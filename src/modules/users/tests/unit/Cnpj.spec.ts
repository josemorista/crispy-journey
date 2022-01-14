import { Cnpj } from "../../domain/entities/Cnpj";


describe("Cnpj Unit tests", () => {
	it("Should create a valid cnpj", () => {
		const cnpj = new Cnpj("11.222.333/0001-81");
		expect(cnpj.value).toBe("11222333000181");
	});

	it("Should not create a cnpj with invalid first verifier digit", () => {
		try {
			new Cnpj("11.222.333/0001-01");
		} catch (error) {
			expect(error.message).toBe("Invalid cnpj");
		}
	});

	it("Should not create a cnpj with invalid second verifier digit", () => {
		try {
			new Cnpj("11.222.333/0001-82");
		} catch (error) {
			expect(error.message).toBe("Invalid cnpj");
		}
	});
});