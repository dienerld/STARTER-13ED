import { NextFunction, Request, Response } from "express";

export function cleanInfo(req: Request, res: Response, next: NextFunction) {
	const { username, name, password } = req.body;

	req.body.username = username.trim();
	req.body.name = name.trim();
	req.body.password = password.trim();

	next();
}
