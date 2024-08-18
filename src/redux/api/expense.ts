import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl, getToken } from '@utils';
import { ExpensePayload, ExpensesResponse } from '@types';

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
        url: '/user',
        method: 'GET',
      }),
    }),
    createExpense: build.mutation<ExpensesResponse, ExpensePayload>({
      query: (body) => ({
        url: '/',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useGetExpensesQuery, useCreateExpenseMutation } = expenseApi;
