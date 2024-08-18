import {
  Action,
  configureStore,
  Store,
  ThunkAction,
  ThunkDispatch,
} from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';

import { combinedStore } from './combined';
import {
  authApi,
  categoryApi,
  incomeApi,
  expenseApi,
  statisticsApi,
  depositApi
} from './api';

export type ThunkActionType<T = Promise<void>> = ThunkAction<
  T,
  RootState,
  null,
  Action<string>
>;

export const store = configureStore({
  reducer: combinedStore,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        immutableCheck: false,
        serializableCheck: false,
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(authApi.middleware)
      .concat(categoryApi.middleware)
      .concat(incomeApi.middleware)
      .concat(expenseApi.middleware)
      .concat(statisticsApi.middleware)
      .concat(depositApi.middleware)
      ,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ThunkDispatchType = ThunkDispatch<RootState, any, Action<string>>;
export type StoreType = Store<RootState, Action<string>> & {
  dispatch: ThunkDispatchType;
};
