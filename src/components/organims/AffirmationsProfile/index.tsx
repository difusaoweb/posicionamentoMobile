import * as React from 'react'
import { FlatList } from 'react-native'
import type { StackNavigationProp } from '@react-navigation/stack'
import { useSelector, useDispatch } from 'react-redux'

import { getOpinionsUser, RootState } from '../../../redux/'
import ProfileOpinionItem from '../../molecules/ProfileOpinionItem'
import ErrorHome from '../../organims/ErrorHome'
import Loading from '../../atoms/Loading'

interface OpinionsProfileProps {
  navigation: StackNavigationProp<{}>
  userId: number
}
const OpinionsProfile = ({ navigation, userId }: OpinionsProfileProps) => {
  const dispatch = useDispatch()
  const { userOpinions, getOpinionsUserError } = useSelector(
    (state: RootState) => state.opinions
  )

  const [isLoading, setIsLoading] = React.useState(true)

  async function onGetOpinionsUser() {
    await dispatch(getOpinionsUser({ userId }))
    setIsLoading(false)
  }

  React.useEffect(() => {
    onGetOpinionsUser()
  }, [])

  if (isLoading) return <Loading />

  if (getOpinionsUserError)
    return <ErrorHome message={getOpinionsUserError.message} />

  return (
    <FlatList
      renderItem={({ item }) => (
        <ProfileOpinionItem
          key={item.id}
          navigation={navigation}
          opinion={item}
        />
      )}
      keyExtractor={item => `${item.id}`}
      data={userOpinions}
    />
  )
}

export default OpinionsProfile
