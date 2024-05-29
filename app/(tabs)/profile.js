import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from "expo-router"
import { Image } from 'expo-image'
import { useUser } from '../../hooks/queries/useAuthentication'

const profile = () => {
  const { data } = useUser();
  const User = data?.data?.user;

  const SUPER_ADMIN_ITEMS = [{
    title: "Approve Clubs",
    onPress: () => router.push("/profile/admin")
  }]

  const ADMIN_ITEMS = [
    { title: "Analytics", onPress: () => router.push("/profile/analytics") },
    { title: "my events", onPress: () => router.push("/profile/events") },
    { title: "roles", onPress: () => router.push("/roles") },
    { title: "my club", onPress: () => router.push("/profile/club") },
  ]

  const USER_ITEMS = [{
    title: "create club",
    onPress: () => router.push("/profile/create"),
  }]

  const ALL_USERS_ITEMS = [{
    title: "manage profile",
    onPress: () => router.push("/profile/manage"),
  }]

  const PROFILE_ITEMS = [
    ...ALL_USERS_ITEMS,
    ...(!User?.club && !User?.admin ? USER_ITEMS : []),
    ...(User?.club ? ADMIN_ITEMS : []),
    ...(User?.admin ? SUPER_ADMIN_ITEMS : []),
  ]

  const signout = () => {
    router.replace("signin");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Hero User={User} />
      <ScrollView
        style={styles.itemsContainer}
        contentContainerStyle={styles.itemsContentContainer}
      >
        {PROFILE_ITEMS.map((item) => {
          if (!item) return;
          if (
            !User?.club &&
            (item.title === "my events" ||
              item.title === "roles" ||
              item.title === "my clubs")
          ) {
            return null;
          } else if (User?.club && item.title === "create club") {
            return null;
          } else {
            return (
              <Items
                key={item.title}
                title={item.title}
                handlePress={item.onPress}
              />
            );
          }
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const Hero = ({User}) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        onPress={() => router.push('/profile')}
        style={styles.avatarContainer}
      >
        <Image
          source={
            User?.asset?.secure_url ||
            'https://i.pravatar.cc/300?img=1'
          }
          style={styles.avatar}
        />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{`Hello ${User?.firstName}!`}</Text>
        <Text style={styles.message}>What would you like to view?</Text>
      </View>
    </View>
  )
}

const Items = ({title, handlePress = () => {}}) => {
  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={handlePress}
    >
      <Text style={styles.itemTitle}>{ title }</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: '#EBEEF3',
  },
  headerContainer: {
    backgroundColor: '#EBEEF3',
    paddingHorizontal: 10,
    paddingVertical: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
    backgroundColor: '#EBEEF3',
    height: 50,
    width: 50,
    borderRadius: 100,
    borderColor: '#58719B',
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 100,
  },
  titleContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 5,
  },
  title: {
    fontFamily: 'Poppins',
    fontSize: 16,
    lineHeight: 26,
    fontWeight: '500',
  },
  message: {
    fontFamily: 'Poppins',
    fontSize: 10,
    lineHeight: 11,
    color: 'black',
    width: 150,
  },
  itemsContainer: {
    
  },
  itemsContentContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 20,
  },
  itemContainer: {
    width: 151,
    height: 156,
    borderRadius: 10,
    borderColor: '#365486',
    borderWidth: 2.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemTitle: {
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: '500',
    textTransform: 'capitalize',
    textAlign: 'center'
  }
})

export default profile