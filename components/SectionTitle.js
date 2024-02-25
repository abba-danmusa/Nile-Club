import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'

export default function SectionTitle({title, buttonTitle = 'View All', action}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={action} style={styles.buttonContainer}>
        <Text style={styles.buttonTitle}>
          {buttonTitle}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  title: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 16
  },
  buttonContainer: {
    alignSelf: 'center', 
  },
  buttonTitle: {
    textDecorationLine: 'underline',
    textDecorationColor: '#365486',
    color: '#365486',
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '500',
  }
})