import * as React from 'react'
import { FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { useTheme } from 'react-native-paper'

import { getOpinionsAffirmation, RootState } from '../../../redux'
import AffirmationOpinionItem from '../../organims/AffirmationOpinionItem'
import ErrorHome from '../../organims/ErrorHome'
import Loading from '../../atoms/Loading'

interface AffirmationListOpinionsProps {
  affirmationId: number
}
const AffirmationListOpinions = ({
  affirmationId
}: AffirmationListOpinionsProps) => {
  const dispatch = useDispatch()
  const { affirmationOpinions } = useSelector(
    (state: RootState) => state.opinions
  )
  const { colors } = useTheme()

  const [isLoading, setIsLoading] = React.useState(true)

  async function onGetOpinionsAffirmation() {
    await dispatch(getOpinionsAffirmation({ affirmationId }))
    setIsLoading(false)
  }

  React.useEffect(() => {
    onGetOpinionsAffirmation()
  }, [])

  if (isLoading) return <Loading />

  return (
    <FlatList
      style={{ backgroundColor: colors.background }}
      renderItem={({ item }) => <AffirmationOpinionItem opinion={item} />}
      keyExtractor={item => `${item.id}`}
      data={affirmationOpinions}
    />
  )
}

export default AffirmationListOpinions
