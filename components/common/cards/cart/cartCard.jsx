import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

import styles from './cartcard.style'
import { IconButton } from 'react-native-paper';

const CartCard = ({ name, code, qty, handleClickMinus, handleClickPlus }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.jobName} numberOfLines={1}>{name}</Text>
        <Text style={styles.jobType}>{code}</Text>
      </View>
      <View style={styles.wrapperCardBottom}>
          <TouchableOpacity style={styles.button} onPress={() => handleClickMinus(code)}>
            <Text style={{fontWeight: '600'}}>-</Text>
          </TouchableOpacity>
          <Text style={{paddingHorizontal: 12}}>{qty}</Text>
          <TouchableOpacity style={[styles.button, {borderColor: 'green'}]} onPress={() => handleClickPlus(code)}>
            <Text style={styles.iconPlus}>+</Text>
          </TouchableOpacity>
        </View>
    </View>
  )
}

export default CartCard