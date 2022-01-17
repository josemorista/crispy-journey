import { HttpPath } from "./HttpPath";

export class HttpPathWithParams extends HttpPath {

	private path: RegExp;

	constructor(path: string) {
		super([]);
		const matches = /:[\w\d]+/g.exec(path);
		if (matches) {
			const [, ...params] = matches;
			this.params = params;
		}
		this.path = new RegExp(`${path.replace(/:\w+/g, "([\\w\\d-%]+)")}`, "");
	}

	match(path: string) {
		const matches = this.path.exec(path);
		if (!matches) return null;
		const [, ...params] = matches;
		const parsedParams: Record<string, string> = {};
		params.forEach((param, i) => {
			parsedParams[this.params[i]] = param;
		});
		return parsedParams;
	}
}