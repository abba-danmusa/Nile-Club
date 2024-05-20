import * as ImagePicker from 'expo-image-picker'
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Avatar from '../../components/Avatar'
import { router } from "expo-router"
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons'
import BottomButton from '../../components/BottomButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAuthStore } from '../../hooks/stores/useAuthStore'
import { useUser, useEditProfile } from '../../hooks/queries/useAuthentication'
import toast from '../../utils/toast'
import cloudinary from '../../utils/cloudinary'
import { useState } from 'react'

export default function manage() {

  const { setProfile } = useAuthStore()
  const { data } = useUser()
  
  const User = data?.data?.user

  const PROFILE_ITEMS = [
    {
      title: 'edit profile',
      icon: () => <AntDesign name="edit" size={24} color="black" />,
      handlePress: () => {
        setProfile({ User })
        router.push('/profile/edit')
      }
    },
    {
      title: 'view membership',
      icon: () => <Feather name="shield" size={24} color="black" />,
      handlePress: () => router.push('/profile/membership')
    },
    {
      title: 'security',
      icon: () => <AntDesign name="lock" size={24} color="black" />,
      handlePress: () => router.push('/profile/security')
    }
  ]

  const signout = async () => {
    await AsyncStorage.removeItem('token')
    router.back()
    router.replace('signin')
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor={'#EBEEF3'} barStyle="dark-content" />
      {/* <BackButton
        handlePress={() => router.back()}
        color='#365486'
        iconColor='#fff'
      /> */}
      <Hero User={User}/>
      <View style={styles.profileItems}>
        {
          PROFILE_ITEMS.map(item => (
            <Items
              key={item.title}
              title={item.title}
              handlePress={item.handlePress}
              icon={item.icon}
            />
          ))
        }
      </View>
      <BottomButton title={'Log Out'} handlePress={signout} />
    </SafeAreaView>
  )
}

const Hero = ({ User }) => {
  
  const [image, setImage] = useState(null)
  const [isPendingUpload, setIsPendingUpload] = useState(false)

  const { mutate, isPending } = useEditProfile()

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library. now I can have access to all your pictures... Haha, just kidding!
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    if (!result.canceled) {
      setImage(result.assets[0])
    }
  }

  const updateAvatar = async () => {
    if (!image) return toast('Please provide an image')

    setIsPendingUpload(true)
    const asset = await uploadImage(image.uri)
    setIsPendingUpload(false)

    mutate({asset})
  }

  const uploadImage = async (imageURI) => {
    const data = new FormData()

    let imageName = imageURI.split('/').pop()
    let match = /\.(\w+)$/.exec(imageName)
    let type = match ? `image/${match[1]}` : `image`
    let file = imageURI
    const timestamp = new Date().toISOString()

    file = { uri: file, name: imageName, type }
    data.append('file', file)
    data.append('upload_preset', process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET)
    data.append('cloud_name', process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME)

    try {
      response = await cloudinary
        .post(`/image/upload`,
          data,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        )
    } catch (error) {
      return toast('Failed to upload image to Cloudinary, Please try again later')
    }

    const { url, secure_url, signature } = response.data
    return { url, secure_url, signature }
  }

  return (
    <View style={styles.hero}>
      {
        isPending || isPendingUpload ? <ActivityIndicator size={70} color='tomato'/> :
        <TouchableOpacity onPress={pickImage}>
          { 
            <View>
              <Avatar
                image={image || User?.asset?.secure_url || 'https://i.pravatar.cc/300?img=1'}
                width={118} height={118}
              />
              {
                image &&
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    bottom: 10,
                    alignSelf: 'center',
                    backgroundColor: 'tomato',
                    padding: 2,
                    borderRadius: 2
                  }}
                  onPress={updateAvatar}
                >
                  <Text style={{
                    textTransform: 'capitalize',
                    fontFamily: 'Poppins',
                    fontSize: 10,
                    color: '#fff'
                  }}>upload image</Text>
                </TouchableOpacity>
              }
            </View>
          }
        </TouchableOpacity>
      }
      <View>
        <Text style={styles.name}>{`${User?.firstName} ${User?.lastName}`}</Text>
        <Text style={styles.department}>{User?.department}</Text>
        <Text style={styles.level}>{User?.year}</Text>
      </View>
    </View>
  )
}

const Items = ({ title, handlePress = () => {}, icon = () => {} }) => {
  return (
    <TouchableOpacity style={styles.profileItem} onPress={handlePress}>
      {icon()}
      <Text style={styles.title}>{title}</Text>
      <Feather name="chevron-right" size={24} color="black" style={styles.icon} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  hero: {
    marginTop: 20,
    alignSelf: 'center',
    alignItems: 'center'
  },
  name: {
    fontFamily: 'Poppins',
    fontSize: 26,
    fontWeight: '400',
    textTransform: 'capitalize',
    textAlign: 'center'
  },
  department: {
    fontFamily: 'Poppins',
    fontSize: 10,
    fontWeight: '500',
    textTransform: 'capitalize',
    textAlign: 'center'
  },
  level: {
    fontFamily: 'Poppins',
    fontSize: 10,
    fontWeight: '500',
    textTransform: 'capitalize',
    textAlign: 'center'
  },
  profileItems: {
    marginTop: 40,
  },
  profileItem: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    marginHorizontal: 10,
    marginVertical: 10
  },
  title: {
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: '500',
    textTransform: 'capitalize',
    alignSelf: 'flex-start'
  },
  icon: { alignSelf: 'center', position: 'absolute', right: 10 }
})