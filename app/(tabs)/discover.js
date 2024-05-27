import { View, FlatList, Dimensions, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import Search from '../../components/Search'
import { SafeAreaView } from 'react-native-safe-area-context'
import DiscoverItems from '../../components/discover/DiscoverItems'
import { useDiscover } from '../../hooks/queries/useClub'

const DEVICE_WIDTH = Dimensions.get('window').width

export default function Discover() {
  
  const [search, setSearch] = useState('')

  const { data, isPending } = useDiscover(search)

  if (isPending) return (
    <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator size={50} color='tomato'/>
    </SafeAreaView>
  )

  return (
    <SafeAreaView style={{flex: 1, paddingBottom: 70}}>
      <FlatList
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll
        style={{ width: DEVICE_WIDTH, paddingHorizontal: 3, }}
        numColumns={2}
        initialNumToRender={30}
        data={data?.data?.discover || []}
        keyExtractor={(_item, index) => index}
        ItemSeparatorComponent={<View style={{margin: 0}} />} 
        renderItem={({ item }) => <DiscoverItems discover={item} />}
        contentContainerStyle={{ paddingBottom: 80, paddingTop: 10, rowGap:2 }}
        columnWrapperStyle={{columnGap: 3}}
        ListHeaderComponentStyle={{marginBottom: 20}}
        ListHeaderComponent={
          <Search
            value={search}
            setValue={setSearch}
            placeholder={'Search clubs and activities'}
          />
        }
      />
    </SafeAreaView>
  )
}