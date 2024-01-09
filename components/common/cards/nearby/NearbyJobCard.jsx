import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

import styles from './nearbyjobcard.style'

const NearbyJobCard = ({ item, handleNavigate }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleNavigate}
    >
      <View style={styles.textContainer}>
        <Text style={styles.jobName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.jobType}>{item.code}</Text>
      </View>
      <Text style={styles.companyName} numberOfLines={1}>Quantity: {item.qty}</Text>
    </TouchableOpacity>
  )
}

export default NearbyJobCard