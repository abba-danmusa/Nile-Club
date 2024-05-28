import React, {useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Animated, Modal } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { SHADOW } from "../../utils/styles"
import { Image } from 'expo-image'
import { router } from "expo-router"
import { useAnimationStore } from '../../hooks/stores/useAnimationStore'
import { getStatusBarHeight } from '../../utils/methods'
import { useUser } from '../../hooks/queries/useAuthentication'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Divider } from '@rneui/base'
import {useNotifications} from '../../hooks/queries/useNotification'
import { FlashList } from '@shopify/flash-list'
import NotificationItem from '../notification/NotificationItem'

const HomeHeader = () => {
  
  const [modalVisible, setModalVisible] = useState(false)

  const { data } = useUser()
  const {data: notificationsData} = useNotifications()

  const User = data?.data?.user
  const notifications = notificationsData?.data?.notifications
  // console.log(notifications)
  const STATUS_BAR_HEIGHT = getStatusBarHeight()

  const { translateY } = useAnimationStore()
  const headerTranslateY = Animated
    .diffClamp(translateY, 0, 50 + STATUS_BAR_HEIGHT)
    .interpolate({
      inputRange: [0, 50 + STATUS_BAR_HEIGHT],
      outputRange: [0, -70 + (-STATUS_BAR_HEIGHT)],
      extrapolate: 'clamp',
    })

  return (
    <SafeAreaView style={{flex: 1}}>
      <Animated.View
        style={[
          styles.container,
          {transform: [{ translateY: headerTranslateY }]}
        ]}
      >
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
          <Text style={styles.title}>{`Hello ${User?.firstName||''},` }</Text>
          <Text style={styles.message}>Let’s see what your clubs are up to!</Text>
        </View>
        <TouchableOpacity
          style={styles.notificationContainer}
          onPress={() => setModalVisible(true)}
        >
          <AntDesign name="bells" size={24} color="#EBEEF3" />
          <View style={{
            width: 12,
            height: 12,
            backgroundColor: 'tomato',
            position: 'absolute',
            top: 0,
            right: 0,
            borderRadius: 20
          }} />
        </TouchableOpacity>
      </Animated.View>
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
            <Text style={styles.modalTitle}>Notifications</Text>
            <Divider />
            <View>
              <FlashList
                data={notifications}
                keyExtractor={(item) => item._id}
                estimatedItemSize={100}
                renderItem={({ item }) => <NotificationItem item={item} />}
                ListEmptyComponent={<View
                  style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text>No any notification at the moment</Text>
                </View>}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EBEEF3',
    paddingHorizontal: 10,
    paddingVertical: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    ...SHADOW
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
  notificationContainer: {
    backgroundColor: '#365486',
    width: 40,
    height: 40,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOW
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
    height: '30%',
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

export default HomeHeader