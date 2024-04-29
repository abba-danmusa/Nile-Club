import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Image } from 'expo-image'

const CommentItem = ({comment}) => {
  return (
    <View style={{gap: 5}}>
      <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
        
        <View style={styles.avatarContainer}>
          <Image
            source={require('../../assets/home/avatar.png')}
            style={styles.avatar}
          />
        </View>
        
        <View>
          <View>
            <Text style={{ color: '#fff' }}>Abba Danmusa</Text>
            <Text style={{ color: '#fff' }}>10:00 PM</Text>
          </View>
        </View>

      </View>

      <View style={{ marginLeft: 55, marginBottom: 20 }}>
        <Text style={{ color: '#fff' }}>
          Join us as we explore the endless possibilities of artistic expression, from traditional techniques to avant-garde experiments. Let's push boundaries, break molds, and redefine what it means to create. Together, we'll unleash our inner visionaries and paint the world in hues of passion and wonder.
        </Text>
      </View>
      {/* <Text style={{color: '#fff'}}>Awesome</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: 'center',
    backgroundColor: '#EBEEF3',
    height: 50,
    width: 50,
    borderRadius: 100,
    borderColor: '#58719B',
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 100,
  },
})

export default CommentItem;
