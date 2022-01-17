import { HttpPathWithParams } from "../HttpPathWithParams";
import { HttpSimplePath } from "../HttpSimplePath";

export class HttpPathFactory {
	static createHttpPath(path: string) {
		if (path.includes(":")) {
			return new HttpPathWithParams(path);
		}
		return new HttpSimplePath(path);
	}
}