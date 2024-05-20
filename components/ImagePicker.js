import React, { useState, useEffect } from 'react'
import { Button, Image, View, Dimensions, Text, StyleSheet, TouchableOpacity} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import CustomizedButton from './CustomizedButton'
import { MaterialIcons } from '@expo/vector-icons'

const DEVICE_WIDTH = Dimensions.get('window').width
const MEDIA_TYPES = ['png', 'jpeg', 'gif']
const IMAGE_CONTAINER_HORIZONTAL_PADDING = 20

export default function ImagePickerProvider({
  title = 'Image',
  image = null,
  setImage = () => {}
}) {

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library. now I can have access to all your pictures... Haha, just kidding!
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    if (!result.canceled) {
      setImage(result.assets[0])
    }
  }

  const removeImage = () => {
    setImage(null)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.inputLabel}>{title}</Text>
      <View style={styles.imageContainer}>
        <CustomizedButton
          title="Pick an image from camera roll"
          handlePress={pickImage}
        />
        {
          image && <View style={{marginTop: 10}}>
            <Image
              source={{ uri: image.uri || image.secure_url }}
              style={styles.image}
            />
            <TouchableOpacity style={styles.cancelIcon} onPress={removeImage}>
              <MaterialIcons name="cancel" size={24} color="red"/>
            </TouchableOpacity>
          </View>
        }
        {
          !image && <View style={styles.imagePlaceholderContainer}>
            {
              MEDIA_TYPES.map(type => (
                <TouchableOpacity
                  key={type}
                  style={styles.imagePlaceholder}
                  onPress={pickImage}
                >
                  <Text>{type}</Text>
                </TouchableOpacity>
              ))
            }
          </View>
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  inputLabel: {
    fontFamily: 'Poppins',
    fontSize: 16,
    color: '#252427',
    fontWeight: '400',
  },
  imageContainer: {
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
  image: {
    width: DEVICE_WIDTH - 40 - (IMAGE_CONTAINER_HORIZONTAL_PADDING),
    height: 140,
    resizeMode: 'cover',
    borderRadius: 10
  },
  cancelIcon: {
    position: 'absolute',
    right: 5,
    top: 5
  }
})