import React from 'react'
import {
  View,
  StyleSheet,
} from 'react-native'
import {
  useTheme,
  Searchbar
} from 'react-native-paper'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import type { StackNavigationProp } from '@react-navigation/stack'

import BannerHeader from '../../components/atoms/BannerHeader'
import ListSearchAffirmation from '../../components/ecosystems/ListSearchAffirmation'
import { useAppDispatch } from '../../hooks'
import {
  setIsSubmit,
  SearchInDataType,
  searchInAsync,
} from '../../redux2/reducers/searchPage'

type SearchPageProps = {
  navigation: StackNavigationProp<{}>
}


const SearchPage = ({ navigation }: SearchPageProps) => {
  const dispatch = useAppDispatch()
  const [search, setSearch] = React.useState<string>('')

  async function handleSubmit() {
    dispatch(setIsSubmit(true))

    const singInAsyncData: SearchInDataType = {
      search: search
    }
    dispatch(searchInAsync(singInAsyncData))

    dispatch(setIsSubmit(false))
  }

  const { colors } = useTheme()

  return (
    <View style={[ styles.container, { backgroundColor: colors.background } ]}>
      <BannerHeader />
      <Searchbar
        placeholder="Search"
        onChangeText={(text: string) => setSearch(text)}
        value={search}
        onIconPress={() => navigation.goBack()}
        icon={{ source: 'arrow-left', direction: 'auto' }}
        style={styles.searchbar}
        onSubmitEditing={() => handleSubmit()}
      />
      <ListSearchAffirmation navigation={navigation} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: getStatusBarHeight()
  },
  searchbar: {
    margin: 4
  }
})

export default SearchPage
