import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import {
  TextInput,
  Title,
  Button,
  useTheme,
  HelperText,
  Avatar,
  Headline,
  Paragraph,
  Caption,
  Subheading,
  Divider,
  ActivityIndicator
} from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'

import avatarDefault from '../../../assets/images/avatar.png'
import { numberOpinionFormated } from '../../../utils'
import { getUserProfile, RootState } from '../../../redux'
import {
  ProfileUserInterface,
  CurrentUserInterface
} from '../../../redux/types'
import Loading from '../../atoms/Loading'

interface HeroProfileProps {
  userId: number
}
const HeroProfile = ({ userId }: HeroProfileProps) => {
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state: RootState) => state.users)
  const [isLoading, setIsLoading] = useState(true)

  let profile: ProfileUserInterface | CurrentUserInterface | null = currentUser
  if (userId != currentUser?.id) {
    profile = useSelector((state: RootState) => state.users).profile

    async function refreshProfileUser() {
      await dispatch(getUserProfile({ userId }))
      setIsLoading(false)
    }

    useEffect(() => {
      refreshProfileUser()
    }, [])
  }

  const avatarSource = profile?.meta.avatar
    ? { uri: profile.meta.avatar }
    : avatarDefault

  if (isLoading) return <Loading />

  return (
    <>
      <View style={styles.hero}>
        <View style={styles.column}>
          <Avatar.Image style={styles.avatar} source={avatarSource} size={80} />
        </View>
        <View style={[styles.column, { flexShrink: 1 }]}>
          <Headline style={[styles.textLimit, { margin: 0 }]}>
            {profile?.userLogin}
          </Headline>
          <Subheading style={[styles.textLimit, { margin: 0 }]}>
            {profile?.displayName}
          </Subheading>
          <Caption style={[styles.textLimit, { margin: 0 }]}>
            {profile?.meta.title}
          </Caption>
          <Text style={{ color: '#fff', margin: 0, fontWeight: '600' }}>
            {numberOpinionFormated(profile?.meta.followers ?? 0)}
            <Caption> Seguidores</Caption>
          </Text>
        </View>
      </View>
      <View style={styles.subHero}>
        <Paragraph>{profile?.meta.description}</Paragraph>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingTop: 24
  },
  hero: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 24
  },
  subHero: {
    paddingHorizontal: 16,
    paddingBottom: 21
  },
  column: {
    flexDirection: 'column'
  },
  avatar: {
    margin: 8
  },
  textLimit: {
    overflow: 'hidden'
    // textOverflow: 'ellipsis',
    // whiteSpace: 'nowrap'
  }
})

export default HeroProfile
