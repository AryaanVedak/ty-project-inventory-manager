import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';

import styles from './invoicestatus.style';
import { COLORS } from '../../constants';
import { isLoaded } from 'expo-font';
import InvoiceCard from '../common/cards/invoice/InvoiceCard';
import useFetchAllInvoices from '../../Hook/useFetchAllInvoices';
import { useContext } from 'react';
import inventoryContext from '../../context/InventoryContext';

const InvoiceStatus = () => {

  const router = useRouter();
  // const [data, setData] = useState(undefined)
  // const [isLoading, setIsLoading] = useState(true)
  // const [error, setError] = useState()
  // const {data, isLoading, error} = useFetchAllInvoices();

  const context = useContext(inventoryContext)
  const {isLoading, invoices, getAllInvoices} = context;

  useEffect(() => {
    // fetchRefresh()
    getAllInvoices()
  },[])

  // useEffect(() => {
  //   console.log(data)
  // },[data])

  // const fetchRefresh = async () => {
  //   try {
  //     console.log("fetchRefresh")
  //     const response = await axios.request({
  //       method: 'GET',
  //       url: `http://192.168.0.189:5001/api/sale/getallinvoices`,
  //       params: {},
  //       headers: {
  //           'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4MGFjOTQ1ZDk2YWU5ZmUzOTdlN2U5In0sImlhdCI6MTY4NjIwMDYxMH0._RXLrE3g9RTlVC7MU6RMR64iOPkoioIb378qlboLFgM',
  //           'Content-Type': 'application/json',
  //       },
  //     });

  //     if (response.status === 200) {
  //       console.log("Data recieved")
  //       const d = response.data
  //       setData(d)
  //       setIsLoading(false)
  //     } else {
  //         throw new Error('Error Occured');
  //     }
  //   } catch (error) {
  //       setError(error)
  //       console.log("Invoice not present: ", error);
  //   } finally {

  //   }
  // }

  const refresh = () => {
    getAllInvoices()
    console.log("refresh")
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Invoices</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn} onPress={refresh}>
            Refresh
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator color={COLORS.primary} size="large" />
        ) : (
          invoices?.map((item) => (
            <InvoiceCard
              key={item._id}
              item={item}
              customer={item.customer}
              handleNavigate={() => router.push(`/invoice-details/${item._id}`)}
            />
          // <NearbyJobCard
          //   key={`item-code-${item.code}`}
          //   item={item}
          //   handleNavigate={() => router.push(`/product-details/${item._id}`)}
          // />
          ))
        )}
      </View>
    </View>
  )
}



export default InvoiceStatus