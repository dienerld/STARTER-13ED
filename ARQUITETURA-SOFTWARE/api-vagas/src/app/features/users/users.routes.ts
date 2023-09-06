import { Router } from "express";
import { UserController } from "./controllers";
import { cleanInfo, validateCreateBody } from "./middlewares";

export default () => {
	const router = Router();

	router.post("/create", validateCreateBody, cleanInfo, UserController.create);

	// router.post("/login", controller.login);
	// router.get("/exemplo", controller.exemploRotaPrivada);

	return router;
};
