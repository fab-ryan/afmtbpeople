import { Response } from './response';

export interface IncomesResponse extends Response {
  data: {
    incomes: IncomeInterface[];
  };
}

export interface IncomeInterface {
  id: string;
  amount: string;
  balance: string;
  description: string;
  source: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
}
export interface IncomePayloadInterface {
  source: string;
  amount: string;
  description: string;
}
