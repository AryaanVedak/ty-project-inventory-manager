import React, { useEffect, useState, useCallback } from 'react'
import useFetch from '../../Hook/useFetch';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ScrollView, RefreshControl } from 'react-native'; 
import { COLORS, SHADOWS, SIZES } from '../../constants'
import PieChart from 'react-native-pie-chart'
import useFetchPie from '../../Hook/useFetchPie';
import InvoiceStatus from '../../components/invoice/InvoiceStatus';
import axios from "axios";
import { useContext } from 'react';
import inventoryContext from '../../context/InventoryContext';

const Analytics = () => {

  // const {data, isLoading, error} = useFetchPie();
  // const [refreshing, setRefreshing] = useState(false);
  // const [allData, setAllData] = useState(undefined)

  const context = useContext(inventoryContext)
  const {profit, getProfits} = context;

  useEffect(() => {
    getProfits()
  },[])

  // const onRefresh = useCallback(() => {
  //   setRefreshing(true);
  //   setTimeout(() => {
  //     setRefreshing(false);
  //   }, 2000);
  // }, []);

	return (
		<>
			<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          // }
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
              {profit ? (
                <>
                  <PieChart
                    widthAndHeight={250}
                    series={[profit.total - profit.profit - profit.gst, profit.profit, profit.gst]}
                    sliceColor={['#FF5733', '#ffb300', '#ff9100']}
                    coverRadius={0.45}
                    coverFill={'#FFF'}
                    labels={['Product Cost, Profit, GST']}
                  />
                  <Text style={{color: "#ff5733", marginTop: 15}}>Product Cost: {profit.total ? (profit.total - profit.profit - profit.gst).toFixed(1) : undefined}</Text>
                  <Text style={{color: "#ffb300"}}>Profit: {profit.total ? profit.profit.toFixed(1) : undefined}</Text>
                  <Text style={{color: "#ff9100"}}>GST: {profit.total ? profit.gst.toFixed(1) : undefined}</Text>
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

