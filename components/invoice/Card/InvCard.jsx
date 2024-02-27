import React from 'react'
import { useCallback, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, ToastAndroid } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import axios from "axios";  


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

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(data.status);
  const [error, setError] = useState(data.status);
  const [items, setItems] = useState([
    {label: 'Complete', value: 'complete'},
    {label: 'Incomplete', value: 'incomplete'}
  ]);

  useEffect(() => {
    console.log(value)
  },[value])

  const changeStatus = async (status) => {
    try {
        const response = await axios.request({
          method: 'POST',
          data: JSON.stringify({
            status: status.value
          }),
          url: `http://192.168.0.189:5001/api/sale/updateinvoicestatus/${data._id}`,
          params: {},
          headers: {
              'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4MGFjOTQ1ZDk2YWU5ZmUzOTdlN2U5In0sImlhdCI6MTY4NjIwMDYxMH0._RXLrE3g9RTlVC7MU6RMR64iOPkoioIb378qlboLFgM',
              'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          console.log("status changes!")
          ToastAndroid.show(`Stats changed to: ${status.value}`,ToastAndroid.SHORT)
        } else {
            throw new Error('Error Occured');
        }
    } catch (error) {
        setError(error)
        console.log("Invoice not present: ", error);
    } finally {

    }
  }

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
              {/* <Text style={styles.jobNameMainEx} numberOfLines={1}>{data.status}</Text> */}
              <DropDownPicker
                style={{marginTop: 10}}
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                onSelectItem={(item) => {changeStatus(item)}}
              />
            </View>
          </Col>
        </Row>
      </View>
    </View>
  )
}

export default InvCard