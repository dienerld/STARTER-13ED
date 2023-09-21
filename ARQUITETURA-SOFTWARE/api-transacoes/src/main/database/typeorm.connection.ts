import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { typeorm } from '../config';

export class DatabaseConnection {
	private static _connection: DataSource | null = null;

	public static get connection(): DataSource {
		if (!this._connection) {
			throw new Error('O database não tá inicializado');
		}

		return this._connection;
	}

	public static async connect() {
		if (!this._connection) {
			this._connection = await typeorm.initialize();
			console.log('Banco de dados conectado');
		}
	}

	public static async destroy() {
		if (!this._connection) {
			throw new Error('A base de dados não está inicializada.');
		}

		await this._connection.destroy();
		console.log('Conexão com a base de dados SQL destruida');
	}
}
