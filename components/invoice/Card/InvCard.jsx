import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
// import DropDownPicker from 'react-native-dropdown-picker';

import styles from './invcard.style'

const interstyles = {
  app: {
    flex: 1, // the number of columns you want to devide the screen into
    marginHorizontal: "auto",
    // width: 400,
  },
  row: {
    flexDirection: "row"
  },
  "1col":  {
    flex:  1
  },
  "2col":  {
    flex:  2
  },
  "3col":  {
    flex:  3
  },
  "4col":  {
    flex:  4
  }
};


const InvCard = ({ data }) => {

	const Col = ({ numRows, children }) => {
		return  (
			<View style={interstyles[`${numRows}col`]}>{children}</View>
		)
	}
	
	const Row = ({ children }) => (
		<View style={interstyles.row}>{children}</View>
	)

  return (
    <View style={{marginTop: 20}}>
      <View style={interstyles.app}>
        <Row>
          <Col numRows={1}>
            <View style={styles.container}>
              <Text style={styles.jobName} numberOfLines={1}>Qty: </Text>
              <Text style={styles.jobNameMain} numberOfLines={1}>{data.taxable}</Text>
            </View>
          </Col>
          <Col numRows={1}>
            <View style={styles.container}>
              <Text style={styles.jobName} numberOfLines={1}>GST: </Text>
              <Text style={styles.jobNameMain} numberOfLines={1}>{data.gst}</Text>
            </View>
          </Col>
          <Col numRows={1}>
            <View style={styles.container}>
              <Text style={styles.jobName} numberOfLines={1}>Total: </Text>
              <Text style={styles.jobNameMain} numberOfLines={1}>{data.total}</Text>
            </View>
          </Col>
        </Row>
        <Row>
          <Col numRows={3}>
            <View style={styles.container}>
              <Text style={styles.jobName} numberOfLines={1}>Status: </Text>
              <Text style={styles.jobNameMainEx} numberOfLines={1}>{data.type}</Text>
            </View>
          </Col>
        </Row>
        <Row>
          <Col numRows={3}>
            <View style={styles.container}>
              <Text style={styles.jobName} numberOfLines={1}>Status: </Text>
              <Text style={styles.jobNameMainEx} numberOfLines={1}>{data.status}</Text>
              {/* <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
              /> */}
            </View>
          </Col>
        </Row>
      </View>
    </View>
  )
}

export default InvCard