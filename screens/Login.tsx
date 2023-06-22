import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Formik} from 'formik';
import {Button, TextInput, Text} from 'react-native-paper';
import {SCREEN_NAME} from '../constants/screensNames';
import axiosCustom from '../lib/axiosCustom';
import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

type Props = {};

const Login = ({route, navigation}: any, props: Props) => {
  const initialValues = {
    username: '',
    password: '',
  };

  const RegisterPage = () => {
    navigation.navigate(SCREEN_NAME.REGISTER_PAGE);
  };

  const handleFormSubmit = async (values: any) => {
    console.log(values); // You can perform your login logic here
    try {
      // i try localhost is not work, i use ipv4 by ipconfig in terminal to find it
      // if have error Axios Err Network, change ipv4 (if not set static ip)
      const response = await axiosCustom.post(`/auth/login`, {
        username: values.username,
        password: values.password,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
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
