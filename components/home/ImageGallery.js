import React, { useRef, useState } from 'react'
import { View, Dimensions, StyleSheet, ScrollView } from 'react-native'
import { Image } from 'expo-image'
import VideoPlayer from '../VideoPlayer'

const DEVICE_WIDTH = Dimensions.get('window').width

const ImageGallery = ({ images }) => {
  const scrollViewRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / DEVICE_WIDTH);
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        contentContainerStyle={{ alignItems: 'center', backgroundColor: 'black'}}
        style={{ 
          borderTopWidth: .5,
          borderBottomWidth: .5,
          borderColor: 'grey'
        }}
        showsHorizontalScrollIndicator={false}
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {images.map((image, index) => {
          // Calculate the aspect ratio of the image
          const aspectRatio = image.height / image.width
          const imageHeight = DEVICE_WIDTH * aspectRatio
          if (image.resource_type === 'image') {
            return (
              <Image
                key={index}
                source={ image.secure_url }
                style={[styles.image, { width: DEVICE_WIDTH, height: imageHeight }]}
                contentFit="cover"
              />
            )
          } else if (image.resource_type === 'video') {
            return (
              <VideoPlayer
                uri={item?.secure_url}
                height={imageHeight}
                width={'100%'}
                // backgroundColor='black'
              />
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: DEVICE_WIDTH,
    // height: '100%',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
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
    backgroundColor: 'tomato',
  },
})

export default ImageGallery