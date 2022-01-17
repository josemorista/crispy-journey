import { HttpPathFactory } from "./factories/HttpPathFactory";
import { HttpMethodCollectionHandleEntry } from "./HttpMethodCollectionHandleEntry";
import { HttpPath } from "./HttpPath";

export class HttpMethodCollection {

	handles: Array<{
		path: HttpPath,
		handle: HttpMethodCollectionHandleEntry
	}>;

	constructor(readonly method: "post" | "get" | "put" | "patch" | "delete") {
		this.handles = [];
	}

	matchHandle(path: string) {
		for (const entry of this.handles) {
			const match = entry.path.match(path);
			if (match !== null) return { match, handle: entry.handle };
		}
		return null;
	}

	addHandle(path: string, handle: HttpMethodCollectionHandleEntry) {
		this.handles.push({ path: HttpPathFactory.createHttpPath(path), handle });
	}

	checkIfBelongs(method: string) {
		return this.method === method;
	}
}