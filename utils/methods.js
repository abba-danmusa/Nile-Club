import cloudinary from './cloudinary'
import { StatusBar, Platform } from 'react-native'
import toast from './toast'

export const uploadImage = async (imageURI, assetType = 'image') => {
  return new Promise(async (resolve, reject) => {
    const data = new FormData()

    let imageName = imageURI.split('/').pop()
    let match = /\.(\w+)$/.exec(imageName)
    let type = match ? `image/${match[1]}` : `${assetType}`
    let file = imageURI

    file = { uri: file, name: imageName, type }
    data.append('file', file)
    data.append('upload_preset', process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET)
    data.append('cloud_name', process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME)

    let response
    try {
      response = await cloudinary
        .post(`auto/upload`,
          data,
          { headers: { 'Content-Type': 'multipart/form-data' } }
      )
    } catch (error) {
      reject(error)
    }
    const { url, secure_url, signature } = response.data
    resolve({ url, secure_url, signature })
  })
  
}

export const uploadMultipleAssets = async (assetsURI, _) => {

  const uploadPromises = assetsURI.map(uploadImage)
  try {
    const uploadResults = await Promise.all(uploadPromises)
    return uploadResults // Return the array of upload results
  } catch (error) {
    toast(error.message || 'error')
  }
}

export const getStatusBarHeight = () => {
  
  if (Platform.OS === 'android') {
    return StatusBar.currentHeight
  } else if (Platform.OS === 'ios') {
    return 20 // Default status bar height for iOS
  } else {
    return 0 // Default status bar height for other platforms
  }
}