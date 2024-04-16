import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import { SHADOW } from '../../utils/styles'
import VideoPlayer from '../../components/VideoPlayer'
import { useEventStore } from '../../hooks/stores/useEventStore'
import Cloudinary from '../../utils/cloudinary'
import toast from '../../utils/toast'
import { BlurView } from 'expo-blur'
import { LinearProgress } from '@rneui/themed'
import { useState } from 'react'

export default function RenderItem({ item, index }) {

  const [uploadProgress, setUploadProgress] = useState(1)
  const [uploaded, setUploaded] = useState(false)

  const {
    uploadedAssets,
    setUploadedAssets
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
      reject(error)
    }
    return response.data
  }

  const upload = async () => {
    let asset
    try {
      setUploaded(true)
      asset = await uploadAsset(item.uri)
    } catch (error) {
      return toast(error.message || `Error uploading ${item.type}`)
    }
    setUploadedAssets([...uploadedAssets, asset])
  }

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
      <View>
        <BlurView
          intensity={(100 - uploadProgress) / 5}
          style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: 1,
        }} />
        <Image
          source={{ uri: item.uri }}
          style={styles.image}
        />
        <LinearProgress
          variant='determinate'
          value={uploadProgress / 100}
          style={styles.linearProgress}
        />
        {
          !uploaded ? 
            <View style={styles.uploadButton}>
              <TouchableOpacity onPress={upload}>
                <Text style={{ color: '#fff' }}>{`Upload ${item.type}`}</Text>
              </TouchableOpacity>
            </View>
          : null
        }
      </View>
    )
  }
  if (item.type === 'video') {
    return (
      <>
        <VideoPlayer uri={item.uri} />
        <BlurView
          intensity={(100 - uploadProgress) / 5}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 1,
          }}
        />
        <LinearProgress
          variant='determinate'
          value={uploadProgress / 100}
          style={styles.linearProgress}
        />
        {
          !uploaded ?
            <View style={styles.uploadButton}>
              <TouchableOpacity onPress={upload}>
                <Text style={{ color: '#fff' }}>{`Upload ${item.type}`}</Text>
              </TouchableOpacity>
            </View>
            : null
        }
      </>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Poppins',
    fontSize: 18,
    fontWeight: '600',
    color: '#365486',
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 450,
    resizeMode: 'contain'
  },
  uploadButton: {
    ...SHADOW,
    borderRadius: 5,
    position: 'absolute',
    bottom: '50%',
    alignSelf: 'center',
    backgroundColor: '#263B5E',
    padding: 10,
    zIndex: 2,
  },
  linearProgress: {
    position: 'absolute',
    bottom: 0,
    height: 5,
    zIndex: 100
  }
})