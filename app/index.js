import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RootSiblingParent } from 'react-native-root-siblings'

const queryClient = new QueryClient()
export default function Page() {
  return (
    <SafeAreaProvider>
      <RootSiblingParent>
        <QueryClientProvider client={queryClient}>
          <View style={styles.container}>
            <View style={styles.container}>
              <View style={styles.main}>
                <Text style={styles.title}>Hello World</Text>
                <Text style={styles.subtitle}>This is the first page of your app.</Text>
              </View>
            </View>
            <StatusBar style="auto" />
          </View>
        </QueryClientProvider>
      </RootSiblingParent>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
