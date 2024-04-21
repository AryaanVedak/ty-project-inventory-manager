import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

import styles from './popularjobs.style';
import { COLORS, SIZES } from '../../../constants';
import PopularJobCard from '../../common/cards/popular/PopularJobCard';
import { isLoaded } from 'expo-font';
import useFetch from '../../../Hook/useFetch';
import inventoryContext from '../../../context/InventoryContext';
import { useContext } from 'react';

const Popularjobs = () => {

  const router = useRouter();
  // const {data, isLoading, error} = useFetch();
  const context = useContext(inventoryContext);
  const { isLoading, analysis, getAnalysis } = context;
  const [data, setData] = useState();

  useEffect(() => {
    getAnalysis()
  },[])

  useEffect(() => {

    {analysis && setData([
      {
        name: "Today's Revenue",
        value: analysis.todayTotalRevenue
      },
      {
        name: "Total Revenue",
        value: analysis.totalRevenue
      },
      {
        name: "Most Bought Product",
        value: analysis.mostBoughtProduct
      },
      {
        name: "Most Profitable Product",
        value: analysis.mostProfitableProduct
      }  
    ])}
    console.log(analysis)
  },[analysis])

  useEffect(() => {
    console.log(data)
  },[data])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Stats at Glance</Text>
        <TouchableOpacity onPress={() => {getAnalysis()}}>
          <Text style={styles.headerBtn}>
            Refresh
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator color={COLORS.primary} size="large" />
        ) : (
          <FlatList
            data={data}
            renderItem={({item}) => (
              <PopularJobCard 
                item={item}
              />
            )}
            keyExtractor={item => item.name}
            contentContainerStyle={{columnGap: SIZES.medium}}
            horizontal
          />
        )}
      </View>
    </View>
  )
}



export default Popularjobs