export abstract class BaseModel {
	protected createdAt: Date;
	protected id: string;

	public abstract toJSON(): any;
}
