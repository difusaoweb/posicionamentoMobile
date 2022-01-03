import * as React from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet
} from 'react-native'
import {
  Paragraph,
  Card,
  useTheme,
  ActivityIndicator
} from 'react-native-paper'
import type { StackNavigationProp } from '@react-navigation/stack'

import HomeAffirmationListItem from '../../organims/HomeAffirmationListItem'
import ErrorHome from '../../organims/ErrorHome'
import api from '../../../services/api'
import { useAppSelector, useAppDispatch } from '../../../hooks'
import {
  setAffirmations,
  affirmations as affirmationsRedux,
  errorAffirmations as errorAffirmationsRedux
} from '../../../redux/reducers/homePage'

interface Affirmation {
  id: number,
  message: string
  strongly_agree: number | null
  agree: number | null
  neutral: number | null
  disagree: number | null
  strongly_disagree: number | null
}

type ListAfirmationsHome2Props = {
  navigation: StackNavigationProp<{}>
}


const ListAfirmationsHome2 = ({ navigation }: ListAfirmationsHome2Props) => {
  const affirmations = useAppSelector(affirmationsRedux)
  const errorAffirmations = useAppSelector(errorAffirmationsRedux)
  const dispatch = useAppDispatch()

  const [isSubmit, setIsSubmit] = React.useState(false)

  React.useEffect(() => {
    async function getAffirmations() {
      setIsSubmit(true)

      dispatch(setAffirmations())

      setIsSubmit(false)
    }
    getAffirmations()
  },[]);

  const { colors } = useTheme()

  if(isSubmit)
    return (
      <View style={styles.row}>
        <ActivityIndicator />
      </View>
    )

  if(errorAffirmations)
    return <ErrorHome message={errorAffirmations.message}/>

  return (
    <FlatList
      style={{ backgroundColor: colors.background }}
      renderItem={({ item }) => (
        <HomeAffirmationListItem
          navigation={navigation}
          affirmation={item}
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

export default ListAfirmationsHome2
