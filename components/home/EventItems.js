import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'
import CustomizedButton from '../CustomizedButton'
import { SHADOW } from '../../utils/styles'
import { AntDesign } from '@expo/vector-icons'
import { router } from "expo-router"

export default function EventItems({item}) {
  return (
    <View style={styles.container}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item.name}</Text>
          <MembersAvatar item={item}/>           
        </View>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <CustomizedButton
        title={'View Details'}
        handlePress={() => router.push('/club')}
        width='95%'
        position={'absolute'}
      />
    </View>
  )
}

const MembersAvatar = ({item}) => {
  return (
    <TouchableOpacity
      style={styles.membersContainer}
      onPress={() => console.log('Members')}
    >
      <Image
        source={require('../../assets/home/club-member-1.png')}
        style={styles.memberImage}
      />
      <Image
        source={require('../../assets/home/club-member-3.png')}
        style={[styles.memberImage, { position: 'absolute', left: 10 }]}
      />
      <Image
        source={require('../../assets/home/club-member-3.png')}
        style={[styles.memberImage, { position: 'absolute', left: 20 }]}
      />
      <View
        style={[styles.plusContainer, { position: 'absolute', left: 30 }]}
      >
        <AntDesign name="plus" size={10} color="black" />
      </View>
      <View style={styles.totalMembersContainer}>
        <Text style={styles.totalMembers}>200</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    flex: 1,
    width: 200,
    height: 225,
    // backgroundColor: '#F2F9FB',
    backgroundColor: '#fff',
    marginHorizontal: 6,
    marginBottom: 10,
    borderRadius: 12,
    ...SHADOW
  },
  image: {
    height: 100,
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
  membersContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: 75,
    alignItems: 'center',
  },
  memberImage: {
    width: 20,
    height: 20,
    borderRadius: 100,
    resizeMode: 'cover',
  },
  plusContainer: {
    width: 20,
    height: 20,
    backgroundColor: '#fff',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  totalMembersContainer: {
    width: 20,
    height: 20,
    borderRadius: 100,
    position: 'absolute',
    left: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalMembers: {
    fontFamily: 'Poppins',
    fontSize: 10,
    fontWeight: '400',
  },
  title: {
    fontSize: 16,
    color: '#365486',
    fontFamily: 'Poppins',
    fontWeight: '500',
    marginBottom: 2,
  },
  description: {
    fontSize: 10,
    fontFamily: 'Poppins',
    fontWeight: '400',
    marginBottom: 5,
  },
})