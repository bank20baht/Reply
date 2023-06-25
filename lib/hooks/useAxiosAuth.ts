import {axiosAuth} from '../axios';
import {useEffect, useState} from 'react';
import {useRefreshToken} from './useRefreshToken';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type tokenType = {
  username?: string;
  refreshtoken?: string;
  accesstoken?: string;
};

const useAxiosAuth = () => {
  const refreshToken = useRefreshToken();
  const [token, setToken] = useState<tokenType>();

  const loadData = async () => {
    let localStorage = await AsyncStorage.getItem('token');
    let token = localStorage ? JSON.parse(localStorage) : null;
    setToken(token);
  };

  useEffect(() => {
    loadData();
    const requestIntercept = axiosAuth.interceptors.request.use(
      config => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${token?.accesstoken}`;
        }
        return config;
      },
      error => Promise.reject(error),
    );

    const responseIntercept = axiosAuth.interceptors.response.use(
      response => response,
      async error => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          try {
            await refreshToken();
            const updatedToken = await AsyncStorage.getItem('token');
            const newToken: tokenType = updatedToken
              ? JSON.parse(updatedToken)
              : null;
            prevRequest.headers[
              'Authorization'
            ] = `Bearer ${newToken.accesstoken}`;
            return axiosAuth(prevRequest);
          } catch (error) {
            return Promise.reject(error);
          }
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axiosAuth.interceptors.request.eject(requestIntercept);
      axiosAuth.interceptors.response.eject(responseIntercept);
    };
  }, [token, refreshToken]);

  return axiosAuth;
};

export default useAxiosAuth;
