import { View, FlatList, Animated, StatusBar } from 'react-native'
import SectionTitle from '../../components/SectionTitle'
import EventItems from '../../components/home/EventItems'
import FeaturedItems from '../../components/home/FeaturedItems'
import NewsAnnouncement from '../../components/home/NewsAnnouncement'
import { useAnimationStore } from '../../hooks/stores/useAnimationStore'
import AddEventButton from '../../components/AddEventButton'
import { useFeeds } from '../../hooks/queries/useFeed'

export default function home() {
  
  const { data: feeds, isSuccess } = useFeeds()
  
  const SECTIONS = [
    {
      title: 'Events Happening in School',
      horizontal: true,
      renderItems: data => <FlatList
        horizontal
        data={data}
        renderItem={({ item }) => <EventItems item={item} />}
        showsHorizontalScrollIndicator={false}
      />,
      data: [
        {
          _id: '24242',
          name: 'Drama Club',
          image: require('../../assets/home/drama-club.png'),
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
          members: [
            {
              image: require('../../assets/home/club-member-1.png'),
            },
            {
              image: require('../../assets/home/club-member-2.png'),
            },
            {
              image: require('../../assets/home/club-member-3.png'),
            }
          ]
        },
        {
          _id: '2424256',
          name: 'Model UN Club',
          image: require('../../assets/home/model-un-club.png'),
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
          members: [
            {
              image: require('../../assets/home/club-member-1.png'),
            },
            {
              image: require('../../assets/home/club-member-2.png'),
            },
            {
              image: require('../../assets/home/club-member-3.png'),
            }
          ]
        },
        {
          _id: '36373333',
          name: 'Music Club',
          image: require('../../assets/home/drama-club.png'),
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
          members: [
            {
              image: require('../../assets/home/club-member-1.png'),
            },
            {
              image: require('../../assets/home/club-member-2.png'),
            },
            {
              image: require('../../assets/home/club-member-3.png'),
            }
          ]
        },
        {
          _id: '868453',
          name: 'Social Club',
          image: require('../../assets/home/drama-club.png'),
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
          members: [
            {
              image: require('../../assets/home/club-member-1.png'),
            },
            {
              image: require('../../assets/home/club-member-2.png'),
            },
            {
              image: require('../../assets/home/club-member-3.png'),
            }
          ]
        }
      ]
    },
    {
      title: 'Featured Clubs',
      horizontal: true,
      renderItems: data => <FlatList
        horizontal
        data={data}
        renderItem={({ item }) => <FeaturedItems item={item} />}
        showsHorizontalScrollIndicator={false}
      />,
      data: [
        {
          _id: '42425',
          image: require('../../assets/home/model-un-club.png'),
          name: 'Model UN Club',
          description: 'Model UN is a club that mimics the United Nations Conferences in New York.',
          ratings: '5.0',
        },
        {
          _id: '42425351414',
          image: require('../../assets/home/model-un-club.png'),
          name: 'Model UN Club',
          description: 'Model UN is a club that mimics the United Nations Conferences in New York.',
          ratings: '3.9',
        },
        {
          _id: '4242535342',
          image: require('../../assets/home/model-un-club.png'),
          name: 'Model UN Club',
          description: 'Model UN is a club that mimics the United Nations Conferences in New York.',
          ratings: '4.5',
        },
        {
          _id: '424253534',
          image: require('../../assets/home/model-un-club.png'),
          name: 'Model UN Club',
          description: 'Model UN is a club that mimics the United Nations Conferences in New York.',
          ratings: '2.9',
        }
      ]
    },
    {
      title: 'News and Announcement',
      horizontal: false,
      renderItems: data => <FlatList
        data={data}
        renderItem={({ item }) => <NewsAnnouncement item={item} />}
        showsHorizontalScrollIndicator={false}
      />,
      // data: [feeds?.data]
      data: [
        {
          _id: '12425',
          image: require('../../assets/home/model-un-club-1.png'),
          name: 'Model UN Club',
          description: 'Model UN announces a new president and new cabinet members for the model UN secretariat. The new appointees will be announced in our upcoming orientation',
        },
        {
          _id: '14235',
          image: require('../../assets/home/photography-club.png'),
          name: 'Photography Club',
          description: 'Model UN announces a new president and new cabinet members for the model UN secretariat. The new appointees will be announced in our upcoming orientation',
        },
        {
          _id: '24235',
          image: require('../../assets/home/model-un-club-1.png'),
          name: 'Model UN Club',
          description: 'Model UN announces a new president and new cabinet members for the model UN secretariat. The new appointees will be announced in our upcoming orientation',
        },
        {
          _id: '14231',
          image: require('../../assets/home/photography-club.png'),
          name: 'Photography Club',
          description: 'Model UN announces a new president and new cabinet members for the model UN secretariat. The new appointees will be announced in our upcoming orientation',
        }
      ]
    }
  ]

  const { translateY } = useAnimationStore()

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={'#EBEEF3'} barStyle="dark-content" />
      <AddEventButton/>
      <Animated.SectionList
        scrollEventThrottle={16}
        sections={SECTIONS}
        alwaysBounceHorizontal
        alwaysBounceVertical
        bounces
        keyExtractor={({ _id }) => _id}
        SectionListHeader={() => <View style={{ height: 150 }} />}
        ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
        ListFooterComponent={() => <View style={{ height: 150 }} />}
        style={{paddingTop: 100}}
        onScroll={(e) => {
          translateY.setValue(e.nativeEvent.contentOffset.y)
        }}
        renderSectionHeader={({ section }) =>
          <>
            <SectionTitle key={section.title} title={section.title} />
            {section.renderItems(section.data)}
          </>
        }
        renderItem={({ item, section }) => {
          if (!section.horizontal) {
            section.renderItems(section.data)
          }
        }}
      />
    </View>
  )
}