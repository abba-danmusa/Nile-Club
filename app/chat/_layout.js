import { Slot, Stack } from 'expo-router'
import { useState } from 'react'
import { useChatStore } from '../../hooks/stores/useChatStore';
import { useClubMembers } from '../../hooks/queries/useClub';
import { Image } from 'expo-image';
import TruncateText from '../../components/chats/TruncateText';
import { SHADOW } from '../../utils/styles';
import { Entypo, AntDesign } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet} from 'react-native'
import { Divider } from '@rneui/base';

export default function Layout() {
  const { club } = useChatStore()
  const { data } = useClubMembers(club._id)

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
          headerLeft: props => {
            return (
              <HeaderLeft {...props} members={data?.data?.members?.length} />
            )
          },
          headerRight: props =>
          { return <HeaderRight {...props} members={data?.data?.members} /> },
          headerStyle: {
            // backgroundColor: '#fff'
            backgroundColor: '#365486',
            ...SHADOW 
          },
          headerTitleStyle: { color: '#fff', fontFamily: 'Poppins' },
          headerTitle: props => {
            console.log(props.children)
          },
        }}
      />
    </Stack>
  )
}

function HeaderLeft({ props, members }) {
  const { club } = useChatStore()
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
      }}
    >
      <Image
        source={club.image}
        style={{
          width: 50,
          height: 50,
          borderRadius: 50,
          marginRight: 10,
        }}
      />
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <Text
          style={{
            fontFamily: 'Poppins',
            fontSize: 14,
            fontWeight: 500,
            color: '#fff'
          }}
        >{club.name}</Text>
        <TruncateText text={`${members} members`} maxLength={40}/>
      </View>
    </View>
  )
}

function HeaderRight({ props, members }) {
  
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Entypo name="dots-three-vertical" size={24} color="#fff" />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{
                position: 'absolute',
                right: 10,
                top: 10,
                padding: 5,
              }}
            >
              <AntDesign name="close" size={24} color="tomato" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Members</Text>
            <Divider/>
            <FlatList
              data={members || []}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => <RenderItem item={item} />}
              contentContainerStyle={{marginTop: 20}}
            />
          </View>
        </View>
      </Modal>
    </View>
  )
}

const RenderItem = ({ item }) => {
  return (
    <View style={styles.memberContainer}>
      <Image
        source={
          item?.user?.asset?.secure_url ||
          'https://i.pravatar.cc/300?img=1'
        }
        style={styles.avatar}
      />
      <View style={styles.memberInfo}>
        <Text style={styles.memberName}>
          {`${item?.user?.firstName} ${item?.user?.lastName}`}
        </Text>
        {
          item?.user?.role &&
          <Text style={styles.memberRole}>{item?.user?.role}</Text>
        }
      </View>
    </View>
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
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
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
    fontSize: 16,
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
    padding: 10,
    borderRadius: 10,
    width: '80%',
    height: '80%',
    overflow: 'scroll'
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center'
  },
})