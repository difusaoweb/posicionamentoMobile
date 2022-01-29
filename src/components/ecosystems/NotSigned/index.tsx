import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import type { StackNavigationProp } from '@react-navigation/stack'

import ErrorBox from '../../molecules/ErrorBox'

interface NotSignedProps {
  navigation: StackNavigationProp<{}>
}

const NotSigned = ({ navigation }: NotSignedProps) => {
  function onGoSignInUp() {
    navigation.navigate('AccessRoutes', { screen: 'LogIn' })
  }

  return (
    <View style={styles.container}>
      <View style={[styles.row, { marginBottom: 12 } ]}>
        <ErrorBox message="Você não está conectado" />
      </View>
      <View style={styles.row}>
        <Button
          dark={true}
          mode="contained"
          style={styles.button}
          onPress={onGoSignInUp}
        >
          Entrar
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    paddingHorizontal: 12
  },
  row: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  button: {
    margin: 4
  }
})

export default NotSigned
