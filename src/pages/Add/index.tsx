import * as React from 'react'
import type { StackNavigationProp } from '@react-navigation/stack'
import { useSelector } from 'react-redux'

import { ScreenWrapper } from '../../ScreenWrapper'
import { RootState } from '../../redux'
import { AddSigned } from '../../components/ecosystems/AddSigned'
import { AddNotSigned } from '../../components/ecosystems/AddNotSigned'

interface AddPageProps {
  navigation: StackNavigationProp<{}>
}
export const AddPage = ({ navigation }: AddPageProps) => {
  const { isAuthenticated } = useSelector((state: ReturnType<RootState>) => state.access)

  return (
    <ScreenWrapper contentContainerStyle={{ flex: 1 }}>
      {isAuthenticated ? (
        <AddSigned />
      ) : (
        <AddNotSigned navigation={navigation} />
      )}
    </ScreenWrapper>
  )
}
