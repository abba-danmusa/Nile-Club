import { Slot, Stack } from 'expo-router'
import {Text} from 'react-native'

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        // headerShown: false
      }}
    >
      <Stack.Screen
        name='[chat]'
        options={{
          headerShown: true,
          headerTitle: props => {
            console.log(props.children)
            return <ChatHeader {...props} />
          },
        }}
      />
    </Stack>
  )
}

function ChatHeader({ props }) {
  // const { chat } = route.params;
  // console.log(props)
  return (
    <Text>Chat</Text>
  )
}