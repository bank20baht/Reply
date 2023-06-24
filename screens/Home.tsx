import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import useAxiosAuth from '../lib/hooks/useAxiosAuth';
import {Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {};

const Home = (props: Props) => {
  const [post, setPost] = useState();
  const axiosAuth = useAxiosAuth();

  const [token, setToken] = useState<any>();

  const loadData = async () => {
    let localStorage = await AsyncStorage.getItem('token');
    let token = localStorage ? JSON.parse(localStorage) : null;
    setToken(token);
    console.log(token);
  };
  const handlerPress = async () => {
    loadData();
  };

  const onSubmit = async () => {
    try {
      const response = await axiosAuth.get('/posts');
      setPost(response?.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Text>Home</Text>
      <Button onPress={onSubmit}>test</Button>
      {post ? (
        <View></View>
      ) : (
        <View>
          <Text>loading ....</Text>
        </View>
      )}
      <Button onPress={handlerPress}>test22</Button>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
