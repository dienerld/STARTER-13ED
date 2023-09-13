import { NextFunction, Request, Response } from 'express';
import { Profile } from '../../../shared/enums';
import { httpHelper } from '../../../shared/utils';
import { Result } from '../../../shared/utils/result.helper';

export const filterUserValidator = (req: Request, res: Response, next: NextFunction) => {
	const { profile } = req.query;

	const profiles = Object.keys(Profile);

	if (profile) {
		if (typeof profile != 'string' || !profiles.includes(profile)) {
			return httpHelper.badRequestError(
				res,
				Result.error(400, 'Profile is required in format of string. Values accepted: ' + profiles.join(', '))
			);
		}
	}

	return next();
};
