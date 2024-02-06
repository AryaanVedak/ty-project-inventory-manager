import React, { useEffect, useState } from 'react'
import useFetch from '../../Hook/useFetch';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { router } from 'expo-router';
import Scanner from '../scanner/Scanner';
import Cart from '../cart/cart';
import SearchBuying from './SearchBuying';
import InventoryScanner from '../scanner/InventoryScanner';

const BuyingPage = () => {

	const Stack = createStackNavigator();

	const {data, isLoading, error} = useFetch();
	const [search, setSearch] = useState();
	const [newData, setNewData] = useState(null);
	const [code, setCode] = useState(null);

	const navigation = useNavigation()

	// useEffect(() => {
	// 	console.log('newData: ',newData)
	// },[newData])
	useEffect(() => {
		if (data.length > 0) {
			if (newData === null) {
				setNewData(data)
			}
		}
	},[data])

	const changeSearch = (value) => {
		setSearch(value)
		const filteredData = data.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()))
		setNewData(filteredData)
	}

	return (
		<>
			<Stack.Navigator
				 screenOptions={{
          headerShown: false, // Set this to false to hide the header
        }}
			>
				<Stack.Screen name="searchbuying" component={SearchBuying} />
				<Stack.Screen name="scanner" component={Scanner} />
				<Stack.Screen name="cart" component={Cart} />
				<Stack.Screen name="inventoryscanner" component={InventoryScanner} />
			</Stack.Navigator>
		</>
	)
}

export default BuyingPage;

