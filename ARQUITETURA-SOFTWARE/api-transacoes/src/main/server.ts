import { criaServidor } from './config';
import { DatabaseConnection, RedisConnection } from './database';

Promise.all([DatabaseConnection.connect(), RedisConnection.connect()])
	.then(() => criaServidor())
	.catch((err) => {
		// executa aqui se estourar algum erro nas promises (conexão rejeitada)
		console.log(err);
	});
