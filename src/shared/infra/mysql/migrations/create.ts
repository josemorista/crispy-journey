import path from "path";
import fs from "fs";

export default async (): Promise<void> => {
	const migrationName = `${Date.now()}${process.argv[3]}.sql`;
	fs.writeFileSync(path.join(__dirname, "up", migrationName), "");
	fs.writeFileSync(path.join(__dirname, "down", migrationName), "");
};