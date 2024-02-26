import React, { useEffect, useState } from 'react'
import useFetch from '../../Hook/useFetch';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '@rneui/themed';
import { View, Text, ScrollView } from 'react-native'; 
import { COLORS, SHADOWS, SIZES } from '../../constants'
import PieChart from 'react-native-pie-chart'
import useFetchPie from '../../Hook/useFetchPie';
import { jsx, Canvas, Chart, Interval, Legend } from '@antv/f2';
import InvoiceStatus from '../../components/invoice/InvoiceStatus';

const Analytics = () => {

  const {data, isLoading, error} = useFetchPie();

	return (
		<>
			<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
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
