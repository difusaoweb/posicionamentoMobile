import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useTheme, Button } from 'react-native-paper'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import type { StackNavigationProp } from '@react-navigation/stack'
import { Dimensions } from 'react-native'

import BannerHeader from '../../components/atoms/BannerHeader'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { singOutAsync, currentUser as currentUserRedux } from '../../redux2/reducers/signInUpPage'
import SignedProfilePage from '../../components/ecosystems/SignedProfilePage'
import NotSigned from '../../components/ecosystems/NotSigned'

const height = Dimensions.get('window').height - 108

type ProfilePageProps = {
  navigation: StackNavigationProp<{}>
}

const ProfilePage = ({ navigation }: ProfilePageProps) => {
  const currentUser = useAppSelector(currentUserRedux)
  const dispatch = useAppDispatch()

  const { colors } = useTheme()

  return (
    <View style={[ styles.container, { backgroundColor: colors.background } ]}>
      <BannerHeader />
      <View style={styles.containerContent}>
      {
        currentUser ? <SignedProfilePage /> : <NotSigned navigation={navigation} />
      }
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
  },
  row: {
    paddingHorizontal: 12
  },
  button: {
    margin: 4
  }
})

export default ProfilePage
