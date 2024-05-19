import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native'
import { Image } from 'expo-image'
import { FontAwesome5, FontAwesome, Feather } from '@expo/vector-icons'
import TruncateText from '../../components/TruncateText'
import EventTimeLine from '../home/EventTimeLine'
import ImageGallery from '../home/ImageGallery'
import { useSetLike } from '../../hooks/queries/useEvent'
import { useState } from 'react'
import { NativeViewGestureHandler } from 'react-native-gesture-handler'
import { useEventStore } from '../../hooks/stores/useEventStore'
import { router } from 'expo-router'

const DEVICE_WIDTH = Dimensions.get('window').width

export default function FeedItem({ item }) {
  const {
    assets,
    title,
    description,
    category,
    startTime: starts,
    endTime: ends,
    like,
    likes,
    totalLikes
  } = item

  const { mutate: addToSetLike } = useSetLike()
  const [isLiked, setIsLiked] = useState(like)
  const [numberOfLikes, setNumberOfLikes] = useState(totalLikes)

  const { setEvent, setUploadedAssets } = useEventStore()

  const likeEvent = () => {
    setIsLiked(!isLiked)
    setNumberOfLikes(isLiked ? numberOfLikes - 1 : numberOfLikes + 1)
    addToSetLike(
      { eventId: item?._id },
      {
        onError: () => {
          setIsLiked(!isLiked)
          setNumberOfLikes(numberOfLikes - 1)
        }
      }
    )
  }

  const editEvent = () => {
    setEvent({ item })
    setUploadedAssets([...assets])
    router.push('/club/event')
  }

  return (
    <NativeViewGestureHandler>
      <View>
        {
          assets?.length > 0 ?
            <ImageGallery images={assets} />
            :
            <View style={styles.noAssetContainer}>
              <Image
                source={require('../../assets/icon.png')}
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 20
                }}
              />
            </View>
        }

        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <View style={{ marginLeft: 10 }}>
            <Text
              style={{
                fontFamily: 'Poppins',
                fontSize: 15,
                fontWeight: 700,
                justifyContent: 'flex-end'
              }}
            >{`${numberOfLikes} Likes`}</Text>
          </View>

          <View
            style={{
              alignSelf: 'flex-end',
              flexDirection: 'row',
              marginTop: 10,
              marginLeft: 10
            }}
          >
            <TouchableOpacity
              onPress={likeEvent}
              style={{ marginRight: 5, padding: 5, }}
            >
              {
                isLiked ?
                  <FontAwesome name="heart" size={24} color="red" />
                  :
                  <FontAwesome5 name="heart" size={24} color="black" />
              }
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginRight: 5, padding: 5, }}
              onPress={editEvent}
            >
              <Feather name="edit-2" size={24} color="black" />
            </TouchableOpacity>
          </View>

        </View>
        <View style={styles.contentContainer}>
          <Text
            style={{
              marginBottom: 5,
              fontFamily: 'Poppins',
              fontSize: 16,
              fontWeight: '700',
              color: '#365486'
            }}
          >{title}</Text>
          <TruncateText text={description} />
          <EventTimeLine fromDate={starts} toDate={ends} />
        </View>
      </View>
    </NativeViewGestureHandler>
  )
}

const styles = StyleSheet.create({
  image: {
    contentFit: 'contain',
  },
  contentContainer: {
    marginHorizontal: 10,
    marginTop: 5
  },
  noAssetContainer: {
    backgroundColor: 'black',
    width: DEVICE_WIDTH,
    height: 400,
    alignItems: 'center',
    justifyContent: 'center'
  }
})