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
import { useUser } from '../../hooks/queries/useAuthentication'
import { useChats } from '../../hooks/queries/useChat'

export default function home() {
  
  const { data, isPending } = useFeeds()
  const { data: featuredClubs } = useFeaturedClubs()
  const { data: User} = useUser()
  useChats()

  const { translateY } = useAnimationStore()

  if (isPending) return <ScrollView><FeedSkeleton loading /></ScrollView>

  return (
    <Animated.View style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar backgroundColor={'#EBEEF3'} barStyle="dark-content"/>
      { User?.data?.user?.club && !User?.data?.user.admin && <AddEventButton /> }
      <FlashList
        data={data?.data?.feeds}
        ListHeaderComponentStyle={styles.listHeaderComponentStyle}
        ListEmptyComponent={<FeedSkeleton />}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListFooterComponent={<Footer />}
        renderItem={({item}) => <FeedItem item={item} />}
        estimatedItemSize={data?.data?.length || 50}
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
          width: 5,
          height:5,
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