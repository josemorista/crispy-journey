import { Cpf } from "../../domain/entities/Cpf";

describe("Cpf Unit tests", () => {
	it("Should create a valid cpf", () => {
		const cpf = new Cpf("111.444.777-35");
		expect(cpf.value).toBe("11144477735");
	});

	it("Should not create a cpf with invalid first verifier digit", async () => {
		try {
			new Cpf("529.982.247-35");
		} catch (error) {
			expect(error.message).toBe("Invalid cpf");
		}
	});

	it("Should not create a cpf with invalid second verifier digit", () => {
		try {
			new Cpf("529.982.247-22");
		} catch (error) {
			expect(error.message).toBe("Invalid cpf");
		}
	});
});