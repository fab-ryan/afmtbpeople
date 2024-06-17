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
    id: string;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    role: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    account: any;
    profile: any;
  };
}
