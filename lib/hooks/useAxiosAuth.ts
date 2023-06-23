import {axiosAuth} from '../axiosCustom';
import {MMKV} from 'react-native-mmkv';
import {useRefreshToken} from './useRefreshToken';
import {useEffect} from 'react';

export const storage = new MMKV();

const useAxiosAuth = () => {
  const storedUser = storage.getString('user');
  let refreshTokenTemp;
  console.log('storeedUser = ' + storedUser);

  if (storedUser) {
    const userObject = JSON.parse(storedUser);
    console.log('userObject.accensstoken = ' + userObject.accesstoken);
    useEffect(() => {
      const requestIntercept = axiosAuth.interceptors.request.use(
        config => {
          if (!config.headers['Authorization']) {
            config.headers[
              'Authorization'
            ] = `Bearer ${userObject.accesstoken}`;
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
            const refreshToken = useRefreshToken();
            refreshTokenTemp = refreshToken; // Assuming refreshToken is a callable function
            prevRequest.headers[
              'Authorization'
            ] = `Bearer ${userObject.accesstoken}`;
            return axiosAuth(prevRequest);
          }
          return Promise.reject(error);
        },
      );

      return () => {
        axiosAuth.interceptors.request.eject(requestIntercept);
        axiosAuth.interceptors.response.eject(responseIntercept);
      };
    }, [userObject, refreshTokenTemp]);

    return axiosAuth;
  } else {
    console.log('Please login');
  }
};

export default useAxiosAuth;
