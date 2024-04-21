import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

import styles from './popularjobcard.style'

const PopularJobCard = ({ item }) => {



  return (
    <TouchableOpacity
      style={styles.container}
    >
      <View style={styles.infoContainer}>
        <Text style={styles.jobName} numberOfLines={1}>{item.name}</Text>
      </View>
      <Text style={styles.companyName} numberOfLines={1} ellipsizeMode="tail">{item.value}</Text>
    </TouchableOpacity>
  )
}

export default PopularJobCard