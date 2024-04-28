import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'
import { SHADOW } from '../../utils/styles'
import { AntDesign } from '@expo/vector-icons'
import { router } from 'expo-router'
import TruncateText from '../chats/TruncateText'

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
            <AntDesign name="star" size={8} color="#365486" />
            <View style={{alignItems: 'flex-end', height: 10}}>
              <Text style={styles.rating}>{ club?.ratings || '5.0' }</Text>
            </View>
          </View>
        </View>
        <TruncateText text={club?.description} maxLength={115}/>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 200,
    height: 250,
    // backgroundColor: '#F2F9FB',
    backgroundColor: '#fff',
    marginHorizontal: 6,
    marginBottom: 10,
    borderRadius: 8,
    // ...SHADOW
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
    width: 21,
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