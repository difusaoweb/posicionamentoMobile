import * as React from 'react'
import type { StackNavigationProp } from '@react-navigation/stack'
import { useSelector } from 'react-redux'

import ScreenWrapper from '../../ScreenWrapper'
import { RootState } from '../../redux'
import HomeSigned from '../../components/ecosystems/HomeSigned'
import HomeNotSigned from '../../components/ecosystems/HomeNotSigned'

interface HomePageProps {
  navigation: StackNavigationProp<{}>
}
const HomePage = ({ navigation }: HomePageProps) => {
  const { isAuthenticated } = useSelector(
    (state: ReturnType<RootState>) => state.access
  )

  return (
    <ScreenWrapper contentContainerStyle={{ flex: 1 }}>
      {isAuthenticated ? (
        <HomeSigned navigation={navigation} />
      ) : (
        <HomeNotSigned navigation={navigation} />
      )}
    </ScreenWrapper>
  )
}

export default HomePage
