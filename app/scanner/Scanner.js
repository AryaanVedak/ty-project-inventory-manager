import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import useFetch from '../../Hook/useFetch';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation, useRoute } from '@react-navigation/native';


const Scanner = ({ onItemCodeScanned }) => {
	const [hasPermission, setHasPermission] = React.useState(false);
  const [scanData, setScanData] = React.useState();
	const {data, isLoading, error} = useFetch();
  const [newData, setnewData] = useState()
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    (async() => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    setnewData(data)
  }, [data]);

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text>Please grant camera permissions to app.</Text>
      </View>
    );
  }

  const handleBarCodeScanned = ({type, data}) => {

    const isPresent = newData.find(obj => obj.code === data)
    setScanData(data);
    // console.log(`Data: ${data}`);
    // console.log(`Type: ${type}`);

    if (isPresent) {
      // console.log("is present: ", isPresent)
      route.params.onDataScanned(isPresent);
      navigation.goBack();
      ToastAndroid.show('Item added successfully!', ToastAndroid.SHORT);
    } else if (isPresent == undefined) {
      ToastAndroid.show('Item not found', ToastAndroid.SHORT);
      return
    }
  };

  return (
    <View style={styles.container}>
      <BarCodeScanner 
        style={StyleSheet.absoluteFillObject}
        onBarCodeScanned={scanData ? undefined : handleBarCodeScanned}
			/>
      {scanData && <Button title='Scan Again?' onPress={() => setScanData(undefined)} />}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create ({
	container:{
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center' 
	}
})

export default Scanner;