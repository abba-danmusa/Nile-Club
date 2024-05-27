import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'
import { SHADOW } from '../../utils/styles'
import { AntDesign } from '@expo/vector-icons'
import { router } from 'expo-router'
import TruncateText from '../chats/TruncateText'
import { AirbnbRating } from '@rneui/base'

export default function FeaturedItems({ discover }) {
  return (
    <TouchableOpacity
      onPress={() => router.push(`/club/${discover._id}`)}
      key={discover?._id}
      style={styles.container}
    >
      <Image
        source={discover?.assets?.image?.secure_url}
        style={styles.image}
      />
      <View style={{ position: 'absolute', top: 2, left: 2, backgroundColor: '#fff', padding: 2, borderRadius: 2, zIndex: 1 }}>
        <TruncateText style={{color: 'black', fontSize: 10}} text={discover.name} maxLength={20}/>
      </View>
      <View style={{ position: 'absolute', bottom: 2, right: 2, padding: 2, borderRadius: 2, zIndex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
        <AirbnbRating size={7} count={1} showRating={false}/>
        <Text style={{fontSize: 10}}>{discover.ratings}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '50%',
    height: 250,
    // backgroundColor: '#F2F9FB',
    backgroundColor: '#fff',
    // marginHorizontal: 2,
    marginBottom: 2,
    borderRadius: 8,
    // ...SHADOW
  },
  image: {
    height: '100%',
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