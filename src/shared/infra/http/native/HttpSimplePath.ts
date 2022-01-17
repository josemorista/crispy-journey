import { HttpPath } from "./HttpPath";

export class HttpSimplePath extends HttpPath {

	private path: string;

	constructor(path: string) {
		super([]);
		this.path = path;
	}

	match(path: string) {
		if (this.path === path) return {};
		return null;
	}
}