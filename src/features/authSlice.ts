import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthAction, AuthState } from '@/types/types';

const initialState: AuthState = {
  isAuthenticated: false,
  accessToken: null,
  userInfo: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<AuthAction>) => {
      const { accessToken, decodedToken } = action.payload;
      
      state.accessToken = accessToken;
      state.isAuthenticated = true;
      state.userInfo = {
        "custom:organizationId": decodedToken['custom:organizationId'],
        "custom:role": decodedToken['custom:role'],
        "custom:organizationRole": decodedToken['custom:organizationRole'],
        name: decodedToken.name,
        family_name: decodedToken.family_name,
      };
      state.error = null;
    },
    clearAuthData: (state) => {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.userInfo = null;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setAuthData, clearAuthData, setError } = authSlice.actions;
export default authSlice.reducer;
