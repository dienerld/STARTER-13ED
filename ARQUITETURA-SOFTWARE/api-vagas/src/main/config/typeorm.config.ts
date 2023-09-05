import { DataSource } from 'typeorm';
import { appEnvs } from '../../app/envs';

const ehProducao = appEnvs.ambiente === 'producao';
const rootDir = ehProducao ? 'dist' : 'src';

export default new DataSource({
	type: 'postgres',
	url: appEnvs.dbURL,
	schema: 'public',
	entities: [rootDir + '/app/shared/entities/**/*'],
	migrations: [rootDir + '/app/shared/migrations/**/*'],
	synchronize: false,
	ssl: {
		rejectUnauthorized: false,
	},
});
