export abstract class HttpPath {
	constructor(protected params: Array<string>) { }
	abstract match(path: string): Record<string, string> | null;
}