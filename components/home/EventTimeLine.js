import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const hours = ('0' + (date.getHours() % 12 || 12)).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
  const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
  const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  return `${hours}:${minutes} ${ampm}, ${dayOfWeek}, ${month} ${day}, ${year}`;
};

const EventTimeLine = ({ fromDate, toDate }) => {
  return (
    <View style={styles.container}>
      <View style={styles.eventTime}>
        <MaterialIcons name="timer" size={12} color="#365486" />
        <Text style={styles.greyText}>{formatDate(fromDate)}</Text>
      </View>
      <View style={styles.eventTime}>
        <MaterialIcons name="timer-off" size={12} color="tomato" />
        <Text style={styles.greyText}>{formatDate(toDate)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 2,
  },
  text: {
    fontSize: 10,
    fontFamily: 'Poppins',
    // marginBottom: 5,
  },
  greyText: {
    color: 'grey',
    fontSize: 10,
    fontFamily: 'Poppins',
  },
  eventTime: {
    display: 'flex',
    flexDirection: 'row',
    gap: 2.5,
  }
});

export default EventTimeLine