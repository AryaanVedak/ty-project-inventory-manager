import { useState } from "react";
import InventoryState from "../context/InventoryState";
import Login from "./Login";
import { createStackNavigator } from "@react-navigation/stack";
import MainPage from "./MainPage";
import {COLORS, icons, images, SIZES} from '../constants'



const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
	
  // Login function (replace with your actual logic)
  const handleLogin = (value) => {
    setIsLoggedIn(value)
    console.log(value)
  };

  const Stack = createStackNavigator();

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
          <MainPage /> // Render main page if logged in
        ) : (
          <Login onLogin={handleLogin} /> // Render login page if not logged in
        )}
      </InventoryState>
  )
}

export default App;