import React from 'react'
import { View } from 'react-native'

import { styles } from './index.style'
import ErrorBox from '../../molecules/ErrorBox'

interface ErrorHomeProps {
  type: string
  message: string
}
const ErrorHome = ({ type, message }: ErrorHomeProps) => {
  let icon = ''
  switch (type) {
    case 'info':
      icon = 'information'
      break
    default:
      icon = 'alert'
      break
  }

  return (
    <View style={styles.container}>
      <ErrorBox icon={icon} message={message} />
    </View>
  )
}

export default ErrorHome
