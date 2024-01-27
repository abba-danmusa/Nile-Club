import React, {useEffect} from 'react'
import { BlurView } from 'expo-blur'
import { View, Image, Easing, StyleSheet, Dimensions, Animated } from 'react-native'

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj['

const DEVICE_WIDTH = Dimensions.get('window').width

export default function Loader() {
  const spinValue = new Animated.Value(0)

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000, // Adjust the duration as needed
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start()
  }, [spinValue])

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  return (
    <BlurView
      intensity={0}
      style={styles.container}
    >
        <Animated.View
          // source={require('../assets/loading-spin.png')}
          style={[styles.image, { transform: [{ rotate: spin }] }]}
          // PlaceholderContent={blurhash}
        />
      {/* <View style={styles.imageContainer}>
      </View> */}
    </BlurView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: DEVICE_WIDTH,
    height: '100%',
    zIndex: 1000,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  imageContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#365486',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#365486',
  }
})