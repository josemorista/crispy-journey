import { HttpController } from "../../../../../../shared/infra/http/controllers/HttpController";
import { HttpContext } from "../../../../../../shared/infra/http/entities/HttpContext";
import { HttpJsonResponse } from "../../../../../../shared/infra/http/entities/HttpJsonResponse";
import { MySQLRepositoriesFactory } from "../../../../../../shared/infra/mysql/factories/MySQLRepositoriesFactory";
import { CreateEnterprise } from "../../../services/CreateEnterprise";
import { BcryptHashProvider } from "../../bcrpyt/providers/BcryptHashProvider";

export class CreateEnterpriseController implements HttpController {
	async handle(ctx: HttpContext) {
		const repositoriesFactory = new MySQLRepositoriesFactory();
		const createEnterprise = new CreateEnterprise(repositoriesFactory, new BcryptHashProvider());
		return new HttpJsonResponse(201, await createEnterprise.execute(ctx.body));
	}
}