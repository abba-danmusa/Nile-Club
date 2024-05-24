import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, Dimensions, Text } from 'react-native'
import DatePicker from '../../components/DatePicker'
import TimePicker from '../../components/TimePicker'
import { SHADOW } from '../../utils/styles'
import { Entypo } from '@expo/vector-icons'
import BottomButton from '../../components/BottomButton'
import { useEventStore } from '../../hooks/stores/useEventStore';
import BackButton from '../BackButton';
import CustomizedInput from '../CustomizedInput';

const CATEGORIES = [
  { title: 'Event' },
  { title: 'Party' },
  { title: 'Conference' },
  { title: 'Workshop' },
  { title: 'Others' },
]

const EVENT_FORM_SCREEN = 0
const ASSETS_UPLOAD_SCREEN = 2
const DEVICE_WIDTH = Dimensions.get('window').width

const EventDetails = ({scrollToScreen = () => {}}) => {

  const {
    date,
    startTime,
    endTime,
    venue,
    link,
    setLink,
    setVenue,
    setDate,
    setStartTime,
    setEndTime,
  } = useEventStore()

  const submitEventForm = () => {
    scrollToScreen(ASSETS_UPLOAD_SCREEN)
  }

  return (
    <>
      <View style={{ marginTop: 100 }} />
      <BackButton
        handlePress={() => scrollToScreen(EVENT_FORM_SCREEN)}
        color='#365486'
        iconColor='#fff'
      />
      <CustomizedInput
        placeholder={'Event Venue'}
        value={venue}
        onChangeText={setVenue}
        autoCorrect={true}
        autoCapitalize='sentences'
        autoComplete='additional-name'
        height={50}
      />
      <CustomizedInput
        placeholder={'Event Link (if any: optional)'}
        value={link}
        onChangeText={setLink}
        autoCorrect={true}
        autoCapitalize='sentences'
        autoComplete='additional-name'
        // height={50}
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
  let categories = [...category.map(item => item.title)]

  return (
    <TouchableOpacity
      key={item.title}
      onPress={() =>
        setCategory(
          categories.includes(item.title) ?
            category.filter(i => i.title !== item.title)
            : [...category, item]
        )
      }
      style={[
        styles.categoryItemContainer,
        categories.includes(item.title) ?
          { ...SHADOW } : {}
      ]}
    >
      <Entypo
        name="circle"
        size={10}
        color={categories.includes(item.title) ? '#00B383' : 'black'}
      />
      <Text
        style={[
          styles.categoryItem, categories.includes(item.title) ?
            { color: '#365486' } : {}]
        }
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
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

export default EventDetails;
