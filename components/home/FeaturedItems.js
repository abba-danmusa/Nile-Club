import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'
import { SHADOW } from '../../utils/styles'
import { router } from 'expo-router'
import TruncateText from '../chats/TruncateText'
import { AirbnbRating } from '@rneui/base'

export default function FeaturedItems({ club }) {
  return (
    <TouchableOpacity
      onPress={() => router.push(`/club/${club?._id}`)}
      key={club?._id}
      style={styles.container}
    >
      <Image
        source={club?.assets?.image?.secure_url}
        style={styles.image}
      />
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <TruncateText
            text={club?.name}
            maxLength={18}
            style={styles.title}
          />
          <View style={styles.ratingsContainer}>
            <AirbnbRating count={1} size={8} showRating={false} />
            <View style={{alignItems: 'flex-end', height: 10,}}>
              <Text style={styles.rating}>{club?.ratings.toFixed(1) || '4.0' }</Text>
            </View>
          </View>
        </View>
        <TruncateText
          style={{ color: 'black', fontFamily: 'Poppins', fontSize: 10 }}
          text={club?.description}
          maxLength={165}
        />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 200,
    height: 250,
    backgroundColor: '#F2F9FB',
    backgroundColor: '#FFF',
    marginHorizontal: 6,
    marginBottom: 10,
    borderRadius: 8,
    ...SHADOW
  },
  image: {
    height: 150,
    width: '100%',
    contentFit: 'cover',
    borderRadius: 5,
  },
  content: {
    marginVertical: 5,
    marginHorizontal: 5,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ratingsContainer: {
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 25,
  },
  rating: {
    fontSize: 8,
    fontFamily: 'Poppins',
    fontWeight: '400',
  },
  title: {
    fontSize: 12,
    color: '#365486',
    fontFamily: 'Poppins',
    fontWeight: '500',
  },
  description: {
    fontSize: 10,
    fontFamily: 'Poppins',
    fontWeight: '400',
    marginBottom: 5,
  },
})