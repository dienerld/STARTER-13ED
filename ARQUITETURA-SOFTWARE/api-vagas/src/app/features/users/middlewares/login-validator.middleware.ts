import { NextFunction, Request, Response } from 'express';
import { httpHelper } from '../../../shared/utils';
import { Result } from '../../../shared/utils/result.helper';

export const loginValidator = (req: Request, res: Response, next: NextFunction) => {
	const { username, password } = req.body;

	if (!username || typeof username !== 'string') {
		return httpHelper.badRequestError(res, Result.error(400, 'Username is required in format of string'));
	}

	if (!password || typeof password !== 'string') {
		return httpHelper.badRequestError(res, Result.error(400, 'Password is required in format of string'));
	}

	return next();
};
