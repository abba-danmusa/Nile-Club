import React from 'react'
import {View, StyleSheet} from 'react-native'
import { SearchBar } from '@rneui/themed'

const Search = ({
  placeholder = 'Search',
  iconRight = () => {},
  value = '',
  setValue = () => { },
  showLoading = false
}) => {
  return (
    <SearchBar
      placeholder={placeholder}
      iconRight={iconRight}
      showLoading={showLoading}
      value={value}
      onChangeText={setValue}
      containerStyle={styles.container}
      inputContainerStyle={styles.inputContainer}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    borderTopWidth: 0,
    width: 'fit-content',
    width: '100%',
    // marginHorizontal: 10
  },
  inputContainer: {
    backgroundColor: '#CBE8EF',
    borderRadius: 10,
    width: '100%',
    shadowColor: '#000', // Shadow color
    shadowOffset: {
      width: 0, // No horizontal offset
      height: 5, // Vertical offset
    },
    shadowOpacity: 0.25, // Opacity of the shadow
    shadowRadius: 3.84, // Spread of the shadow
    elevation: 5, // Android elevation (affects shadow appearance)
  },
  inputStyle: {
    // fontFamily: 'Poppins',
    // fontWeight: '900',
  }
})

export default Search