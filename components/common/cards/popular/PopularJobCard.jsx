import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

import styles from './popularjobcard.style'

const PopularJobCard = ({ item, selectedJob, handleCardPress }) => {
  return (
    <TouchableOpacity
      style={styles.container(selectedJob, item)}
      onPress={() => handleCardPress(item)}
    >
      <View style={styles.infoContainer}>
        <Text style={styles.jobName(selectedJob, item)} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.location}>{item.code}</Text>
      </View>
      <Text style={styles.companyName} numberOfLines={1}>Quantity: {item.qty}</Text>
      <Text style={styles.companyName} numberOfLines={1}>Price: {item.mrp}</Text>
    </TouchableOpacity>
  )
}

export default PopularJobCard