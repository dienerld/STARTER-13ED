import { Router } from "express";
import { auth, onlyRecruiter } from "../../shared/middlewares";
import { JobsController } from "./controllers/jobs.controller";

export default () => {
	const router = Router();

	router.get("/vagas", (req, res) => {
		res.send("OK");
	});

	router.post("/jobs", auth, onlyRecruiter, JobsController.createJob);

	return router;
};
