import { StatusBar } from 'expo-status-bar'
import { FlatList, SectionList, StyleSheet, Text, View, ScrollView} from 'react-native'
import SectionTitle from '../../components/SectionTitle';
import EventItems from '../../components/home/EventItems'
import FeaturedItems from '../../components/home/FeaturedItems'
import Events from '../../components/Events'
import News from '../../components/News'

export default function Home() {
  
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

  return (
    <ScrollView style={{ backgroundColor: '#EBEEF3',  }}>
      <SectionTitle title={'Events Happening in School'} action={() => {}}/>
      <Events />
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
      <News/>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    // backgroundColor: '#EBEEF3',
    alignContent: 'center',
    marginBottom: 10,
  },
  main: {
    paddingBottom: 10,
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
