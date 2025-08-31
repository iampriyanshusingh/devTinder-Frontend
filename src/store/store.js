import { configureStore } from '@reduxjs/toolkit';
import requestReducer from './requestSlice';

export const store = configureStore({
  reducer: {
    requests: requestReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
