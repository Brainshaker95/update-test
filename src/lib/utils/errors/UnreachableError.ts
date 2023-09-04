export class UnreachableError extends Error {
  constructor(message = 'Oopsie Doopsie :(', options?: ErrorOptions) {
    super(message, options);
  }

  static unreachable(type: never): never {
    throw new UnreachableError(type);
  }
}
