import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { Image } from 'expo-image'
import { FontAwesome5, FontAwesome } from '@expo/vector-icons'
import TruncateText from '../../components/TruncateText'
import EventTimeLine from '../home/EventTimeLine'
import ImageGallery from '../home/ImageGallery'
import { useSetLike } from '../../hooks/queries/useEvent'
import { useState } from 'react'
import { NativeViewGestureHandler } from 'react-native-gesture-handler'

const DEVICE_WIDTH = Dimensions.get('window').width

export default function FeedItem({ item }) {

  const [openComments, setOpenComments] = useState(false)

  const {
    assets,
    title,
    description,
    category,
    startTime: starts,
    endTime: ends,
    club,
    follow,
    like,
    likes,
    totalLikes,
    physical,
    virtual,
    content,
    venue,
    link,
    itemType
  } = item

  const { mutate: addToSetLike } = useSetLike()
  const [isLiked, setIsLiked] = useState(like)
  const [numberOfLikes, setNumberOfLikes] = useState(totalLikes)

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
                  <FontAwesome name="heart" size={20} color="red" />
                  :
                  <FontAwesome5 name="heart" size={20} color="black" />
              }
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={{ marginRight: 5, padding: 5, }}
              onPress={() => setOpenComments(openComments)}
            >
              <FontAwesome5 name="comment" size={20} color="black" />
            </TouchableOpacity> */}
          </View>

        </View>
        {
          itemType === 'event' ?
            <View style={styles.contentContainer}>
              <Text
                style={{
                  marginBottom: 5,
                  fontFamily: 'Poppins',
                  fontSize: 14,
                  fontWeight: '700',
                  color: '#365486'
                }}
              >{title}</Text>
              <TruncateText text={description} />
              <View
                style={{
                  ...SHADOW,
                  backgroundColor: '#fff',
                  padding: 2,
                  width: 100,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 10
                }}
              >
                <Text>{physical ? 'Physical Event' : 'Virtual Event'}</Text>
              </View>
              <View>
                {
                  link &&
                  <View style={styles.linkContainer}>
                    <EvilIcons name="link" size={12} color="black" />
                    <Text>{link}</Text>
                  </View>
                }
                {
                  venue &&
                  <View style={styles.linkContainer}>
                    <MaterialIcons name="location-on" size={12} color="black" />
                    <Text>{venue}</Text>
                  </View>
                }
              </View>
              <EventTimeLine fromDate={starts} toDate={ends} />
            </View>
            :
            <View style={styles.contentContainer}>
              <TruncateText text={content} />
            </View>
        }
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