import * as React from 'react'
import { FlatList } from 'react-native'
import { useTheme, Text, List, Searchbar } from 'react-native-paper'
import type { StackNavigationProp } from '@react-navigation/stack'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { styles } from './index.style'
import { ScreenWrapper } from '../../ScreenWrapper'
import { getAffirmationsSearch, RootState } from '../../redux'
import { Loading } from '../../components/atoms/Loading'

interface SearchPageProps {
  navigation: StackNavigationProp<{}>
}
export const SearchPage = ({ navigation }: SearchPageProps) => {
  const dispatch = useDispatch()
  const { search, searchLastPage, getAffirmationsSearchError } = useSelector(
    (state: ReturnType<RootState>) => state.affirmations
  )
  const [t] = useTranslation('search')
  const { colors } = useTheme()

  const [isLoading, setIsLoading] = React.useState(false)
  const [isOnSearch, setIsOnSearch] = React.useState(false)
  const [searchString, setSearchString] = React.useState<string>('')
  const [page, setPage] = React.useState(1)

  async function onSearchMore() {
    setIsLoading(true)
    await dispatch(getAffirmationsSearch({ search: searchString, page }))
    setIsLoading(false)
  }

  async function onSearch() {
    await onSearchMore()
    setIsOnSearch(false)
  }

  React.useEffect(() => {
    if (isOnSearch) {
      onSearch()
    }
  }, [isOnSearch])

  React.useEffect(() => {
    if(page != 1) {
      onSearchMore()
    }
  }, [page])

  const renderLoader = () => isLoading ? <Loading /> : null

  return (
    <>
      <Searchbar
        icon={{ source: 'arrow-left', direction: 'auto' }}
        onIconPress={() => navigation.goBack()}
        placeholder={t('searchbar.placeholder')}
        onChangeText={(text: string) => setSearchString(text)}
        value={searchString}
        style={styles.searchbar}
        onSubmitEditing={() => searchString ? setIsOnSearch(true) : null}
      />
      <ScreenWrapper contentContainerStyle={{ flex: 1 }}>
        {!!search &&(
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
              data={search}
              ListFooterComponent={renderLoader}
              onEndReached={() => page < (searchLastPage ?? 0) ? setPage(page + 1) : null}
              onEndReachedThreshold={0}
            />
          </List.Section>
        )}
        {getAffirmationsSearchError?.status === 404 && (
          <Text style={styles.caption}>{t('noResultsFound')}</Text>
        )}
      </ScreenWrapper>
    </>
  )
}
