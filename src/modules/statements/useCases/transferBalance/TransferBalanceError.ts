import { AppError } from "../../../../shared/errors/AppError";

export namespace TransferBalanceError {
  export class UserNotFound extends AppError {
    constructor() {
      super('User not found', 404);
    }
  }

  export class InsufficientFunds extends AppError {
    constructor() {
      super('Insufficient Funds', 404);
    }
  }
}
