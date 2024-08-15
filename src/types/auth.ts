import { Response } from './response';

export interface AuthResponse extends Response {
  data: {
    token: string;
  };
}

export interface RegisterResponse extends Response {
  data: any;
}

export interface AuthLoginPayload {
  username: string;
  password: string;
}

export interface AuthRegisterPayload {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  password: string;
}

export interface UserInfoReturnType extends Response {
  data: {
    account: {
      account_number: string
      balance: string
      bank_branch: string
      bank_name: string
      createdAt: string
      deletedAt: any
      updatedAt: string
    }
    createdAt: string
    email: string
    first_name: string
    id: string
    last_name: string
    phone: string
    profile: any
    role: string
    status: string
    updatedAt: string
  };
}
