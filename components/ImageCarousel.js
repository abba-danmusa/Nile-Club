import Carousel, {Pagination} from 'react-native-snap-carousel-new'
import { useRef, useState } from 'react'
import { View, Text, Dimensions } from 'react-native'

const DEVICE_WIDTH = Dimensions.get('window').width

export default function ImageCarousel({
  images = [],
  renderItem = () => { },
  layout = 'stack',
  itemWidth = 300,
  renderEmptyItem
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
        itemHeight={500}
        layoutCardOffset={100}
        renderItem={renderItem}
        keyExtractor={(item, index) => item._id}
        onSnapToItem={index => setActiveSlide(index)}
        swipeThreshold={30}
        containerCustomStyle={{
          height: 450,
          borderBottomColor: 'grey',
          borderBottomWidth: 1
        }}
      />
      {
        images.length > 0 && (
          <Pagination
            dotsLength={images.length}
            activeDotIndex={activeSlide}
            dotStyle={{ backgroundColor: 'grey' }}
            containerStyle={{maxHeight: 65}}
          />
        )
      }
    </>
  )
}