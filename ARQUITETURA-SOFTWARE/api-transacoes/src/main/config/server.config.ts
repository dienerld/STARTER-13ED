import cors from 'cors';
import express from 'express';
import { makeRoutes } from './routes.config';

// config de middlewares
export function app() {
	const app = express();
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(cors());

	makeRoutes(app);

	return app;
}
