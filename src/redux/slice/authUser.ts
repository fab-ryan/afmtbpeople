import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthResponse } from '@types';
import { setToken, getToken, removeToken } from '@utils';

type InitialStateType = {
  token: {
    access_token: string | undefined | null;
  };
};

type UserInfoReturnTypes = {
  data: UserInfoReturnType | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
  loading: boolean;
  isLogged: boolean;
};

const initialStateUser: UserInfoReturnTypes = {
  data: null,
  error: null,
  loading: false,
  isLogged: false,
};
const initialState: InitialStateType = {
  token: {
    access_token: undefined,
  },
};

export const setAuthUser = createAsyncThunk(
  'authUser/setAuthUser',
  async (payload: AuthResponse) => {
    const accessToken: string = payload.data && payload.data.token;
    await setToken(accessToken);
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
      if (token) {
        return token;
      } else {
        return payload.data.token;
      }
    } catch (err) {
      return '';
    }
  },
);

const authUser = createSlice({
  name: 'authUser',
  initialState,
  reducers: {
    removeAuthUser: (state) => {
      state.token = initialState.token;
      async () => {
        await removeToken();
      };
    },
  },

  extraReducers: (build) => {
    build.addCase(setAuthUser.fulfilled, (state, action) => {
      state.token.access_token = action.payload as string | undefined | null;
    });
  },
});

const UserInfo = createSlice({
  name: 'userInfo',
  initialState: initialStateUser,
  reducers: {},
  extraReducers: (build) => {
    build.addMatcher(authApi.endpoints.userInfo.matchPending, (state) => {
      state.loading = true;
      state.error = null;
      state.isLogged = false;
    });
    build.addMatcher(
      authApi.endpoints.userInfo.matchFulfilled,
      (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.isLogged = true;
      },
    );
    build.addMatcher(
      authApi.endpoints.userInfo.matchRejected,
      (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.isLogged = false;
      },
    );
  },
});

export { UserInfo };
export default authUser.reducer;
export const { removeAuthUser } = authUser.actions;
