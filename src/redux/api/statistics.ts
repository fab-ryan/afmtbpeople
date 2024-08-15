import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl, getToken } from '@utils';

export const statisticsApi = createApi({
  reducerPath: 'statistics',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/api/stats`,
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
  tagTypes: ['statistics'],
  endpoints: (build) => ({
    getStatistics: build.query({
      query: () => ({
        url: '/',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetStatisticsQuery } = statisticsApi;
