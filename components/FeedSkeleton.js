import { View, Text } from 'react-native'
import React from 'react'
import { Skeleton } from '@rneui/themed'
import { getStatusBarHeight } from '../utils/methods'

const ITEMS = [1,2,3,4,5]

export default function FeedSkeleton() {
  return (
    <View style={{ marginTop: 50 + getStatusBarHeight() * 1.8}}>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}>
        {
          ITEMS.map(item => <Skeleton
            key={item}
            animation='pulse'
            circle height={70}
            width={70}
          />)
        }
      </View>
      {
        ITEMS.map(item => 
          <View style={{marginVertical: 20, paddingBottom: 100}} key={item}>
            <Skeleton animation='pulse' height={350} />
            <View style={{ gap: 5, marginVertical: 10 }} >
              <Skeleton animation='wave' />
              <Skeleton animation='wave' />
              <Skeleton animation='wave' />
              <Skeleton animation='wave' />
              <Skeleton animation='wave' />
              <Skeleton animation='wave' />
            </View>
          </View>
        )
      }
    </View>
  )
}