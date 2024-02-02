import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

import styles from './checkoutcard.style'
import { IconButton } from 'react-native-paper';

const CheckOutCard = ({ item, handleAdd, onDataReceived }) => {
  return (
    <View style={styles.container}>
        <View style={styles.textContainer}>
        <Text style={styles.jobName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.jobType}>{item.code}</Text>
      </View>
      <IconButton 
        icon="cart" 
        mode="contained" 
        size={20}
        onPress={() => onDataReceived(item)}
      />
    </View>
  )
}

export default CheckOutCard