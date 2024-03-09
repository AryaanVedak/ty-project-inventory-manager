import { useEffect, useState } from "react";
import InventoryState from "../context/InventoryState";
import Login from "./Login";
import { createStackNavigator } from "@react-navigation/stack";
import MainPage from "./MainPage";
import {COLORS, icons, images, SIZES} from '../constants'
import { useContext } from 'react';
import inventoryContext from "../context/InventoryContext";


const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const context = useContext(inventoryContext)
  // const {isLogin, logout} = context;
	
  // Login function (replace with your actual logic)
  const handleLogin = (value) => {
    setIsLoggedIn(value)
    console.log("setIsLoggedIn value: ",value)
  };

  const Stack = createStackNavigator();
  const handleLogout = () => {
    setIsLoggedIn(false)
    console.log("logout")
  }

  useEffect(() => {
    console.log(isLoggedIn)
  },[isLoggedIn])

  return (
      <InventoryState>
        <Stack.Screen
          options={{
            headerStyle: {backgroundColor: COLORS.lightWhite},
            headerShadowVisible: false,
            headerTitle: "",
            headerShown: false
          }}
        />
        {isLoggedIn ? (
          <MainPage onLogout={handleLogout}/> // Render main page if logged in
        ) : (
          <Login onLogin={handleLogin}/> // Render login page if not logged in
        )}
      </InventoryState>
  )
}

export default App;