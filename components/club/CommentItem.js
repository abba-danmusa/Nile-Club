import React from 'react';
import { Image } from 'expo-image'
import Timer from '../chats/Timer'
import { StyleSheet, View, Text } from 'react-native';
import { Divider } from '@rneui/base';

const CommentItem = ({ comment }) => {
  return (
    <View style={{marginTop: 10}}>
      <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
        <View style={styles.avatarContainer}>
          <Image
            source={
              comment?.user?.asset?.secure_url ||
              require('../../assets/home/avatar.png')
            }
            style={styles.avatar}
          />
        </View>
        
        <View>
          <View>
            <Text style={{ color: '#fff' }}>
              {`${comment?.user?.firstName} ${comment?.user?.lastName}`}
            </Text>
            <Timer date={comment?.createdAt} />
          </View>
        </View>

      </View>

      <View style={{ marginLeft: 55, marginBottom: 20 }}>
        <Text style={{ color: '#fff' }}>
          {comment?.content}
        </Text>
      </View>
      <Divider/>
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
