import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native";
import { FAB } from '@rneui/themed';
import { Icon } from '@rneui/themed';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS, FONT, SIZES } from "../../constants";

import axios from "axios";  


const AddItem = () => {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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

  const getSelectedData = async (code) => {
    setSearch(code);
    fetchDataByCode(code);
  }

  const fetchDataByCode = async (code) => {
    setIsLoading(true);
    console.log(code)
    try {
        const r = await axios.request({
          method: 'GET',
          url: `http://192.168.29.169:5001/api/database/getproductbycode/${code}`,
          params: {},
          headers: {
              'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4MGFjOTQ1ZDk2YWU5ZmUzOTdlN2U5In0sImlhdCI6MTY4NjIwMDYxMH0._RXLrE3g9RTlVC7MU6RMR64iOPkoioIb378qlboLFgM',
              'Content-Type': 'application/json',
          },
        });
        const response = r.data
        console.log(r.data)
        setData(response)
        setIsLoading(false);
        setIsCode(true)
    } catch (error) {
        setError(error)
        alert('There is an error')
    } finally {
        setIsLoading(false);
    }
  }

  useEffect(() => {
    if(data) {
      setName(data.name)
    }
  }, [data])

  const addProduct = async (data) => {

    setIsLoading(true);
    try {
        const product = [data]
        const r = await axios.request({
          method: 'POST',
          data: JSON.stringify(product),
          url: `http://192.168.29.169:5001/api/inventory/addproduct`,
          params: {},
          headers: {
              'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4MGFjOTQ1ZDk2YWU5ZmUzOTdlN2U5In0sImlhdCI6MTY4NjIwMDYxMH0._RXLrE3g9RTlVC7MU6RMR64iOPkoioIb378qlboLFgM',
              'Content-Type': 'application/json',
          },
        });
        const response = r.data
        console.log(r.data)
        setResult(1)
        setIsLoading(false);
        console.log("Data Added")
    } catch (error) {
        setError(error)
        setResult(0)
        alert('There is an error')
    } finally {
        setIsLoading(false);
    }
  }
  
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
                onChangeText={(e) => changeSearch(e)}
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
                </>
              ) : console.log("No Code!")
            }
            <TouchableOpacity style={styles.searchBtn} onPress={sendData}>
              <MaterialIcons name="search" size={24} color="white"/>
            </TouchableOpacity>
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

