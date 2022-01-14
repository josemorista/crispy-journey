export interface HashProvider {
	hash(value: string): Promise<string>;
	compare(value: string, hashed: string): Promise<boolean>;
}