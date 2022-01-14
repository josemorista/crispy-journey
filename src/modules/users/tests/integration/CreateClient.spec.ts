import { RepositoriesFactory } from "../../../../shared/application/factories/RepositoriesFactory";
import { MemoryRepositoriesFactory } from "../../../../shared/infra/memory/factories/MemoryRepositoriesFactory";
import { BcryptHashProvider } from "../../application/infra/bcrpyt/providers/BcryptHashProvider";
import { HashProvider } from "../../application/providers/HashProvider";
import { CreateClient } from "../../application/services/CreateClient";
import { CreateClientInput } from "../../application/services/CreateClient/CreateClientInput";

let createClient: CreateClient;
let repositoriesFactory: RepositoriesFactory;
let hashProvider: HashProvider;

describe("CreateClient integration tests", () => {
	beforeEach(() => {
		hashProvider = new BcryptHashProvider();
		repositoriesFactory = new MemoryRepositoriesFactory();
		createClient = new CreateClient(repositoriesFactory, hashProvider);
	});

	it("Should create a client", async () => {
		const clientEmail = "testclient@mail.com";
		await createClient.execute(new CreateClientInput(
			clientEmail,
			"123456",
			"Jhon",
			"Doe",
			"11144477735",
			new Date("2021-01-01"),
			null
		));
		expect(await (repositoriesFactory.createUsersRepository()).existsWithEmail(clientEmail)).toBeTruthy();
	});
});