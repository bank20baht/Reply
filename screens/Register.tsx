import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Formik} from 'formik';
import {Button, TextInput, Text} from 'react-native-paper';
import {SCREEN_NAME} from '../constants/screensNames';

type Props = {};

const Register = ({route, navigation}: any, props: Props) => {
  const initialValues = {
    displayName: '',
    username: '',
    password: '',
    confirmPassword: '',
  };

  const LoginPage = () => {
    navigation.navigate(SCREEN_NAME.LOGIN_PAGE);
  };

  const handleFormSubmit = (values: any) => {
    console.log(values); // You can perform your registration logic here
  };

  return (
    <View style={{justifyContent: 'center', flex: 1, margin: 10}}>
      <Text>Register</Text>
      <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <View style={{flexDirection: 'column'}}>
            <TextInput
              label={'Display Name'}
              mode={'outlined'}
              onChangeText={handleChange('displayName')}
              onBlur={handleBlur('displayName')}
              value={values.displayName}
            />
            <View style={{marginVertical: 5}} />
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
            <TextInput
              label="Confirm password"
              secureTextEntry
              mode={'outlined'}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
            />
            <View style={{marginVertical: 5}} />
            <Button mode={'contained'} onPress={handleSubmit}>
              Register
            </Button>
          </View>
        )}
      </Formik>
      <View style={styles.dividerContainer}>
        <Text style={{textAlign: 'center', color: 'black'}}>OR</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Text>Already have an account?</Text>
        <Text style={{color: 'blue', marginLeft: 5}} onPress={LoginPage}>
          Login
        </Text>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
});
