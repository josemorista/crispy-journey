import { HttpHandleFunction } from "../entities/HttpHandleFunction";
import { HttpMiddleware } from "../entities/HttpMiddleware";

export interface HttpMethodCollectionHandleEntry {
	handle: HttpHandleFunction;
	middlewares: Array<HttpMiddleware>
}