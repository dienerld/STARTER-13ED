import { NextFunction, Request, Response } from 'express';
import { Profile } from '../../../shared/enums';
import { httpHelper } from '../../../shared/utils';
import { Result } from '../../../shared/utils/result.helper';

export const createCandidateValidator = (req: Request, res: Response, next: NextFunction) => {
	const { profile } = req.body;

	if (profile != Profile.CANDIDATE) {
		return httpHelper.badRequestError(res, Result.error(400, 'Invalid profile field. Accepted values "candidate'));
	}

	return next();
};
