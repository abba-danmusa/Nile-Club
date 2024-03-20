import { Text, TouchableOpacity, StyleSheet, Dimensions, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useState } from 'react'

const DEVICE_WIDTH = Dimensions.get('window').width

export default function DatePicker({date = new Date(), setDate = () => {}}) {
  
  const [showDatePicker, setShowDatePicker] = useState(false)

  const handleDatePickerChange = event => {

    if (event.type === 'dismissed' || 'neutralButtonPressed' || 'set') {
      setShowDatePicker(false)
    }

    if (event.type === 'set') setDate(new Date(event.nativeEvent.timestamp))
  }

  return (
    <TouchableOpacity
      style={styles.datePicker}
      onPress={() => setShowDatePicker(true)}
    >
      {
        showDatePicker ?
          <DateTimePicker
            mode={'date'}
            value={date}
            timeZoneOffsetInMinutes={60}
            onChange={handleDatePickerChange}
            minimumDate={
              new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                new Date().getDate()
              )
            }
          />
        : null
      }
      <View style={{}}>
        <Text style={styles.title}>Date</Text>
        <Text style={styles.time}>{date.toDateString().split('T') }</Text>
      </View>
      <Feather name="calendar" size={24} color="#263B5E" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  datePicker: {
    margin: 0,
    paddingHorizontal: 10,
    paddingTop: 5,
    width: DEVICE_WIDTH - 40,
    backgroundColor: '#FFF',
    borderWidth: 1.5,
    borderBottomColor: '#263B5E',
    borderBottomWidth: 1.5,
    borderColor: '#263B5E',
    height: 50,
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '300',
    color: 'grey'
  },
  time: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '900',
    color: '#263B5E'
  }
})