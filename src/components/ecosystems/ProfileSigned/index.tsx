import * as React from 'react'
import { Button } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import type { StackNavigationProp } from '@react-navigation/stack'
// import HeroProfile from '../../organims/HeroProfile'
// import AffirmationsProfile from '../../organims/AffirmationsProfile'

import { deleteLogOut } from '../../../redux'

interface ProfileSignedProps {
  navigation: StackNavigationProp<{}>
  userId: number
}
const ProfileSigned = ({ navigation, userId }: ProfileSignedProps) => {
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = React.useState(false)

  async function onDeleteLogOut() {
    setIsLoading(true)
    await dispatch(deleteLogOut())
    setIsLoading(false)
  }

  return (
    <>
      {/* <HeroProfile userId={userId} /> */}
      {/* <AffirmationsProfile navigation={navigation} userId={userId} /> */}
      <Button
        onPress={onDeleteLogOut}
        disabled={isLoading}
        mode="contained"
        loading={isLoading}
      >
        Sair
      </Button>
    </>
  )
}

export default ProfileSigned
