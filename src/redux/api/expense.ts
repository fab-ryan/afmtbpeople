import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl, getToken } from '@utils';
import { ExpensesResponse } from '@types';

export const expenseApi = createApi({
  reducerPath: 'expense',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/api/expenses`,
    prepareHeaders: async (headers) => {
      try {
        const token = await new Promise((resolve, reject) => {
          getToken((value) => {
            if (value) {
              resolve(value);
            } else {
              reject(new Error('Token not found'));
            }
          });
        });

        headers.set('Authorization', `Bearer ${token}`);
        return headers;
      } catch (error) {
        return headers;
      }
    },
  }),
  tagTypes: ['expense'],
  endpoints: (build) => ({
    getExpenses: build.query<ExpensesResponse, undefined>({
      query: () => ({
        url: '/',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetExpensesQuery } = expenseApi;