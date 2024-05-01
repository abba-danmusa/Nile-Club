import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Search from '../../components/Search'
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, TextInput, Button } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useAssignRole, useClubMembers } from '../../hooks/queries/useClub'
import { Skeleton } from '@rneui/base'
import { Image } from 'expo-image'
import toast from '../../utils/toast'

const ClubMembersList = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedMember, setSelectedMember] = useState(null)
  const [roleInput, setRoleInput] = useState('')
  const [searchValue, setSearchValue] = useState('')

  const { data, isPending } = useClubMembers()
  const { mutate: assignRole } = useAssignRole()

  if (isPending) {
    return (
      <SafeAreaView style={{flex: 1, gap: 20}}>
        <Search
          placeholder='Search for a member'
          value={searchValue}
          setValue={setSearchValue}
        />
        {
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) =>
            <View key={index} style={[styles.memberContainer]}>
              <Skeleton circle animation='wave' style={styles.avatar} />
              <View style={[styles.memberInfo, {gap: 10}]}>
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

  const handleAssignRole = (member) => {
    setSelectedMember(member)
    setModalVisible(true)
  }

  const handleRoleInputChange = (text) => {
    setRoleInput(text)
  }

  const handleAssignRoleConfirm = () => {
    // Perform the role assignment logic here
    if (!roleInput) return toast('Please provide the role name')
    toast(`Assigning role "${roleInput}" to ${selectedMember.user.firstName}`)
    assignRole({userId: selectedMember.user._id, role: roleInput})
    setModalVisible(false)
    setRoleInput('')
  }

  const renderMemberItem = ({ item }) => {
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
          {item?.user?.role && <Text style={styles.memberRole}>{item?.user?.role}</Text>}
        </View>
        <TouchableOpacity onPress={() => handleAssignRole(item)}>
          <Text style={styles.assignRoleButton}>Assign Role</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <Search
        placeholder='Search for a member'
        value={searchValue}
        setValue={setSearchValue}
      />
      <View style={styles.container}>
        <FlatList
          data={data?.data?.members}
          renderItem={renderMemberItem}
          keyExtractor={(item) => item._id}
        />
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
                <AntDesign name="close" size={20} color="tomato" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Assign Role</Text>
              <TextInput
                style={styles.roleInput}
                placeholder="Enter role..."
                value={roleInput}
                onChangeText={handleRoleInputChange}
              />
              <Button title="Confirm" onPress={handleAssignRoleConfirm} />
            </View>
          </View>
        </Modal>
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

export default ClubMembersList