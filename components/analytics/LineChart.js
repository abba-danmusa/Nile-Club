import React from 'react'
import { LineChart as LineChartAnalytics, Path, Grid, YAxis } from 'react-native-svg-charts'
import { View } from 'react-native'

class LineChart extends React.PureComponent {

  render() {

    const data = [1, 4, 5, 1, 4, 2, 5, 1, 3, 5, 5, 2, 5, 2, 3]
    const Y_AXIS = [1, 2, 3, 4, 5]
    const contentInset = { top: 20, bottom: 20 }

    const Shadow = ({ line }) => (
      <Path
        key={'shadow'}
        y={2}
        d={line}
        fill={'none'}
        strokeWidth={4}
        stroke={'rgba(134, 65, 244, 0.2)'}
      />
    )

    return (
      <View style={{ height: 200, flexDirection: 'row' }}>
        {/* <YAxis
          data={Y_AXIS}
          contentInset={contentInset}
          svg={{
            fill: 'grey',
            fontSize: 10,
          }}
          numberOfTicks={10}
          formatLabel={(value) => `${value}ºC`}
        /> */}
        <LineChartAnalytics
          style={{ height: 100 }}
          data={data}
          svg={{ stroke: 'rgb(134, 65, 244)' }}
          contentInset={{ top: 0, bottom: 20 }}
        >
          <Grid />
          <Shadow />
        </LineChartAnalytics>
      </View>
    )
  }

}

export default LineChart