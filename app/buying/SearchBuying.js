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
import { router } from 'expo-router';
import Scanner from '../scanner/Scanner';


const SearchBuying = () => {

	const Stack = createStackNavigator();

	const {data, isLoading, error} = useFetch();
	const [search, setSearch] = useState();
	const [newData, setNewData] = useState(null);

	const navigation = useNavigation()

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
			<SafeAreaView style={{ flex: 1, backgroundColor: "#FAFAFC" }}>
				<FAB
					placement='right'
					color="#312651"
					style={{zIndex: 1}}	
					onPress={() => navigation.navigate('scanner')}
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
						/>
					</View>
				</ScrollView>
			</SafeAreaView>
		</>
	)
}

export default SearchBuying;