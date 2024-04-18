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
      reject(error)
    }
    return response.data
  }

  const upload = async () => {
    let asset
    try {
      setAssets([
        ...assets.filter(i => i.uri !== item.uri),
        { ...item, uploaded: true }
      ])
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
        <View style={{position: 'relative'}}>
          <Image
            source={{ uri: item.uri }}
            style={styles.image}
            placeholder={'contain'}
          />
        </View>
        <View>
        </View>

        {
          item.uploaded ?
            <LinearProgress
              variant='determinate'
              value={item.uploaded ? 1 : uploadProgress / 100}
              style={styles.linearProgress}
            /> 
          :    
            <TouchableOpacity style={styles.uploadButton} onPress={upload}>
              <Text style={{ color: '#fff', fontFamily: 'Poppins', fontSize: 10, textTransform: 'uppercase' }}>{`Upload ${item.type}`}</Text>
            </TouchableOpacity>
        }
      </View>
    )
  }
  if (item.type === 'video') {
    return (
      <>
        <VideoPlayer uri={item.uri} />
        {/* <BlurView
          intensity={(100 - uploadProgress) / 5}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 1,
          }}
        /> */}
        {
          item.uploaded ?
            <LinearProgress
              variant='determinate'
              value={item.uploaded ? 1 : uploadProgress / 100}
              style={styles.linearProgress}
            />
          :
            <TouchableOpacity style={styles.uploadButton} onPress={upload}>
              <Text style={{ color: '#fff', fontFamily: 'Poppins', fontSize: 10, textTransform: 'uppercase' }}>{`Upload ${item.type}`}</Text>
            </TouchableOpacity>
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
    resizeMode: 'contain',
    // position: 'relative'
  },
  uploadButton: {
    ...SHADOW,
    borderRadius: 5,
    position: 'absolute',
    bottom: 0,
    // height: 30,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#263B5E',
    padding: 5,
    zIndex: 2,
  },
  linearProgress: {
    position: 'absolute',
    bottom: 0,
    height: 5,
    zIndex: 10000
  }
})