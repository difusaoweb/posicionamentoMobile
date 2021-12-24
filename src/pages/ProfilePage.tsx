import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, useTheme } from 'react-native-paper'

import { useAppDispatch } from '../hooks'
import { singOutAsync } from '../redux/reducers/access'


export function ProfilePage() {
  const dispatch = useAppDispatch()

  const { colors } = useTheme()

  return (
    <>
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <View style={styles.row}>
          <Button
            mode="contained"
            onPress={() => dispatch(singOutAsync())}
            style={styles.button}
          >
            Sair
          </Button>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    paddingHorizontal: 12
  },
  button: {
    margin: 4
  }
})
