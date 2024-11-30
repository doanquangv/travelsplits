import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './reducers/authReducer';
import { eventReducer } from './reducers/eventReducer';

const store = configureStore({
    reducer: {
        auth: authReducer, 
        event: eventReducer, // Thêm eventReducer
    },
  });
  
  export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;