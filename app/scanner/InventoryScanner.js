import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation, useRoute } from '@react-navigation/native';


const InventoryScanner = () => {
	const [hasPermission, setHasPermission] = React.useState(false);
  const [scanData, setScanData] = useState();
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    (async() => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text>Please grant camera permissions to app.</Text>
      </View>
    );
  }

  const handleBarCodeScanned = ({type, data}) => {
    setScanData(data);
    route.params.onDataScanned(data);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <BarCodeScanner 
        style={StyleSheet.absoluteFillObject}
        onBarCodeScanned={scanData ? undefined : handleBarCodeScanned}
			/>
      {/* {scanData && <Button title='Scan Again?' onPress={() => setScanData(undefined)} />} */}
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

export default InventoryScanner;