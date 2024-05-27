import React from 'react'
import {
  Text,
  View,
  Dimensions
} from 'react-native';
import { PieChart } from 'react-native-svg-charts'

class PieChartWithDynamicSlices extends React.PureComponent {

  constructor(props) {
    super(props);
    this.analytics = props?.analytics
    this.state = {
      selectedSlice: {
        label: 'Members',
        value: this.analytics?.totalMembers
      },
      labelWidth: 0
    }
  }

  
  render() {
    const { totalMembers, totalEvents, totalLikes, totalPosts } = this.analytics || {}
    const { labelWidth, selectedSlice } = this.state;
    const { label, value } = selectedSlice;
    const keys = ['Members', 'Posts', 'Events', 'Likes']
    const values = [totalMembers, totalPosts, totalEvents, totalLikes]
    const colors = ['#600080', '#9900cc', '#c61aff', '#d966ff', '#ecb3ff']
    const data = keys.map((key, index) => {
      return {
        key,
        value: values[index],
        svg: { fill: colors[index] },
        arc: { outerRadius: (100 + values[index]) + '%', padAngle: label === key ? 0.1 : 0 },
        onPress: () => this.setState({ selectedSlice: { label: key, value: values[index] } })
      }
    })
    const deviceWidth = Dimensions.get('window').width
    const contentInset = { top: 0, bottom: 20 }

    return (
      <View style={{ justifyContent: 'center', flex: 1, marginTop: 150 }}>
        <PieChart
          contentInset={contentInset}
          style={{ height: 200 }}
          outerRadius={'80%'}
          innerRadius={'45%'}
          data={data}
        />
        <Text
          onLayout={({ nativeEvent: { layout: { width } } }) => {
            this.setState({ labelWidth: width });
          }}
          style={{
            position: 'absolute',
            left: deviceWidth / 2 - (labelWidth / 2) - 30,
            textAlign: 'center'
          }}>
          {`${label} \n ${value}`}
        </Text>
      </View>
    )
  }
}

export default PieChartWithDynamicSlices