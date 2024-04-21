import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import {COLORS, FONT, icons, images, SIZES} from '../constants'
import { Stack, useRouter } from "expo-router";
import { ScreenHeaderBtn } from "../components";
import { useContext } from 'react';
import inventoryContext from '../context/InventoryContext';


const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const context = useContext(inventoryContext)
  const {isLogin, login} = context;

  const handleLogin = () => {
    // Replace with your actual login logic and validation
    if (username && password) {
      login({
        email: username,
        password: password
      });
       // Call the provided function to handle successful login
    } else {
      alert('Invalid username or password');
    }
  };

  useEffect(() => {
    onLogin(isLogin)
  },[isLogin])

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
      <Stack.Screen
        options={{
          headerStyle: {backgroundColor: COLORS.lightWhite},
          headerShadowVisible: false,
          headerTitle: "",
        }}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.searchBtn} onPress={() => handleLogin()}>
          <Text style={{fontFamily: FONT.medium, color: "white"}}>Login</Text>
        </TouchableOpacity>
        {/* <Button title="Login" onPress={handleLogin}/> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontFamily: FONT.bold,
    marginBottom: 20,
  },
  input: {
    fontFamily: FONT.regular,
    width: '80%',
    padding: 10,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 0,
    // borderColor: '#ccc',
    backgroundColor: "#ebebeb",
  },
  textContainer: {
    backgroundColor: COLORS.white,
    margin: 15,
    // marginBottom: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    height: "100%",
    width: "95%"
  },
  searchBtn: {
    width: 100,
    height: 50,
    backgroundColor: COLORS.tertiary,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Login;
