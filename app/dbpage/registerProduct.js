import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, ToastAndroid } from 'react-native';
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


const RegisterProduct = () => {

	const [code, setCode] = useState();
	const [name, setName] = useState();

  const navigation = useNavigation();
  const context = useContext(inventoryContext)
  const {status, addProductToDB} = context;

  const getSelectedData = async (code) => {
    setCode(code);
  }

  const sendData = () => {
    const payload = {
    "name": name,
    "code": code,
    }

    addProductToDB(payload)
  }

  useEffect(() => {
    if(status === 200) {
      ToastAndroid.show('Product Registered', ToastAndroid.SHORT);
    } else if (status === 403) {
      ToastAndroid.show('Product is already registered', ToastAndroid.SHORT);
    } else if (status === 400) {
      ToastAndroid.show('Something went wrong!', ToastAndroid.SHORT);
    } else if (status === 500) {
      ToastAndroid.show('No network', ToastAndroid.SHORT);
    }
  },[status])

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
            <Text style={styles.welcomeMessage}>Database</Text>
            <Text style={styles.userName}>Register product to the database</Text>
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
                value={code}
                onChangeText={(e) => setCode(e)}
                placeholder="Enter product code"
              />
            </View>
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
                value={name}
                onChangeText={(e) => setName(e)}
                placeholder="Enter product name"
              />
            </View>
            <TouchableOpacity style={styles.searchBtn} onPress={sendData}>
              <Text style={{color: "white"}}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
		</>
	)
}

export default RegisterProduct;



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

