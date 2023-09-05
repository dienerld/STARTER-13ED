import { Response } from 'express';

class HttpHelper {
	public success(res: Response, data: any, message?: string, code?: number) {
		return res.status(code ?? 200).send({
			ok: true,
			data,
			message,
		});
	}

	public serverError(res: Response, message?: string, code?: number) {
		return res.status(code ?? 500).send({
			ok: false,
			message,
		});
	}

	public badRequestError(res: Response, message?: string, code?: number) {
		return res.status(code ?? 400).send({
			ok: false,
			message,
		});
	}
}

export const httpHelper = new HttpHelper();
