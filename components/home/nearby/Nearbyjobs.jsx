import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

import styles from './nearbyjobs.style';
import { COLORS } from '../../../constants';
import PopularJobCard from '../../common/cards/nearby/NearbyJobCard';
import { isLoaded } from 'expo-font';
import useFetch from '../../../Hook/useFetch';
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard';

const Nearbyjobs = () => {

  const router = useRouter();
  const {data, isLoading, error} = useFetch();

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
          <NearbyJobCard
            key={`item-code-${item.code}`}
            item={item}
            handleNavigate={() => router.push()`/product-details/${item.code}`}
          />
          ))
        )}
      </View>
    </View>
  )
}



export default Nearbyjobs