import * as React from 'react'
import { FlatList } from 'react-native'
import type { StackNavigationProp } from '@react-navigation/stack'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { getAffirmationsTrending, RootState } from '../../../redux'
import HomeAffirmationListItem from '../../organims/HomeAffirmationListItem'
import ErrorHome from '../../organims/ErrorHome'
import Loading from '../../atoms/Loading'

interface TrendingProps {
  navigation: StackNavigationProp<{}>
}
const Trending = ({ navigation }: TrendingProps) => {
  const dispatch = useDispatch()
  const { trendingAffirmations, getAffirmationsTrendingError } = useSelector(
    (state: RootState) => state.affirmations
  )
  const [t] = useTranslation('trending')

  const [isLoading, setIsLoading] = React.useState(false)

  async function onGetAffirmationsTrending() {
    setIsLoading(true)
    await dispatch(getAffirmationsTrending())
    setIsLoading(false)
  }

  React.useEffect(() => {
    onGetAffirmationsTrending()
  }, [])

  if (isLoading) return <Loading />

  if (getAffirmationsTrendingError?.status == 404)
    return <ErrorHome type="info" message={t('noTredingAffirmationsYet')} />

  return (
    <FlatList
      renderItem={({ item }) => (
        <HomeAffirmationListItem navigation={navigation} affirmation={item} />
      )}
      keyExtractor={item => `${item.id}`}
      data={trendingAffirmations}
    />
  )
}

export default Trending
