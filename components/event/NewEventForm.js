import { Text, StyleSheet, Dimensions, View, TouchableOpacity, ScrollView } from 'react-native'
import CustomizedInput from '../../components/CustomizedInput'
import TextArea from '../../components/TextArea'
import DatePicker from '../../components/DatePicker'
import TimePicker from '../../components/TimePicker'
import { SHADOW } from '../../utils/styles'
import { Entypo } from '@expo/vector-icons'
import BottomButton from '../../components/BottomButton'
import { useEventStore } from '../../hooks/stores/useEventStore'

const ASSETS_UPLOAD_SCREEN = 1
const DEVICE_WIDTH = Dimensions.get('window').width
const CATEGORIES = [
  'Event',
  'Party',
  'Conference',
  'Workshop',
  'Other',
  'Conferences',
  'Workshops',
  'Others'
]

const NewEventForm = ({ scrollToScreen = () => { } }) => {

  const {
    date,
    startTime,
    endTime,
    setDate,
    setStartTime,
    setEndTime,
    title, 
    description,
    setTitle,
    setDescription,
  } = useEventStore()

  const submitEventForm = () => {
    scrollToScreen(ASSETS_UPLOAD_SCREEN)
  }

  return (
    <>
      <Text style={styles.title}>Add New Event</Text>
      <CustomizedInput
        placeholder={'Event Title'}
        value={title}
        onChangeText={setTitle}
        autoCorrect={true}
        autoCapitalize='sentences'
        autoComplete='additional-name'
      />
      <TextArea
        value={description}
        onChangeText={setDescription}
      />
      <DatePicker date={date} setDate={setDate} />
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
        <Text style={{ marginLeft: 10 }}>Select Category</Text>
        <ScrollView
          horizontal
          scrollEnabled={true}
          scrollToOverflowEnabled={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainer}
        >
          {
            CATEGORIES.map((item, index) =>
              <CategoryItem key={index} item={item} />
            )
          }
        </ScrollView>
      </View>
      <BottomButton title={'Next'} handlePress={submitEventForm} />
    </>
  )
}

const CategoryItem = ({ item }) => {

  const { category, setCategory } = useEventStore()
  return (
    <TouchableOpacity
      key={item}
      onPress={() => 
        setCategory(
          category.includes(item) ?
            category.filter(i => i !== item)
            : [...category, item]
        )
      }
      style={[
        styles.categoryItemContainer,
        category.includes(item) ?
          { ...SHADOW } : {}
      ]}
    >
      <Entypo
        name="circle"
        size={10}
        color={category.includes(item) ? '#00B383' : 'black'}
      />
      <Text
        style={[
          styles.categoryItem, category.includes(item) ?
            { color: '#365486' } : {}]
        }
      >
        {item}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  indicatorContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    position: 'absolute',
    top: 50,
    zIndex: 1,
    alignSelf: 'center'
  },
  indicatorStyle: {
    width: 27,
    height: 6,
    backgroundColor: '#365486',
    borderRadius: 10
  },
  slideContainer: {
    flex: 1,
    width: DEVICE_WIDTH,
    backgroundColor: '#FDFEFF',
    alignItems: 'center',
    gap: 10,
    height: '100%',
    backgroundColor: 'red',

  },
  title: {
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: '600',
    color: '#365486',
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 40
  },
  eventTimeContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: DEVICE_WIDTH - 40,
  },
  categoryMainContainer: {
    height: 100,
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
  },
})

export default NewEventForm