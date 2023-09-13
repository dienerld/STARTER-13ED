import "dotenv/config";

export const appEnvs = {
	redisUrl: process.env.REDIS_URL as string,

	port: process.env.PORT as string,
	dbURL: process.env.DB_URL as string,
	enviroment: process.env.NODE_ENV as string,
};
