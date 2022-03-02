import * as React from 'react'
import type { StackNavigationProp } from '@react-navigation/stack'

import ScreenWrapper from '../../ScreenWrapper'
import Trending from '../../components/ecosystems/Trending'

interface TrendingPageProps {
  navigation: StackNavigationProp<{}>
}
const TrendingPage = ({ navigation }: TrendingPageProps) => {
  return (
    <ScreenWrapper contentContainerStyle={{ flex: 1 }}>
      <Trending navigation={navigation} />
    </ScreenWrapper>
  )
}

export default TrendingPage
