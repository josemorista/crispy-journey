import { Http } from "./entities/Http";

export abstract class RouterConfig {
	constructor(readonly http: Http, readonly prefix = "") {
	}

	abstract register(): void;
}