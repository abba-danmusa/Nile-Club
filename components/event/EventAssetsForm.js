import { StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import BottomButton from '../../components/BottomButton'
import ImageCarousel from '../ImageCarousel'
import { AntDesign } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { SHADOW } from '../../utils/styles'
import { useEventStore } from '../../hooks/stores/useEventStore'
import Toast from '../../utils/toast'
import BackButton from '../../components/BackButton'
import RenderItem from './RenderItem'
import { useCreateEvent } from '../../hooks/queries/useEvent'
import Loader from '../../components/Loader'
import { router } from 'expo-router'

const DEVICE_WIDTH = Dimensions.get('window').width
const EVENT_FORM_SCREEN = 0

export default function EventAssetsForm({
  scrollToScreen = () => { }
}) {

  const {
    date,
    startTime,
    endTime,
    title,
    description,
    setTitle,
    assets,
    uploadedAssets,
    setAssets,
    category,
    setInitialState
  } = useEventStore()

  const { mutate: createEvent, isPending } = useCreateEvent()

  /**
   * Submits the event creation form.
   * Creates the event in the database.
   * Clears the form fields on success.
   */
  const submit = async () => {
    
    if (!date || !startTime || !endTime || !title || !description) {
      Toast('Please fill in all the fields')
      scrollToScreen(EVENT_FORM_SCREEN)
      return
    }
    // create the event
    createEvent(
      {
        date,
        startTime,
        endTime,
        title,
        description,
        setTitle,
        category,
        assets: [...uploadedAssets]
      },
      {
        onSuccess: data => {
          setInitialState()
          router.back()
        },
        onError: error => {
          console.log(error)
          Toast(error.message)
        }
      }
    )
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library. now I can have access to all your pictures... Haha, just kidding!
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      // aspect: [5, 7],
      quality: 1,
    })

    let asset = result.assets[0]
    asset.upload = false

    if (!result.canceled) {
      // set the asset and filter out the asset placeholder
      setAssets([...assets, asset].reverse())
    }
  }

  const upload = async () => {
    try {
      const response = await pickImage()
    } catch (error) {
      Toast(error.message)
    }
  }

  return (
    <>
      
      {isPending ? <Loader message={'Creating Event...'} /> : null}
      
      <BackButton
        handlePress={() => scrollToScreen(EVENT_FORM_SCREEN)}
        color='#365486'
        iconColor='#fff'
      />
      <SafeAreaView style={styles.container}>
        <ImageCarousel
          images={assets}
          setImages={setAssets}
          keyExtractor={item => item.uri}
          renderItem={({ item, index }) =>
            <RenderItem item={item} index={index} />
          }
        />
        <TouchableOpacity onPress={upload} style={styles.addImageButton}>
          <AntDesign name="plus" size={24} color="black"/>
        </TouchableOpacity>
        
        <BottomButton title='Submit' handlePress={submit} />
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
    marginTop: 70,
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
    zIndex: 1000,
    ...SHADOW
  },
  image: {
    width: 300,
    height: 450,
    resizeMode: 'contain'
  },
  uploadButton: {
    position: 'absolute',
    alignSelf: 'center',
    // width: '100%',
    bottom: 0,
    backgroundColor: '#263B5E',
    padding: 10,
    borderRadius: 10,
    ...SHADOW
  }
})