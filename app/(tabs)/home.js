import { View, Animated, StatusBar, ScrollView, StyleSheet } from 'react-native'
import { useAnimationStore } from '../../hooks/stores/useAnimationStore'
import AddEventButton from '../../components/AddEventButton'
import { useFeeds } from '../../hooks/queries/useFeed'
import { FlashList } from "@shopify/flash-list"
import FeedSkeleton from '../../components/FeedSkeleton'
import FeedItem from '../../components/home/FeedItem'
import { getStatusBarHeight } from '../../utils/methods'
import FeaturedClubs from '../../components/home/FeaturedClubs'
import { useFeaturedClubs } from '../../hooks/queries/useClub'
import SectionTitle from '../../components/SectionTitle'
import AsyncStorage from '@react-native-async-storage/async-storage'

let User

AsyncStorage.getItem('user').then(userString => {
  if (userString) User = JSON.parse(userString)
}).catch(error => console.log(error))

export default function home() {
  
  const { data, isPending } = useFeeds()
  const { data: featuredClubs } = useFeaturedClubs()
  
  const { translateY } = useAnimationStore()

  if (isPending) return <ScrollView><FeedSkeleton loading /></ScrollView>

  return (
    <Animated.View style={{ flex: 1 }}>
      <StatusBar backgroundColor={'#EBEEF3'} barStyle="dark-content"/>
      { User?.club && <AddEventButton /> }
      <FlashList
        data={data?.data?.feeds}
        ListHeaderComponentStyle={styles.listHeaderComponentStyle}
        ListEmptyComponent={<FeedSkeleton />}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        ListFooterComponent={<Footer />}
        renderItem={({item}) => <FeedItem item={item} />}
        estimatedItemSize={50}
        ListHeaderComponent={
          <>
            <SectionTitle title={'Featured Clubs'} />
            <FeaturedClubs clubs={featuredClubs?.data?.featuredClubs} />
            <SectionTitle title={'News and Announcements'} />
          </>
        }
        onScroll={(e) => {
          translateY.setValue(e.nativeEvent.contentOffset.y)
        }}
      />
    </Animated.View>
  )
}

const Footer = () => {
  return (
    <View style={{ height: 200, justifyContent: 'center' }}>
      <View
        style={{
          width: 10,
          height: 10,
          borderRadius: 20,
          backgroundColor: 'black',
          alignSelf: 'center'
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  listHeaderComponentStyle: {
    marginBottom: 20,
    marginTop: 80 + getStatusBarHeight()
  }
})