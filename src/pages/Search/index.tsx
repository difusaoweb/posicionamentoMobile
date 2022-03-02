import * as React from 'react'
import { FlatList } from 'react-native'
import { useTheme, Text, List, Searchbar } from 'react-native-paper'
import type { StackNavigationProp } from '@react-navigation/stack'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { styles } from './index.style'
import ScreenWrapper from '../../ScreenWrapper'
import { getAffirmationsSearch, RootState } from '../../redux'
import Loading from '../../components/atoms/Loading'

interface SearchPageProps {
  navigation: StackNavigationProp<{}>
}
const SearchPage = ({ navigation }: SearchPageProps) => {
  const dispatch = useDispatch()
  const { searchAffirmations, getAffirmationsSearchError } = useSelector(
    (state: RootState) => state.affirmations
  )
  const [t] = useTranslation('search')
  const { colors } = useTheme()

  const [search, setSearch] = React.useState<string>('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [isOnSearch, setIsOnSearch] = React.useState(false)

  async function onSearch() {
    setIsLoading(true)
    await dispatch(getAffirmationsSearch({ search }))
    setIsLoading(false)
    setIsOnSearch(false)
  }

  React.useEffect(() => {
    if (isOnSearch) {
      onSearch()
    }
  }, [isOnSearch])

  if (isLoading) return <Loading />

  return (
    <ScreenWrapper contentContainerStyle={{ flex: 1 }}>
      <Searchbar
        icon={{ source: 'arrow-left', direction: 'auto' }}
        onIconPress={() => navigation.goBack()}
        placeholder={t('searchbar.placeholder')}
        onChangeText={(text: string) => setSearch(text)}
        value={search}
        style={styles.searchbar}
        onSubmitEditing={() => setIsOnSearch(true)}
      />
      {!!searchAffirmations && (
        <List.Section>
          <FlatList
            style={{ backgroundColor: colors.background }}
            renderItem={item => (
              <List.Item
                title={item.item.message}
                onPress={() => {
                  navigation.navigate('AppRoutes', {
                    screen: 'AffirmationPage',
                    params: { affirmationId: item.item.id }
                  })
                }}
              />
            )}
            keyExtractor={item => `${item.id}`}
            data={searchAffirmations}
          />
        </List.Section>
      )}
      {getAffirmationsSearchError?.status === 404 && (
        <Text style={styles.caption}>{t('noResultsFound')}</Text>
      )}
    </ScreenWrapper>
  )
}

export default SearchPage
