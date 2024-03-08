import React from 'react'
import {StyleSheet, FlatList} from 'react-native'
import EventItems from './home/EventItems'

const DATA = [
  {
    name: 'Drama Club',
    image: require('../assets/home/drama-club.png'),
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    members: [
      {
        image: require('../assets/home/club-member-1.png'),
      },
      {
        image: require('../assets/home/club-member-2.png'),
      },
      {
        image: require('../assets/home/club-member-3.png'),
      }
    ]
  },
  {
    name: 'Model UN Club',
    image: require('../assets/home/model-un-club.png'),
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    members: [
      {
        image: require('../assets/home/club-member-1.png'),
      },
      {
        image: require('../assets/home/club-member-2.png'),
      },
      {
        image: require('../assets/home/club-member-3.png'),
      }
    ]
  },
  {
    name: 'Music Club',
    image: require('../assets/home/drama-club.png'),
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    members: [
      {
        image: require('../assets/home/club-member-1.png'),
      },
      {
        image: require('../assets/home/club-member-2.png'),
      },
      {
        image: require('../assets/home/club-member-3.png'),
      }
    ]
  },
  {
    name: 'Social Club',
    image: require('../assets/home/drama-club.png'),
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    members: [
      {
        image: require('../assets/home/club-member-1.png'),
      },
      {
        image: require('../assets/home/club-member-2.png'),
      },
      {
        image: require('../assets/home/club-member-3.png'),
      }
    ]
  }
]

export default function Events({
  data = [...DATA],
}) {
  console.log(data[0])
  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      containerStyle={styles.mainContainer}
      style={styles.main}
      data={data}
      horizontal
      keyExtractor={item => item.name}
      renderItem={({ item }) => <EventItems item={item} />}
    />
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
})