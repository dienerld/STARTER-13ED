import { NextFunction, Request, Response } from 'express';
import { Profile } from '../enums';
import { httpHelper } from '../utils';
import { Result } from '../utils/result.helper';

export const onlyRecruiter = (req: Request, res: Response, next: NextFunction) => {
	const profile = req.user.profile;

	if (profile != Profile.RECRUITER) {
		return httpHelper.badRequestError(res, Result.error(401, 'User not allowed'));
	}

	return next();
};
