import * as React from 'react'
import { View } from 'react-native'
import { Title } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { styles } from './index.style'

interface ErrorBoxProps {
  icon: string
  color: string
  message: string
}
export const ErrorBox = ({ icon, color, message }: ErrorBoxProps) => {
  return (
    <View style={styles.row}>
      <MaterialCommunityIcons
        name={icon}
        size={48}
        style={[styles.icon, { color: color }]}
      />
      <Title>{message}</Title>
    </View>
  )
}
