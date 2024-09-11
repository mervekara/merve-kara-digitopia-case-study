import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/features/authSlice'
import organizationReducer from '@/features/organizationSlice'
import languageReducer from '../features/languageSlice';
import recommendationsReducer from '../features/recommendationsSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
        auth: authReducer,
        organization: organizationReducer,
        language: languageReducer,
        recommendations: recommendationsReducer,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']