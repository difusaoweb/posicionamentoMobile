import * as React from 'react'
import {
  View,
  FlatList,
  StyleSheet
} from 'react-native'
import {
  useTheme,
  ActivityIndicator
} from 'react-native-paper'
import type { StackNavigationProp } from '@react-navigation/stack'

import HomeAffirmationListItem from '../../organims/HomeAffirmationListItem'
import ErrorBox from '../../molecules/ErrorBox'
import { useAppSelector } from '../../../hooks'
import {
  isSubmit as isSubmitRedux,
  errorSearchIn as errorSearchInRedux,
  affirmations as affirmationsRedux
} from '../../../redux2/reducers/searchPage'
import Loading from '../../atoms/Loading'

type ListSearchAffirmationProps = {
  navigation: StackNavigationProp<{}>
}
const ListSearchAffirmation = ({ navigation }: ListSearchAffirmationProps) => {
  const affirmations = useAppSelector(affirmationsRedux)
  const errorSearchIn = useAppSelector(errorSearchInRedux)
  const isSubmit = useAppSelector(isSubmitRedux)

  const { colors } = useTheme()

  if(isSubmit) return <Loading />

  if(errorSearchIn)
    return <ErrorBox message={errorSearchIn.message} />

  return (
    <FlatList
      style={{ backgroundColor: colors.background }}
      renderItem={({ item }) => (
        <HomeAffirmationListItem
        navigation={navigation}
        affirmation={{
          id: item.id,
          message: item.message,
          stronglyAgree: item.strongly_agree ?? 0,
          agree: item.agree ?? 0,
          neutral: item.neutral ?? 0,
          disagree: item.disagree ?? 0,
          stronglyDisagree: item.strongly_disagree ?? 0
        }}
        />
      )}
      keyExtractor={item => `${item.id}`}
      data={affirmations}
    />
  )
}

const styles = StyleSheet.create({
  row: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  }
})

export default ListSearchAffirmation
