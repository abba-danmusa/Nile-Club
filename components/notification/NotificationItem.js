import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Image } from 'expo-image'

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
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Image
            source={club?.assets?.image?.secure_url}
            style={styles.image}
          />
          <View>
            <Text>{`${club?.name} has a new post`}</Text>
            <Text style={{ fontSize: 10 }}>{createdAt}</Text>
          </View>
        </View>
      </View>
    )
  } else if (type == "Event") {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Image
            source={club?.assets?.image?.secure_url}
            style={styles.image}
          />
          <View>
            <Text>{`${club?.name} has a new event`}</Text>
            <Text>{event?.title}</Text>
            <Text style={{fontSize: 10}}>{createdAt}</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: 10
  },
  container: {
    flexDirection: 'row',
  },
  image: { width: 50, height: 50, borderRadius: 50, marginRight: 10 }
})

export default NotificationItem