import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper'

import ErrorBox from '../../molecules/ErrorBox'

const ErrorHome = () => {
  return (
    <>
      <View style={styles.container}>
        <ErrorBox message="Erro ao conectar no servidor" />
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
