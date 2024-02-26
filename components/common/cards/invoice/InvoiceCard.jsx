import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

import styles from './invoicecard.style'

const InvoiceCard = ({ item, customer, handleNavigate }) => {

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleNavigate}
    >
      <View style={styles.textContainer}>
        <Text style={styles.jobName} numberOfLines={1}>{customer.name}</Text>
        <Text style={styles.jobType}>{item.status}</Text>
        <Text style={styles.jobType}>{item.type}</Text>
      </View>
      <Text style={styles.companyName} numberOfLines={1}> &#x20B9; {item.total}</Text>
    </TouchableOpacity>
  )
} 

export default InvoiceCard