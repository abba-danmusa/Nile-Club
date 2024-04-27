import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { Image } from 'expo-image'
import { AntDesign, FontAwesome5 } from '@expo/vector-icons'
import TruncateText from '../../components/TruncateText'
import ImageCarousel from '../ImageCarousel'
import VideoPlayer from '../VideoPlayer'
import { AirbnbRating } from '@rneui/themed'
import EventTimeLine from './EventTimeLine'
import ClubAvatar from './ClubAvatar'

const DEVICE_WIDTH = Dimensions.get('window').width

export default function FeedItem({ item, refetch = () => { } }) {

  const {
    assets,
    title,
    description,
    category,
    startTime: starts,
    endTime: ends,
    club
  } = item

  return (
    <View style={{marginVertical: 20}}>
      {
        assets?.length > 0 ?
          <ImageCarousel
            images={assets}
            renderItem={RenderItem}
            layout='stack'
            itemWidth={DEVICE_WIDTH}
            itemHeight={500}
            backgroundColor={'black'}
          />
          : <View style={styles.noAssetContainer}>
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
          flexDirection: 'row'
        }}
      >
        <View style={{ flexDirection: 'row', marginTop: 5, marginLeft: 10 }}>
          <AirbnbRating size={15} showRating={false} defaultRating={4} />
        </View>
        <View style={{ alignSelf: 'flex-end', flexDirection: 'row' }}>
          <TouchableOpacity style={{ marginRight: 5, padding: 5, }}>
            <FontAwesome5 name="comment" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginRight: 10, padding: 5, }}>
            <AntDesign name="hearto" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <Text style={{ marginBottom: 5, fontFamily: 'Poppins', fontSize: 16, fontWeight: '600', }}>{title}</Text>
        <TruncateText text={description} />
        <EventTimeLine fromDate={starts} toDate={ends} />
      </View>
    </View>
  )
}

const RenderItem = ({ item, index }) => {

  const regex = /https:\/\/res\.cloudinary\.com\/feedmi\/(image|video)\//
  const match = item?.secure_url?.match(regex)
  const asset = match[1]

  if (item?.resource_type === 'image') {
    return (
      <Image
        source={item?.secure_url}
        style={[styles.image, { width: '100%', minHeight: 450 }]}
      />
    )
  }
  if (item?.resource_type === 'video') {
    return (
      <VideoPlayer
        uri={item?.secure_url}
        height={450}
        width={'100%'}
        backgroundColor='black'
      />
    )
  }
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