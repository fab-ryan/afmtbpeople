import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DepositsResponse } from '@types';
import { baseUrl, getToken } from '@utils';

export const depositApi = createApi({
  reducerPath: 'deposit',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/api/deposits`,
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
  tagTypes: ['deposit'],
  endpoints: (build) => ({
    getDeposits: build.query<DepositsResponse, undefined>({
      query: () => ({
        url: '/',
        method: 'GET',
      }),
    }),
    createDeposit: build.mutation({
      query: (body) => ({
        url: '/',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useGetDepositsQuery, useCreateDepositMutation } = depositApi;
