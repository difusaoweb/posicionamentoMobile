import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { useTheme } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'

import { getOpinionsAffirmation, RootState } from '../../../redux/'
import AffirmationOpinionItem from '../../organims/AffirmationOpinionItem'
import ErrorHome from '../../organims/ErrorHome'
import {
  AffirmationInterface
} from '../../../redux/types'
import Loading from '../../atoms/Loading'

interface ListOpinionsAffirmationProps {
  affirmation: AffirmationInterface
}
const ListOpinionsAffirmation = ({ affirmation }: ListOpinionsAffirmationProps) => {
  const dispatch = useDispatch()
  const { opinionsAffirmation, getOpinionsAffirmationError } = useSelector((state: RootState) => state.opinions)
  const { colors } = useTheme()

  const [isLoading, setIsLoading] = useState(true)

  async function refreshProfile() {
    await dispatch(getOpinionsAffirmation({ affirmationId: affirmation.id }))
    setIsLoading(false)
  }

  useEffect(() => {
    refreshProfile()
  }, [])

  if(isLoading) return <Loading />

  if(!!getOpinionsAffirmationError)
    return <ErrorHome message={getOpinionsAffirmationError.message} />

  return (
    <FlatList
      style={{ backgroundColor: colors.background }}
      renderItem={({ item }) => (
        <AffirmationOpinionItem opinion={item} />
      )}
      keyExtractor={item => `${item.id}`}
      data={opinionsAffirmation}
    />
  )
}

export default ListOpinionsAffirmation
