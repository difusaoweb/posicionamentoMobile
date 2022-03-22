import * as React from 'react'
import { FlatList } from 'react-native'
import { ActivityIndicator, useTheme } from 'react-native-paper'
import type { StackNavigationProp } from '@react-navigation/stack'
import { useSelector, useDispatch } from 'react-redux'

import { getAffirmationsHome, RootState } from '../../../redux'
import HomeAffirmationListItem from '../../organims/HomeAffirmationListItem'
import ErrorHome from '../../organims/ErrorHome'
import Loading from '../../atoms/Loading'

interface HomeSignedProps {
  navigation: StackNavigationProp<{}>
}
const HomeSigned = ({ navigation }: HomeSignedProps) => {
  const dispatch = useDispatch()
  const { homeAffirmations, getAffirmationsHomeError } = useSelector(
    (state: RootState) => state.affirmations
  )
  const { colors } = useTheme()

  const [isLoading, setIsLoading] = React.useState(false)
  const [page, setPage] = React.useState(1)

  async function refreshAffirmations() {
    if (isLoading) return
    setIsLoading(true)

    await dispatch(getAffirmationsHome({ page }))
    setPage(page + 1)
    setIsLoading(false)
    console.log(homeAffirmations)
  }

  React.useEffect(() => {
    refreshAffirmations()
  }, [])

  if (isLoading) return <Loading />

  if (getAffirmationsHomeError)
    return <ErrorHome message={getAffirmationsHomeError.message} />

  return (
    <FlatList
      // style={{ backgroundColor: colors.background }}
      renderItem={({ item }) => (
        <HomeAffirmationListItem navigation={navigation} affirmation={item} />
      )}
      keyExtractor={item => `${item.id}`}
      data={homeAffirmations}
      // onEndReached={refreshAffirmations}
      // onEndReachedThreshold={0.1}
      // ListFooterComponent={<ActivityIndicator />}
    />
  )
}

export default HomeSigned
