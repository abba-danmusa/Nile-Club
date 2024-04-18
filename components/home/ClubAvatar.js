import { View, Text } from 'react-native'
import { Image } from 'expo-image'

export default function ClubAvatar({ club }) {
  return (
    <View style={{ position: 'absolute', top: 5, left: 5, zIndex: 10000 }}>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5 }}>
        <Image source={club?.assets?.image?.secure_url} style={{ width: 40, height: 40, borderRadius: 20, }} />
        <Text style={{ fontFamily: 'Poppins', color: '#fff', fontSize: 12, fontWeight: '500' }}>{club?.name}</Text>
      </View>
    </View>
  )
}