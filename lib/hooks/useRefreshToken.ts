import axiosCustom from '../axiosCustom';
import {MMKV} from 'react-native-mmkv';
export const storage = new MMKV();

export const useRefreshToken = () => {
  const storedUser = storage.getString('user');
  if (storedUser) {
    const userObject = JSON.parse(storedUser);
    console.log(userObject.name + 'refresh token axios');
    const refreshToken = async () => {
      const res = await axiosCustom.post('/auth/refresh', {
        refreshtoken: userObject.refreshtoken,
      });
    };
  } else {
    console.log('please login');
  }
};
