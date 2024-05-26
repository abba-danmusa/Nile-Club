import React from 'react';
import { StyleSheet, View, ScrollView, Text, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '@rneui/themed'
import { SHADOW } from '../../utils/styles';
import PieChartWithDynamicSlices from '../../components/analytics/PieChart';
import LineChart from '../../components/analytics/LineChart';

const Analytics = () => {
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={'#fff'} barStyle="dark-content" />
      <ScrollView>
        <Card containerStyle={{ height: 350, ...SHADOW, borderRadius: 10 }}>
          <PieChartWithDynamicSlices/>
        </Card>
        <View style={styles.itemsContainer}>
          <Card containerStyle={styles.itemContainer}>
            <LineChart/>
          </Card>
          <Card containerStyle={styles.itemContainer}>
          </Card>
        </View>
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