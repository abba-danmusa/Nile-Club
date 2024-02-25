import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'
import { SHADOW } from '../../utils/styles'
import { AntDesign } from '@expo/vector-icons'

export default function FeaturedItems({ item }) {
  return (
    <View style={styles.container}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item.name}</Text>
          <View style={styles.ratingsContainer}>
            <AntDesign name="star" size={8} color="#365486" />
            <View style={{alignItems: 'flex-end', height: 10}}>
              <Text style={styles.rating}>{item.ratings}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 155,
    height: 168,
    // backgroundColor: '#F2F9FB',
    backgroundColor: '#fff',
    marginHorizontal: 6,
    marginBottom: 10,
    borderRadius: 12,
    ...SHADOW
  },
  image: {
    height: 93,
    width: '100%',
    resizeMode: 'cover',
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12
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