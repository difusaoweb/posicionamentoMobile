import React from 'react'
import {
  StyleSheet,
  View,
  Dimensions
} from 'react-native'
import { useTheme } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import type { StackNavigationProp } from '@react-navigation/stack'

import BannerHeader from '../../components/atoms/BannerHeader'
import SignUpAccess from '../../components/ecosystems/SignUpAccess'
import { RootState } from '../../redux'

const height = Dimensions.get('window').height - 54

interface SignUpProps {
  navigation: StackNavigationProp<{}>
}
const SignUp = ({ navigation }: SignUpProps) => {
  const { currentToken } = useSelector((state: RootState) => state.access)
  const { colors } = useTheme()

  if(!!currentToken) {
    navigation.goBack()
  }

  return (
    <View style={[ styles.container, { backgroundColor: colors.background } ]}>
      <BannerHeader />
      <View style={styles.containerContent}>
        <View style={styles.content}>
          <SignUpAccess navigation={navigation} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: getStatusBarHeight()
  },
  containerContent: {
    flex: 1,
    flexDirection: 'row',
    height: height,
    minHeight: height,
    maxHeight: height,
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  content: {
    height: '100%',
    width: '100%'
  }
})

export default SignUp
