import { Express } from "express";
import jobsRoutes from "../../app/features/jobs/jobs.routes";
import usersRoutes from "../../app/features/users/users.routes";

export const makeRoutes = (app: Express) => {
	app.use(usersRoutes(), jobsRoutes());
};
