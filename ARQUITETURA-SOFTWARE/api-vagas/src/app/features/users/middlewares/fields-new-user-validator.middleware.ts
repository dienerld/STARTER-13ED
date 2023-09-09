import { NextFunction, Request, Response } from 'express';
import { httpHelper } from '../../../shared/utils';
import { Result } from '../../../shared/utils/result.helper';

export const fieldsValidator = (req: Request, res: Response, next: NextFunction) => {
	const { name, username, password, profile } = req.body;

	if (!name || typeof name !== 'string') {
		return httpHelper.badRequestError(res, Result.error(400, 'Name is required in format of string'));
	}
	if (!username || typeof username !== 'string') {
		return httpHelper.badRequestError(res, Result.error(400, 'Username is required in format of string'));
	}
	if (!password || typeof password !== 'string') {
		return httpHelper.badRequestError(res, Result.error(400, 'Password is required in format of string'));
	}
	if (password.length < 6) {
		return httpHelper.badRequestError(res, Result.error(400, 'Password length must be at least 6 characters'));
	}
	if (!profile || typeof profile !== 'string') {
		return httpHelper.badRequestError(res, Result.error(400, 'Profile is required in format of string'));
	}

	return next();
};
