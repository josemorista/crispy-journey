import express, { Response, Express } from "express";
import { Http } from "../entities/Http";
import { HttpContext } from "../entities/HttpContext";
import { HttpHandleFunction } from "../entities/HttpHandleFunction";
import { HttpMiddleware } from "../entities/HttpMiddleware";
import { HttpResponse } from "../entities/HttpResponse";

export class ExpressHttpAdapter extends Http {

	private app: Express;

	constructor() {
		super();
		this.app = express();
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
	}

	private respond(res: Response, response: HttpResponse) {
		for (const key in response.headers) {
			res.setHeader(key, response.headers[key]);
		}
		res.status(response.status).send(response.body);
	}

	addDefaultMiddleware(middleware: HttpMiddleware): void {
		this.app.use(async (req, res, next) => {
			const data = await middleware(new HttpContext(req.url, req.query, req.body, req.params));
			if (data instanceof HttpResponse) {
				return this.respond(res, data);
			}
			next();
		});
	}

	on(
		path: string,
		method: "post" | "get" | "put" | "patch" | "delete",
		handle: HttpHandleFunction,
		middlewares?: HttpMiddleware[]): void {
		this.app[method](path,
			async (req, res) => {
				const ctx = new HttpContext(req.url, req.query, req.body, req.params);
				try {
					if (middlewares) {
						for (const fn of middlewares) {
							const data = await fn(ctx);
							if (data instanceof HttpResponse) {
								return this.respond(res, data);
							}
						}
					}
					const response = await handle(ctx);
					return this.respond(res, response);
				} catch (error) {
					if (this.errorHandler) {
						return this.respond(res, await this.errorHandler(error, ctx));
					}
					throw error;
				}
			});
	}

	listen(port: number, callback: () => void): void {
		this.app.listen(port, callback);
	}

}