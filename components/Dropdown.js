import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { SelectList } from 'react-native-dropdown-select-list'
import { Feather, AntDesign } from '@expo/vector-icons'

const DEVICE_WIDTH = Dimensions.get('window').width
export default function Dropdown({
  data,
  searchPlaceholder,
  placeholder = 'Select Option',
  placeholderTitle,
  search = false,
  save = 'value',
  arrowicon = <Feather name = "chevron-down" size = { 24} color = "black"/>,
  setSelected,
  onSelect = () => {},
}) {
  return (
    <SelectList
      data={data}
      setSelected={setSelected}
      save={save}
      onSelect={onSelect}
      fontFamily='Poppins'
      arrowicon={arrowicon}
      searchicon={<AntDesign name="search1" size={24} color="black" />}
      boxStyles={styles.selectList}
      inputStyles={styles.selectListInput}
      dropdownStyles={styles.selectListDropdown}
      dropdownTextStyles={styles.dropdownTextStyles}
      dropdownItemStyles={styles.dropdownItemStyles}
      searchPlaceholder={searchPlaceholder}
      placeholder={placeholder}
      placeholderTitle={placeholderTitle}
      search={search}
    />
  )
}

const styles = StyleSheet.create({
  selectList: {
    marginBottom: 10,
    // paddingBottom: 10,
    // paddingTop: 15,
    width: DEVICE_WIDTH - 40,
    backgroundColor: '#FFF',
    borderWidth: 1.5,
    // borderBottomColor: '#263B5E',
    // borderBottomWidth: 1.5,
    borderColor: '#263B5E',
    height: 60,
    borderRadius: 12,
  },
  selectListInput: {
    // height: 50,
    // backgroundColor: 'red',
    alignItems: 'center',
    fontFamily: 'Poppins',
    fontSize: 10,
    // width: DEVICE_WIDTH - 80,
  },
  selectListDropdown: {
    backgroundColor: '#CBE8EF',
    marginBottom: 20,
    // marginTop: 10,
    // padding: 10
  },
  dropdownTextStyles: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '900',
    // height: 50,
    color: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
  },
  dropdownItemStyles: {
    // borderTopWidth: 1,
    height: 'fit-content',
    // backgroundColor: 'red',
  }
})