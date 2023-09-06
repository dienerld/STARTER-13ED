import { randomUUID } from "crypto";

export abstract class BaseModel {
	protected createdAt: Date = new Date();
	protected id: string = randomUUID();

	public abstract toJSON(): any;
}
