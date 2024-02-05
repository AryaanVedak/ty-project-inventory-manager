import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { FAB } from '@rneui/themed';
import { SafeAreaView } from "react-native";
import {COLORS, icons, images, SIZES} from '../../constants'
import { Icon } from '@rneui/themed';
import styles from '../../components/home/welcome/welcome.style'
import Checkout from '../../components/home/checkout/Checkout';
import useFetch from '../../Hook/useFetch';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from '@rneui/themed';
import Scanner from '../scanner/Scanner';


const SearchBuying = () => {

	const Stack = createStackNavigator();

	const {data, isLoading, error} = useFetch();
	const [search, setSearch] = useState();
	// const [openScanner, setOpenScanner] = useState(false);
	const [items, setItems] = useState([]);
	const [newData, setNewData] = useState(null);

	const navigation = useNavigation()

	useEffect(() => {
		if (data.length > 0) {
			if (newData === null) {
				setNewData(data)
			}
		}
	},[data])

	useEffect(() => {
		console.log("items: ", items)
		// console.log("length: ", items.length)
	}, [items])

	const changeSearch = (value) => {
		setSearch(value)
		const filteredData = data.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()))
		setNewData(filteredData)
	}


	const getSelectedData = (data) => {

		console.log(data)
		console.log("itemlength: ",items.length)

		if (items.length > 0) {
			const foundItem = items.find(obj => obj.code === data.code);
			console.log("found item: ", foundItem)
			let d = {...data, quantity: 1, total: data.mrp}
			if (foundItem) {
				setItems(items.map(obj =>
					obj.code === data.code ? { ...obj, quantity: obj.quantity + 1, total: obj.mrp * (obj.quantity + 1) } : obj
				));
			} else {
				setItems(prevItems => [...prevItems, d]);
			}
		} else {
			console.log("items.length < 0")
			setItems([{...data, quantity: 1, total: data.mrp}])
		}
		
		// if (items) {
		// 	const foundItem = items.find(obj => obj.code === data.code);
		// 	console.log("found item: ", foundItem)
		// 	let d = {...data, quantity: 1, total: data.mrp}
		// 	if (foundItem) {
		// 		setItems(items.map(obj =>
		// 			obj.code === data.code ? { ...obj, quantity: obj.quantity + 1, total: obj.mrp * (obj.quantity + 1) } : obj
		// 		));
		// 	} else {
		// 		setItems(prevItems => [...prevItems, d]);
		// 	}
		// } else {
		// 	console.log("items.length < 0")
		// 	setItems([{...data, quantity: 1, total: data.mrp}])
		// }
	};

	return (
		<>
			<SafeAreaView style={{ flex: 1, backgroundColor: "#FAFAFC" }}>
				<FAB
					// placement='right'
					color="#312651"
					style={{
						zIndex: 1,
						position: 'absolute',
						bottom: 80,
						right: 30
					}}	
					onPress={() => navigation.navigate('scanner', { onDataScanned: getSelectedData })}
				>
					<Icon
						reverse
						name='barcode'
						type='font-awesome'
						color='#312651'
					/>
				</FAB>
				<ScrollView 
					showsVerticalScrollIndicator={false}
				>
					<View style={{paddingLeft: 20, paddingRight: 20, paddingTop: 30}}>
						<View style={styles.container}> 
							<Text style={styles.welcomeMessage}>Checkout</Text>
							<Text style={styles.userName}>Select product customer wants to buy</Text>
						</View>
						<View style={styles.searchContainer}>
							<View style={styles.searchWrapper}>
								<TextInput  
									style={styles.searchInput}
									value={search}
									onChangeText={(e) => changeSearch(e)}
									placeholder="Enter product name"
								/>
							</View>

							<TouchableOpacity style={styles.searchBtn} onPress={() => {}}>
								<Image
									source={icons.search}
									resizeMode='contain'
									style={styles.searchBtnImage}
								/>
							</TouchableOpacity>
						</View>
						<Checkout
							data={newData}
							isLoading={isLoading}
							error={error}
							getItems={getSelectedData}
						/>
					</View>
				</ScrollView>
				<CartBar cartItems={items ? items.length : 0}/>
			</SafeAreaView>
		</>
	)
}

export default SearchBuying;

const CartBar = ({cartItems}) => {

	const navigation = useNavigation()

	return (
		<View style={{
			backgroundColor: COLORS.tertiary,
			margin: 20,
			height: 50,
			width: 350,
			paddingTop: 5,
			paddingBottom: 5,
			paddingLeft: 30,
			paddingRight: 10,
			borderRadius: 20,
			position: 'absolute',
			bottom: 0,
			alignSelf: 'center',
			alignItems: 'center',
			flexDirection: 'row',
		}}>
			<Text style={{
				fontSize: SIZES.medium,
				fontFamily: "DMBold",
				color: "white",
				flex: 1

			}}>Items in Cart: {cartItems}</Text>
			<Button 
				radius={"sm"} 
				type="clear" 
				onPress={() => navigation.navigate('cart')}
				style={{
					flex: 5,
					alignSelf: 'flex-end'
				}}
			>
				<Icon name="chevron-right" color="white"  />
			</Button>
		</View>
	)
}