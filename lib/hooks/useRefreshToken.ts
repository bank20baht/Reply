import axios from '../axios';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';

export type tokenType = {
  username?: string;
  refreshtoken?: string;
  accesstoken?: string;
};

export const useRefreshToken = () => {
  const [token, setToken] = useState<tokenType>();

  const loadData = async () => {
    let localStorage = await AsyncStorage.getItem('token');
    let token = localStorage ? JSON.parse(localStorage) : null;
    setToken(token);
    console.log('load refresh data');
  };

  const refreshToken = async () => {
    try {
      loadData();
      const response = await axios.post('/auth/refresh', {
        refreshtoken: token?.refreshtoken,
      });
      console.log('req in axios refresh tokens ');
      console.log(response.data);
      if (token != null)
        await AsyncStorage.setItem('token', JSON.stringify(response.data));
      else console.log('log in');
    } catch (error) {
      console.log(error);
    }
  };
  return refreshToken;
};
