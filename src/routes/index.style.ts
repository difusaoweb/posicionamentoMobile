import { StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

export const styles = StyleSheet.create({
  app: {
    width: '100%',
    height: '100%',
    paddingTop: getStatusBarHeight()
  }
})
