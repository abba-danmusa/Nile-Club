import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native'
import { Image } from 'expo-image'
import { FontAwesome5, FontAwesome } from '@expo/vector-icons'
import TruncateText from '../../components/TruncateText'
import ImageCarousel from '../ImageCarousel'
import VideoPlayer from '../VideoPlayer'
import { AirbnbRating } from '@rneui/themed'
import EventTimeLine from './EventTimeLine'
import ClubAvatar from './ClubAvatar'
import ImageGallery from './ImageGallery'
import { useSetLike } from '../../hooks/queries/useEvent'

const DEVICE_WIDTH = Dimensions.get('window').width

export default function FeedItem({ item }) {

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
    totalLikes
  } = item

  const { mutate: addToSetLike, isPending } = useSetLike()

  return (
    <View>
      <ClubAvatar club={club} follow={follow} />
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
          // backgroundColor: 'red',
          alignItems: 'center',
        }}
      >
        <View style={{marginLeft: 10}}>
          <Text
            style={{
              fontFamily: 'Poppins',
              fontSize: 15,
              fontWeight: 700,
              justifyContent: 'flex-end'
            }}
          >{ `${totalLikes} Likes` }</Text>
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
            onPress={() => addToSetLike({ eventId: item?._id })}
            style={{ marginRight: 5, padding: 5, }}
          >
            {
              isPending ? <ActivityIndicator color='red'/> :
              like ?
                <FontAwesome name="heart" size={20} color="red" />
              :
                <FontAwesome5 name="heart" size={20} color="black" />
            }
          </TouchableOpacity>
          <TouchableOpacity style={{ marginRight: 5, padding: 5, }}>
            <FontAwesome5 name="comment" size={20} color="black" />
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
        <EventTimeLine fromDate={starts} toDate={ends}/>
      </View>
    </View>
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