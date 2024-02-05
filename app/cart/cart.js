import { Text } from "react-native";
import { Divider } from '@rneui/themed';
import { SafeAreaView, ScrollView, View } from "react-native";
import styles from '../../components/home/welcome/welcome.style'
import { COLORS, FONT, SIZES } from "../../constants";
import CartCard from "../../components/common/cards/cart/cartCard";
import { useRoute } from "@react-navigation/native";
import { Button } from '@rneui/themed';
import { Icon } from '@rneui/themed';
import { useEffect, useState } from "react";

const Cart = () => {

	const route = useRoute();
	const [items, setItems] = useState([]);
	const receivedData = route.params?.data;

	useEffect(() => {
		{receivedData ? setItems(receivedData) : console.log("noData")}
	}, [receivedData])

	const handletotal = (item) => {
    let price = 0;
    item.map(product => {
      price += product.total;
    })
    return price
  }

	const handleClickMinus = (code) => {
    setItems(items.map(obj => 
      obj.code == code ? {...obj, quantity: obj.quantity - 1, total: obj.mrp * (obj.quantity - 1)} : obj  
    ))
    console.log('Clicked Minus!');
  };

  const handleClickPlus = (code) => {
    setItems(items.map(obj => 
      obj.code == code ? {...obj, quantity: obj.quantity + 1,  total: obj.mrp * (obj.quantity + 1) } : obj  
    ))
    console.log('Clicked Plus!');
  };

	return (
		<>
			<SafeAreaView style={{ flex: 1, backgroundColor: "#FAFAFC" }}>
				<View style={{paddingLeft: 20, paddingRight: 20, paddingTop: 30, paddingBottom: 180}}>
					<View style={styles.container}> 
						<Text style={{
							fontFamily: FONT.bold,
							fontSize: SIZES.xxLarge,
							color: COLORS.primary,
							marginTop: 2,
						}}>Cart</Text>
						<Text style={styles.userName}>Items in the cart</Text>
					</View>
					<Divider width={1} style={{
						marginTop: 10,
						marginBottom: 15
					}}/>
					<ScrollView 
						showsVerticalScrollIndicator={false}
					>
						{items.map((item) => (
							<CartCard 
								key={item.code}
								name={item.name}
								code={item.code}
								qty={item.quantity}
								handleClickMinus={handleClickMinus}
								handleClickPlus={handleClickPlus}
							/>
						))}
					</ScrollView>
				</View>
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
					}}>Total: {handletotal(items)}</Text>
					<Button 
						radius={"sm"} 
						type="clear" 
						onPress={() => navigation.navigate('cart', { data: items })}
						style={{
							flex: 5,
							alignSelf: 'flex-end'
						}}
					>
						<Icon name="chevron-right" color="white"  />
					</Button>
				</View>
			</SafeAreaView>
		</>
	)
}

export default Cart;