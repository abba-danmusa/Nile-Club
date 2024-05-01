import { View, Text, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import CustomizedButton from '../CustomizedButton'
import { useSetFollowClub } from '../../hooks/queries/useClub'
import { useState } from 'react'
import { useFeeds } from '../../hooks/queries/useFeed'
import TruncateText from '../chats/TruncateText'

export default function ClubAvatar({ club, refetchFeeds = () => {} }) {
  
  const [
    follows,
    setFollows
  ] = useState(club?.follows ? 'Following' : 'Follow')

  const { mutate: setFollow } = useSetFollowClub()

  const setFollowClub = () => {
    setFollow(
      { clubId: club._id },
      {
        onSuccess: data => {
          let followMessage = data?.data?.message
          setFollows(followMessage == 'following' ? 'following' : 'follow')
        }
      }
    )
    refetchFeeds()
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
          maxLength={30}
          text={club?.name}
          style={{
            fontFamily: 'Poppins',
            color: '#fff', fontSize: 12,
            fontWeight: '400'
          }}
        />
        <CustomizedButton
          title={follows}
          width={100}
          height={'fit-content'}
          backgroundColor={'transparent'}
          borderColor={'#fff'}
          borderWidth={.5}
          lineHeight={12}
          handlePress={setFollowClub}
        />
      </View>
    </TouchableOpacity>
  )
}