import { Response } from './response';

export interface ExpensesResponse extends Response {
  data: ExpenseInterface[];
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
  category: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: any;
  }
}

export interface ExpensePayload {
  amount: string;
  category_id: string;
  comment?: string;
}

export interface ExpensePayload {
  amount: string;
  category_id: string;
  comment?: string;
}
