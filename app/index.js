import { useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { Stack, useRouter } from "expo-router";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import {COLORS, icons, images, SIZES} from '../constants'
import { ScreenHeaderBtn } from "../components";
import Buying from './buying/BuyingPage';
import HomePage from "../components/home/HomePage";
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

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
          screenOptions={{
            headerShown: false,
            // tabBarShowLabel: false,
          }}
        >
          <Tab.Screen name='Home' component={HomePage} options={{
            tabBarIcon: () => {
              <Ionicons name="home-outline" size={24} color="black" />
            }
          }}/>
          <Tab.Screen name='Buying' component={Buying} options={{
            tabBarIcon: () => {
              <Feather name="home-outline" size={24} color="black" />
            }
          }}/>
        </Tab.Navigator>
      </SafeAreaView>
    </>
  )
}

export default Home;