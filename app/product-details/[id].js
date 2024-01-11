import { Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { Stack, useRouter, useGlobalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';

import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics } from '../../components'
import { COLORS, icons, SIZES } from '../../constants';
import useFetch from '../../Hook/useFetch';
import useFetchById from '../../Hook/useFetchById';

const ProductDetails = () => {

    const params = useGlobalSearchParams();
    const router = useRouter();

    const { data, isLoading, error, refetch } = useFetchById(params.id);

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {

    }


    return (
      <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
        <Stack.Screen
          options={{
            headerStyle: {backgroundColor: COLORS.lightWhite},
            headerShadowVisible: false,
            headerBackVisible: false,
            headerLeft: () => (
              <ScreenHeaderBtn
                iconUrl={icons.left}
                dimension="60%"
                handlepress={() => router.back()}
              />
            ),
            headerRight: () => (
              <ScreenHeaderBtn
                iconUrl={icons.share}
                dimension="60%"
                handlepress={() => router.back()}
              />
            ),
            headerTitle: ''
          }}
        >
          <>
            <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
              {isLoading ? (
                <ActivityIndicator size="large" color={COLORS.primary} /> 
                ) : error ? (
                  <Text>Somthing went wrong</Text>
                ) : data.length === 0 ? (
                  <Text>No Data</Text>
                ) : (
                  <View style={{padding: SIZES.medium, paddingBottom: 100}}>
                    <Company

                    />
                    <JobTabs

                    />
                  </View>
                )
              }
            </ScrollView>
          </>
        </Stack.Screen>
      </SafeAreaView>
    )
}

export default ProductDetails;