import React from 'react';
import { StyleSheet, View, ScrollView, Text, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Divider } from '@rneui/themed'
import { SHADOW } from '../../utils/styles';
import PieChartWithDynamicSlices from '../../components/analytics/PieChart';
import LineChart from '../../components/analytics/LineChart';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import BarChart from '../../components/analytics/BarChart';
import { useAnalytics } from '../../hooks/queries/useClub';

const Analytics = () => {
  
  const { data, isPending } = useAnalytics()
  const analytics = data?.data?.analytics

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={'#fff'} barStyle="dark-content" />
      <ScrollView>
        <Card containerStyle={{ height: 350, ...SHADOW, borderRadius: 10 }}>
          <PieChartWithDynamicSlices analytics={analytics} />
        </Card>
        <Card containerStyle={{ height: 350, ...SHADOW, borderRadius: 10 }}>
          <Card.Title>
            <Text>Ratings (Latest 15)</Text>
          </Card.Title>
          <LineChart analytics={analytics} />
          <View style={{alignSelf: 'flex-end'}}>
            <Text style={{ fontFamily: 'Poppins', fontSize: 14, fontWeight: '700', marginBottom: 20 }}>Keys:</Text>
            <View style={{flexDirection: 'row'}}>
              <MaterialCommunityIcons name="chart-line" size={18} color="#d966ff" />
              <Text style={{ fontFamily: 'Poppins', fontSize: 12, color: '#d966ff' }}>: </Text>
              <Text style={{ fontFamily: 'Poppins', fontSize: 12}}>
                Number of stars
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <MaterialCommunityIcons name="chart-line-variant" size={20} color="#d966ff" />
              <Text style={{ fontFamily: 'Poppins', fontSize: 12, color: '#d966ff' }}>: </Text>
              <Text style={{ fontFamily: 'Poppins', fontSize: 12 }}>Ratings</Text>
            </View>
          </View>
        </Card>

        <Card containerStyle={{ height: 350, ...SHADOW, borderRadius: 10 }}>
          <Card.Title>
            <Text>New Members</Text>
          </Card.Title>
          <Divider />
          <BarChart analytics={analytics} />
          <View style={{ alignSelf: 'flex-end' }}>
            <Text style={{ fontFamily: 'Poppins', fontSize: 14, fontWeight: '700', marginBottom: 10, marginTop: 20 }}>Keys:</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontFamily: 'Poppins', fontSize: 12, color: '#d966ff' }}>Y-Axis: </Text>
              <Text style={{ fontFamily: 'Poppins', fontSize: 12 }}>
                New Members
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontFamily: 'Poppins', fontSize: 12, color: '#d966ff' }}>X-Axis: </Text>
              <Text style={{ fontFamily: 'Poppins', fontSize: 12 }}>Month</Text>
            </View>
          </View>
        </Card>

        {/* <View style={styles.itemsContainer}>
          
          <Card containerStyle={styles.itemContainer}>
            <Card.Title>
              <Text>New Members</Text>
            </Card.Title>
            <Divider />
            <BarChart/>
          </Card>

          <Card containerStyle={styles.itemContainer}>
            <Card.Title>
              <Text>Total Likes</Text>
            </Card.Title>
            <Divider />
          </Card>

        </View> */}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  itemsContainer: {
    flexDirection: 'row',
    marginHorizontal: 15,
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  itemContainer: {
    height: 200,
    width: '47%',
    margin: 0,
    ...SHADOW,
    borderRadius: 10
  }
})

export default Analytics