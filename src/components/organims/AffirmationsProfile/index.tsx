import React, { useEffect, useState } from 'react'
import {
  View,
  FlatList,
  StyleSheet
} from 'react-native'
import { useTheme, ActivityIndicator } from 'react-native-paper'
import type { StackNavigationProp } from '@react-navigation/stack'
import { useSelector, useDispatch } from 'react-redux'

import { getOpinionsUser, RootState } from '../../../redux/'
import ProfileOpinionItem from '../../molecules/ProfileOpinionItem'
import ErrorHome from '../../organims/ErrorHome'
import Loading from '../../atoms/Loading'

interface OpinionsProfileProps {
  navigation: StackNavigationProp<{}>
  userId: number
}

const OpinionsProfile = ({ navigation, userId }: OpinionsProfileProps) => {
  const dispatch = useDispatch()
  const { opinionsUser, getOpinionsUserError } = useSelector((state: RootState) => state.opinions)
  const { colors } = useTheme()

  const [isLoading, setIsLoading] = useState(true)

  async function refreshProfile() {
    await dispatch(getOpinionsUser({ userId }))
    setIsLoading(false)
  }

  useEffect(() => {
    refreshProfile()
  }, [])

  if(isLoading) return <Loading />

  if(!!getOpinionsUserError)
    return <ErrorHome message={getOpinionsUserError.message} />

  const theOpinions = opinionsUser?.map((opinion) =>
    <ProfileOpinionItem
      key={opinion.id}
      navigation={navigation}
      opinion={opinion}
    />
  )

  return (
    <>{theOpinions}</>
  )
}

const styles = StyleSheet.create({
  row: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  }
})

export default OpinionsProfile
