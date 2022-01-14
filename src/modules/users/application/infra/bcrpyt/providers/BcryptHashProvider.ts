import bcrypt from "bcrypt";
import { HashProvider } from "../../../providers/HashProvider";

export class BcryptHashProvider implements HashProvider {
	hash(data: string): Promise<string> {
		return bcrypt.hash(data, 10);
	}

	compare(data: string, hashed: string): Promise<boolean> {
		return bcrypt.compare(data, hashed);
	}
}