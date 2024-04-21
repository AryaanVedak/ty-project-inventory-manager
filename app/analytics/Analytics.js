import React, { useEffect, useState, useCallback } from 'react'
import useFetch from '../../Hook/useFetch';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ScrollView, Dimensions } from 'react-native'; 
import { COLORS, FONT, SHADOWS, SIZES } from '../../constants'
// import PieChart from 'react-native-pie-chart'
import useFetchPie from '../../Hook/useFetchPie';
import { PieChart, BarChart, LineChart  } from 'react-native-chart-kit';
import InvoiceStatus from '../../components/invoice/InvoiceStatus';
import { useContext } from 'react';
import inventoryContext from '../../context/InventoryContext';


const Analytics = () => {

  const [monthwiseGSTData, setMonthwiseGSTData] = useState([]);
  const [monthwiseEarningData, setMonthwiseEarningData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]); 
  const context = useContext(inventoryContext)
  const {profit, invoices, getProfits, getAllInvoices} = context;

  useEffect(() => {
    getProfits()
    getAllInvoices()
  },[])

  useEffect(() => {
    if (profit) {
      const chartData = [
        {
          name: 'Product',
          value: profit.total - profit.profit - profit.gst,
          color: '#02B2AF',
          legendFontColor: '#7F7F7F', 
          legendFontSize: 15, 
        },
        {
          name: 'Profit',
          value: profit.profit,
          color: '#2E96FF',
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        },
        {
          name: 'GST',
          value: profit.gst,
          color: '#B800D8',
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        },
      ];
      setPieChartData(chartData);
    } else {
      setPieChartData([]); 
    }
  }, [profit]); 

  useEffect(() => {
    const data = extractMonthwiseGSTData(invoices);
    setMonthwiseGSTData(data);
    const earningData = extractMonthwiseEarningData(invoices)
    setMonthwiseEarningData(earningData)
  }, [invoices]);

  // useEffect(() => {
  //   console.log(monthwiseEarningData)
  // },[monthwiseEarningData])

  const getMonthName = (monthNumber) => {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[monthNumber];
  };

  const extractMonthwiseGSTData = (transaction) => {
    const monthwiseGSTData = [];
    transaction.forEach((transaction) => {
      const transactionDate = new Date(transaction.date);
      const month = transactionDate.getMonth(); // Get 0-indexed month

      const existingMonthData = monthwiseGSTData.find(
        (monthData) => monthData.month === getMonthName(month) // Use month name
      );

      if (existingMonthData) {
        existingMonthData.totalGST += transaction.gst;
        existingMonthData.payment += transaction.taxable;
      } else {
        monthwiseGSTData.push({
          month: getMonthName(month), 
          payment: transaction.taxable,
          totalGST: transaction.gst,
        });
      }
    });
    return monthwiseGSTData;
  };

  const extractMonthwiseEarningData = (transactions) => {
    const monthwiseEarningData = [];
    transactions.forEach((transaction) => {
      const transactionDate = new Date(transaction.date);
      const month = transactionDate.getMonth(); // Get 0-indexed month

      const existingMonthData = monthwiseEarningData.find(
        (monthData) => monthData.month === getMonthName(month) // Use month name
      );

      if (existingMonthData) {
        existingMonthData.totalGST += transaction.gst;
        existingMonthData.payment += transaction.taxable;
      } else {
        monthwiseEarningData.push({
          month: getMonthName(month), 
          payment: transaction.taxable,
          totalGST: transaction.gst,
        });
      }
    });
    return monthwiseEarningData;
  };

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

	return (
		<>
			<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
        >
          <View style={{paddingLeft: 20, paddingRight: 20, alignItems: 'center'}}>
            <View style={{
              // width: "90%",
              padding: SIZES.large,
              backgroundColor: "#FFF",
              borderRadius: SIZES.medium,
              marginBottom: 15,
              ...SHADOWS.medium,
              shadowColor: COLORS.white,
            }}>
              <Text style={{fontFamily: FONT.bold, fontSize: SIZES.medium}}>Finances</Text>
              {pieChartData.length > 0 ? (
                <>
                  <PieChart
                    data={pieChartData}
                    width={300}
                    height={170}
                    chartConfig={chartConfig}
                    accessor="value"
                    backgroundColor="transparent" 
                    absolute 
                  />
                </>
              ) : (
                <Text>No data available for the pie chart.</Text>
              )}
            </View>
            <View style={{
              padding: SIZES.large,
              backgroundColor: "#FFF",
              borderRadius: SIZES.medium,
              marginBottom: 15,
              ...SHADOWS.medium,
              shadowColor: COLORS.white,
            }}>
              <Text style={{fontFamily: FONT.bold, fontSize: SIZES.medium, marginBottom:5}}>GST Data by Month</Text>
              {pieChartData.length > 0 ? (
                <>
                  <BarChart
                    data={{
                      labels: monthwiseGSTData.map((data) => data.month), // Extract labels
                      datasets: [
                        {
                          data: monthwiseGSTData.map((data) => data.totalGST), // Extract data
                          color: (opacity = 1) => `rgba(25, 118, 210, ${opacity})`, // Customize color
                          strokeWidth: 2, // Optional: Adjust stroke width
                        },
                      ],
                    }}
                    style={{
                      borderRadius: 20
                    }}
                    width={300}
                    height={200}
                    chartConfig={{
                      backgroundColor: "#ffffff",
                      backgroundGradientFrom: "#f5f7fa",
                      backgroundGradientTo: "#f5f7fa",
                      barPercentage: 0.8,
                      decimalPlaces: 0, // optional, defaults to 2dp
                      color: (opacity = 1) => `rgba(25,118,210, ${opacity})`,
                      labelColor: (opacity = 1) => `rgba(5,5,5, ${opacity})`,
                      propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726"
                      }
                    }}
                  />
                </>
              ) : (
                <Text>No data available for the pie chart.</Text>
              )}
            </View>
            <View style={{
              padding: SIZES.large,
              backgroundColor: "#FFF",
              borderRadius: SIZES.medium,
              ...SHADOWS.medium,
              shadowColor: COLORS.white,
            }}>
              <Text style={{fontFamily: FONT.bold, fontSize: SIZES.medium, marginBottom:5}}>Earnings by Month</Text>
              {pieChartData.length > 0 ? (
                <>
                  <LineChart
                    data={{
                      labels: monthwiseEarningData.map((data) => data.month), // Extract labels
                      datasets: [
                        {
                          data: monthwiseEarningData.map((data) => data.payment), // Extract income data
                        },
                      ],
                    }}
                    style={{
                      borderRadius: 20
                    }}
                    width={300}
                    height={200}
                    chartConfig={{
                      backgroundColor: "#ffffff",
                      backgroundGradientFrom: "#f5f7fa",
                      backgroundGradientTo: "#f5f7fa",
                      decimalPlaces: 0, // optional, defaults to 2dp
                      color: (opacity = 1) => `rgba(25,118,210, ${opacity})`,
                      labelColor: (opacity = 1) => `rgba(5,5,5, ${opacity})`,
                      strokeWidth: 2, // optional, default 3
                      barPercentage: 0.5,
                      useShadowColorFromDataset: false // optional
                    }}
                  />
                </>
              ) : (
                <Text>No data available for the pie chart.</Text>
              )}
            </View>
            <InvoiceStatus/>
          </View>
        </ScrollView>
      </SafeAreaView>
		</>
	)
}

export default Analytics;


