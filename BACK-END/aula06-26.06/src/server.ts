import express from 'express';

const app = express();

// torna desnecessario a utilizacao do JSON.parse() e JSON.stringify()
app.use(express.json());

// converte os codigos unicode enviados na rota para o respectivo caracter
// Ex: %20 => ' '
app.use(express.urlencoded({ extended: false }));

app.listen(8080, () => {
	console.log('Servidor rodando na porta 8080');
});

// AS DEFINIÇÕES DAS ROTAS
app.get('/', (request, response) => {
	return response.send('ok');
});
