import React, { useRef, useState } from 'react'
import { View, Dimensions, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'
import VideoPlayer from '../VideoPlayer'
import { SHADOW } from '../../utils/styles'
import { useEventStore } from '../../hooks/stores/useEventStore'
import { LinearProgress } from '@rneui/base'
import Cloudinary from '../../utils/cloudinary'
import toast from '../../utils/toast'

const DEVICE_WIDTH = Dimensions.get('window').width
const DEVICE_HEIGHT = Dimensions.get('window').height

const AssetGallery = ({ images }) => {
  const scrollViewRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(1)

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / DEVICE_WIDTH);
    setActiveIndex(index);
  }

  const {
    uploadedAssets,
    setUploadedAssets,
    assets,
    setAssets
  } = useEventStore()

  const uploadAsset = async imageURI => {
    const data = new FormData()

    let imageName = imageURI.split('/').pop()
    let match = /\.(\w+)$/.exec(imageName)
    let imageType = match ? `image/${match[1]}` : 'video'
    let file = imageURI

    file = { uri: file, name: imageName, type: imageType }
    data.append('file', file)
    data.append('upload_preset', process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET)
    data.append('cloud_name', process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME)

    let response

    try {
      response = await Cloudinary.post(
        `auto/upload`,
        data,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            setUploadProgress(percentCompleted)
          }
        }
      )
    } catch (error) {
      console.log(error)
      toast(error.message)
    }
    return response.data
  }

  const upload = async (item) => {
    let asset
    try {
      setAssets([
        ...assets.filter(i => i.uri !== item.uri),
        { ...item, uploaded: true }
      ])
      // return console.log(assets)
      asset = await uploadAsset(item.uri)
    } catch (error) {
      setAssets([
        ...assets.filter(i => i.uri !== item.uri),
        { ...item, uploaded: false }
      ])
      return toast(error.message || `Error uploading ${item.type}`)
    }
    setUploadedAssets([...uploadedAssets, asset])
  }

  const remove = async (image) => {
    if (image.secure_url) {
      setAssets([...assets.filter(i => i.secure_url !== image.secure_url)])
      setUploadedAssets([...uploadedAssets.filter(i => i.secure_url !== image.secure_url)])
      console.log(uploadedAssets.length)
      return
    }
    setAssets([...assets.filter(i => i.uri !== image.uri)])
    setUploadedAssets([...uploadedAssets.filter(i => i.uri !== image.uri)])
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ alignItems: 'center', height: DEVICE_HEIGHT - 100 }}
        style={{height: DEVICE_HEIGHT}}
      >
        {images.map((image, index) => {
          // Calculate the aspect ratio of the image
          const aspectRatio = image.height / image.width
          const imageHeight = DEVICE_WIDTH * aspectRatio
          if (image.resource_type === 'image' || image.type === 'image') {
            return (
              <View key={index}>
                <View style={{
                  flex: 1, justifyContent: 'center',
                  width: DEVICE_WIDTH
                }}>
                  <Image
                    key={index}
                    source={image.secure_url || image.uri}
                    style={[styles.image, { width: DEVICE_WIDTH, height: imageHeight }]}
                    contentFit="cover"
                  />
                </View>
                <UploadStatus
                  image={image}
                  upload={upload}
                  uploadProgress={uploadProgress}
                />
                <RemoveAssetButton image={image} remove={remove} />
              </View>
            )
          } else if (image.resource_type === 'video' || image.type === 'video') {
            return (
              <View key={index}>
                <VideoPlayer
                  uri={image?.secure_url || image.uri}
                  height={imageHeight}
                  width={'100%'}
                  key={index}
                  upload={upload}
                  UploadStatus={UploadStatus}
                />
                <UploadStatus
                  image={image}
                  upload={upload}
                  uploadProgress={uploadProgress}
                />
                <RemoveAssetButton image={image} remove={ remove } />
              </View>
            )
          }
        })}
      </ScrollView>
      {
        images.length > 1 && (
          <View style={styles.pagination}>
            {images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  index === activeIndex && styles.activeDot,
                ]}
              />
            ))}
          </View>
        )
      }
    </View>
  );
};

const RemoveAssetButton = ({ image, remove = () => {} }) => {
  return (
    <TouchableOpacity
      style={styles.removeButton}
      onPress={() => remove(image)}
    >
      <Text style={styles.uploadButtonText}>
        {`remove ${image.type}`}
      </Text>
    </TouchableOpacity>
  )
}

const UploadStatus = ({ image, upload, uploadProgress }) => {
  return (
    image.uploaded || image.secure_url ?
      <LinearProgress
        variant='determinate'
        color='#365486'
        // color='black'
        style={styles.linearProgress}
        value={
          image.uploaded || image.secure_url ? 1
          : uploadProgress / 100
        }
      />
      :
      <TouchableOpacity
        style={styles.uploadButton}
        onPress={() => upload(image)}
      >
        <Text style={styles.uploadButtonText}>
          {`Upload ${image.type}`}
        </Text>
      </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    height: '80%'
  },
  image: { 
    width: DEVICE_WIDTH,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#365486',
  },
  uploadButton: {
    ...SHADOW,
    borderRadius: 100,
    position: 'absolute',
    right: 10,
    bottom: '35%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#365486',
    height: 55,
    width: 55,
    // padding: 10,
    zIndex: 2,
  },
  uploadButtonText: {
    color: '#fff',
    fontFamily: 'Poppins',
    fontSize: 8,
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  removeButton: {
    ...SHADOW,
    borderRadius: 100,
    position: 'absolute',
    right: 10,
    bottom: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'tomato',
    height: 55,
    width: 55,
    // padding: 10,
    zIndex: 2,
  },
  linearProgress: {
    position: 'absolute',
    top: 0,
    height: 5,
    zIndex: 10000
  }
})

export default AssetGallery