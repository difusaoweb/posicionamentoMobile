import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, useTheme } from 'react-native-paper'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

import { BannerHeader } from '../components/atoms/BannerHeader'
import { useAppDispatch } from '../hooks'
import { singOutAsync } from '../redux/reducers/access'


export function ProfilePage() {
  const dispatch = useAppDispatch()

  const { colors } = useTheme()

  return (
    <View style={[ styles.container, { backgroundColor: colors.background } ]}>
      <BannerHeader />
      <View style={[styles.row, { marginTop: 32 }]}>
        <Button
          mode="contained"
          onPress={() => dispatch(singOutAsync())}
          style={styles.button}
        >
          Sair
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: getStatusBarHeight()
  },
  row: {
    paddingHorizontal: 12
  },
  text: {
    marginVertical: 4
  },
  button: {
    margin: 4
  }
})
