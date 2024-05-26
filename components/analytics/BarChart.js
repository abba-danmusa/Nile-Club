import React from 'react'
import { View } from 'react-native'
import { BarChart as BarChartAnalytics, Grid, YAxis } from 'react-native-svg-charts'
import { Text } from 'react-native-svg'

class BarChart extends React.PureComponent {

  render() {

    const data = [10, 5, 25, 15, 20]
    const X_AXIS = [0, 20, 30, 40, 50]

    const CUT_OFF = 20
    const Labels = ({ x, y, bandwidth, data }) => (
      data.map((value, index) => (
        <Text
          key={index}
          x={x(index) + (bandwidth / 2)}
          y={value < CUT_OFF ? y(value) - 10 : y(value) + 15}
          fontSize={14}
          fill={value >= CUT_OFF ? 'white' : 'black'}
          alignmentBaseline={'middle'}
          textAnchor={'middle'}
        >
          {value}
        </Text>
      ))
    )

    return (
      <View style={{ flexDirection: 'row', height: 200, paddingVertical: 16 }}>
        {/* <YAxis
          data={X_AXIS}
          contentInset={{ top: 10, bottom: 10 }}
          svg={{
            fill: 'grey',
            fontSize: 10,
          }}
          style={{ height: 200 }}
          numberOfTicks={5}
          formatLabel={(value) => `${value}*`}
        /> */}
        <BarChartAnalytics
          style={{ flex: 1, height: 200 }}
          data={data}
          svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
          contentInset={{ top: 10, bottom: 10 }}
          spacing={0.2}
          gridMin={0}
        >
          <Grid direction={Grid.Direction.HORIZONTAL} />
          <Labels />
        </BarChartAnalytics>
      </View>
    )
  }

}

export default BarChart