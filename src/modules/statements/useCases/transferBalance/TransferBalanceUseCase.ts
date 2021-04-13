import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { IStatementsRepository } from "../../repositories/IStatementsRepository";
import { TransferBalanceError } from "./TransferBalanceError";

enum OperationType {
  TRANSFER = 'transfer',
}
interface IRequest {
  sender_id: string;
  receiver_id: string;
  amount: number;
  description: string;
}

@injectable()
export class TransferBalanceUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StatementsRepository')
    private statementsRepository: IStatementsRepository
  ) {}

  async execute({ sender_id, receiver_id, amount, description }: IRequest) {
    const receiver = await this.usersRepository.findById(receiver_id);

    if(!receiver) {
      throw new TransferBalanceError.UserNotFound();
    }

    const {balance: senderBalance} = await this.statementsRepository.getUserBalance({user_id: sender_id, with_statement: false});
    if(senderBalance < amount){
      throw new TransferBalanceError.InsufficientFunds();
    }

     await this.statementsRepository.create({
      user_id: sender_id,
      sender_id,
      type: "transfer" as OperationType,
      amount,
      description
    });

   const transfer = await this.statementsRepository.create({
        user_id: receiver_id,
        sender_id,
        type: "transfer" as OperationType,
        amount,
        description
      });

      return transfer;
  }
}
