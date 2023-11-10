import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RootSiblingParent } from 'react-native-root-siblings'
import { Stack } from 'expo-router';

const queryClient = new QueryClient()

export default function Layout() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <RootSiblingParent>
          <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name='(tabs)'/>
            <Stack.Screen name='(authentication)'/>
          </Stack>
        </RootSiblingParent>
      </QueryClientProvider>
    </SafeAreaProvider>
  )
}