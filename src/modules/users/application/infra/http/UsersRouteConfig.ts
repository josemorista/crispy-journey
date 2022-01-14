import { HttpController } from "../../../../../shared/infra/http/controllers/HttpController";
import { Http } from "../../../../../shared/infra/http/entities/Http";
import { RouterConfig } from "../../../../../shared/infra/http/RouterConfig";
import { CreateClientController } from "./controllers/CreateClient";
import { CreateEnterpriseController } from "./controllers/CreateEnterpriseController";

export class UsersRouterConfig extends RouterConfig {

	private controllers: Record<string, HttpController>;

	constructor(http: Http) {
		super(http, "/users");

		this.controllers = {
			"CreateEnterprise": new CreateEnterpriseController(),
			"CreateClient": new CreateClientController()
		};
	}

	register(): void {
		this.http.on(`${this.prefix}/enterprises`, "post", this.controllers["CreateEnterprise"].handle);
		this.http.on(`${this.prefix}/clients`, "post", this.controllers["CreateClient"].handle);
	}

}