export class UsernameInUseError extends Error {
  constructor() {
    super('This username is already in use!');
    this.name = 'UsernameInUseError';
  }
}
