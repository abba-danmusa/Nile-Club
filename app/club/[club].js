import { Image } from 'expo-image'
import { useState, useRef } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, SectionList, FlatList, ScrollView, StatusBar, Modal, Button } from 'react-native'
import Avatar from '../../components/Avatar'
import { SHADOW } from '../../utils/styles'
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'
import CustomizedButton from '../../components/CustomizedButton'
import { Divider, Skeleton } from '@rneui/themed'
import SectionTitle from '../../components/SectionTitle'
import FeaturedItems from '../../components/home/FeaturedItems'
import NewsAnnouncement from '../../components/home/NewsAnnouncement'
import { useLocalSearchParams } from 'expo-router'
import { useClub, useClubFeeds, useComments, useFeaturedClubs, useSetFollowClub, useFollowingClub, useReviewClub } from '../../hooks/queries/useClub'
import { NativeViewGestureHandler } from 'react-native-gesture-handler'
import CommentSheet from '../../components/club/CommentSheet'
import { AirbnbRating } from '@rneui/base'
import toast from '../../utils/toast'

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj['

export default function club() {
  
  const { club: clubId } = useLocalSearchParams()
  const { data, isPending } = useClub(clubId)
  const { data: featuredClubs } = useFeaturedClubs()
  const { data: clubFeeds } = useClubFeeds(clubId)

  const { refetch: refetchComments } = useComments(clubId)

  const bottomSheetRef = useRef(null)

  if (isPending) {
    return <>
      <StatusBar hidden/>
      <LoadingState />
    </>
  }

  const handleOpenComments = () => {
    bottomSheetRef.current.snapToIndex(1)
    refetchComments()
  }

  const SECTIONS = [
    {
      title: 'Featured Clubs',
      horizontal: true,
      renderItems: data => <FlatList
        horizontal
        data={data}
        renderItem={({ item }) => <FeaturedItems club={item} />}
        showsHorizontalScrollIndicator={false}
      />,
      data: featuredClubs?.data?.featuredClubs || []
    },
    {
      title: 'News and Announcement',
      horizontal: false,
      renderItems: data => <FlatList
        data={data}
        renderItem={({ item }) => <NewsAnnouncement item={item} />}
        showsHorizontalScrollIndicator={false}
      />,
      data: clubFeeds?.data?.feeds || []
    }
  ]

  return (
    <NativeViewGestureHandler>
      <View style={styles.container}>
        <StatusBar hidden/>
        <SectionList
          sections={SECTIONS}
          keyExtractor={({ _id }) => _id}
          ListFooterComponent={() => <View style={{ height: 150 }} />}
          ListHeaderComponent={() =>
            <ListHeaderComponent club={data?.data?.club} onPressComment={handleOpenComments} />
          }
          renderSectionHeader={({ section }) =>
            <>
              <SectionTitle key={section.title} title={section.title} />
              {section.renderItems(section?.data)}
            </>
          }
          renderItem={({ item, section }) => {
            if (!section.horizontal) {
              section.renderItems(section?.data)
            }
          }}
        />
        <CommentSheet bottomSheetRef={bottomSheetRef} clubId={clubId} />
      </View>
    </NativeViewGestureHandler>
  )
}

const LoadingState = () => {
  return (
    <ScrollView style={{ flex: 1 }}>
      <View
        style={[
          styles.hero, { position: 'relative', marginBottom: 20 }
        ]}
      >
        <Skeleton height={330}
          style={[styles.hero, {
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20
          }]}
        />
      </View>
      <View>
        <Skeleton
          height={70}
          width={70}
          circle
          animation='wave'
          style={[styles.avatar, { bottom: 0 }]}
        />
      </View>
      <View style={[styles.headerContainer, { marginVertical: 20 }]}>
        <View style={styles.headerLeft}>
          <Skeleton width={150} height={20} animation='wave' />
        </View>
        <View style={styles.headerRight}>
          <Skeleton height={30} width={40} circle animation='wave' />
          <Skeleton height={30} width={60} circle animation='wave' />
        </View>
      </View>
      <View style={[styles.descriptionContainer, { gap: 5, marginBottom: 50 }]}>
        {
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_item, index) => (
            <Skeleton width={'100%'} animation='wave' key={index} />
          ))
        }
      </View>
      <Divider color='#58719B' />
      <View style={{ marginBottom: 10 }} />
      <View style={[styles.statsContainer, {}]}>
        <View style={[styles.statContainer, { marginBottom: 10 }]}>
          <Skeleton width={70} height={70} circle animation='wave' />
        </View>
        <View style={[styles.statContainer, { marginBottom: 10 }]}>
          <Skeleton width={70} height={70} circle animation='wave' />
        </View>
        <View style={[styles.statContainer, { marginBottom: 10 }]}>
          <Skeleton width={70} height={70} circle animation='wave' />
        </View>
      </View>
      <View style={{ marginBottom: 25 }} />
      <Divider color='#58719B' />
    </ScrollView>
  )
}

const ListHeaderComponent = ({club, onPressComment}) => {
  return (
    <>
      <Hero club={club} />
      <Header club={club} onPressComment={ onPressComment } />
      <Ratings club={club} />
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>{ club?.description }</Text>
      </View>
      <Divider color='#58719B' />
      <Stats club={ club } />
      <Divider color='#58719B' />
      <Text style={styles.sectionTitle}>Our Executives</Text>
      <View style={styles.executiveContainer}>
        {
          club?.executives?.map((executive, index) => (
            <Executive
              key={index}
              name={`${executive?.user?.firstName} ${executive?.user?.lastName}`
              }
              image={
                executive?.user?.asset?.secure_url ||
                'https://i.pravatar.cc/300?img=1'
              }
              position={executive?.role}
            />
          ))
        }
      </View>
    </>
  )
}

const Hero = ({ club }) => {
  return (
    <View>
      <Image
        source={club?.assets?.banner?.secure_url}
        placeholder={blurhash}
        style={styles.image}
      />
      <View style={styles.avatar}>
        <Avatar image={club?.assets?.image?.secure_url} />
      </View>
    </View>
  )
}

const Header = ({ club, onPressComment = () => {} }) => {
  
  const { mutate: setFollowClub } = useSetFollowClub()
  const { data } = useFollowingClub(club?._id)
  
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerLeft}>
        <Text style={styles.title}>{ club?.name }</Text>
      </View>
      <View style={styles.headerRight}>
        <TouchableOpacity style={styles.icon} onPress={onPressComment}>
          <MaterialCommunityIcons name="chat" size={24} color="#fff" />
        </TouchableOpacity>
        <CustomizedButton
          title={data?.data?.following ? 'MEMBER' : 'Join the Club'}
          height={35}
          lineHeight={16}
          width={90}
          alignSelf=''
          justifyContent=''
          handlePress={() => setFollowClub({ clubId: club?._id }) }
        />
      </View>
    </View>
  )
}

const Ratings = (club) => {
  const clubId = club?.club?._id
  const rating = club?.club?.ratings
  const [modalVisible, setModalVisible] = useState(false)
  const [ratingValue, setRatingValue] = useState(rating || 5)
  const { mutate: createView } = useReviewClub(clubId)

  const handleSubmit = () => {
    createView({review: ratingValue, clubId})
    setModalVisible(false)
  }

  return (
    <TouchableOpacity
      style={styles.ratings}
      onPress={() => {
        if (!club?.club?.follows) {
          toast('Please join the club to rate it')
          return
        }
        setModalVisible(true)
      }}
    >
      <AirbnbRating
        count={6}
        size={15}
        showRating={false}
        isDisabled={true}
        defaultRating={ratingValue}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{
                position: 'absolute',
                right: 10,
                top: 10,
                padding: 5,
              }}
            >
              <AntDesign name="close" size={20} color="tomato" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Rate us!!!</Text>
            <AirbnbRating
              count={6}
              defaultRating={ratingValue}
              onFinishRating={number => setRatingValue(number)}
              starContainerStyle={{ alignSelf: 'center', marginBottom: 20 }}
              reviews={
                ['Terrible', 'Bad', 'Meh!', 'OK!', 'Good!!', 'Superb!!!']
              }
            />
            <Button title="Confirm" onPress={handleSubmit} />
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  )
}

const Stats = ({club}) => {
  return (
    <View style={styles.statsContainer}>
      <View style={[styles.membersContainer, styles.statContainer]}>
        <Text style={styles.statTitle}>{ club?.members?.length }</Text>
        <Text style={styles.statDescription}>Members</Text>
      </View>
      <View style={[styles.postsContainer, styles.statContainer]}>
        <Text style={styles.statTitle}>{ club?.posts?.length || 0 }</Text>
        <Text style={styles.statDescription}>Posts</Text>
      </View>
      <View style={[styles.eventsContainer, styles.statContainer]}>
        <Text style={styles.statTitle}>{ club?.events?.length }</Text>
        <Text style={styles.statDescription}>Events</Text>
      </View>
    </View>
  )
}

const Executive = ({ name, image, position }) => {
  return (
    <View style={styles.executive}>
      <Avatar width={78} height={78} borderWidth={0} image={image}/>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.position}>{position}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'scroll',
    marginTop: -20,
    backgroundColor: '#EBEEF3',
  },
  hero: {
    position: 'relative',
    height: 330,
    marginBottom: 20
  },
  image: {
    width: '100%',
    height: 298,
    contentFit: 'cover',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
    position: 'relative'
  },
  avatar: {
    position: 'absolute',
    bottom: -20,
    left: 10,
    ...SHADOW,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: 25,
  },
  headerLeft: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
    width: 200
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: 132,
    justifyContent: 'space-between'
  },
  icon: {
    backgroundColor: '#365486',
    width: 35,
    height: 35,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratings: {
    backgroundColor: '#CBE8EF',
    width: 127,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderRadius: 2,
    marginTop: 10,
    marginHorizontal: 10,
    ...SHADOW
  },
  stars: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  descriptionContainer: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  description: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '500',
  },
  statsContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 10,
    width: 248,
    height: 44,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  statContainer: {
    alignItems: 'center',
    height: 44,
    justifyContent: 'space-between',
  },
  statTitle: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '500',
  },
  statDescription: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '400',
  },
  executiveContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignSelf: 'center',
  },
  sectionTitle: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 10,
    marginLeft: 10
  },
  executive: {
    width: 120,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontFamily: 'Poppins',
    fontSize: 10,
    fontWeight: '900',
  },
  position: {
    fontFamily: 'Poppins',
    fontSize: 8,
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center'
  },
})