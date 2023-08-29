import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';

const env = process.env.NODE_ENV as string;

let configuracoes: DataSourceOptions = {
	type: 'postgres',
	url: process.env.DATABASE_URL,
	synchronize: false,
	logging: false,
};

if (env == 'developer') {
	configuracoes = {
		...configuracoes,
		entities: ['src/'],
		migrations: ['src/'],
		ssl: {
			rejectUnauthorized: false,
		},
	};
}

if (env == 'production') {
	configuracoes = {
		...configuracoes,
		entities: ['dist/'],
		migrations: ['dist/'],
	};
}

export default new DataSource(configuracoes);
