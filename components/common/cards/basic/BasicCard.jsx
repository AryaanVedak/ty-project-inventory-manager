import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { COLORS, FONT, SHADOWS, SIZES } from "../../../../constants";
import styles from './basiccard.style'
import moment from 'moment';


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


const BasicCard = ({ data }) => {

	const Col = ({ numRows, children }) => {
		return  (
			<View style={interstyles[`${numRows}col`]}>{children}</View>
		)
	}
	
	const Row = ({ children }) => (
		<View style={interstyles.row}>{children}</View>
	)

  const formatDate = (dateString) => {
    const date = moment.utc(dateString);  // Parse the date string in UTC
    return date.format('DD/MM/YY');        // Format the date in dd/mm/yy
  };

  return (
    <View style={interstyles.app}>
			<Text style={{
        margin: 4,
        fontFamily: FONT.bold,
        fontSize: SIZES.large,
      }}>Details</Text>
			<Row>
        <Col numRows={1}>
          <View style={styles.container}>
						<Text style={styles.jobName} numberOfLines={1}>Qty: </Text>
						<Text style={styles.jobNameMain} numberOfLines={1}>{data.qty}</Text>
					</View>
        </Col>
        <Col numRows={1}>
          <View style={styles.container}>
						<Text style={styles.jobName} numberOfLines={1}>MRP: </Text>
						<Text style={styles.jobNameMain} numberOfLines={1}>{data.mrp}</Text>
					</View>
        </Col>
        <Col numRows={1}>
          <View style={styles.container}>
						<Text style={styles.jobName} numberOfLines={1}>CP: </Text>
						<Text style={styles.jobNameMain} numberOfLines={1}>{data.costprice}</Text>
					</View>
        </Col>
			</Row>
      <Row>
        <Col numRows={3}>
          <View style={styles.container}>
						<Text style={styles.jobName} numberOfLines={1}>Expiry Date: </Text>
						<Text style={styles.jobNameMainEx} numberOfLines={1}>{formatDate(data.expirydate)}</Text>
					</View>
        </Col>
      </Row>
		</View>
  )
}


export default BasicCard