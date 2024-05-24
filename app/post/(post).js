import { StyleSheet, Dimensions, View, ScrollView, BackHandler, Alert } from 'react-native'
import { useState, useRef, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import NewPostForm from '../../components/post/NewPostForm'
import PostAssetsForm from '../../components/post/PostAssetsForm'
import { useNavigation } from 'expo-router'
import { usePostStore } from '../../hooks/stores/usePostStore'

const DEVICE_WIDTH = Dimensions.get('window').width

export default function post() {

  const [slideIndex, setSlideIndex] = useState(0)
  const scrollViewRef = useRef(null)

  const { setInitialState } = usePostStore()

  const scrollToScreen = (index) => {
    const nextPageOffset = index * DEVICE_WIDTH
    scrollViewRef.current.scrollTo({ x: nextPageOffset, animated: true })
    setSlideIndex(index)
  }

  const SLIDES = [1, 2]

  const navigation = useNavigation();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      // Handle back button press here
      Alert.alert('Now, hold on a sec!', 'Are you sure you want to go back?', [
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

  const CurrentSlideIndicator = () => {
    return (
      <View style={[styles.indicatorContainer, slideIndex === 2 && { backgroundColor: 'black' }]}>
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
    <SafeAreaView
      style={
        [
          { backgroundColor: '#fff' },
          slideIndex === 2 && { backgroundColor: 'black', flex: 1 }
        ]
      }
    >
      <CurrentSlideIndicator />
      <ScrollView
        style={{ height: '100%' }}
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
        <View key={0} style={[styles.slideContainer]}>
          <NewPostForm scrollToScreen={scrollToScreen} />
        </View>
        <View
          key={1}
          style={[
            styles.slideContainer,
            slideIndex === 1 && { backgroundColor: 'black' }
          ]}
        >
          <PostAssetsForm scrollToScreen={scrollToScreen} />
        </View>
      </ScrollView>
    </SafeAreaView>
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