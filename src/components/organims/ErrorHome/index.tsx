import React from 'react'
import { View, StyleSheet } from 'react-native'

import ErrorBox from '../../molecules/ErrorBox'

interface ErrorHomeProps {
  message: string
}

const ErrorHome = ({ message }: ErrorHomeProps) => {
  return (
    <View style={styles.container}>
      <ErrorBox message={message} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  }
})

export default ErrorHome
