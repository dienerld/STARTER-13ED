import 'dotenv/config';
import { DataSource } from 'typeorm';

const isProduction = process.env.NODE_ENV?.toLocaleLowerCase() === 'production';
const rootDir = isProduction ? 'dist' : 'src';

export const typeorm = new DataSource({
	type: 'postgres',
	url: process.env.DATABASE_URL,
	synchronize: false,
	logging: false,
	ssl: {
		rejectUnauthorized: false,
	},
	entities: [rootDir + '/app/shared/database/entities/**/*'],
	migrations: [rootDir + '/app/shared/database/migrations/**/*'],
});
