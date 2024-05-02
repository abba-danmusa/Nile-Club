// import Carousel, {Pagination} from 'react-native-snap-carousel-new'
// import { useRef, useState } from 'react'
// import { View, Text, Dimensions } from 'react-native'

// const DEVICE_WIDTH = Dimensions.get('window').width

// export default function ImageCarousel({
//   images = [],
//   renderItem = () => { },
//   layout = 'stack',
//   itemWidth = 300,
//   itemHeight = 1000,
//   backgroundColor = undefined
// }) {

//   const carouselRef = useRef(null)
//   const [activeSlide, setActiveSlide] = useState(0)

//   return (
//     <View>
//       <Carousel
//         layout={layout}
//         ref={carouselRef}
//         data={images}
//         sliderWidth={DEVICE_WIDTH}
//         itemWidth={itemWidth}
//         itemHeight={itemHeight}
//         layoutCardOffset={100}
//         renderItem={renderItem}
//         keyExtractor={(_item, index) => index}
//         onSnapToItem={index => setActiveSlide(index)}
//         swipeThreshold={10}
//         containerCustomStyle={{
//           borderBottomColor: 'black',
//           backgroundColor,
//           zIndex: 1000
//         }}
//       />
//       {
//         images.length > 0 && (
//           <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
//             <Pagination
//               dotsLength={images.length}
//               activeDotIndex={activeSlide}
//               dotStyle={{ width: 10, height: 10, }}
//               containerStyle={{ height: 10, backgroundColor: 'transparent', zIndex: 10000 }}
//               dotContainerStyle={{ width: 10, height: 10, borderRadius: 100 }}
//               inactiveDotColor='white'
//               dotColor='grey'
//               carouselRef={carouselRef}
//               tappableDots
//             />
//           </View>
//         )
//       }
//     </View>
//   )
// }

import React from 'react';
import { View, FlatList, Image, Dimensions } from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;

const renderItem = ({ item }) => {
  console.log(item)
  // Render images or videos based on item type
  if (item.type === 'image') {
    return (
      <Image
        source={{ uri: item.secure_url }}
        style={{ width: DEVICE_WIDTH, height: 300 }} // Adjust height as needed
        resizeMode="cover"
      />
    );
  } else if (item.type === 'video') {
    // Render video component
    // You can use any video component here, e.g., Video component from Expo AV
    return null;
  }
};

const ImageGallery = ({ data }) => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default ImageGallery