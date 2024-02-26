import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

import styles from './invoicestatus.style';
import { COLORS } from '../../constants';
import { isLoaded } from 'expo-font';
import InvoiceCard from '../common/cards/invoice/InvoiceCard';
import useFetchAllInvoices from '../../Hook/useFetchAllInvoices';

const InvoiceStatus = () => {

  const router = useRouter();
  const {data, isLoading, error} = useFetchAllInvoices();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Invoices</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>
            Show all
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator color={COLORS.primary} size="large" />
        ): error ? (
          <Text>Something went wrong!</Text>
        ) : (
          data?.map((item) => (
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