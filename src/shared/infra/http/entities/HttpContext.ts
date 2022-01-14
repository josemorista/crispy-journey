export class HttpContext {
	url: string;
	state: Record<string, any>;
	query: Record<string, string | Array<string> | undefined | unknown>;
	body: any;
	params: Record<string, string>;

	constructor(
		url: string,
		query?: HttpContext["query"],
		body?: any,
		params?: Record<string, string>) {
		this.url = url;
		this.query = query || {};
		this.params = params || {};
		this.body = body || {};
		this.state = {};
	}
}