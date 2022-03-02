import * as React from 'react'
import { FlatList } from 'react-native'
import { useTheme } from 'react-native-paper'
import type { StackNavigationProp } from '@react-navigation/stack'
import { useSelector, useDispatch } from 'react-redux'

import { getAffirmationsHome, RootState } from '../../../redux'
import HomeAffirmationListItem from '../../organims/HomeAffirmationListItem'
import ErrorHome from '../../organims/ErrorHome'
import Loading from '../../atoms/Loading'

interface TrendingProps {
  navigation: StackNavigationProp<{}>
}
const Trending = ({ navigation }: TrendingProps) => {
  const dispatch = useDispatch()
  const { homeAffirmations, getAffirmationsHomeError } = useSelector(
    (state: RootState) => state.affirmations
  )
  const { colors } = useTheme()

  const [isLoading, setIsLoading] = React.useState(true)

  async function refreshHome() {
    await dispatch(getAffirmationsHome())
    setIsLoading(false)
  }

  React.useEffect(() => {
    refreshHome()
  }, [])

  if (isLoading) return <Loading />

  if (getAffirmationsHomeError)
    return <ErrorHome message={getAffirmationsHomeError.message} />

  return (
    <FlatList
      style={{ backgroundColor: colors.background }}
      renderItem={({ item }) => (
        <HomeAffirmationListItem navigation={navigation} affirmation={item} />
      )}
      keyExtractor={item => `${item.id}`}
      data={homeAffirmations}
    />
  )
}

export default Trending
