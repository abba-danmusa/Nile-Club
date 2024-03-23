import Carousel, {Pagination} from 'react-native-snap-carousel-new'
import { useRef, useState } from 'react'
import { View, Text, Dimensions } from 'react-native'

const DEVICE_WIDTH = Dimensions.get('window').width

export default function ImageCarousel({
  images = [],
  renderItem = () => { },
  renderEmptyItem
}) {

  const carouselRef = useRef(null)
  const [activeSlide, setActiveSlide] = useState(0)

  return (
    <>
      <Carousel
        layout={"stack"}
        ref={carouselRef}
        data={images}
        sliderWidth={DEVICE_WIDTH}
        itemWidth={300}
        // itemHeight={250}
        layoutCardOffset={9}
        renderItem={renderItem}
        onSnapToItem={index => setActiveSlide(index)}
      />
      <Pagination
        dotsLength={images.length}
        activeDotIndex={activeSlide}
        dotStyle={{backgroundColor: 'grey'}}
      />
    </>
  )
}