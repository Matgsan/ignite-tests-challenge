import { Statement } from "../entities/Statement";

export class BalanceMap {
  static toDTO({statement, balance}: { statement: Statement[], balance: number}) {
    const parsedStatement = statement.map(({
      id,
      amount,
      description,
      type,
      sender_id,
      created_at,
      updated_at
    }) => {
      const defaultStatement =
      {
        id,
        amount: Number(amount),
        description,
        type,
        created_at,
        updated_at
      }
      if(type === 'transfer'){
        Object.assign(defaultStatement, {sender_id});
      }
      return defaultStatement;
    }
    );

    return {
      statement: parsedStatement,
      balance: Number(balance)
    }
  }
}
