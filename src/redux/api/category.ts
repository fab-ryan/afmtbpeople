import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl, getToken } from '@utils';
import { CategoriesResponse } from '@types';

export const categoryApi = createApi({
  reducerPath: 'category',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/api/expense-category`,
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
  tagTypes: ['category'],
  endpoints: (build) => ({
    getCategories: build.query<CategoriesResponse, undefined>({
      query: () => ({
        url: '/',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApi;
