import { FlatList, StyleSheet, View, TouchableOpacity, Text, Dimensions } from 'react-native'
import { useClubs, useApproveClub } from '../../hooks/queries/useClub'
import Avatar from '../../components/Avatar'
import { Skeleton } from '@rneui/base'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

const DEVICE_HEIGHT = Dimensions.get('window').height

const Admin = () => {
  
  const { data, isPending } = useClubs()

  if (isPending) {
    return (
      <SafeAreaView style={{ flex: 1, gap: 20, marginTop: 20 }}>
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={styles.header}>
        The following clubs are awaiting your approval
      </Text>
      <FlatList
        data={data?.data?.clubs}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <RenderItem club={item} />}
        ListEmptyComponent={<ListEmptyComponent/>}
      />
    </SafeAreaView>
  )
}

const ListEmptyComponent = () => {
  return <View style={{
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: DEVICE_HEIGHT
  }}>
    <Text style={{ fontFamily: 'Poppins', fontSize: 18, fontWeight: '600' }}>
      No any new club application!
    </Text>
    <Text style={{ fontFamily: 'Poppins', fontSize: 12, fontWeight: '600' }}>
      We will notify you when there is any.
    </Text>
    <Text style={{ fontFamily: 'Poppins', fontSize: 12, fontWeight: '600', color: 'tomato' }}>Cool!!!</Text>
  </View>
}

const RenderItem = ({ club }) => {
  const { mutate } = useApproveClub()

  const approveClub = () => {
    mutate({clubId: club._id})
  }

  const from = club?.user.firstName + ' ' + club?.user.lastName
  const date = club?.createdAt

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.push(`/club/${club._id}`)}
    >
      <View style={{alignSelf: 'center'}}>
        <Avatar image={club?.assets?.image?.secure_url} width={45} height={45}/>
      </View>
      <View style={{marginLeft: 10}}>
        <Text style={styles.clubTitle}>{club?.name}</Text>
        <Text style={styles.from}>{`Applicant: ${from}`}</Text>
        <Text style={styles.date}>{ `Date applied: ${date}` }</Text>
      </View>
      <TouchableOpacity onPress={approveClub} style={styles.buttonContainer}>
        <Text style={styles.buttonTitle}>Approve</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  header: {
    marginVertical: 10,
    fontFamily: 'Poppins',
    fontSize: 18,
    fontWeight: '600',
    color: '#365486',
    alignSelf: 'center',
    textAlign: 'center'
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    // marginTop: 10,
    paddingHorizontal: 5,
    paddingVertical: 20,
    borderBottomColor: 'grey',
    borderBottomWidth: .5,
    // backgroundColor: 'red',
    // justifyContent: 'space-around'
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
  clubTitle: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '700',
    color: '#365486'
  },
  from: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '700',
    color: 'grey'
  },
  date: {
    fontFamily: 'Poppins',
    fontSize: 10,
    fontWeight: '700',
    color: 'grey'
  },
  buttonContainer: {
    alignSelf: 'center', position: 'absolute', right: 5, padding: 10
  },
  buttonTitle: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '600',
    color: 'tomato'
  }
})

export default Admin