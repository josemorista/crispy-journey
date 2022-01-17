import http from "http";
import { Http } from "../entities/Http";
import { HttpContext } from "../entities/HttpContext";
import { HttpHandleFunction } from "../entities/HttpHandleFunction";
import { HttpJsonResponse } from "../entities/HttpJsonResponse";
import { HttpMiddleware } from "../entities/HttpMiddleware";
import { HttpResponse } from "../entities/HttpResponse";
import { HttpMethodCollection } from "./HttpMethodCollection";

export class NativeHttpAdapter extends Http {

	private methods: Array<HttpMethodCollection>;
	private middlewares: Array<HttpMiddleware>;

	constructor() {
		super();
		this.middlewares = [];
		this.methods = [
			new HttpMethodCollection("get"),
			new HttpMethodCollection("post"),
			new HttpMethodCollection("put"),
			new HttpMethodCollection("delete"),
			new HttpMethodCollection("patch")
		];
	}

	addDefaultMiddleware(middleware: HttpMiddleware): void {
		this.middlewares.push(middleware);
	}

	private respond(res: http.ServerResponse, response: HttpResponse) {
		let body = response.body;
		if (response instanceof HttpJsonResponse) {
			body = JSON.stringify(body);
		}
		for (const key in response.headers) {
			res.setHeader(key, response.headers[key]);
		}
		res.statusCode = response.status;
		res.write(body);
		res.end();
	}

	private parseBody(req: http.IncomingMessage) {
		return new Promise(resolve => {
			let data = "";
			req.on("data", chunk => {
				data += chunk;
			});
			req.on("end", () => {
				resolve(req.headers["content-type"]?.includes("application/json") ? JSON.parse(data) : data);
			});
		});
	}

	listen(port: number, callback: () => void) {
		const server = http.createServer(async (req, res) => {
			for (const collection of this.methods) {
				if (req.url && req.method && collection.checkIfBelongs(req.method.toLowerCase())) {
					const [url, search] = req.url.split("?");
					const query = Object.fromEntries(new URLSearchParams(search));
					const handle = collection.matchHandle(url);
					if (handle) {
						const ctx = new HttpContext(url, query, await this.parseBody(req), handle.match);
						try {
							const { handle: handler, middlewares } = handle.handle;
							for (const middleware of this.middlewares.concat(middlewares)) {
								const data = await middleware(ctx);
								if (data instanceof HttpResponse) return this.respond(res, data);
							}
							const response = await handler(ctx);
							return this.respond(res, response);
						} catch (error) {
							if (this.errorHandler) {
								return this.respond(res, await this.errorHandler(error, ctx));
							}
						}
					}
				}
			}
			res.writeHead(404);
			res.end();
		});
		server.listen(port);
		callback();
	}

	on(path: string, method: "post" | "get" | "put" | "patch" | "delete", handle: HttpHandleFunction, middlewares?: HttpMiddleware[]): void {
		const collection = this.methods.find(collection => collection.checkIfBelongs(method));
		if (collection) {
			collection.addHandle(path, {
				handle,
				middlewares: middlewares || []
			});
		}
	}
}