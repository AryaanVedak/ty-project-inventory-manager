import { Text, TextInput, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView, ScrollView, View } from "react-native";
import { COLORS, FONT, SIZES } from "../../constants";
import CartCard from "../../components/common/cards/cart/cartCard";
import { useRoute } from "@react-navigation/native";
import { Button, Overlay, Icon, Divider } from '@rneui/themed';
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import axios from "axios";  
import { useContext } from 'react';
import inventoryContext from '../../context/InventoryContext';


const Cart = () => {

	const route = useRoute();
	const [items, setItems] = useState([]);
	const [visible, setVisible] = useState(false);
	const [phone, setPhone] = useState();
	const [name, setName] = useState();
	const [email, setEmail] = useState();
	// const [userData, setUserData] = useState({});
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [payment, setPayment] = useState(false);
  const [content, setContent] = useState([]);
  const [bill, setBill] = useState();
	// const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null); 

	const context = useContext(inventoryContext)
  const {isLoading, user, getUser, paymentComplete} = context;
	
	const receivedData = route.params?.data;

	useEffect(() => {
		if(user) {
			setPayment(true)
		}
	},[user])

	const getUserDetails = () => {
		getUser(phone)
	}

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

	const toggleOverlay = () => {
		setVisible(!visible);
	};

	// const fetchUser = (id) => {
	// 	// console.log(id)
  //   setIsLoading(true);
	// 	axios.request({
	// 		method: 'get',
	// 		url: `http://192.168.0.189:5001/api/sale/getuser/${id}`,
	// 		headers: {
	// 				'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4MGFjOTQ1ZDk2YWU5ZmUzOTdlN2U5In0sImlhdCI6MTY4NjIwMDYxMH0._RXLrE3g9RTlVC7MU6RMR64iOPkoioIb378qlboLFgM',
	// 				'Content-Type': 'application/json',
	// 		},
	// 	}).then((response) => {
	// 		setUserData(response.data);
	// 		setIsLoading(false);
	// 		setPayment(true)
	// 	}).catch((error) => {
	// 		if (error.response.data === "Number not found") {
	// 			console.log("Data not present");
	// 			setIsLoading(false);
	// 			setShowAddCustomer(true)
	// 		} else {
	// 			console.log(error)
	// 			setIsLoading(false)
	// 		}
	// 	})
  // }

	// const paymentComplete = async (invoice) => {
	// 	// console.log(id)
  //   setIsLoading(true);
  //   try {
  //       const response = await axios.request({
  //         method: 'POST',
	// 				data: invoice,
  //         url: `http://192.168.29.169:5001/api/sale/saleinvoice`,
  //         params: {},
  //         headers: {
  //             'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4MGFjOTQ1ZDk2YWU5ZmUzOTdlN2U5In0sImlhdCI6MTY4NjIwMDYxMH0._RXLrE3g9RTlVC7MU6RMR64iOPkoioIb378qlboLFgM',
  //             'Content-Type': 'application/json',
  //         },
  //       });

	// 			if (response.status === 200) {
	// 				console.log("Payment Complete")
	// 				setIsLoading(false);
	// 			} else {
	// 					throw new Error('Failed to fetch user data');
	// 			}
  //   } catch (error) {
  //       setError(error)
	// 			console.log("Invoice not sent!");
	// 			setIsLoading(false);
  //   } finally {
  //       setIsLoading(false);
  //   }
  // }

	const addUser = async () => {
		if (name && phone) {

			setIsLoading(true);
			try {
					const response = await axios.request({
						method: 'POST',
						data: JSON.stringify({
							name: name,
							phoneNumber: phone,
							email: email
						}),
						url: `http://192.168.29.169:5001/api/customer/addcustomer`,
						params: {},
						headers: {
								'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4MGFjOTQ1ZDk2YWU5ZmUzOTdlN2U5In0sImlhdCI6MTY4NjIwMDYxMH0._RXLrE3g9RTlVC7MU6RMR64iOPkoioIb378qlboLFgM',
								'Content-Type': 'application/json',
						},
					});

					if (response.status === 200) {
						setShowAddCustomer(false)
						setIsLoading(false);
					} else {
							throw new Error('Failed to fetch user data');
					}
			} catch (error) {
					setError(error)
					console.log("Data not present: ", error);
					setIsLoading(false);
					setShowAddCustomer(true)
			} finally {
					setIsLoading(false);
			}
		} else {
			console.log("Enter name and email")
		}
  }

	const completePayement = (type) => {
		
		let price = 0;
    items.map(product => {
      price += product.total;
		})

		// Convert the array of objects to the desired format
		const contents = items.map(item => ({
			_id: item._id,
			productName: item.name,
			productCode: item.code,
			price: item.total.toString(),
			qty: item.quantity.toString(),
			total: item.total.toString()
		}));

    setContent(contents)

		const T = parseInt(price) + parseInt((price * 18 / 100).toFixed(1))
    console.log("Total: ",T)

    const invoice = {
      contents: contents,
      gst: (price * 18 / 100).toFixed(1),
      taxable: price,
      total: T,
      transactionId: "",
      type: type,
      status: "incomplete",
      customer: user
    }

		setBill(invoice)
    paymentComplete(invoice) 
		setPayment(false)
		toggleOverlay()
		setItems([])
	}

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
						onPress={toggleOverlay}
						style={{
							flex: 5,
							alignSelf: 'flex-end'
						}}
					>
						<Icon name="chevron-right" color="white"  />
					</Button>
				</View>
				<Overlay 
					isVisible={visible} 
					onBackdropPress={toggleOverlay}
					overlayStyle={{ 
						width: '80%', 
						height: '50%',
						paddingTop: 20,
						paddingBottom: 20, 
						borderRadius: 20
					}}
				>
					{!showAddCustomer ? (
						<View style={styles.searchContainer}>
							<View style={{
								backgroundColor: COLORS.white,
								margin: 15,
								justifyContent: "center",
								alignItems: "center",
								borderRadius: SIZES.medium,
								height: "100%",
								width: "70%"
							}}>
								<TextInput  
									style={styles.searchInput}
									value={phone}
									onChangeText={(e) => setPhone(e)}
									placeholder="Enter Phone Number"
								/>
							</View>
							<TouchableOpacity style={styles.searchBtn} onPress={() => getUserDetails()}>
								<MaterialIcons name="search" size={24} color="white"/>
							</TouchableOpacity>
						</View>
					) : (
						<View style={styles.searchDiffContainer}>
							<View style={{
								backgroundColor: COLORS.white,
								margin: 15,
								justifyContent: "center",
								alignItems: "center",
								borderRadius: SIZES.medium,
								height: "100%",
								width: "70%"
							}}>
								<TextInput  
									style={styles.searchInput}
									value={phone}
									onChangeText={(e) => setPhone(e)}
									placeholder="Enter Phone Number"
								/>
							</View>
							<View style={{
								backgroundColor: COLORS.white,
								margin: 15,
								justifyContent: "center",
								alignItems: "center",
								borderRadius: SIZES.medium,
								height: "100%",
								width: "70%"
							}}>
								<TextInput  
									style={styles.searchInput}
									value={name}
									onChangeText={(e) => setName(e)}
									placeholder="Enter Name"
								/>
							</View>
							<View style={{
								backgroundColor: COLORS.white,
								margin: 15,
								justifyContent: "center",
								alignItems: "center",
								borderRadius: SIZES.medium,
								height: "100%",
								width: "70%"
							}}>
								<TextInput  
									style={styles.searchInput}
									value={email}
									onChangeText={(e) => setEmail(e)}
									placeholder="Enter Email Address"
								/>
							</View>
							<TouchableOpacity style={styles.addBtn} onPress={addUser}>
								<Text style={{color: "white"}}>Add Customer</Text>
							</TouchableOpacity>
						</View>
					)}
					{/* <View style={{display: payment ? 'flex' : 'none'}}>
						<Button title="Cash" onPress={completePayement("cash")}/>
						<Button title="UPI" onPress={completePayement("upi")}/>
						<Button title="Debit Card" onPress={completePayement("debit card")}/>
					</View> */}
					{payment ? (
						<>
							{/* <Text>Hello</Text> */}
							<Button title="Cash" style={{marginBottom: 30}} type="outline" onPress={() => completePayement("cash")}/>
							<Button title="UPI" style={{marginBottom: 30}} type="outline" onPress={() => completePayement("upi")}/>
							<Button title="Debit Card" style={{marginBottom: 30}} type="outline" onPress={() => completePayement("debit")}/>
						</>
					) : (<></>)}
				</Overlay>
			</SafeAreaView>
		</>
	)
}

export default Cart;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  userName: {
    fontFamily: FONT.regular,
    fontSize: SIZES.large,
    color: COLORS.secondary,
  },
  welcomeMessage: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    marginTop: 2,
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: 50,
  },
  searchDiffContainer: {
    // justifyContent: "center",
    alignItems: "center",
    flexDirection: "col",
    height: 50,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginRight: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    height: "100%",
  },
  searchInput: {
    fontFamily: FONT.regular,
    width: "100%",
    height: "100%",
    // margin: 20,
    paddingHorizontal: SIZES.medium,
  },
  searchBtn: {
    width: 50,
    height: "100%",
    backgroundColor: COLORS.tertiary,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  addBtn: {
    width: 200,
    height: "100%",
		padding: 5,
    backgroundColor: COLORS.tertiary,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBtnImage: {
    width: "50%",
    height: "50%",
    tintColor: COLORS.white,
  },
  tabsContainer: {
    width: "100%",
    marginTop: SIZES.medium,
  },
  tab: (activeJobType, item) => ({
    paddingVertical: SIZES.small / 2,
    paddingHorizontal: SIZES.small,
    borderRadius: SIZES.medium,
    borderWidth: 1,
    borderColor: activeJobType === item ? COLORS.secondary : COLORS.gray2,
  }),
  tabText: (activeJobType, item) => ({
    fontFamily: FONT.medium,
    color: activeJobType === item ? COLORS.secondary : COLORS.gray2,
  }),
});
