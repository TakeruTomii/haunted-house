
// Base Error class
// add if want common error proccess
export class BaseError extends Error {
  constructor(message?: string){
    super(message);
    this.name = BaseError.name;
    Object.setPrototypeOf(this, BaseError.prototype);
  }
}

// Error by invalid operation from user
export class InvalidOperationError extends BaseError {
  constructor(message?: string){
    super(message);
    this.name = InvalidOperationError.name;
    Object.setPrototypeOf(this, InvalidOperationError.prototype);
  }
}
