import React from 'react'
import {
  View,
  StyleSheet,
  Text
} from 'react-native'
import {
  TextInput,
  Title,
  Button,
  useTheme,
  HelperText
} from 'react-native-paper'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

import { BannerHeader } from '../components/atoms/BannerHeader'
import ListAfirmationsHome from '../components/ecosystems/ListAfirmationsHome'


export function HomePage() {
  const { colors } = useTheme()

  return (
    <View style={[ styles.container, { backgroundColor: colors.background } ]}>
      <BannerHeader />
      <View style={[styles.row, { marginTop: 32 }]}>
        <ListAfirmationsHome />
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
  }
})
