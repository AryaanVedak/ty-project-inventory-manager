import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView } from 'react-native';
import {COLORS, icons, images, SIZES} from '../constants'
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
        <Button title="Login" onPress={handleLogin} />
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
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default Login;
