import { View, FlatList, Dimensions, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import Search from '../../components/Search'
import { SafeAreaView } from 'react-native-safe-area-context'
import DiscoverItems from '../../components/discover/DiscoverItems'
import { useDiscover, useDiscoverSearch } from '../../hooks/queries/useClub'
import useDebounce from '../../hooks/queries/useDebounce'
import { Divider } from '@rneui/base'

const DEVICE_WIDTH = Dimensions.get('window').width

export default function Discover() {
  
  const [search, setSearch] = useState('')
  const debouncedSearchTerm = useDebounce(search, 1000)

  const { data, isPending } = useDiscover()
  const {
    data: searchData,
    isPending: isPendingSearch
  } = useDiscoverSearch(debouncedSearchTerm)

  const queryData = searchData?.data?.discover || []
  console.log(queryData)

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
          <>
            <Search
              value={search}
              setValue={setSearch}
              placeholder={'Search clubs and activities'}
            />
            <View style={[{
              width: DEVICE_WIDTH,
              paddingHorizontal: 3,
              gap: 2,
              flexDirection: 'row',
            }, queryData.length > 0 && {marginBottom: 50}]}>
              {
                queryData.map((item, index) => (
                  <DiscoverItems discover={item} key={index} />
                ))
              }
            </View>
            {queryData.length > 0 && <Divider/>}
          </>
        }
      />
    </SafeAreaView>
  )
}