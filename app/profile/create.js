import { Text, StyleSheet, Dimensions, ScrollView, BackHandler, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomizedInput from '../../components/CustomizedInput'
import ImagePickerProvider from '../../components/ImagePicker'
import BottomButton from '../../components/BottomButton'
import { useState } from 'react'
import { useCreateClub, useEditClub } from '../../hooks/queries/useClub' 
import toast from '../../utils/toast'
import Loader from '../../components/Loader'
import cloudinary from '../../utils/cloudinary'
import TextArea from '../../components/TextArea'
import { useClubStore } from '../../hooks/stores/useClubStore'
import { router, useNavigation } from 'expo-router'
import { useEffect } from 'react'

const DEVICE_WIDTH = Dimensions.get('window').width

export default function create() {
  
  const {
    banner,
    setBanner,
    image,
    setImage,
    name,
    setName,
    description,
    setDescription,
    setInitialState,
    _id
  } = useClubStore()

  const { mutate: createClub, isPending: isPendingCreatingClub } = useCreateClub()
  const { mutate: editClub, isPending: isPendingEditClub } = useEditClub()
   
  const [isPendingUploadingImages, setIsPendingUploadingImages] = useState(false)

  const submit = async () => {
    if (!image || !banner) return toast('Please provide a banner and an image')

    setIsPendingUploadingImages(true) // images are uploading
    
    const bannerAssetsPromise = uploadImage(banner.uri)
    const imageAssetsPromise = uploadImage(image.uri)

    const [bannerAssets, imageAssets] = await Promise.all([
      bannerAssetsPromise,
      imageAssetsPromise
    ])

    setIsPendingUploadingImages(false) // images are done uploading

    // create the club
    createClub({
      name, // the name of the club
      description, // the description of the club,
      assets: {
        banner: { ...bannerAssets },
        image: { ...imageAssets }
      }
    }, {
      onSuccess: () => setInitialState()
    })
  }

  const submitEditClub = async () => {
    if (!image || !banner || !name || !description) {
      return toast('Please all inputs are required')
    }

    let bannerAssets
    let imageAssets

    if (banner.uri) {
      setIsPendingUploadingImages(true) // images are uploading
      bannerAssets = await uploadImage(banner.uri)
      setIsPendingUploadingImages(false)
    }
    if (image.uri) {
      setIsPendingUploadingImages(true)
      imageAssets = await uploadImage(image.uri)
      setIsPendingUploadingImages(false)
    }

    editClub({
      _id, // the id of the club
      name, // the name of the club
      description, // the description of the club,
      assets: {
        banner: bannerAssets ? { ...bannerAssets } : { ...banner },
        image: imageAssets ? { ...imageAssets } : { ...image }
      }
    }, {
      onSuccess: () => {
        setInitialState()
        router.back()
      }
    })
  }

  const uploadImage = async (imageURI) => {
    const data = new FormData()

    let imageName = imageURI.split('/').pop()
    let match = /\.(\w+)$/.exec(imageName)
    let type = match ? `image/${match[1]}` : `image`
    let file = imageURI
    const timestamp = new Date().toISOString()

    file = { uri: file, name: imageName, type }
    data.append('file', file)
    data.append('upload_preset', process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET)
    data.append('cloud_name', process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME)

    try {
      response = await cloudinary
        .post(`/image/upload`,
          data,
          { headers: { 'Content-Type': 'multipart/form-data'} }
        )
    } catch (error) {
      return toast('Failed to upload image to Cloudinary, Please try again later')
    }

    const { url, secure_url, signature } = response.data
    return { url, secure_url, signature }
  }

  const navigation = useNavigation()

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      // Handle back button press here
      Alert.alert('Now hold on a sec!', 'Are you sure you\'d want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'YES',
          onPress: () => {
            setInitialState()
            navigation.goBack()
          }
        },
      ]);
      return true; // Prevent the default back button behavior
    });

    return () => backHandler.remove();
  }, [navigation])

  return (
    <>
      {
        (isPendingUploadingImages || isPendingCreatingClub) ?
          <Loader
            message={
              isPendingUploadingImages ? 'Uploading images...' : isPendingCreatingClub || isPendingEditClub ? 'Creating your club...' : 'Done!'
            }
          />
        : null
      }
      <SafeAreaView style={{flex: 1, marginBottom: 10}}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.screenTitle}>Club Creation Application</Text>
          <CustomizedInput
            label={'Club Name'}
            placeholder={'Input your club name here'}
            value={name}
            onChangeText={setName}
          />
          <TextArea value={description} onChangeText={setDescription}/>
          <ImagePickerProvider
            image={banner}
            setImage={setBanner}
            title='Club Banner'
          />
          <ImagePickerProvider
            image={image}
            setImage={setImage}
            title='Club Avatar Image'
          />
          {
            _id ? <BottomButton title='Edit Club' handlePress={submitEditClub} />
            : <BottomButton title='Submit' handlePress={submit} />
          }
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  screenTitle: {
    fontFamily: 'Poppins',
    fontSize: 24,
    fontWeight: '600',
    alignSelf: 'flex-start',
    margin: 10
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
  }
})