export interface ResultDTO {
	ok: boolean;
	code: number;
	data?: any;
	message: string;
}

export class Result {
	#ok: boolean;
	#code: number;
	#data?: any;
	#message: string;

	private constructor() {}

	private addData(data?: any): void {
		this.#data = data;
	}

	private addError(code: number, message: string): void {
		this.#code = code;
		this.#message = message;
	}

	private toJSON(): ResultDTO {
		return {
			ok: this.#ok,
			code: this.#code,
			data: this.#data,
			message: this.#message,
		};
	}

	public static error(code: number, message: string): ResultDTO {
		const result = new Result();
		result.addError(code, message);
		result.#ok = false;
		return result.toJSON();
	}

	public static success(code: number, message: string, data: any): ResultDTO {
		const result = new Result();
		result.addData(data);
		result.#code = code;
		result.#message = message;
		result.#ok = true;

		return result.toJSON();
	}
}
