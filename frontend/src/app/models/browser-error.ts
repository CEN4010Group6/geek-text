export class BrowserError extends Error {
  public createdAt: Date;

  constructor(err: Error) {
    super();
    this.message = err.message;
    this.name = err.name;
    this.createdAt = new Date();
  }
}
