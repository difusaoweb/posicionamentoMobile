import React from 'react'
import type { StackNavigationProp } from '@react-navigation/stack'

import ScreenWrapper from '../../ScreenWrapper'
import ListAffirmationsHome from '../../components/ecosystems/ListAffirmationsHome'


type HomePageProps = {
  navigation: StackNavigationProp<{}>
}
const HomePage = ({ navigation }: HomePageProps) => {
  return (
    <ScreenWrapper contentContainerStyle={{ flex: 1 }}>
      <ListAffirmationsHome navigation={navigation} />
    </ScreenWrapper>
  )
}

export default HomePage
