import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { Dimensions } from 'react-native'

import BannerHeader from '../../components/atoms/BannerHeader'
import ListAfirmationsHome2 from '../../components/ecosystems/ListAfirmationsHome2'

const height = Dimensions.get('window').height - 108

const HomePage = () => {
  const { colors } = useTheme()

  return (
    <View style={[ styles.container, { backgroundColor: colors.background } ]}>
      <BannerHeader />
      <View style={styles.containerContent}>
        <ListAfirmationsHome2 />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: 'column',
    paddingTop: getStatusBarHeight()
  },
  containerContent: {
    flex: 1,
    height: height,
    minHeight: height,
    maxHeight: height,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  }
})

export default HomePage
