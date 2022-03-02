import * as React from 'react'
import type { StackNavigationProp } from '@react-navigation/stack'
import { useSelector } from 'react-redux'

import ScreenWrapper from '../../ScreenWrapper'
import { RootState } from '../../redux'
import ProfileSigned from '../../components/ecosystems/ProfileSigned'
import ProfileNotSigned from '../../components/ecosystems/ProfileNotSigned'

interface ProfilePageProps {
  navigation: StackNavigationProp<{}>
  userId: number | null
}
const ProfilePage = ({ navigation, userId }: ProfilePageProps) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.access)
  const { currentUser } = useSelector((state: RootState) => state.users)

  const theUserId = userId ?? !!isAuthenticated ? currentUser?.id ?? 0 : 0

  return (
    <ScreenWrapper contentContainerStyle={{ flex: 1 }}>
      {isAuthenticated ? (
        <ProfileSigned navigation={navigation} userId={theUserId} />
      ) : (
        <ProfileNotSigned navigation={navigation} />
      )}
    </ScreenWrapper>
  )
}

export default ProfilePage
