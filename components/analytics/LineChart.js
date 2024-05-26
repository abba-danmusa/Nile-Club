import React from 'react'
import { LineChart as LineChartAnalytics, Path, Grid, YAxis } from 'react-native-svg-charts'
import { View } from 'react-native'

class LineChart extends React.PureComponent {

  render() {

    const data = [5, 4, 5, 1, 4, 2, 5, 1, 3, 5, 5, 2, 3, 4, 3]
    // const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]
    const Y_AXIS = [1, 2, 3, 4, 5]
    const contentInset = { top: 20, bottom: 20 }

    const Shadow = ({ line }) => (
      <Path
        key={'shadow'}
        y={2}
        d={line}
        fill={'none'}
        strokeWidth={5}
        stroke={'rgba(134, 65, 244, 0.2)'}
      />
    )

    return (
      <View style={{ height: 200, flexDirection: 'row' }}>
        <YAxis
          data={Y_AXIS}
          contentInset={contentInset}
          svg={{
            fill: 'grey',
            fontSize: 10,
          }}
          style={{height: 200}}
          numberOfTicks={5}
          formatLabel={(value) => `${value}*`}
        />
        <LineChartAnalytics
          style={{ height: 200, width: '100%', paddingRight: 10 }}
          data={data}
          svg={{ stroke: 'rgb(134, 65, 244)' }}
          contentInset={{ top: 10, bottom: 20 }}
        >
          <Grid />
          <Shadow />
        </LineChartAnalytics>
      </View>
    )
  }

}

export default LineChart