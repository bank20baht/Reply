import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {Avatar, Button, Card, Text} from 'react-native-paper';

type Props = {
  post?: {
    image: string;
    content: string;
    author: {
      username: string;
    };
  };
};

const postCard = (props: Props) => {
  return (
    <View style={{marginHorizontal: 5, marginVertical: 5}}>
      <Card mode={'outlined'}>
        <View style={{justifyContent: 'center'}}>
          <Card.Cover
            style={{
              height: 400,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              borderBottomLeftRadius: 0,
              borderBottomEndRadius: 0,
              margin: 5,
            }}
            source={{
              uri: props.post?.image,
            }}
          />
        </View>
        <Card.Content>
          <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
            <Avatar.Text size={20} label="" />
            <Text
              variant="bodyLarge"
              style={{fontWeight: '900', marginLeft: 5}}>
              {props.post?.author.username}
            </Text>
          </View>
          <Text variant="bodyMedium">{props.post?.content}</Text>
        </Card.Content>
      </Card>
    </View>
  );
};

export default postCard;

const styles = StyleSheet.create({});
