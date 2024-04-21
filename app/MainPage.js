import { useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, Image } from "react-native";
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
import Analytics from "./analytics/Analytics";;
import { Entypo } from '@expo/vector-icons';
import styles from '../components/common/header/screenheader.style'
import inventoryContext from "../context/InventoryContext";
import { useContext } from "react";


const MainPage = ({ onLogout }) => {

  const Tab = createBottomTabNavigator();

  const context = useContext(inventoryContext);
  const { logout } = context;

  renderContent = (pageText) => {
    return (
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
        <SearchBar placeholder="Search" showCancelButton />
        <Text style={{ margin: 50 }}>{pageText}</Text>
      </View>
    )
  }

  const handleOut = () => {
    logout()
    onLogout()
  }

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
        <Stack.Screen
          options={{
            headerStyle: {backgroundColor: COLORS.lightWhite},
            headerShadowVisible: false,
            // headerLeft: () => (
            //   <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%"/>
            // ),
            headerRight: () => (
              <TouchableOpacity style={styles.btnContainer} onPress={() => handleOut()}>
                <Image
                  source={icons.exit}
                  resizeMode='cover'
                  style={styles.btnImg("50%")}
                />
              </TouchableOpacity>
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
                  <Entypo name="database" size={24} color={focused ? COLORS.tertiary : "black"}/>
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
          <Tab.Screen name='Analytics' component={Analytics} options={{
            tabBarIcon: ({focused}) => {
              return (
                <View style={{alignItems: "center", justifyContent: "center"}}>
                  <MaterialIcons name="analytics" size={24} color={focused ? COLORS.tertiary : "black"} />
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

export default MainPage;