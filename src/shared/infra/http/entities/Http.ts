import { HttpErrorHandleFunction } from "./HttpErrorHandleFunction";
import { HttpHandleFunction } from "./HttpHandleFunction";
import { HttpMiddleware } from "./HttpMiddleware";

export abstract class Http {
	protected errorHandler: null | HttpErrorHandleFunction;

	constructor() {
		this.errorHandler = null;
	}

	onError(errorHandler: HttpErrorHandleFunction) {
		this.errorHandler = errorHandler;
	}

	abstract addDefaultMiddleware(middleware: HttpMiddleware): void;
	abstract listen(port: number, callback: () => void): void;
	abstract on(path: string, method: "post" | "get" | "put" | "patch" | "delete", handle: HttpHandleFunction, middlewares?: Array<HttpMiddleware>): void;
}