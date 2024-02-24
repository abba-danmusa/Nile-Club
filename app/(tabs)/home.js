import { StatusBar } from 'expo-status-bar'
import { FlatList, SectionList, StyleSheet, Text, View } from 'react-native'
import SectionTitle from '../../components/SectionTitle';
import { SafeAreaView } from 'react-native-safe-area-context'
import EventItems from '../../components/home/EventItems'

export default function Home() {
  
  const DATA = [
    {
      name: 'Drama Club',
      image: require('../../assets/home/drama-club.png'),
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis',
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
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis',
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
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis',
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

  return (
    <View style={{backgroundColor: '#EBEEF3', marginTop: 0}}>
      <SectionTitle title={'Events Happening in School'} buttonTitle={'View All'} action={() => console.log('Clubs')} />
      <FlatList
        showsHorizontalScrollIndicator={false}
        containerStyle={styles.mainContainer}
        style={styles.main}
        data={DATA}
        horizontal
        keyExtractor={item => item.name}
        renderItem={({ item }) => <EventItems item={item}/>}
      />        
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    // backgroundColor: '#EBEEF3',
    paddingHorizontal: 50,
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
