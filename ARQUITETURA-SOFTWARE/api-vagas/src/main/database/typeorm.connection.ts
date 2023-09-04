import { DataSource } from 'typeorm';
import dataSource from '../config/typeorm.config';

export class DatabaseConnection {
	private static _connection: DataSource;

	public static get connection(): DataSource {
		if (!this._connection) {
			throw new Error('Não existe conexão com o banco estabelecida');
		}

		return this._connection;
	}

	public static async connect() {
		if (!this._connection?.isInitialized) {
			this._connection = await dataSource.initialize();
		}

		console.log('Conexão com o database foi inicializada');
	}
}
