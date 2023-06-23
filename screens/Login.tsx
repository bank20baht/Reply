import {Alert, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Formik} from 'formik';
import {Button, TextInput, Text} from 'react-native-paper';
import {SCREEN_NAME} from '../constants/screensNames';
import axiosCustom from '../lib/axiosCustom';
import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

const Login = ({route, navigation}: any) => {
  const storedUser = storage.getString('user');
  useEffect(() => {
    const checkLoginStatus = async () => {
      if (storedUser) {
        HomePage();
      } else {
        console.log('User data is not available.');
      }
    };

    checkLoginStatus();
  }, [storedUser]);

  const initialValues = {
    username: '',
    password: '',
  };

  const HomePage = () => {
    navigation.navigate(SCREEN_NAME.Tabs);
  };

  const RegisterPage = () => {
    navigation.navigate(SCREEN_NAME.REGISTER_PAGE);
  };
  // i try localhost is not work, i use ipv4 by ipconfig in terminal to find it
  // if have error Axios Err Network, change ipv4 (if not set static ip)
  const handleFormSubmit = async (values: any) => {
    console.log(values); // You can perform your login logic here
    try {
      const response = await axiosCustom.post(`/auth/login`, {
        username: values.username,
        password: values.password,
      });
      console.log(response.data);
      storage.set('user', JSON.stringify(response.data));
      if (response.status == 200) {
        HomePage();
      }
      if (response.status == 400) {
        Alert.alert('Alert Title', 'My Alert Msg', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleButtonPress = () => {
    const storedUser = storage.getString('user');

    if (storedUser) {
      const userObject = JSON.parse(storedUser);
      console.log(userObject.name);
    } else {
      console.log('User data is not available.');
    }
  };

  return (
    <View style={{justifyContent: 'center', flex: 1, margin: 10}}>
      <Text>Login</Text>
      <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <View style={{flexDirection: 'column'}}>
            <TextInput
              label={'Username'}
              mode={'outlined'}
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
            />
            <View style={{marginVertical: 2}} />
            <TextInput
              label="Password"
              secureTextEntry
              mode={'outlined'}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            <View style={{marginVertical: 5}} />
            <Button mode={'contained'} onPress={handleSubmit}>
              Login
            </Button>
          </View>
        )}
      </Formik>
      <View style={styles.dividerContainer}>
        <Text style={{textAlign: 'center', color: 'black'}}>OR</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Text>Don't have an account?</Text>
        <Text style={{color: 'blue', marginLeft: 5}} onPress={RegisterPage}>
          Register
        </Text>
      </View>
      <Button mode={'outlined'} onPress={handleButtonPress}>
        Log Data
      </Button>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
});
