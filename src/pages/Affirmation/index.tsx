import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import type { StackNavigationProp } from '@react-navigation/stack'
import { Dimensions } from 'react-native'

import BannerHeader from '../../components/atoms/BannerHeader'
import { singleAffirmationInterface } from '../../redux2/reducers/affirmationPage'
import HomeAffirmationListItem from '../../components/organims/HomeAffirmationListItem'

const height = Dimensions.get('window').height - 108

type AffirmationProps = {
  navigation: StackNavigationProp<{}>,
  affirmation: singleAffirmationInterface
}

const AffirmationPage = ({ navigation, affirmation }: AffirmationProps) => {
  const currentAffirmation = affirmation

  const { colors } = useTheme()

  return (
    <View style={[ styles.container, { backgroundColor: colors.background } ]}>
      <BannerHeader />
      <View style={styles.containerContent}>
        <HomeAffirmationListItem
          navigation={navigation}
          affirmation={affirmation}
        />
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

export default AffirmationPage
