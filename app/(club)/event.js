import { View, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomizedInput from '../../components/CustomizedInput'
import TextArea from '../../components/TextArea'
import { Feather } from '@expo/vector-icons'

export default function event() {
  return (
    <SafeAreaView style={{ backgroundColor: '#FDFEFF', alignItems: 'center'}}>
      <Text style={styles.title}>Add New Event</Text>
      <CustomizedInput
        placeholder={'Event Title'}
        
      />
      <TextArea />
      <CustomizedInput
        placeholder={'Date: dd/mm/yyyy'}
        rightIcon={<Feather name="calendar" size={24} color="#263B5E" />}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: '600',
    color: '#365486'
  }
})