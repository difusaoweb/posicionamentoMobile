import * as React from 'react'
import { View } from 'react-native'
import { Headline } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import type { StackNavigationProp } from '@react-navigation/stack'

import {
  getAffirmationSingle,
  setCurrentOpinionValueAffirmation,
  RootState
} from '../../../redux'
import Loading from '../../atoms/Loading'
import AffirmationHeroButtonOpinion from '../../atoms/AffirmationHeroButtonOpinion'
import ErrorHome from '../../organims/ErrorHome'
import styles from './index.style'

interface AffirmationHeroProps {
  navigation: StackNavigationProp<{}>
  affirmationId: number
}
const AffirmationHero = ({
  navigation,
  affirmationId
}: AffirmationHeroProps) => {
  const dispatch = useDispatch()
  const { affirmationSingle, getAffirmationSingleError } = useSelector(
    (state: RootState) => state.affirmations
  )

  const { affirmationCurrentOpinionValue } = useSelector(
    (state: RootState) => state.opinions
  )

  const [isLoading, setIsLoading] = React.useState(true)

  async function onGetAffirmationSingle() {
    await dispatch(getAffirmationSingle({ affirmationId }))

    setIsLoading(false)
  }

  function onSetCurrentOpinionValueAffirmation() {
    dispatch(
      setCurrentOpinionValueAffirmation(
        affirmationSingle?.opinion?.value ?? null
      )
    )
  }

  React.useEffect(() => {
    onGetAffirmationSingle()
  }, [])

  React.useEffect(() => {
    onSetCurrentOpinionValueAffirmation()
  }, [affirmationSingle])

  if (isLoading) return <Loading />

  if (getAffirmationSingleError)
    return (
      <ErrorHome type="danger" message={getAffirmationSingleError.message} />
    )

  return (
    <View style={styles.container}>
      <View style={[styles.column, { marginBottom: 10 }]}>
        <Headline style={{ fontSize: 8 }}>
          opinion: {JSON.stringify(affirmationSingle?.opinion)}
          {'\n'}
          opinionCurrentValue: {affirmationCurrentOpinionValue ?? 'null'}
        </Headline>
        <Headline>{affirmationSingle?.message}.</Headline>
      </View>
      <View style={[styles.column, styles.avaliationRow]}>
        <View style={styles.avaliationColumn}>
          <AffirmationHeroButtonOpinion
            opinionValue={1}
            opinionAmount={affirmationSingle?.stronglyAgree ?? 0}
            navigation={navigation}
            affirmationId={affirmationId}
          />
        </View>
        <View style={styles.avaliationColumn}>
          <AffirmationHeroButtonOpinion
            opinionValue={0.5}
            opinionAmount={affirmationSingle?.agree ?? 0}
            navigation={navigation}
            affirmationId={affirmationId}
          />
        </View>
        <View style={styles.avaliationColumn}>
          <AffirmationHeroButtonOpinion
            opinionValue={0}
            opinionAmount={affirmationSingle?.neutral ?? 0}
            navigation={navigation}
            affirmationId={affirmationId}
          />
        </View>
        <View style={styles.avaliationColumn}>
          <AffirmationHeroButtonOpinion
            opinionValue={-0.5}
            opinionAmount={affirmationSingle?.disagree ?? 0}
            navigation={navigation}
            affirmationId={affirmationId}
          />
        </View>
        <View style={styles.avaliationColumn}>
          <AffirmationHeroButtonOpinion
            opinionValue={-1}
            opinionAmount={affirmationSingle?.stronglyDisagree ?? 0}
            navigation={navigation}
            affirmationId={affirmationId}
          />
        </View>
      </View>
    </View>
  )
}

export default AffirmationHero
