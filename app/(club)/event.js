import { Text, StyleSheet, Dimensions, View, FlatList, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomizedInput from '../../components/CustomizedInput'
import TextArea from '../../components/TextArea'
import DatePicker from '../../components/DatePicker'
import TimePicker from '../../components/TimePicker'
import { SHADOW } from '../../utils/styles'
import { Entypo } from '@expo/vector-icons'
import BottomButton from '../../components/BottomButton'

const DEVICE_WIDTH = Dimensions.get('window').width

export default function event() {
  
  const [date, setDate] = useState(new Date())
  const [startTime, setStartTime] = useState(date)
  const [endTime, setEndTime] = useState(date)

  return (
    <SafeAreaView style={{ backgroundColor: '#FDFEFF', alignItems: 'center', flex: 1, gap: 10}}>
      <Text style={styles.title}>Add New Event</Text>
      <CustomizedInput
        placeholder={'Event Title'}
        
      />
      <TextArea value=''/>
      <DatePicker date={date} setDate={setDate}/>
      <View style={styles.eventTimeContainer}>
        <TimePicker
          date={date}
          time={startTime}
          setTime={setStartTime}
          title={'Starts'}
        />
        <TimePicker
          date={date}
          time={endTime}
          setTime={setEndTime}
          title={'Ends'}
        />
      </View>
      <View style={styles.categoryMainContainer}>
        <Text style={{marginLeft: 10}}>Select Category</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainer}
          data={['Event', 'Party', 'Conference', 'Workshop', 'Other', 'Conference', 'Workshop', 'Other']}
          renderItem={({ item }) => <CategoryItem item={item} />}
        />
      </View>
      <BottomButton title={'Next'} handlePress={() => {}} />
    </SafeAreaView>
  )
}

const CategoryItem = ({ item }) => {
  
  const [selected, setSelected] = useState([])

  return (
    <TouchableOpacity
      key={item}
      onPress={() =>
        setSelected(
          selected.includes(item) ?
            selected.filter(item => item !== item)
            : [...selected, item]
        )
      }
      style={[
        styles.categoryItemContainer,
        selected.includes(item) ?
          {  ...SHADOW } : {}
      ]}
    >
      <Entypo
        name="circle"
        size={10}
        color={selected.includes(item) ? '#00B383'  : 'black'}
      />
      <Text
        style={[
          styles.categoryItem, selected.includes(item) ?
            { color: '#365486' } : {}]
        }
      >
        {item}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: '600',
    color: '#365486',
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 20
  },
  eventTimeContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: DEVICE_WIDTH - 40,
  },
  categoryMainContainer: {
    height: 100,
    // padding: 10
  },
  categoryContainer: {
    height: 60,
    padding: 5,
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center'
  },
  categoryItemContainer: {
    backgroundColor: '#CBE8EF',
    height: 44,
    marginHorizontal: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  categoryItem: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 10,
    alignSelf: 'center',
    textTransform: 'capitalize',
    marginLeft: 4
  }
})