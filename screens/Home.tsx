import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import useAxiosAuth from '../lib/hooks/useAxiosAuth';
import {Button} from 'react-native-paper';

type Props = {};

const Home = (props: Props) => {
  const [post, setPost] = useState();
  const axiosAuth = useAxiosAuth();

  const onSubmit = async () => {
    try {
      const response = await axiosAuth?.get('/posts');
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
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
