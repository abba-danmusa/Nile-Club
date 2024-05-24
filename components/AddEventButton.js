import { Animated, StyleSheet, TouchableOpacity, Dimensions, View, Modal, Text } from 'react-native'
import { SHADOW } from '../utils/styles'
import { router } from 'expo-router'
import { AntDesign } from '@expo/vector-icons'
import { useAnimationStore } from '../hooks/stores/useAnimationStore'
import { useState } from 'react'
import { Divider } from '@rneui/base'

const DEVICE_HEIGHT = Dimensions.get('window').height
const BUTTON_HEIGHT = 50

export default function AddEventButton() {
  
  const [modalVisible, setModalVisible] = useState(false)
  const { translateY } = useAnimationStore()

  const addEventButtonTranslateY = Animated
    .diffClamp(
      translateY, 0, 110
    )
    .interpolate({
      inputRange: [0, 200],
      outputRange: [0, DEVICE_HEIGHT + 110],
      extrapolate: 'clamp'
    })

  return (
    <>
      <Animated.View
        style={[
          styles.addButton,
          { transform: [{ translateY: addEventButtonTranslateY }] },
        ]}
      >
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <AntDesign name='plus' size={24} color='#fff' />
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
            <Text style={styles.modalTitle}>Create</Text>
            <Divider />
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false)
                  router.push('/post/(post)')
                }}
                style={[styles.button, { backgroundColor: 'tomato' }]}
              >
                <Text style={styles.buttonTitle}>Post</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false)
                  router.push('/club/event')
                }}
                style={styles.button}
              >
                <Text style={styles.buttonTitle}>Event</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    right: 10,
    zIndex: 1000,
    bottom: 110,
    width: 50,
    height: BUTTON_HEIGHT,
    borderRadius: 100,
    backgroundColor: '#365486',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1000,
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
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 50,
    alignSelf: 'center',
    marginTop: 50
  },
  button: {
    backgroundColor: '#365486',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    ...SHADOW
  },
  buttonTitle: {
    fontFamily: 'Poppins',
    fontSize: 18,
    fontWeight: '600',
    color: '#fff'
  }
})