import { View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Search from '../../components/Search'
import { SafeAreaView } from 'react-native-safe-area-context'
import ChatAvatar from '../../components/chats/ChatAvatar'
import { useChats } from '../../hooks/queries/useChat'
import { Skeleton } from '@rneui/base'
import { QueryCache } from '@tanstack/react-query'
import toast from '../../utils/toast'
import { socket } from '../../socket.io/socket'

export default function Discover() {
  
  const [searchValue, setSearchValue] = useState('')
  const { data, isPending, refetch } = useChats()

  const queryCache = new QueryCache({
    // onError: error => toast(error.message)
  })

  // const query = queryCache.find(['chats'])
  socket.on('incoming chat', (message) => {
    // console.log(message)
    // queryCache.setQueryData(['chats'], (oldData) => {
    //   const newData = [...oldData.data.chats, message]
    //   return {...oldData, data: {...oldData.data, chats: newData } }
    // })
  })

  React.useEffect(() => {
    refetch()
  }, [])

  return (
    <SafeAreaView>
      <ScrollView style={{}}>
        <Search
          placeholder={'Search...'}
          value={searchValue}
          setValue={setSearchValue}
          showLoading={false}
        />
        <View style={{ marginTop: 20 }} />
        {
          isPending ? [1, 2, 4, 5, 6, 7, 8, 9, 10]
            .map((_i, index) => <Skeleton animation='wave' height={10} key={index}/>)
          :
            data?.data?.chats?.map((club, index) => 
              <ChatAvatar key={index} club={club}/>
            )
        }
      </ScrollView>
    </SafeAreaView>
  )
}