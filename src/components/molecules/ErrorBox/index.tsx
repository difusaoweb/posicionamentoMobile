import * as React from 'react'
import { View } from 'react-native'
import { useTheme, Title } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { styles } from './index.style'

interface ErrorBoxProps {
  icon: string
  message: string
}
const ErrorBox = ({ icon, message }: ErrorBoxProps) => {
  const { colors } = useTheme()

  return (
    <View style={styles.row}>
      <MaterialCommunityIcons
        name={icon}
        size={48}
        style={[styles.icon, { color: colors.error }]}
      />
      <Title>{message}</Title>
    </View>
  )
}

export default ErrorBox
