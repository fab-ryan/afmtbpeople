import { Response } from './response';

export interface WithdrawPayload {
  amount: string;
}

export interface WithdrawResponse extends Response {
  data: WithdrawInterface[];
}

export interface WithdrawInterface {
  id: string;
  userId: string;
  amount: string;
  status: string;
  balanceBefore: string;
  user: {
    id: string;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    role: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    account: {
      account_number: string;
      bank_name: string;
      bank_branch: string;
      balance: string;
      createdAt: string;
      updatedAt: string;
      deletedAt: any;
    };
  };
  createdAt: string;
  updatedAt: string;
}
