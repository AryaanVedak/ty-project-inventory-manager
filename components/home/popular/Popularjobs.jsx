import React from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

import styles from './popularjobs.style';
import { COLORS, SIZES } from '../../../constants';
import PopularJobCard from '../../common/cards/popular/PopularJobCard';
import { isLoaded } from 'expo-font';
import useFetch from '../../../Hook/useFetch';

const Popularjobs = () => {

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
          <FlatList
            data={data}
            renderItem={({item}) => (
              <PopularJobCard 
                item={item}
                selectedJob={item.code}
                // handleCardPress={handleCardPress}
              />
            )}
            keyExtractor={item => item?.job_id}
            contentContainerStyle={{columnGap: SIZES.medium}}
            horizontal
          />
        )}
      </View>
    </View>
  )
}



export default Popularjobs