import { DatabaseConnection } from './database/typeorm.connection';
import { runServer } from './server/express.server';

Promise.all([DatabaseConnection.connect()])
	.then(runServer)
	.catch((err) => {
		console.log(err.toString());
	});
