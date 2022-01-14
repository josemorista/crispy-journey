
import { CreateEnterpriseInput } from "../../application/services/CreateEnterprise/CreateEnterpriseInput";
import { CreateEnterprise } from "../../application/services/CreateEnterprise";
import { BcryptHashProvider } from "../../application/infra/bcrpyt/providers/BcryptHashProvider";
import { RepositoriesFactory } from "../../../../shared/application/factories/RepositoriesFactory";
import { MemoryRepositoriesFactory } from "../../../../shared/infra/memory/factories/MemoryRepositoriesFactory";

let repositoriesFactory: RepositoriesFactory;
let createEnterprise: CreateEnterprise;

describe("CreateEnterprise", () => {

	beforeEach(() => {
		repositoriesFactory = new MemoryRepositoriesFactory();
		createEnterprise = new CreateEnterprise(repositoriesFactory, new BcryptHashProvider());
	});

	it("Should create and save an Enterprise", async () => {
		const companyEmail = "company@mail.com";
		await createEnterprise.execute(new CreateEnterpriseInput(
			companyEmail,
			"123456",
			"company",
			"11.222.333/0001-81",
			new Date("2021-01-01")
		));
		expect(await (repositoriesFactory.createUsersRepository()).existsWithEmail(companyEmail)).toBeTruthy();
	});
});