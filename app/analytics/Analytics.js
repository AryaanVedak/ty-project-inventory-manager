import React, { useEffect, useState, useCallback } from 'react'
import useFetch from '../../Hook/useFetch';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ScrollView, RefreshControl } from 'react-native'; 
import { COLORS, SHADOWS, SIZES } from '../../constants'
import PieChart from 'react-native-pie-chart'
import useFetchPie from '../../Hook/useFetchPie';
import InvoiceStatus from '../../components/invoice/InvoiceStatus';
import axios from "axios";

const Analytics = () => {

  const {data, isLoading, error} = useFetchPie();
  const [refreshing, setRefreshing] = useState(false);
  // const [allData, setAllData] = useState(undefined)

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // const {data, isLoading, error} =  useFetchPie();
    // setAllData(data);
    // fetchRefresh()
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // const fetchRefresh = async () => {
  //   try {
  //       const response = await axios.request({
  //         method: 'GET',
  //         url: `http://192.168.0.189:5001/api/sale/getallinvoices`,
  //         params: {},
  //         headers: {
  //             'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4MGFjOTQ1ZDk2YWU5ZmUzOTdlN2U5In0sImlhdCI6MTY4NjIwMDYxMH0._RXLrE3g9RTlVC7MU6RMR64iOPkoioIb378qlboLFgM',
  //             'Content-Type': 'application/json',
  //         },
  //       });

  //       if (response.status === 200) {
  //         console.log("Data recieved")
  //         setAllData(response.data)
  //         // ToastAndroid.show(`Stats changed to: ${status.value}`,ToastAndroid.SHORT)
  //       } else {
  //           throw new Error('Error Occured');
  //       }
  //   } catch (error) {
  //       setError(error)
  //       console.log("Invoice not present: ", error);
  //   } finally {

  //   }
  // }

	return (
		<>
			<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={{paddingLeft: 20, paddingRight: 20, paddingTop: 10, alignItems: 'center'}}>
            <View style={{
              width: "90%",
              padding: SIZES.xLarge,
              backgroundColor: "#FFF",
              borderRadius: SIZES.medium,
              justifyContent: "space-between",
              ...SHADOWS.medium,
              shadowColor: COLORS.white,
            }}>
              <Text>PIE CHART</Text>
              {data ? (
                <>
                  <PieChart
                    widthAndHeight={250}
                    series={[data.total - data.profit - data.gst, data.profit, data.gst]}
                    sliceColor={['#FF5733', '#ffb300', '#ff9100']}
                    coverRadius={0.45}
                    coverFill={'#FFF'}
                    labels={['Product Cost, Profit, GST']}
                  />
                  <Text style={{color: "#ff5733", marginTop: 15}}>Product Cost: {data.total ? (data.total - data.profit - data.gst).toFixed(1) : undefined}</Text>
                  <Text style={{color: "#ffb300"}}>Profit: {data.total ? data.profit.toFixed(1) : undefined}</Text>
                  <Text style={{color: "#ff9100"}}>GST: {data.total ? data.gst.toFixed(1) : undefined}</Text>
                </>
              ) : (<></>)}
            </View>
            <InvoiceStatus/>
          </View>
        </ScrollView>
      </SafeAreaView>
		</>
	)
}

export default Analytics;

