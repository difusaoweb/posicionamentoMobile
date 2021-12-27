import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import type { StackNavigationProp } from '@react-navigation/stack'

import ErrorBox from '../../molecules/ErrorBox'

type NotSignedProps = {
  navigation: StackNavigationProp<{}>
}

const NotSigned = ({ navigation }: NotSignedProps) => {
  function handleGoLogin() {
    navigation.navigate('AuthRoutes', { screen: 'SignInUp' })
  }

  return (
    <View style={styles.container}>
      <ErrorBox message="Você não está conectado" />
      <Button
        mode="contained"
        style={styles.button}
        onPress={handleGoLogin}
      >
        Entrar
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 12
  },
  button: {
    margin: 4
  }
})

export default NotSigned
