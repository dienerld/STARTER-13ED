import { randomUUID } from 'crypto';
import { Endereco } from './app/models';
import { RedisConnection } from './main/database';

async function teste() {
	await RedisConnection.connect();

	const redis = RedisConnection.connection;
	redis.set('nome', 'João da Silva');
	redis.set('idade', 27);
	console.log(await redis.get('nome'));
	await redis.del('nome');
	console.log(await redis.get('nome'));
	console.log(await redis.get('idade'));

	const endereco = new Endereco(randomUUID(), 'Rua dos Bobos', 'Porto Alegre', 'RS', new Date(), '0');

	await redis.set('endereco-usuario-1', JSON.stringify(endereco.toJSON()));
	const enderecocache = await redis.get('endereco-usuario-1');

	console.log(JSON.parse(enderecocache ?? '{}'));
}

teste();
