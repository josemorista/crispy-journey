import { BcryptHashProvider } from "../../application/infra/bcrpyt/providers/BcryptHashProvider";
import { HashProvider } from "../../application/providers/HashProvider";

let hashProvider: HashProvider;

describe("HashProvider integration tests", () => {
	beforeEach(() => {
		hashProvider = new BcryptHashProvider();
	});

	it("Should hash a password", async () => {
		const hashed = await hashProvider.hash("123456");
		expect(hashed).not.toBe("123456");
	});

	it("Should return true if a password and hashed match", async () => {
		const hashed = await hashProvider.hash("123456");
		expect(await hashProvider.compare("123456", hashed)).toBeTruthy();
	});

	it("Should return false if a password and hashed does not match", async () => {
		const hashed = await hashProvider.hash("123456");
		expect(await hashProvider.compare(hashed, "12346")).toBeFalsy();
	});
});