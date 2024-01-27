import React, { useState } from 'react'
import { StyleSheet, Text, View, ScrollView, Dimensions} from 'react-native'

const SCREEN_WIDTH = Dimensions.get('window').width

const Slides = ({ renderSlide, renderSlides, data, scrollEnabled = true}) => {

  const [slideIndex, setSlideIndex] = useState(0)

  const CurrentSlideIndicator = () => {
    return (
      <View style={styles.indicatorContainer}>
        {
          data && data.map((slide, index) =>
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

  const renderDifferentSlides = () => {
    return data.map((slide, index) => {
      return (
        <View
          key={index}
          style={styles.slideContainer}
        >
          {slide.renderSlide()}
        </View>
      )
    })
  }

  return (
    <>
      { CurrentSlideIndicator() }
      
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        style={{ flex: 1 }}
        scrollEnabled={scrollEnabled}
        onScroll={({ nativeEvent }) => {
          const offsetX = nativeEvent.contentOffset.x
          const index = Math.floor(offsetX / SCREEN_WIDTH)
          setSlideIndex(index)
        }}
      >
        {renderSlide && renderSlide()}
        {renderSlides && renderDifferentSlides()}
      </ScrollView>
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
    flex: 1,
    width: SCREEN_WIDTH,
    height: '100%',
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center'
  },
})

export default Slides