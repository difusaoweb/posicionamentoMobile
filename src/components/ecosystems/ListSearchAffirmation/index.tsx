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

import HomeAffirmationListItem from '../../organims/HomeAffirmationListItem'
import ErrorBox from '../../molecules/ErrorBox'

import { useAppSelector } from '../../../hooks'
import {
  isSubmit as isSubmitRedux,
  errorSearchIn as errorSearchInRedux,
  affirmations as affirmationsRedux
} from '../../../redux/reducers/search'


const ListSearchAffirmation = () => {
  const affirmations = useAppSelector(affirmationsRedux)
  const errorSearchIn = useAppSelector(errorSearchInRedux)
  const isSubmit = useAppSelector(isSubmitRedux)

  const { colors } = useTheme()

  if(isSubmit)
    return (
      <View style={styles.row}>
        <ActivityIndicator />
      </View>
    )

  if(errorSearchIn)
    return <ErrorBox message={errorSearchIn.message} />

  return (
    <FlatList
      style={{ backgroundColor: colors.background }}
      renderItem={({ item }) => (
        <HomeAffirmationListItem
          message={item.message}
          stronglyAgree={item.strongly_agree}
          agree={item.agree}
          neutral={item.neutral}
          disagree={item.disagree}
          stronglyDisagree={item.strongly_disagree}
        />
      )}
      keyExtractor={item => item.id}
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
