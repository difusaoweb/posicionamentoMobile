import React, { useReducer } from 'react'
import {
  View,
  StyleSheet,
  ScrollView
  // Text
} from 'react-native'
import {
  // TextInput,
  // Title,
  // Button,
  useTheme,
  // HelperText,
  // Avatar,
  // Headline,
  // Paragraph,
  // Caption,
  // Subheading,
  Divider
} from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import type { StackNavigationProp } from '@react-navigation/stack'
import HeroProfile from '../../organims/HeroProfile'
import AffirmationsProfile from '../../organims/AffirmationsProfile'

import { logOutAccess, RootState } from '../../../redux'

interface ProfileSignedProps {
  navigation: StackNavigationProp<{}>
  userId: number
}
const ProfileSigned = ({ navigation, userId }: ProfileSignedProps) => {
  // const dispatch = useDispatch()
  const { colors } = useTheme()

  // const [isLoading, setIsLoading] = useState(false)

  // async function onLogOut() {
  //   setIsLoading(true)
  //   await dispatch(logOutAccess())
  //   setIsLoading(false)
  // }

  // if(!!user) {
  //   navigation.navigate('AccessRoutes', { screen: 'SignInPage' })
  // }

  return (
    <View style={styles.container}>
      <ScrollView>
        <HeroProfile userId={userId} />
        <AffirmationsProfile navigation={navigation} userId={userId} />
        {/* <Button
          onPress={onLogOut}
          disabled={isLoading}
          loading={isLoading}
          mode="contained"
          style={styles.button}
        >
          Sair
        </Button> */}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  }
})

export default ProfileSigned
