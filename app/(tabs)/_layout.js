import React from 'react'
import {StyleSheet, View, Text} from 'react-native'
import { Tabs } from 'expo-router'
import { AntDesign, Ionicons, Feather } from '@expo/vector-icons'
import HomeHeader from '../../components/home/HomeHeader'

const TabLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBarStyle,
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: 'black',
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            headerShown: true,
            header: () => <HomeHeader />,
            tabBarIcon: ({ color, focused }) =>
              <TabIcon
                name={'home'}
                color={color}
                focused={focused}
                icon={ size =>
                  <AntDesign name='home' size={size} color={color} />
                }
              />,
          }}
        />
        <Tabs.Screen
          name="discover"
          options={{
            tabBarIcon: ({ color, focused }) =>
              <TabIcon
                name={'discover'}
                color={color}
                focused={focused}
                icon={ size =>
                  <AntDesign name="search1" size={size} color={color} />
                }
              />
          }}
        />
        <Tabs.Screen
          name="chats"
          options={{
            tabBarIcon: ({ color, focused }) =>
              <TabIcon
                name={'chats'}
                color={color}
                focused={focused}
                icon={ size =>
                  <Ionicons
                    name="chatbubble-ellipses-outline"
                    size={size}
                    color={color}
                  />
                }
              />
          }}
        />
        <Tabs.Screen
          name="clubs"
          options={{           
            tabBarIcon: ({ color, focused }) =>
              <TabIcon
                name={'clubs'}
                color={color}
                focused={focused}
                icon={ size =>
                  <Feather name="shield" size={size} color={color} />
                }
              />
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ color, focused }) =>
              <TabIcon
                name={'profile'}
                color={color}
                focused={focused}
                icon={ size => 
                  <AntDesign name="user" size={size} color={color} />
                }
              />
          }}
        />
      </Tabs>
    </>
  )
}

function TabIcon({name, focused, color, icon = () => {}, iconSize = 24}) {
  return (
    <View style={[styles.icon, focused ? { ...styles.activeTab } : {}]}>
      { icon(iconSize) }
      <Text
        style={[styles.tabBarText, { color: focused ? color : '#252427' }]}
      >
        {name}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    backgroundColor: '#CFD7E2',
    height: 76,
    elevation: 1000,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    paddingBottom: 20,
    paddingTop: 10,
  },
  activeTab: {
    backgroundColor: '#365486',
    borderRadius: 50 / 2,
    elevation: 1000,
  },
  tabBarText: {
    fontSize: 9,
    fontFamily: 'Poppins',
    fontWeight: '400',
    textTransform: 'capitalize',
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
})

export default TabLayout