import { StyleSheet, Dimensions, View, ScrollView } from 'react-native'
import { useState, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import NewEventForm from '../../components/event/NewEventForm'
import EventAssetsForm from '../../components/event/EventAssetsForm'
import { useCreateEvent } from '../../hooks/queries/useEvent'
import { uploadMultipleAssets } from '../../utils/methods'
import { useEventStore } from '../../hooks/stores/useEventStore'
import Loader from '../../components/Loader'

const DEVICE_WIDTH = Dimensions.get('window').width

export default function event() {

  const [slideIndex, setSlideIndex] = useState(0)
  const scrollViewRef = useRef(null)

  const [
    isPendingUploadingImages,
    setIsPendingUploadingImages
  ] = useState(false)

  const [
    isPendingUploadingVideos,
    setIsPendingUploadingVideos,
  ] = useState(false)

  const renderDifferentSlides = () => {
    return SLIDES.map((slide, index) => {
      return (
        <View key={index} style={styles.slideContainer}>
          {slide.renderSlide()}
        </View>
      )
    })
  }

  const scrollToScreen = (index) => {
    const nextPageOffset = index * DEVICE_WIDTH
    scrollViewRef.current.scrollTo({ x: nextPageOffset, animated: true })
    setSlideIndex(index)
  }

  const {
    mutate: createEvent,
    isPending: isPendingCreatingEvent
  } = useCreateEvent()

  const {
    date,
    startTime,
    endTime,
    title,
    description,
    setTitle,
    assets,
    category,
    setInitialState
  } = useEventStore()

  /**
   * Submits the event creation form.
   * Uploads images and videos to storage.
   * Creates the event in the database.
   * Clears the form fields on success.
   */
  const submit = async () => {
    let imagesArray = assets.filter((image) => image.type === "image")
    let videosArray = assets.filter((video) => video.type === "video")

    // Get the file buffers
    imagesArray = imagesArray.map(image => image.uri)
    videosArray = videosArray.map(video => video.uri)

    let imageAssets
    let videoAssets
    if (imagesArray.length) {
      setIsPendingUploadingImages(true) // images are uploading
      imageAssets = await uploadMultipleAssets(imagesArray)
      setIsPendingUploadingImages(false) // images are done uploading
    }
    if (videosArray.length) {
      setIsPendingUploadingVideos(true) // videos are uploading
      videoAssets = await uploadMultipleAssets(videosArray)
      setIsPendingUploadingVideos(false) // videos are done uploading
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
        assets: {
          images: [...imageAssets],
          videos: [...videoAssets],
        },
      },
      {
        onSuccess: data => {
          setInitialState()
        },
      }
    );
  }

  const SLIDES = [
    { renderSlide: () => <NewEventForm scrollToScreen={scrollToScreen} /> },
    { renderSlide: () => <EventAssetsForm submit={submit} /> }
  ]

  const CurrentSlideIndicator = () => {
    return (
      <View style={styles.indicatorContainer}>
        {
          SLIDES.map((slide, index) =>
            <View
              key={index}
              style={[
                styles.indicatorStyle,
                {
                  opacity: (slideIndex == index) ||
                    (slideIndex > index) ? 1 : .4
                }
              ]}
            />
          )
        }
      </View>
    )
  }

  return (
    <>
      {
        (
          isPendingUploadingImages ||
          isPendingUploadingVideos ||
          isPendingCreatingEvent
        ) ? <Loader
              message={
                isPendingUploadingImages ? 'Uploading your images...' :
                isPendingUploadingVideos ? 'Uploading your videos...' : isPendingCreatingEvent ? 'Now creating your event...' : 'Done!!!'
              }
            />
          : null
      }
      <SafeAreaView> 
        { CurrentSlideIndicator() }
        <ScrollView
          style={{height: '100%'}}
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          scrollEnabled={false}
          onScroll={({ nativeEvent }) => {
            const offsetX = nativeEvent.contentOffset.x
            const index = Math.floor(offsetX / DEVICE_WIDTH)
            setSlideIndex(index)
          }}
        > 
          { renderDifferentSlides() }
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  indicatorContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    position: 'absolute',
    top: 50,
    zIndex: 1,
    alignSelf: 'center'
  },
  indicatorStyle: {
    width: 27,
    height: 6,
    backgroundColor: '#365486',
    borderRadius: 10
  },
  slideContainer: {
    width: DEVICE_WIDTH,
    backgroundColor: '#FDFEFF',
    alignItems: 'center',
    gap: 10,
    height: '100%',
    
  },
  title: {
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: '600',
    color: '#365486',
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 40
  },
  eventTimeContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: DEVICE_WIDTH - 40,
  },
  categoryMainContainer: {
    height: 100,
    // padding: 10
  },
  categoryContainer: {
    height: 60,
    padding: 5,
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center'
  },
  categoryItemContainer: {
    backgroundColor: '#CBE8EF',
    height: 44,
    marginHorizontal: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  categoryItem: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 10,
    alignSelf: 'center',
    textTransform: 'capitalize',
    marginLeft: 4
  },
  newEventForm: {
    backgroundColor: '#FDFEFF',
    alignItems: 'center',
    height: '100%',
    gap: 10
  }
})