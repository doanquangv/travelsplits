import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './reducers/authReducer';
import { eventReducer } from './reducers/eventReducer';

const store = configureStore({
    reducer: {
        auth: authReducer, 
        event: eventReducer, // Thêm eventReducer
    },
  });
  

export default store;