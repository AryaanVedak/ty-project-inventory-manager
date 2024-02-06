import React, { useEffect, useState } from 'react'
import AddItem from './addItem';
import InventoryScanner from '../scanner/InventoryScanner';import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const InventoryAdd = () => {

	const navigation = useNavigation()
	const Stack = createStackNavigator();

	return (
		<>
      <Stack.Navigator
				 screenOptions={{
          headerShown: false, // Set this to false to hide the header
        }}
			>
				<Stack.Screen name="additem" component={AddItem} />
				<Stack.Screen name="inventoryscanner" component={InventoryScanner} />
			</Stack.Navigator>
		</>
	)
}

export default InventoryAdd;