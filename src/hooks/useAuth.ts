// hooks/useAuth.ts
import { useSelector, useDispatch } from 'react-redux';
import { authSelector, addAuth, removeAuth } from '../redux/reducers/authReducer';
import { RootState, AppDispatch } from '../redux/store';
import * as SecureStore from 'expo-secure-store';
import { AuthData } from '../styles/auth';

const setAccessToken = async (token: string) => {
    await SecureStore.setItemAsync('authToken', token);
};

const getAccessToken = async () => {
    return await SecureStore.getItemAsync('authToken');
};

const removeAccessToken = async () => {
    await SecureStore.deleteItemAsync('authToken');
};

// Update useAuth hook accordingly


export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => authSelector(state)) as AuthData;

  const login = (authData: AuthData) => dispatch(addAuth(authData));
  const logout = () => dispatch(removeAuth({}));

  return { auth, login, logout };
};
