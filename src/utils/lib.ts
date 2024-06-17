import {
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { getToken, removeToken } from './storage';
import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList, RootStackScreenProps } from './types';

export const baseUrl: NonNullable<string | undefined> =
  process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3200';

const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl}/api`,
  prepareHeaders: async (headers, { getState }) => {
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
});

export const fetchBaseQueryWithToken: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  const { navigate } = useNavigation();
  if (result.error && result.error?.status === 401) {
    await removeToken();
    // using react native navigation to navigate to login screen
    navigate({ key: 'Login', name: 'Login' } as never);
  }
  return result;
};

export const baseApi = createApi({
  baseQuery: fetchBaseQueryWithToken,
  endpoints: () => ({}),
  reducerPath: 'baseApi',
});
