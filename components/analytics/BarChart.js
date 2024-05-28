import React from 'react'
import { View } from 'react-native'
import { BarChart as BarChartAnalytics, Grid, YAxis } from 'react-native-svg-charts'
import { Text } from 'react-native-svg'

class BarChart extends React.PureComponent {
  constructor (props) {
    super(props)
    this.members = props?.analytics?.map(member => member.count)
    this.months = props?.analytics
  }

  render() {

    const data = [...this.members]
    const X_AXIS = [0, ...this.members]
    const CUT_OFF = 0
    const Labels = ({ x, y, bandwidth, data }) => (
      this.months?.map((value, index) => (
        <Text
          key={index}
          x={x(index) + (bandwidth / 2)}
          y={value.count < CUT_OFF ? y(value.count) - 10 : y(value.count) + 15}
          fontSize={14}
          fill={value.count >= CUT_OFF ? 'white' : 'black'}
          alignmentBaseline={'middle'}
          textAnchor={'middle'}
        >
          {value.month}
        </Text>
      ))
    )

    return (
      <View style={{ flexDirection: 'row', height: 200, paddingVertical: 16 }}>
        <YAxis
          data={X_AXIS}
          contentInset={{ top: 10, bottom: 10 }}
          svg={{
            fill: 'grey',
            fontSize: 10,
          }}
          style={{ height: 200 }}
          numberOfTicks={5}
          formatLabel={(value) => `${value} M(s)`}
        />
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