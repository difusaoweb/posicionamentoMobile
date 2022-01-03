import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper'

import ErrorBox from '../../molecules/ErrorBox'

interface ErrorHomeProps {
  message: string
}

const ErrorHome = ({ message }: ErrorHomeProps) => {
  return (
    <>
      <View style={styles.container}>
        <ErrorBox message={message} />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center'
  }
})

export default ErrorHome
