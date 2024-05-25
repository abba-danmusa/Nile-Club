import React from 'react'
import {StyleSheet, View, Text } from 'react-native'
import { Tabs } from 'expo-router'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import HomeHeader from '../../components/home/HomeHeader'
import { SHADOW } from '../../utils/styles'
import { useChats, useChatsNotification } from '../../hooks/queries/useChat'

const TabLayout = () => {
  
  useChats()
  const {data, isPending} = useChatsNotification()
  const totalUnviewedChats = data?.data?.notifications?.totalUnviewedChats
  
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBarStyle,
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: 'black',
          tabBarHideOnKeyboard: true,
          tabBarVisibilityAnimationConfig: {
            hidden: {
              animation: 'slide-out-up',
            },
            visible: {
              animation: 'slide-in-down',
            }
          }
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            headerShown: true,
            headerStyle: styles.container,
            headerTransparent: true,
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
                icon={size => {
                  if (totalUnviewedChats > 0) {
                    return (
                      <View>
                        <View style={styles.totalUnviewedChats}>
                          <Text style={styles.totalUnviewedChatsTitle}>
                            {
                              totalUnviewedChats > 99 ? '99+' : totalUnviewedChats
                            }
                          </Text>
                        </View>
                        <Ionicons
                          name="chatbubble-outline"
                          size={size}
                          color={color}
                        />
                      </View>
                    )
                  } else {
                    return (
                      <View>
                        <Ionicons
                          name="chatbubble-outline"
                          size={size}
                          color={color}
                        />
                      </View>
                    )
                  }
                }}
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
      {icon(iconSize)}
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
    height: 66,
    elevation: 1000,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingBottom: 20,
    paddingTop: 20,
  },
  activeTab: {
    backgroundColor: '#365486',
    borderRadius: 50 / 2,
    elevation: 1000,
  },
  tabBarText: {
    fontSize: 10,
    fontFamily: 'Poppins',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  container: {
    backgroundColor: '#EBEEF3',
    ...SHADOW
  },
  totalUnviewedChats: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: 'tomato',
    maxWidth: 25,
    minWidth: 15,
    height: 15,
    paddingHorizontal: 2,
    paddingVertical: 1,
    zIndex: 1,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOW
  },
  totalUnviewedChatsTitle: {
    fontFamily: 'Poppins',
    fontSize: 10,
    fontWeight: '500',
    color: '#fff'
  }
})

export default TabLayout