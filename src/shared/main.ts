import { UsersRouterConfig } from "../modules/users/application/infra/http/UsersRouteConfig";
import { AppError } from "./application/errors/AppError";
import { HttpJsonResponse } from "./infra/http/entities/HttpJsonResponse";
import { ExpressHttpAdapter } from "./infra/http/express/ExpressHttpAdapter";

const app = new ExpressHttpAdapter();

app.onError(async (error, ctx) => {
	let status = 500;

	if (error instanceof AppError) {
		status = error.status;
	}

	console.error(`[${status}] ${ctx.url} - ${error.message}`);

	return new HttpJsonResponse(status, {
		error: error.message
	});
});

const UsersRouter = new UsersRouterConfig(app);
UsersRouter.register();

app.listen(3333, () => {
	console.log("Server is online");
});