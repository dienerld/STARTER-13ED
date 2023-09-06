import { Router } from "express";
import { UserController } from "./controllers";

export default () => {
	const router = Router();

	router.post("/cadastro", UserController.create);
	// router.post("/login", controller.login);
	// router.get("/exemplo", controller.exemploRotaPrivada);

	return router;
};
