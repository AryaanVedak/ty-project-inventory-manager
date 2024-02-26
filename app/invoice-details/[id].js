import { Stack, useRouter, useSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  StyleSheet
} from "react-native";
import { Company, ScreenHeaderBtn } from "../../components";
import { COLORS, icons, SIZES, FONT } from "../../constants";
import useFetchSingleInvoice from "../../Hook/useFetchSingleInvoice";
import InvCard from "../../components/invoice/Card/InvCard";

const InvoiceDetails = () => {
  const params = useSearchParams();
  const router = useRouter();
  // console.log(params.id)
  const { data, isLoading, error, refetch } = useFetchSingleInvoice(params.id);

  const [activeTab, setActiveTab] = useState();
  const [refreshing, setRefreshing] = useState(false);
  // const [invoice, setInvoice] = useState([]);

  const onRefresh = useCallback();

  useEffect(() => {
    console.log(data)
  },[data])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension='60%'
              handlepress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension='60%' />
          ),
          headerTitle: "",
        }}
      />
      <>
        <ScrollView showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator size='large' color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : data.length === 0 ? (
            <Text>No data available</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <View style={styles.container}> 
                <Text style={styles.userName}>Analysis</Text>
                <Text style={styles.welcomeMessage}>Invoice Details</Text>
              </View>
              {/* <Company
                productTitle={data.name}
                code={data.code}
                qty={data.qty}
                mrp={data.name}
              /> */}

              <InvCard 
                data={data}
              />

            </View>
          )}
        </ScrollView>
      </>
    </SafeAreaView>
  );
};

export default InvoiceDetails;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  userName: {
    fontFamily: FONT.regular,
    fontSize: SIZES.large,
    color: COLORS.secondary,
  },
  welcomeMessage: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    marginTop: 2,
  },
});


