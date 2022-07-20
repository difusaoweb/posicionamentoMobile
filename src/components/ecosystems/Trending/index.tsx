import * as React from 'react'
import { FlatList } from 'react-native'
import type { StackNavigationProp } from '@react-navigation/stack'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { getAffirmationsTrending, RootState } from '../../../redux'
import { HomeAffirmationListItem } from '../../organims/HomeAffirmationListItem'
import { ErrorHome } from '../../organims/ErrorHome'
import { Loading } from '../../atoms/Loading'

interface TrendingProps {
  navigation: StackNavigationProp<{}>
}
export const Trending = ({ navigation }: TrendingProps) => {
  const dispatch = useDispatch()
  const { trending, trendingLastPage, getAffirmationsTrendingError } = useSelector(
    (state: ReturnType<RootState>) => state.affirmations
  )
  const [t] = useTranslation('trending')

  const [isLoading, setIsLoading] = React.useState(false)
  const [page, setPage] = React.useState(1)

  async function onGetAffirmationsTrending() {
    setIsLoading(true)
    await dispatch(getAffirmationsTrending(page))
    setIsLoading(false)
  }

  React.useEffect(() => {
    onGetAffirmationsTrending()
  }, [page])

  const renderLoader = () => isLoading ? <Loading /> : null

  if (getAffirmationsTrendingError?.status == 404)
    return <ErrorHome type="info" message={t('noTredingAffirmationsYet')} />

  return (
    <FlatList
      renderItem={({ item }) => (
        <HomeAffirmationListItem navigation={navigation} affirmation={item} />
      )}
      keyExtractor={item => `${item.id}`}
      data={trending}
      ListFooterComponent={renderLoader}
      onEndReached={() => page != trendingLastPage ? setPage(page + 1) : null}
      onEndReachedThreshold={0}
    />
  )
}
