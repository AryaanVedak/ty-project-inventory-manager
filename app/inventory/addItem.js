import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, ToastAndroid } from 'react-native';
import { SafeAreaView } from "react-native";
import { FAB } from '@rneui/themed';
import { Icon } from '@rneui/themed';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS, FONT, SIZES } from "../../constants";

import axios from "axios";  
import { useContext } from 'react';
import inventoryContext from '../../context/InventoryContext';


const AddItem = () => {

  // const [data, setData] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); 
  const [result, setResult] = useState(); 

	const [search, setSearch] = useState();
  const [isCode, setIsCode] = useState(false)
	const [name, setName] = useState();
	const [qty, setQty] = useState();
	const [cp, setCP] = useState();
	const [mrp, setMRP] = useState();
	const [expiry, setExpiry] = useState();

  const navigation = useNavigation();

  const context = useContext(inventoryContext)
  const {isLoading, status, prodName, isSuccess, getProductByCode, addProduct} = context;

  const getSelectedData = async (code) => {
    setSearch(code);
    getProductByCode(code);
  }

  useEffect(() => {
    if(status === 200) {
      ToastAndroid.show('Product Found', ToastAndroid.SHORT);
    } else if (status === 404) {
      ToastAndroid.show('Product Not Found!', ToastAndroid.SHORT);
    } else if (status === 500) {
      ToastAndroid.show('Internal Server Error', ToastAndroid.SHORT);
    }
  },[status])

  useEffect(() => {
    if (prodName) {
      setName(prodName)
      setIsCode(true)
    }
  },[prodName])
  
  useEffect(() => {
    if(result) {
      result == 1 ? setIsCode(false) : console.log("A problem occured")
      setSearch(undefined)
    }
  }, [result])

  const sendData = () => {
    const payload = {
    "name": name,
    "code": search,
    "costprice": cp,
    "mrp": mrp,
    "qty": qty,
    "expirydate": expiry
    }

    addProduct(payload)

  }

  useEffect(() => {
    if(isSuccess === true) {
      ToastAndroid.show('Items added successfully!', ToastAndroid.SHORT);
    } else if (isSuccess === false) {
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT); 
    }
  },[])

	return (
		<>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FAFAFC" }}>
        <FAB
          // placement='right'
          color="#312651"
          style={{
            zIndex: 1,
            position: 'absolute',
            bottom: 20,
            right: 30
          }}	
          onPress={() => navigation.navigate('inventoryscanner', { onDataScanned: getSelectedData })}
        >
          <Icon
            reverse
            name='barcode'
            type='font-awesome'
            color='#312651'
          />
        </FAB>
        <View style={{paddingLeft: 20, paddingRight: 20, paddingTop: 30}}>
          <View style={styles.container}> 
            <Text style={styles.welcomeMessage}>Inventory</Text>
            <Text style={styles.userName}>Add products to the inventory</Text>
          </View>
          <View style={styles.searchContainer}>
            <View style={{
              backgroundColor: COLORS.white,
              margin: 15,
              // marginBottom: 30,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: SIZES.medium,
              height: "100%",
              width: "95%"
            }}>
              <TextInput  
                style={styles.searchInput}
                value={search}
                onChangeText={(e) => setSearch(e)}
                placeholder="Enter product code"
              />
            </View>
            {
              isCode ? (
                <>
                  <View style={styles.textContainer}>
                    <TextInput  
                      style={styles.searchInput}
                      value={name}
                      onChangeText={(e) => setName(e)}
                      placeholder="Enter product name"
                    />
                  </View>
                  <View style={styles.textContainer}>
                  <TextInput  
                      style={styles.searchInput}
                      value={qty}
                      onChangeText={(e) => setQty(e)}
                      placeholder="Enter quantity"
                    />
                  </View>
                  <View style={styles.textContainer}>
                    <TextInput  
                      style={styles.searchInput}
                      value={cp}
                      onChangeText={(e) => setCP(e)}
                      placeholder="Enter Buying Price"
                    />
                  </View>
                  <View style={styles.textContainer}>
                    <TextInput  
                      style={styles.searchInput}
                      value={mrp}
                      onChangeText={(e) => setMRP(e)}
                      placeholder="Enter MRP"
                    />
                  </View>
                  <View style={styles.textContainer}>
                    <TextInput  
                      style={styles.searchInput}
                      value={expiry}
                      onChangeText={(e) => setExpiry(e)}
                      placeholder="Enter Expiry Date"
                    />
                  </View>
                  <TouchableOpacity style={styles.searchBtn} onPress={sendData}>
                    <MaterialIcons name="search" size={24} color="white"/>
                  </TouchableOpacity>
                </>
              ) : 
              <TouchableOpacity style={styles.searchBtn} onPress={() => getSelectedData(search)}>
                <MaterialIcons name="search" size={24} color="white"/>
              </TouchableOpacity>
            }
          </View>
        </View>
      </SafeAreaView>
		</>
	)
}

export default AddItem;



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
  searchContainer: {
    // justifyContent: "center",
    alignItems: "center",
    // flexDirection: "row",
    marginTop: SIZES.large,
    height: 50,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginRight: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    height: "100%",
  },
  searchInput: {
    fontFamily: FONT.regular,
    width: "100%",
    height: "100%",
    margin: 20,
    paddingHorizontal: SIZES.medium,
  },
  searchBtn: {
    width: 100,
    height: "100%",
    backgroundColor: COLORS.tertiary,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBtnImage: {
    width: "50%",
    height: "50%",
    tintColor: COLORS.white,
  },
  tabsContainer: {
    width: "100%",
    marginTop: SIZES.medium,
  },
  textContainer: {
    backgroundColor: COLORS.white,
    margin: 15,
    // marginBottom: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    height: "100%",
    width: "95%"
  },
  tab: (activeJobType, item) => ({
    paddingVertical: SIZES.small / 2,
    paddingHorizontal: SIZES.small,
    borderRadius: SIZES.medium,
    borderWidth: 1,
    borderColor: activeJobType === item ? COLORS.secondary : COLORS.gray2,
  }),
  tabText: (activeJobType, item) => ({
    fontFamily: FONT.medium,
    color: activeJobType === item ? COLORS.secondary : COLORS.gray2,
  }),
});

