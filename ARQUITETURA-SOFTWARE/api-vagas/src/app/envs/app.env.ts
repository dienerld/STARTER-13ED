import "dotenv/config";

export const appEnvs = {
	port: process.env.PORT as string,
	dbURL: process.env.DB_URL as string,
	enviroment: process.env.NODE_ENV as string,
};
