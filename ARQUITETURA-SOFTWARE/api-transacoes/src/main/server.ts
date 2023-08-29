import 'dotenv/config';
import { criaServidor } from './config';
import { DatabaseConnection } from './database';

Promise.all([DatabaseConnection.connect()])
	.then(() => {
		// executa aqui quando as promises de conexão forem resolvidas
		const app = criaServidor();

		// START DO SERVER
		app.listen(process.env.PORT, () => console.log(`Servidor rodando na porta ${process.env.PORT} 🚀`));
	})
	.catch((err) => {
		// executa aqui se estourar algum erro nas promises (conexão rehjeitada)
		console.log(err);
	});
