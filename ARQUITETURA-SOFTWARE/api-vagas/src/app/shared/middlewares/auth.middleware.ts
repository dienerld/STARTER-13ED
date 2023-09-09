import { NextFunction, Request, Response } from 'express';
import { httpHelper, jwt } from '../utils';
import { Result } from '../utils/result.helper';

export const auth = (req: Request, res: Response, next: NextFunction) => {
	const { token } = req.headers;

	if (!token) {
		return httpHelper.badRequestError(res, Result.error(401, 'Invalid token'));
	}

	try {
		const user = jwt.decoded(token as string);
		req.user = user;
		return next();
	} catch (err: any) {
		return httpHelper.badRequestError(res, Result.error(401, err.toString()));
	}
};
