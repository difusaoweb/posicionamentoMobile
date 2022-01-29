import React from 'react'
import type { StackNavigationProp } from '@react-navigation/stack'
import { useSelector } from 'react-redux'

import ScreenWrapper from '../../ScreenWrapper'
import { RootState } from '../../redux'
import SignedProfilePage from '../../components/ecosystems/SignedProfilePage'
import NotSigned from '../../components/ecosystems/NotSigned'


interface ProfilePageProps {
  navigation: StackNavigationProp<{}>
  userId: number | null
}
const ProfilePage = ({ navigation, userId }: ProfilePageProps) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.access)
  const { currentUser } = useSelector((state: RootState) => state.users)

  const theUserId = userId ?? (!!isAuthenticated) ? currentUser?.id ?? 0 : 0

  return (
    <ScreenWrapper contentContainerStyle={{ flex: 1 }}>
    {
      !!isAuthenticated ? (
        <SignedProfilePage navigation={navigation} userId={theUserId} />
      ) : (
        <NotSigned navigation={navigation} />
      )
    }
    </ScreenWrapper>
  )
}

export default ProfilePage
