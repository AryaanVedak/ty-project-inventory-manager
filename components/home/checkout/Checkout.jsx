import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

import styles from './checkout.style';
import { COLORS } from '../../../constants';
import PopularJobCard from '../../common/cards/nearby/NearbyJobCard';
import { isLoaded } from 'expo-font';
import CheckoutCard from '../../common/cards/checkout/CheckOutCard';

const Checkout = ({data, isLoading, error}) => {

  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Inventory Items</Text>
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
          <CheckoutCard
            key={`item-code-${item.code}`}
            item={item}
          />
          ))
        )}
      </View>
    </View>
  )
}



export default Checkout