import React from 'react';
import {View, StyleSheet} from 'react-native';
import { Tabs } from 'expo-router'
const TabLayout = () => {
  return (
    <Tabs screenOptions={{headerShown: false}}>
      <Tabs.Screen name="home"/>
      {/* <Tab.Screen name="" /> */}
    </Tabs>
  );
}

const styles = StyleSheet.create({})

export default TabLayout;
