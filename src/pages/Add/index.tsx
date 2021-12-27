import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import type { StackNavigationProp } from '@react-navigation/stack'
import { Dimensions } from 'react-native'

import BannerHeader from '../../components/atoms/BannerHeader'
import { useAppSelector } from '../../hooks'
import { currentUser as currentUserRedux } from '../../redux/reducers/access'
import SignedAddPage from '../../components/ecosystems/SignedAddPage'
import NotSigned from '../../components/ecosystems/NotSigned'


const height = Dimensions.get('window').height - 108

type AddPageProps = {
  navigation: StackNavigationProp<{}>
}

const AddPage = ({ navigation }: AddPageProps) => {
  const currentUser = useAppSelector(currentUserRedux)
  const { colors } = useTheme()

  return (
    <View style={[ styles.container, { backgroundColor: colors.background } ]}>
      <BannerHeader />
      <View style={styles.containerContent}>
      {
        currentUser ? <SignedAddPage /> : <NotSigned navigation={navigation} />
      }
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

export default AddPage
