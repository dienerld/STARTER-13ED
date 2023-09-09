import { NextFunction, Request, Response } from 'express';
import { Profile } from '../../../shared/enums';
import { httpHelper } from '../../../shared/utils';
import { Result } from '../../../shared/utils/result.helper';

export const createUserValidator = (req: Request, res: Response, next: NextFunction) => {
	const { profile, company } = req.body;

	if (profile != Profile.ADMIN && profile != Profile.RECRUITER) {
		return httpHelper.badRequestError(
			res,
			Result.error(400, 'Invalid profile field. Accepted values "admin" or "recruiter')
		);
	}

	if (profile === Profile.RECRUITER && (!company || typeof company !== 'string')) {
		return httpHelper.badRequestError(res, Result.error(400, 'Company is required for recruiter creation'));
	}

	return next();
};
