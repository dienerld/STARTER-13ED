import { NextFunction, Request, Response } from "express";
import { httpHelper } from "../../../shared/utils";

export function validateCreateBody(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const { username, name, password } = req.body;

	if (!username.trim() || !name.trim() || !password.trim()) {
		return httpHelper.badRequestError(res, "Faltando Informações", 400);
	}

	next();
}
