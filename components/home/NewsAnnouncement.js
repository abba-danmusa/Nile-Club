import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'
import { SHADOW } from '../../utils/styles'
import { AntDesign } from '@expo/vector-icons'

export default function NewsAnnouncement({ item }) {
  return (
    <View key={item._id} style={styles.container}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item.name}</Text>
        </View>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 347,
    height: 347,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 12,
    alignSelf: 'center',
    ...SHADOW
  },
  image: {
    height: 209,
    width: '100',
    contentFit: 'cover',
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    zIndex: 1000
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
    fontSize: 18,
    color: '#365486',
    fontFamily: 'Poppins',
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '400',
    marginBottom: 5,
  },
})