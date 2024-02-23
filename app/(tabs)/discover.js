import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Search from '../../components/Search'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Discover() {
  return (
    <SafeAreaView>
      <ScrollView>
        <Search placeholder={'Search clubs and activities'} />
      </ScrollView>
    </SafeAreaView>
  )
}