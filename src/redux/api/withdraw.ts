import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl, getToken } from '@utils';

import { WithdrawPayload, WithdrawResponse } from '@types';

export const withdrawApi = createApi({
  reducerPath: 'withdraw',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/api/withdraws`,
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
  tagTypes: ['withdraw'],
  endpoints: (build) => ({
    getWithdraws: build.query<WithdrawResponse, undefined>({
      query: () => ({
        url: '/',
        method: 'GET',
      }),
    }),
    createWithdraw: build.mutation<WithdrawResponse, WithdrawPayload>({
      query: (body) => ({
        url: '/',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useGetWithdrawsQuery, useCreateWithdrawMutation } = withdrawApi;
