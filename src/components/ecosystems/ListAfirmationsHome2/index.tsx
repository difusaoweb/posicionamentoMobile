import React, { useEffect, useState } from 'react'
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
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from '../../../redux/reducers'
import { updateHome } from '../../../redux/'

import HomeAffirmationListItem from '../../organims/HomeAffirmationListItem'
import ErrorHome from '../../organims/ErrorHome'

interface ListAfirmationsHome2Props {
  navigation: StackNavigationProp<{}>
}


const ListAfirmationsHome2 = ({ navigation }: ListAfirmationsHome2Props) => {
  const dispatch = useDispatch()
  const { affirmations } = useSelector((state: RootState) => state.home)
  const [isLoading, setIsLoading] = useState(true)
  const { colors } = useTheme()

  function refreshHome() {
    dispatch(updateHome())
  }

  useEffect(() => {
    refreshHome()

    setIsLoading(false)
  }, [])

  if(isLoading)
    return (
      <View style={styles.row}>
        <ActivityIndicator />
      </View>
    )

  if(!!affirmations)
    return <ErrorHome message="Nada encontrado"/>

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
