import React, { useEffect, useState } from 'react'
import InventoryScanner from '../scanner/InventoryScanner';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterProduct from './registerProduct';
import InventoryState from '../../context/InventoryState';


const DatabasePage = () => {

	const navigation = useNavigation()
	const Stack = createStackNavigator();

	return (
		<>
			{/* <InventoryState> */}
				<Stack.Navigator
					screenOptions={{
						headerShown: false, // Set this to false to hide the header
					}}
				>
					<Stack.Screen name="registerproduct" component={RegisterProduct} />
					<Stack.Screen name="inventoryscanner" component={InventoryScanner} />
				</Stack.Navigator>
			{/* </InventoryState> */}
		</>
	)
}

export default DatabasePage;