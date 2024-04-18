import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

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
      <Text style={styles.text}>From: <Text style={styles.greyText}>{formatDate(fromDate)}</Text></Text>
      <Text style={styles.text}>To: <Text style={styles.greyText}>{formatDate(toDate)}</Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  text: {
    fontSize: 12,
    fontFamily: 'Poppins',
    // marginBottom: 5,
  },
  greyText: {
    color: 'grey',
    fontSize: 12,
    fontFamily: 'Poppins',
  },
});

export default EventTimeLine;
