import Carousel, {Pagination} from 'react-native-snap-carousel-new'
import { useRef, useState } from 'react'
import { View, Text, Dimensions } from 'react-native'

const DEVICE_WIDTH = Dimensions.get('window').width

export default function ImageCarousel({
  images = [],
  renderItem = () => { },
  layout = 'stack',
  itemWidth = 300,
}) {

  const carouselRef = useRef(null)
  const [activeSlide, setActiveSlide] = useState(0)

  return (
    <>
      <Carousel
        layout={layout}
        ref={carouselRef}
        data={images}
        sliderWidth={DEVICE_WIDTH}
        itemWidth={itemWidth}
        itemHeight={1000}
        layoutCardOffset={100}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
        onSnapToItem={index => setActiveSlide(index)}
        swipeThreshold={30}
        containerCustomStyle={{
          // height: 450,
          borderBottomColor: 'red',
          zIndex: 1000
          // borderBottomWidth: 1
        }}
      />
      {
        images.length > 0 && (
          <Pagination
            dotsLength={images.length}
            activeDotIndex={activeSlide}
            dotStyle={{ backgroundColor: 'grey' }}
            containerStyle={{ maxHeight: 65 }}
          />
        )
      }
    </>
  )
}