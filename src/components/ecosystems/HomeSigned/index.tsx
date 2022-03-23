import * as React from 'react'
import { FlatList } from 'react-native'
import { ActivityIndicator, Title } from 'react-native-paper'
import type { StackNavigationProp } from '@react-navigation/stack'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { getAffirmationsHome, RootState } from '../../../redux'
import HomeAffirmationListItem from '../../organims/HomeAffirmationListItem'
import ErrorHome from '../../organims/ErrorHome'
import Loading from '../../atoms/Loading'

interface HomeSignedProps {
  navigation: StackNavigationProp<{}>
}
const HomeSigned = ({ navigation }: HomeSignedProps) => {
  const dispatch = useDispatch()
  const {
    homeAffirmations,
    homeAffirmationsLastPage,
    getAffirmationsHomeError
  } = useSelector((state: RootState) => state.affirmations)
  const [t] = useTranslation('home')

  const [isLoading, setIsLoading] = React.useState(false)
  const [page, setPage] = React.useState(1)

  async function onGetAffirmationsHome() {
    if (isLoading) {
      return
    }
    setIsLoading(true)

    await dispatch(getAffirmationsHome({ page }))

    setPage(page + 1)
    setIsLoading(false)
  }

  React.useEffect(() => {
    onGetAffirmationsHome()
  }, [])

  if (page == 1 && isLoading) return <Loading />

  if (getAffirmationsHomeError?.status == 404)
    return (
      <ErrorHome type="info" message={t('HomeSigned.noHomeAffirmationsYet')} />
    )

  return (
    <FlatList
      renderItem={({ item }) => (
        <HomeAffirmationListItem navigation={navigation} affirmation={item} />
      )}
      keyExtractor={item => `${item.id}`}
      data={homeAffirmations}
      onEndReached={() => {
        if (page != homeAffirmationsLastPage) {
          onGetAffirmationsHome()
        }
      }}
      onEndReachedThreshold={0.1}
      ListFooterComponent={
        page != homeAffirmationsLastPage ? <ActivityIndicator /> : <></>
      }
    />
  )
}

export default HomeSigned
