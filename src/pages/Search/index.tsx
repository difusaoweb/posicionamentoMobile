import React from 'react'
import {
  View,
  StyleSheet,
  Text
} from 'react-native'
import {
  TextInput,
  Title,
  Button,
  useTheme,
  HelperText,
  Searchbar
} from 'react-native-paper'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import type { StackNavigationProp } from '@react-navigation/stack'

import BannerHeader from '../../components/atoms/BannerHeader'

type SearchPageProps = {
  navigation: StackNavigationProp<{}>
}

const SearchPage = ({ navigation }: SearchPageProps) => {
  const { colors } = useTheme()
  const [secondQuery, setSecondQuery] = React.useState<string>('')

  return (
    <View style={[ styles.container, { backgroundColor: colors.background } ]}>
      <BannerHeader />
      <Searchbar
        placeholder="Search"
        onChangeText={(query: string) => setSecondQuery(query)}
        value={secondQuery}
        onIconPress={() => navigation.goBack()}
        icon={{ source: 'arrow-left', direction: 'auto' }}
        style={styles.searchbar}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: getStatusBarHeight()
  },
  row: {
    paddingHorizontal: 12
  },
  text: {
    marginVertical: 4
  },
  searchbar: {
    margin: 4
  }
})

export default SearchPage
