import { HttpHandleFunction } from "../entities/HttpHandleFunction";

export interface HttpController {
	handle: HttpHandleFunction;
}