import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/authorization/authorizationSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    authorization: authReducer,
  },
});
