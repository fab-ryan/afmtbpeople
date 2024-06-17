import { Response } from './response';
export interface CategoriesResponse extends Response {
  data: {
    categories: Category[];
  };
}

export interface Category {
  id: string;
  name: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
