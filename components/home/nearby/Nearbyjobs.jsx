import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

import styles from './nearbyjobs.style';
import { COLORS } from '../../../constants';
import useFetch from '../../../Hook/useFetch';
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard';
import { Context } from 'react';
import inventoryContext from '../../../context/InventoryContext';
import { useContext } from 'react';

const Nearbyjobs = () => {

  const router = useRouter();
  // const {data, isLoading, error} = useFetch();
  const context = useContext(inventoryContext);
  const { isLoading, product, currentProduct, getProductById, fetchProduct } = context;

  useEffect(() => {
    fetchProduct()
  }, [])


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
        ) : (
          product?.map((item) => (
          <NearbyJobCard
            key={`item-code-${item.code}`}
            item={item}
            handleNavigate={() => router.push(`/product-details/${item._id}`)}
          />
          ))
        )}
        {/* {data ? 
          data?.map((item) => (
            <NearbyJobCard
              key={`item-code-${item.code}`}
              item={item}
              handleNavigate={() => router.push(`/product-details/${item._id}`)}
            />
          )) : <></>
        } */}
      </View>
    </View>
  )
}



export default Nearbyjobs