import * as SecureStore from 'expo-secure-store';

import { jwtDecode } from 'jwt-decode';

export const setToken = async (token: string) => {
  await SecureStore.setItemAsync('access_token', token);
};

export const removeToken = async () => {
  await SecureStore.deleteItemAsync('access_token');
};

export const getToken = (callback: (token: string | null) => void): void => {
  SecureStore.getItemAsync('access_token')
    .then((token) => {
      callback(token);
    })
    .catch((error) => {
      callback(null);
    });
};

export const checkTokenExpired = (token: string): boolean => {
  try {
    if (token) {
      const decodedToken = jwtDecode(token) as { exp: number };
      console.log(decodedToken.exp);
      return decodedToken.exp * 1000 < Date.now();
    }
    return true;
  } catch (error) {
    console.log(error);
    return true;
  }
};
