import "dotenv/config";
import { DataSource } from "typeorm";
import { appEnvs } from "../../app/envs";

const isProd = appEnvs.enviroment === "production";
const rootDir = isProd ? "dist" : "src";

export default new DataSource({
	type: "postgres",
	url: appEnvs.dbURL,
	schema: "public",
	entities: [rootDir + "/app/shared/entities/**/*"],
	migrations: [rootDir + "/app/shared/migrations/**/*"],
	synchronize: false,
	ssl: {
		rejectUnauthorized: false,
	},
});
