import { Text, StyleSheet, Dimensions, View, TouchableOpacity, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import BottomButton from '../../components/BottomButton'
import { useState } from 'react'
import ImageCarousel from '../ImageCarousel'
import { AntDesign } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { SHADOW } from '../../utils/styles'
import VideoPlayer from '../../components/VideoPlayer'
import { useEventStore } from '../../hooks/stores/useEventStore'

const DEVICE_WIDTH = Dimensions.get('window').width

export default function EventAssetsForm({ submit }) {

  const { assets, setAssets } = useEventStore()

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library. now I can have access to all your pictures... Haha, just kidding!
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      // aspect: [5, 7],
      quality: 1,
    })
    if (!result.canceled) {
      // console.log(result.assets[0])
      setAssets([...assets, result.assets[0]])
    }
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Add Images or Videos for your event</Text>
        <ImageCarousel
          images={assets}
          setImages={setAssets}
          renderItem={renderItem}
        />
        <TouchableOpacity onPress={pickImage} style={styles.addImageButton}>
          <AntDesign name="plus" size={24} color="black"/>
        </TouchableOpacity>
        
        <BottomButton title='Submit' handlePress={submit} />
      </SafeAreaView>
    </>
  )
}

const renderItem = ({ item, index }) => {
  if (!item.type) {
    return (
      <View style={{
        backgroundColor: '#CBE8EF',
        borderRadius: 5,
        height: 450,
        padding: 50,
      }}>
        <Text style={{ fontSize: 30 }}>{item.title}</Text>
        <Text>{item.text}</Text>
      </View>
    )
  }
  if (item.type === 'image') {
    return (
      <Image
        source={{ uri: item.uri }}
        style={styles.image}
      />
    )
  }
  if (item.type === 'video') {
    return (
      <VideoPlayer uri={item.uri} />
    )
  }
}

const styles = StyleSheet.create({
  screenTitle: {
    fontFamily: 'Poppins',
    fontSize: 24,
    fontWeight: '600',
    alignSelf: 'flex-start',
    margin: 10
  },
  title: {
    fontFamily: 'Poppins',
    fontSize: 18,
    fontWeight: '600',
    color: '#365486',
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginBottom: 20,
  },
  container: {
    marginTop: 20,
    alignItems: 'center',
    paddingBottom: 120
  },
  imageContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: DEVICE_WIDTH - 40,
    height: 200,
    backgroundColor: '#FFF',
    borderWidth: 1.5,
    borderBottomColor: '#263B5E',
    borderBottomWidth: 1.5,
    borderColor: '#263B5E',
    borderRadius: 12,
    fontFamily: 'Poppins',
    fontSize: 14,
  },
  imagePlaceholderContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imagePlaceholder: {
    backgroundColor: '#CBE8EF',
    width: 75,
    height: 100,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  addImageButton: {
    backgroundColor: '#CBE8EF',
    padding: 15,
    borderRadius: 100,
    position: 'absolute',
    right: 10,
    bottom: 120,
    ...SHADOW
  },
  image: {
    width: 300,
    height: 450,
    resizeMode: 'contain'
  }
})