import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl, getToken , fetchBaseQueryWithToken} from '@utils';

import { IncomePayloadInterface, IncomesResponse } from '@types';

export const incomeApi = createApi({
  reducerPath: 'income',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/api/incomes`,
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
  tagTypes: ['income'],
  endpoints: (build) => ({
    getIncomes: build.query<IncomesResponse, null>({
      query: () => ({
        url: '/',
        method: 'GET',
      }),
    }),
    createIncome: build.mutation<IncomesResponse, IncomePayloadInterface>({
      query: (body) => ({
        url: '/',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useGetIncomesQuery, useCreateIncomeMutation } = incomeApi;
