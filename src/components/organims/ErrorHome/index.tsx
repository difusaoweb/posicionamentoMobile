import React from 'react'
import { View } from 'react-native'
import { useTheme } from 'react-native-paper'

import { styles } from './index.style'
import ErrorBox from '../../molecules/ErrorBox'

interface ErrorHomeProps {
  type: string
  message: string
}
const ErrorHome = ({ type, message }: ErrorHomeProps) => {
  const { colors } = useTheme()

  let icon = ''
  let color = ''
  switch (type) {
    case 'info':
      icon = 'information'
      color = '#b2d9e7'
      break
    default:
      icon = 'alert'
      color = '#fdc000'
      break
  }

  return (
    <View style={styles.container}>
      <ErrorBox icon={icon} color={color} message={message} />
    </View>
  )
}

export default ErrorHome
