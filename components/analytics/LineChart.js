import React from 'react'
import { LineChart as LineChartAnalytics, Path, Grid, YAxis } from 'react-native-svg-charts'
import { View } from 'react-native'

class LineChart extends React.PureComponent {
  
  constructor(props) {
    super(props)
    this.analytics = props?.analytics
  }

  render() {
    const data = [4, ...this.analytics?.last15Reviews]
    const Y_AXIS = [4, ...this.analytics?.last15Reviews]
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