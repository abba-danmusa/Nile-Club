import React from 'react'
import {StyleSheet} from 'react-native'
import { Tabs, Stack} from 'expo-router'
import { AntDesign, Ionicons, Feather } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import HomeHeader from '../../components/home/HomeHeader'

const TabLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: { position: 'absolute' },
          tabBarActiveTintColor: '#365486',
          tabBarInactiveTintColor: 'black',
          tabBarBackground: () => (
            <BlurView tint="light" intensity={50} style={[StyleSheet.absoluteFill, {backgroundColor: 'transparent'}]} />
          ),
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            headerShown: true,
            header: () => <HomeHeader />,
            tabBarIcon: ({ color, focused }) => <AntDesign name="home" size={focused ? 30 : 24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="discover"
          options={{
            tabBarIcon: ({ color, focused }) => <AntDesign name="search1" size={focused ? 30 : 24} color={color} />
          }}
        />
        <Tabs.Screen
          name="chats"
          options={{
            tabBarIcon: ({ color, focused }) => <Ionicons name="chatbubble-ellipses-outline" size={focused ? 30 : 24} color={color} />
          }}
        />
        <Tabs.Screen
          name="clubs"
          options={{
            tabBarIcon: ({ color, focused }) => <Feather name="shield" size={focused ? 30 : 24} color={color} />,
            
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ color, focused }) => <AntDesign name="user" size={focused ? 30 : 24} color={color} />
          }}
        />
      </Tabs>
    </>
  )
}

const styles = StyleSheet.create({})

export default TabLayout