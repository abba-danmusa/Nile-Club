import { Text, TouchableOpacity, StyleSheet, Dimensions, Platform, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useState } from 'react'

const DEVICE_WIDTH = Dimensions.get('window').width

export default function DatePicker({
  date,
  time = new Date(date),
  setTime = () => { },
  title = 'starts',
  width = '45%'
}) {

  const [showTimePicker, setShowTimePicker] = useState(false)

  const handleDatePickerChange = event => {

    if (event.type === 'dismissed' || 'neutralButtonPressed' || 'set') {
      setShowTimePicker(false)
    }

    if (event.type === 'set') setTime(new Date(event.nativeEvent.timestamp))
  }

  return (
    <TouchableOpacity
      style={[styles.datePicker, {width}]}
      onPress={() => setShowTimePicker(true)}
    >
      {
        showTimePicker ?
          <DateTimePicker
            mode={Platform.OS === 'ios' ? 'datetime' : 'time'}
            value={time}
            is24Hour={true}
            timeZoneOffsetInMinutes={60}
            onChange={handleDatePickerChange}
          />
        : null
      }
      <View style={styles.titleContainer}>
        <Text style={{color: 'grey'}}>{title}</Text>
        <Text style={styles.time}>{time.toTimeString().split('T')}</Text>
      </View>
      <Feather name="clock" size={24} color="#263B5E" />
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
  titleContainer: {
    // display: 'flex',
    // flexDirection: 'row'
  },
  time: {
    fontFamily: 'Poppins',
    fontSize: 8,
    fontWeight: '900',
    color: '#263B5E',
  }
})