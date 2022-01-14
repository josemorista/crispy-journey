import { HttpController } from "../../../../../../shared/infra/http/controllers/HttpController";
import { HttpContext } from "../../../../../../shared/infra/http/entities/HttpContext";
import { HttpJsonResponse } from "../../../../../../shared/infra/http/entities/HttpJsonResponse";
import { MySQLRepositoriesFactory } from "../../../../../../shared/infra/mysql/factories/MySQLRepositoriesFactory";
import { CreateClient } from "../../../services/CreateClient";
import { BcryptHashProvider } from "../../bcrpyt/providers/BcryptHashProvider";

export class CreateClientController implements HttpController {
	async handle(ctx: HttpContext) {
		const repositoriesFactory = new MySQLRepositoriesFactory();
		const createClient = new CreateClient(repositoriesFactory, new BcryptHashProvider());
		return new HttpJsonResponse(201, await createClient.execute(ctx.body));
	}
}