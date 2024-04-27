import { View, Text } from 'react-native'
import React from 'react'
import { Skeleton } from '@rneui/themed'
import { getStatusBarHeight } from '../utils/methods'

const ITEMS = [1,2,3,4,5]

export default function FeedSkeleton({loading}) {
  return (
    <View
      style={
        loading ?
          { marginTop: 50 + getStatusBarHeight() * 1.8 }
        : { marginTop: 10}
      }
    >
      {
        loading ?
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 20
          }}>
            {
              ITEMS.map(item => <Skeleton
                key={item}
                animation='pulse'
                circle
                height={70}
                width={70}
              />)
            }
          </View>
        : null
      }
      {
        ITEMS.map(item => 
          <View style={{marginVertical: 5, paddingBottom: 100}} key={item}>
            <Skeleton animation='pulse' height={350} />
            <View style={{ gap: 5, marginVertical: 10 }} >
              <Skeleton animation='wave' />
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