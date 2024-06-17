import { Response } from './response';

export interface ExpensesResponse extends Response {
  data: {
    length: number;
    expenses: ExpenseInterface[];
  };
}

export interface ExpenseInterface {
  id: string;
  amount: string;
  balance: string;
  description: string;
  source: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
}
