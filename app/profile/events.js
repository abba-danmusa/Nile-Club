import { View, Dimensions } from 'react-native'
import { useEvents } from '../../hooks/queries/useEvent'
import { FlashList } from "@shopify/flash-list"
import EditEventItem from '../../components/event/EditEventItem'
import { SafeAreaView } from 'react-native-safe-area-context'

const DEVICE_WIDTH = Dimensions.get('window').width

export default function ChatAvatar() {

  const {data} = useEvents()

  return (
    <SafeAreaView style={{flex: 1}}>
      <FlashList
        data={data?.data?.events}
        ListEmptyComponent={<ListEmptyComponent />}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        ListFooterComponent={<Footer />}
        renderItem={({ item }) => <EditEventItem item={item} />}
        estimatedItemSize={50}
      />
    </SafeAreaView>
  )
}

const ListEmptyComponent = () => {

}

const Footer = () => {
  return (
    <View style={{ height: 200, justifyContent: 'center' }}>
      <View
        style={{
          width: 5,
          height: 5,
          borderRadius: 20,
          backgroundColor: 'black',
          alignSelf: 'center'
        }}
      />
    </View>
  )
}