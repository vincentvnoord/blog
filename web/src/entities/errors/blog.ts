export class BlogExistsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AlreadyExistsError";
  }
}
