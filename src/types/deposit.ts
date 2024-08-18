import { Response } from './response';

export interface DepositsResponse extends Response {
  data: DepositInterface[];
}

export interface DepositInterface {
    amount: string
    createdAt: string
    deletedAt: any
    description: string
    id: string
    source: string
    status: string
    updatedAt: string
    userId: string
  
}
