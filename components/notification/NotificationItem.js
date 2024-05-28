import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const NotificationItem = ({ item }) => {
  const {
    event,
    post,
    type,
    club,
    createdAt
  } = item
  if (type == "Post") {
    return (
      <View>
        <Text>{`${club.name} has a new post`}</Text>
        <Text>{createdAt}</Text>
      </View>
    )
  } else if (type == "Event") {
    return (
      <View>
        <Text>{`${club.name} has a new event`}</Text>
        <Text>{event.title}</Text>
        <Text>{createdAt}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({})

export default NotificationItem