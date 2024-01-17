import React from 'react'
import { View, Text } from 'react-native'

import styles from './company.style'
import { icons } from '../../../constants'
import { checkImageUrl } from '../../../utils'

const Company = ({ productTitle, code, qty, mrp }) => {
  return (
    <View style={styles.container}>
      <View style={styles.jobTitleBox}>
        <Text style={styles.jobTitle}>{productTitle}</Text>
      </View>

      {/* <View style={styles.companyInfoBox}>
        <Text style={styles.companyName}>{productTitle}</Text>
      </View> */}
      <Text style={styles.locationName}>{code}</Text>
      
    </View>
  )
}

export default Company