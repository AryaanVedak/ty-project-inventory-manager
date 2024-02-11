import { useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { Stack, useRouter } from "expo-router";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import {COLORS, icons, images, SIZES} from '../constants'
import { ScreenHeaderBtn } from "../components";
import Buying from './buying/BuyingPage';
import HomePage from "../components/home/HomePage";
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Icon } from "react-native-paper";
import InventoryAdd from "./inventory/inventoryPage";
import DatabasePage from "./dbpage/databasePage";


const Home = () => {
	
  const Tab = createBottomTabNavigator();

  renderContent = (pageText) => {
    return (
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
        <SearchBar placeholder="Search" showCancelButton />
        <Text style={{ margin: 50 }}>{pageText}</Text>
      </View>
    )
  }

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
        <Stack.Screen
          options={{
            headerStyle: {backgroundColor: COLORS.lightWhite},
            headerShadowVisible: false,
            headerLeft: () => (
              <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%"/>
            ),
            headerRight: () => (
              <ScreenHeaderBtn iconUrl={icons.barcode} dimension="70%"/>
            ),
            headerTitle: "",
          }}
        />
        {/* <HomePage/> */}
        <Tab.Navigator 
          screenOptions={({route}) => ({
            headerShown: false,
          })}
        >
          <Tab.Screen name='Home' component={HomePage} options={{
            tabBarIcon: ({focused}) => {
              return (
                <View style={{alignItems: "center", justifyContent: "center"}}>
                  <Ionicons name="home" size={24} color={focused ? COLORS.tertiary : "black"} />
                </View>
              )
            }
          }}/>
          <Tab.Screen name='Database' component={DatabasePage} options={{
            tabBarIcon: ({focused}) => {
              return (
                <View style={{alignItems: "center", justifyContent: "center"}}>
                  <MaterialIcons name="inventory" size={24}  color={focused ? COLORS.tertiary : "black"} />
                </View>
              )
            }
          }}/>
          <Tab.Screen name='Inventory' component={InventoryAdd} options={{
            tabBarIcon: ({focused}) => {
              return (
                <View style={{alignItems: "center", justifyContent: "center"}}>
                  <MaterialIcons name="inventory" size={24}  color={focused ? COLORS.tertiary : "black"} />
                </View>
              )
            }
          }}/>
          <Tab.Screen name='Buying' component={Buying} options={{
            tabBarIcon: ({focused}) => {
              return (
                <View style={{alignItems: "center", justifyContent: "center"}}>
                  <MaterialIcons name="business-center" size={24} color={focused ? COLORS.tertiary : "black"} />
                </View>
              )
            }
          }}/>
        </Tab.Navigator>
      </SafeAreaView>
    </>
  )
}

export default Home;