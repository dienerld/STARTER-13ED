export abstract class BaseModel {
  protected createdAt: Date;
  protected _id: string;

  public abstract toJSON(): any;

  get id(): string {
    return this._id;
  }
}
