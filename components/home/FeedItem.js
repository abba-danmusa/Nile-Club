import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { Image } from 'expo-image'
import { Image as NativeImage } from 'react-native'
import { AntDesign, FontAwesome5 } from '@expo/vector-icons'
import TruncateText from '../../components/TruncateText'
import ImageCarousel from '../ImageCarousel'
import VideoPlayer from '../VideoPlayer'
import { AirbnbRating } from '@rneui/themed'

const DEVICE_WIDTH = Dimensions.get('window').width

export default function FeedItem({ item }) {

  const {
    assets: { images, videos },
    title,
    description
  } = item
  
  let assets = [
    ...(images || []).flatMap(i => i === null ? [] : i),
    ...(videos || []).flatMap(v => v === null ? [] : v)
  ]

  return (
    <View>
      {
        assets.length > 0 ? 
          <ImageCarousel
            images={assets}
            renderItem={RenderItem}
            layout='stack'
            itemWidth={DEVICE_WIDTH}
          />
          : <View
            style={{
              backgroundColor: 'black',
              width: DEVICE_WIDTH,
              height: 400,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <Image
              source={require('../../assets/icon.png')}
              style={{
                width: 150,
                height: 150,
                borderRadius: 20  
              }}
            />
          </View>
      }
      <View style={
        { justifyContent: 'space-between', flexDirection: 'row'}
      }>
        <View style={{ flexDirection: 'row', marginTop: 5, marginLeft: 10 }}>
          <AirbnbRating size={15} showRating={false} defaultRating={4} />
        </View>
        <View style={{alignSelf: 'flex-end', flexDirection: 'row'}}>
          <TouchableOpacity style={{ marginRight: 5, padding: 5, }}>
            <FontAwesome5 name="comment" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={{marginRight: 10, padding: 5,}}>
            <AntDesign name="hearto" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <Text style={{ marginBottom: 5, fontFamily: 'Poppins', fontSize: 16, fontWeight: '600', }}>{title}</Text>
        <TruncateText text={description} />
      </View>
    </View>
  )
}

const RenderItem = ({ item, index }) => {
  
  const regex = /https:\/\/res\.cloudinary\.com\/feedmi\/(image|video)\//
  const match = item?.secure_url?.match(regex)
  const asset = match[1]

  if (asset === 'image') {
    return (
      <Image
        source={ item?.secure_url }
        style={[styles.image, {height: item?.height}]}
      />
    )
  }
  if (asset === 'video') {
    return <VideoPlayer uri={item?.secure_url} />
  }
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    minHeight: 400,
    contentFit: 'cover',
  },
  contentContainer: {
    marginHorizontal: 10,
    marginTop: 5
  }
})