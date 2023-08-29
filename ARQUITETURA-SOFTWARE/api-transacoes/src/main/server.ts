import 'dotenv/config';
import { app } from './config/server.config';
import { DatabaseConnection } from './database/typeorm.connection';

Promise.all([DatabaseConnection.connect()])
	.then(() => {
		// START DO SERVER
		app().listen(process.env.PORT, () => console.log(`Servidor rodando na porta ${process.env.PORT} 🚀`));
	})
	.catch((err) => {
		console.log(err);
	});
