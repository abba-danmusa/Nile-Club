import { FlashList } from '@shopify/flash-list'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native' 
import { useClubMembership, useSetFollowClub } from '../../hooks/queries/useClub'
import { Skeleton } from '@rneui/base'
import { Image } from 'expo-image'
import Loader from '../../components/Loader'

export default function membership() {
  
  const { data, isPending } = useClubMembership()
  if (isPending) {
    return (
      <SafeAreaView style={{ flex: 1, gap: 20 }}>
        {/* <Search
          placeholder='Search for a member'
          value={searchValue}
          setValue={setSearchValue}
        /> */}
        {
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) =>
            <View key={index} style={[styles.memberContainer]}>
              <Skeleton circle animation='wave' style={styles.avatar} />
              <View style={[styles.memberInfo, { gap: 10 }]}>
                <Skeleton width={180} animation='wave' />
                <Skeleton width={120} animation='wave' />
              </View>
              <Skeleton width={30} animation='wave' />
            </View>
          )
        }
      </SafeAreaView>
    )
  }

  const RenderItem = ({ item }) => {
    
    const { mutate, isPending } = useSetFollowClub()

    const setFollow = (item) => {
      mutate({clubId: item?.club?._id})
    }

    return (
      <View style={styles.memberContainer}>
        { isPending && <Loader /> }
        <Image
          source={
            item?.club?.assets?.image?.secure_url ||
            'https://i.pravatar.cc/300?img=1'
          }
          style={styles.avatar}
        />
        <View style={styles.memberInfo}>
          <Text style={styles.memberName}>{item.club.name}</Text>
          {item?.user?.role && <Text style={styles.memberRole}>{item?.user?.role}</Text>}
        </View>
        <TouchableOpacity onPress={() => setFollow(item)}>
          <Text style={styles.assignRoleButton}>Stop Following</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlashList
          data={data?.data?.membership}
          keyExtractor={(item) => item._id}
          estimatedItemSize={100}
          renderItem={({ item }) => <RenderItem item={item}/>}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    marginTop: 10
  },
  memberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  memberRole: {
    fontSize: 16,
    color: '#888',
  },
  assignRoleButton: {
    fontSize: 12,
    // color: '#007BFF',
    color: '#365486',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  roleInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
})