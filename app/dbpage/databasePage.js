import React, { useEffect, useState } from 'react'
import InventoryScanner from '../scanner/InventoryScanner';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterProduct from './registerProduct';


const DatabasePage = () => {

	const navigation = useNavigation()
	const Stack = createStackNavigator();

	return (
		<>
      <Stack.Navigator
				 screenOptions={{
          headerShown: false, // Set this to false to hide the header
        }}
			>
				<Stack.Screen name="registerproduct" component={RegisterProduct} />
				<Stack.Screen name="inventoryscanner" component={InventoryScanner} />
			</Stack.Navigator>
		</>
	)
}

export default DatabasePage;