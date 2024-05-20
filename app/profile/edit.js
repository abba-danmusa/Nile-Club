import { View, StatusBar } from 'react-native'
import AboutForm from '../../components/signup/AboutForm'
import { useEditProfile, useUser } from '../../hooks/queries/useAuthentication'
import Loader from '../../components/Loader'

export default function Edit() {
  
  const { mutate, isPending } = useEditProfile()
  const { data } = useUser()

  const User = data?.data?.user

  const editProfile = updatedProfile => {
    mutate({ ...updatedProfile, _id: User?._id })
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar backgroundColor='#fff'/>
      { isPending && <Loader /> }
      <AboutForm editProfile={editProfile} edit={true} />
    </View>
  )
}