import { DataSource } from 'typeorm';
import { appEnvs, postgresEnvs } from '../../app/envs';

const isProduction = appEnvs.ambiente?.toLocaleLowerCase() === 'production';
const isTest = appEnvs.ambiente?.toLocaleLowerCase() === 'test';
const rootDir = isProduction ? 'dist' : 'src';

export const typeorm = new DataSource({
	type: 'postgres',
	url: isTest ? postgresEnvs.urlTest : postgresEnvs.url,
	synchronize: false,
	logging: false,
	ssl: {
		rejectUnauthorized: false,
	},
	entities: [rootDir + '/app/shared/database/entities/**/*'],
	migrations: [rootDir + '/app/shared/database/migrations/**/*'],
});
