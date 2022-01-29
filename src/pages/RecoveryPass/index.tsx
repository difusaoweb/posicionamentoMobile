import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { useTheme, Headline } from 'react-native-paper'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import type { StackNavigationProp } from '@react-navigation/stack'

import BannerHeader from '../../components/atoms/BannerHeader'

const height = Dimensions.get('window').height - 54

type RecoveryPassPageProps = {
  navigation: StackNavigationProp<{}>
}
const RecoveryPassPage = ({ navigation }: RecoveryPassPageProps) => {
  const { colors } = useTheme()

  return (
    <View style={[ styles.container, { backgroundColor: colors.background } ]}>
      <BannerHeader />
      <View style={styles.containerContent}>
        <Headline>Restaurar senha</Headline>
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

export default RecoveryPassPage
