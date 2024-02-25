import { StatusBar } from 'expo-status-bar'
import { FlatList, SectionList, StyleSheet, Text, View, ScrollView} from 'react-native'
import SectionTitle from '../../components/SectionTitle';
import EventItems from '../../components/home/EventItems'
import FeaturedItems from '../../components/home/FeaturedItems'
import NewsAnnouncement from '../../components/home/NewsAnnouncement'

export default function Home() {
  
  const DATA = [
    {
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

  const FEATURED_CLUBS = [
    {
      image: require('../../assets/home/model-un-club.png'),
      name: 'Model UN Club',
      description: 'Model UN is a club that mimics the United Nations Conferences in New York.',
      ratings: '5.0',
    },
    {
      image: require('../../assets/home/model-un-club.png'),
      name: 'Model UN Club',
      description: 'Model UN is a club that mimics the United Nations Conferences in New York.',
      ratings: '3.9',
    },
    {
      image: require('../../assets/home/model-un-club.png'),
      name: 'Model UN Club',
      description: 'Model UN is a club that mimics the United Nations Conferences in New York.',
      ratings: '4.5',
    },
    {
      image: require('../../assets/home/model-un-club.png'),
      name: 'Model UN Club',
      description: 'Model UN is a club that mimics the United Nations Conferences in New York.',
      ratings: '2.9',
    }
  ]

  const NEWS_ANNOUNCEMENTS = [
    {
      image: require('../../assets/home/model-un-club-1.png'),
      title: 'Model UN Club',
      description: 'Model UN announces a new president and new cabinet members for the model UN secretariat. The new appointees will be announced in our upcoming orientation',
    },
    {
      image: require('../../assets/home/photography-club.png'),
      title: 'Model UN Club',
      description: 'Model UN announces a new president and new cabinet members for the model UN secretariat. The new appointees will be announced in our upcoming orientation',
    },
    {
      image: require('../../assets/home/model-un-club-1.png'),
      title: 'Model UN Club',
      description: 'Model UN announces a new president and new cabinet members for the model UN secretariat. The new appointees will be announced in our upcoming orientation',
    },
    {
      image: require('../../assets/home/photography-club.png'),
      title: 'Model UN Club',
      description: 'Model UN announces a new president and new cabinet members for the model UN secretariat. The new appointees will be announced in our upcoming orientation',
    }
  ]

  return (
    <ScrollView style={{ backgroundColor: '#EBEEF3',  }}>
      <SectionTitle title={'Events Happening in School'} action={() => {}}/>
      <FlatList
        showsHorizontalScrollIndicator={false}
        containerStyle={styles.mainContainer}
        style={styles.main}
        data={DATA}
        horizontal
        keyExtractor={item => item.name}
        renderItem={({ item }) => <EventItems item={item}/>}
      />
      <SectionTitle title={'Featured Clubs'} action={() => { }} />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        containerStyle={styles.mainContainer}
        style={styles.main}
        data={FEATURED_CLUBS}
        keyExtractor={(_, index) => index}
        renderItem={({ item }) => <FeaturedItems item={item} /> }
      />
      <SectionTitle title={'News and Announcement'} action={() => { }} />
      <FlatList
        // containerStyle={styles.mainContainer}
        style={styles.main}
        data={NEWS_ANNOUNCEMENTS}
        keyExtractor={(_, index) => index}
        renderItem={({ item }) => <NewsAnnouncement item={item} /> } 
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    // backgroundColor: '#EBEEF3',
    // paddingHorizontal: 50,
    alignContent: 'center',
    marginBottom: 10,
  },
  main: {
    // paddingBottom: 10,
    // backgroundColor: 'red',
    maxWidth: 'fit-content',
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
})
