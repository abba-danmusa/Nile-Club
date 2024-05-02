import { View, Text, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import CustomizedButton from '../CustomizedButton'
import { useSetFollowClub } from '../../hooks/queries/useClub'
import { useState } from 'react'
import { useFeeds } from '../../hooks/queries/useFeed'
import TruncateText from '../chats/TruncateText'
import { SHADOW } from '../../utils/styles'

export default function ClubAvatar({ club, follow }) {
  
  const { mutate: setFollow } = useSetFollowClub()

  const setFollowClub = () => {
    setFollow({ clubId: club._id })
  }

  return (
    <TouchableOpacity
      onPress={() => router.push(`/club/${club._id}`)}
      style={{
        position: 'absolute',
        top: 5,
        left: 5,
        zIndex: 10000
      }}
    >
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5 }}>
        <Image source={club?.assets?.image?.secure_url} style={{ width: 40, height: 40, borderRadius: 20, }} />
        <TruncateText
          maxLength={28}
          text={club?.name}
          style={{
            fontFamily: 'Poppins',
            color: '#365486',
            fontSize: 12,
            fontWeight: '400',
            textTransform: 'uppercase'
          }}
        />
        <TouchableOpacity
          onPress={setFollowClub}
          style={{
            backgroundColor: 'transparent',
            borderWidth: .5,
            borderColor: '#fff',
            width: 100,
            alignItems: 'center',
            justifyContent: 'center',
            height: 30,
            borderRadius: 20,
            ...SHADOW
          }}
        >
          <Text style={{ color: '#fff' }}>
            { follow ? 'Following' : 'Follow' }
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}