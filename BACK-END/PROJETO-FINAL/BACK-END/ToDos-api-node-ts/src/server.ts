import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { UserController } from './controllers';
import { validateDataUser, validateUserLogin } from './middlewares';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.listen(process.env.PORT, () => {
	console.log('Servidor rodando na porta ', process.env.PORT);
});

// controllers
const userController = new UserController();

// rotas
app.get('/', (req, res) => res.send({ message: 'OK' }));
app.post('/users/signup', validateDataUser, userController.create);
app.post('/users/signin', validateUserLogin, userController.signin);

// CRUD
