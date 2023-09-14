import { NextFunction, Request, Response } from 'express';
import { httpHelper } from '../../../shared/utils';
import { Result } from '../../../shared/utils/result.helper';

export const createJobValidator = (req: Request, res: Response, next: NextFunction) => {
	const { description, companyName, isOpen, limitDate, maxCandidate } = req.body;

	if (!description || typeof description !== 'string') {
		return httpHelper.badRequestError(res, Result.error(400, 'Description is required'));
	}

	if (!companyName || typeof companyName !== 'string') {
		return httpHelper.badRequestError(res, Result.error(400, 'Company name is required'));
	}

	if (!isOpen || typeof isOpen !== 'boolean') {
		return httpHelper.badRequestError(res, Result.error(400, 'IsOpen is required'));
	}

	if (!limitDate || typeof limitDate !== 'string' || limitDate.length !== 10) {
		return httpHelper.badRequestError(res, Result.error(400, 'Limit Date is required in format dd/mm/aaaa'));
	}

	const dateISO = limitDate.split('/').reverse().join('-');
	// ['dd', 'mm', 'aaaa' ] =>  ['aaaa', 'mm', 'dd' ]  => aaaa-mm-dd;
	// 2023-09-13

	req.body.limitDate = new Date(dateISO);

	if (maxCandidate) {
		if (typeof maxCandidate !== 'number') {
			return httpHelper.badRequestError(res, Result.error(400, 'maxCandidate format is number'));
		}
	}

	return next();
};
