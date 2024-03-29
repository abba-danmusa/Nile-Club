import { Image } from 'expo-image'
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, SectionList, FlatList} from 'react-native'
import Avatar from '../../components/Avatar'
import { SHADOW } from '../../utils/styles'
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'
import CustomizedButton from '../../components/CustomizedButton'
import { Divider } from '@rneui/themed'
import SectionTitle from '../../components/SectionTitle'
import FeaturedItems from '../../components/home/FeaturedItems'
import NewsAnnouncement from '../../components/home/NewsAnnouncement'

const EXECUTIVES = [
  {
    name: 'Mimi Aminu',
    image: require('../../assets/home/avatar.png'),
    position: 'President'
  },
  {
    name: 'Amma Danmusa',
    image: require('../../assets/home/avatar.png'),
    position: 'Vice President'
  },
  {
    name: 'Some Random Name',
    image: require('../../assets/home/avatar-1.png'),
    position: 'Secretary'
  },
  {
    name: 'Gentleman',
    image: require('../../assets/home/avatar-2.png'),
    position: 'Accountant'
  },
  {
    name: 'Lady',
    image: require('../../assets/home/avatar-2.png'),
    position: 'Treasurer'
  }
]

export default function club() {

  const SECTIONS = [
    {
      title: 'Featured Clubs',
      horizontal: true,
      renderItems: data => <FlatList
        horizontal
        data={data}
        renderItem={({ item }) => <FeaturedItems item={item} />}
        showsHorizontalScrollIndicator={false}
      />,
      data: [
        {
          _id: '42425',
          image: require('../../assets/home/model-un-club.png'),
          name: 'Model UN Club',
          description: 'Model UN is a club that mimics the United Nations Conferences in New York.',
          ratings: '5.0',
        },
        {
          _id: '42425351414',
          image: require('../../assets/home/model-un-club.png'),
          name: 'Model UN Club',
          description: 'Model UN is a club that mimics the United Nations Conferences in New York.',
          ratings: '3.9',
        },
        {
          _id: '4242535342',
          image: require('../../assets/home/model-un-club.png'),
          name: 'Model UN Club',
          description: 'Model UN is a club that mimics the United Nations Conferences in New York.',
          ratings: '4.5',
        },
        {
          _id: '424253534',
          image: require('../../assets/home/model-un-club.png'),
          name: 'Model UN Club',
          description: 'Model UN is a club that mimics the United Nations Conferences in New York.',
          ratings: '2.9',
        }
      ]
    },
    {
      title: 'News and Announcement',
      horizontal: false,
      renderItems: data => <FlatList
        data={data}
        renderItem={({ item }) => <NewsAnnouncement item={item} />}
        showsHorizontalScrollIndicator={false}
      />,
      data: [
        {
          _id: '12425',
          image: require('../../assets/home/model-un-club-1.png'),
          name: 'Model UN Club',
          description: 'Model UN announces a new president and new cabinet members for the model UN secretariat. The new appointees will be announced in our upcoming orientation',
        },
        {
          _id: '14235',
          image: require('../../assets/home/photography-club.png'),
          name: 'Photography Club',
          description: 'Model UN announces a new president and new cabinet members for the model UN secretariat. The new appointees will be announced in our upcoming orientation',
        },
        {
          _id: '24235',
          image: require('../../assets/home/model-un-club-1.png'),
          name: 'Model UN Club',
          description: 'Model UN announces a new president and new cabinet members for the model UN secretariat. The new appointees will be announced in our upcoming orientation',
        },
        {
          _id: '14231',
          image: require('../../assets/home/photography-club.png'),
          name: 'Photography Club',
          description: 'Model UN announces a new president and new cabinet members for the model UN secretariat. The new appointees will be announced in our upcoming orientation',
        }
      ]
    }
  ]

  return (
    <View style={styles.container}>
      <SectionList
        sections={SECTIONS}
        keyExtractor={({ _id }) => _id}
        ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
        ListFooterComponent={() => <View style={{ height: 150 }} />}
        ListHeaderComponent={() => <ListHeaderComponent />}
        renderSectionHeader={({ section }) =>
          <>
            <SectionTitle key={section.title} title={section.title} />
            {section.renderItems(section.data)}
          </>
        }
        renderItem={({ item, section }) => {
          if (!section.horizontal) {
            section.renderItems(section.data)
          }
        }}
      />
    </View>
  )
}

const ListHeaderComponent = () => {
  return (
    <>
      <Hero />
      <Header />
      <Ratings />
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          Model UN is a club that mimics the United Nations Conferences in New York. The purpose of this club is to create a generation of leaders that chose dialogue and peaceful resolutions over violence and bloodshed. Join us in making world a better place today!
        </Text>
      </View>
      <Divider color='#58719B' />
      <Stats />
      <Divider color='#58719B' />
      <Text style={styles.sectionTitle}>Our Executives</Text>
      <View style={styles.executiveContainer}>
        {
          EXECUTIVES.map((executive, index) => (
            <Executive
              key={index}
              name={executive.name}
              image={executive.image}
              position={executive.position}
            />
          ))
        }
      </View>
    </>
  )
}

const Hero = () => {
  return (
    <View style={styles.hero}>
      <Image
        source={require('../../assets/home/club-hero.png')}
        style={styles.image}
      />
      <View style={styles.avatar}>
        <Avatar />
      </View>
    </View>
  )
}

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerLeft}>
        <Text style={styles.title}>Model UN</Text>
      </View>
      <View style={styles.headerRight}>
        <TouchableOpacity style={styles.icon}>
          <MaterialCommunityIcons name="chat" size={24} color="#fff" />
        </TouchableOpacity>
        <CustomizedButton
          title={'Join the Club'}
          height={35}
          lineHeight={16}
          width={90}
          alignSelf=''
          justifyContent=''
        />
      </View>
    </View>
  )
}

const Ratings = () => {
  return (
    <View style={styles.ratings}>
      <Text>Rating</Text>
      <View style={styles.stars}>
        <AntDesign name="star" size={12} color="#E7B400" />
        <AntDesign name="star" size={12} color="#E7B400" />
        <AntDesign name="star" size={12} color="#E7B400" />
        <AntDesign name="star" size={12} color="#E7B400" />
        <AntDesign name="star" size={12} color="#E7B400" />
      </View>
    </View>
  )
}

const Stats = () => {
  return (
    <View style={styles.statsContainer}>
      <View style={[styles.membersContainer, styles.statContainer]}>
        <Text style={styles.statTitle}>1.2K</Text>
        <Text style={styles.statDescription}>Members</Text>
      </View>
      <View style={[styles.postsContainer, styles.statContainer]}>
        <Text style={styles.statTitle}>200</Text>
        <Text style={styles.statDescription}>Posts</Text>
      </View>
      <View style={[styles.eventsContainer, styles.statContainer]}>
        <Text style={styles.statTitle}>35</Text>
        <Text style={styles.statDescription}>Events</Text>
      </View>
    </View>
  )
}

const Executive = ({ name, image, position }) => {
  return (
    <View style={styles.executive}>
      <Avatar width={78} height={78} borderWidth={0} image={image}/>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.position}>{position}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'scroll',
    backgroundColor: '#EBEEF3',
  },
  hero: {
    position: 'relative',
    height: 330,
  },
  image: {
    width: '100%',
    height: 298,
    contentFit: 'cover',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  avatar: {
    position: 'absolute',
    bottom: 0,
    left: 10,
    ...SHADOW,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  headerLeft: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: '500',
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: 132,
    justifyContent: 'space-between'
  },
  icon: {
    backgroundColor: '#365486',
    width: 35,
    height: 35,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratings: {
    backgroundColor: '#CBE8EF',
    width: 127,
    height: 25,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderRadius: 2,
    marginHorizontal: 10,
  },
  stars: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  descriptionContainer: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  description: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '500',
  },
  statsContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 10,
    width: 248,
    height: 44,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  statContainer: {
    alignItems: 'center',
    height: 44,
    justifyContent: 'space-between',
  },
  statTitle: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '500',
  },
  statDescription: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '400',
  },
  executiveContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignSelf: 'center',
  },
  sectionTitle: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 10,
    marginLeft: 10
  },
  executive: {
    width: 120,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontFamily: 'Poppins',
    fontSize: 10,
    fontWeight: '900',
  },
  position: {
    fontFamily: 'Poppins',
    fontSize: 8,
    fontWeight: '500',
  }
})