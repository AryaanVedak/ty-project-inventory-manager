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
          invoices?.slice().reverse()?.map((item) => (
            <InvoiceCard
              key={item._id}
              item={item}
              customer={item.customer}
              handleNavigate={() => router.push(`/invoice-details/${item._id}`)}
            />
          ))
        )}
      </View>
    </View>
  )
}



export default InvoiceStatus