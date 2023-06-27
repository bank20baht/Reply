import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {Avatar, Button, Card, Text} from 'react-native-paper';

type Props = {};

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
              uri: 'https://img.freepik.com/free-photo/lovely-pet-portrait-isolated_23-2149192347.jpg?w=360&t=st=1687774627~exp=1687775227~hmac=0ec8526cff10c76807ed10888f56e2f7c2d635c9517ee3310aaa4b48d4f9952b',
            }}
          />
        </View>
        <Card.Content>
          <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
            <Avatar.Text size={20} label="" />
            <Text
              variant="bodyLarge"
              style={{fontWeight: '900', marginLeft: 5}}>
              Bank20baht
            </Text>
          </View>
          <Text variant="bodyMedium">Hello world</Text>
        </Card.Content>
      </Card>
    </View>
  );
};

export default postCard;

const styles = StyleSheet.create({});
