import { View, Text, ScrollView, FlatList } from 'react-native'
import React, { useState } from 'react'
import Search from '../../components/Search'
import { SafeAreaView } from 'react-native-safe-area-context'
import DiscoverItems from '../../components/discover/DiscoverItems'

export default function Discover() {
  
  const [searchValue, setSearchValue] = useState('')

  const featuredClubs = [
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

  return (
    <SafeAreaView style={{flex: 1, paddingBottom: 70}}>
      <FlatList
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll
        style={{ }}
        numColumns={2}
        data={featuredClubs}
        keyExtractor={(_item, index) => index}
        ItemSeparatorComponent={<View style={{margin: 5}} />} 
        renderItem={({ item }) => <DiscoverItems item={item} />}
        contentContainerStyle={{ paddingBottom: 80, paddingTop: 10 }}
        ListHeaderComponentStyle={{marginBottom: 20}}
        ListHeaderComponent={
          <Search
            value={searchValue}
            setValue={setSearchValue}
            placeholder={'Search clubs and activities'}
          />
        }
      />
    </SafeAreaView>
  )
}