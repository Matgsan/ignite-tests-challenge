import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { TransferBalanceUseCase } from './TransferBalanceUseCase';

export class TransferBalanceController {
  async execute(request: Request, response: Response) {
    const { id: sender_id } = request.user;
    const { user_id: receiver_id } = request.params;
    const { amount, description } = request.params;

    const transferBalanceUseCase = container.resolve(TransferBalanceUseCase);

    const statementOperation = await transferBalanceUseCase.execute({
      sender_id,
      receiver_id,
      amount: +amount,
      description
    });

    return response.json(statementOperation);
  }
}
