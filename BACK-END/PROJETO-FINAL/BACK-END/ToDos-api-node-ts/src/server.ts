import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { UserController } from './controllers';
import { validateDataUser, validateUserLogin } from './middlewares';

const app = express();
const userController = new UserController();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.listen(process.env.PORT, () => {
	console.log('servidor rodando na porta ', process.env.PORT);
});

app.get('/', (req, res) => {
	return res.send({ message: 'OK' });
});

app.post('/users/signup', validateDataUser, userController.create);

// RETORNAR APENAS O ID DO USUARIO SE DER BOM O LOGIN { SUCCESS, MESSAGE, DATA: '123456'}
app.post('/users/signin', validateUserLogin, userController.signin);
