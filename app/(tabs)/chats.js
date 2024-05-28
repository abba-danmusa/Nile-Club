import { View, ScrollView, ActivityIndicator, Text, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ChatAvatar from '../../components/chats/ChatAvatar'
import { useChats } from '../../hooks/queries/useChat'
import { useEffect } from 'react'
import { FlashList } from '@shopify/flash-list'

const DEVICE_HEIGHT = Dimensions.get('window').height

export default function Discover() {
  
  const { data, isPending, refetch } = useChats()

  useEffect(() => {
    refetch()
  }, [])

  return (
    <SafeAreaView>
      <ScrollView style={{}}>
        <View style={{ marginTop: 20 }} />
        {
          isPending ?
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size={50} color='tomato' />
            </View>
            :
            <FlashList
              data={data?.data?.chats || []}
              renderItem={({ item }) => <ChatAvatar club={item} />}
              keyExtractor={(_item, index) => index}
              estimatedItemSize={data?.data?.chats.length || 10}
              ListEmptyComponent={
                <View style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: DEVICE_HEIGHT - 100
                }}>
                  <Text>You are not a member of any club, join a club and chat now!!!
                  </Text>
                </View>}
            />
        }
      </ScrollView>
    </SafeAreaView>
  )
}