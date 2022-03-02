import * as React from 'react'
import { View } from 'react-native'
import { useTheme, Headline } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import type { StackNavigationProp } from '@react-navigation/stack'

import { getAffirmationSingle, RootState } from '../../../redux'
import Loading from '../../atoms/Loading'
import AffirmationHeroButtonOpinion from '../../atoms/AffirmationHeroButtonOpinion'
import ErrorHome from '../../organims/ErrorHome'
import { styles } from './index.style'

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
  const { colors } = useTheme()

  const [isLoading, setIsLoading] = React.useState(true)

  async function onGetAffirmationSingle() {
    await dispatch(getAffirmationSingle({ affirmationId }))
    setIsLoading(false)
  }

  React.useEffect(() => {
    onGetAffirmationSingle()
  }, [])

  if (isLoading) return <Loading />

  if (getAffirmationSingleError)
    return <ErrorHome message={getAffirmationSingleError.message} />

  return (
    <View style={styles.container}>
      <View style={[styles.column, { marginBottom: 10 }]}>
        <Headline>{affirmationSingle?.message}.</Headline>
      </View>
      <View style={[styles.column, styles.avaliationRow]}>
        <View style={styles.avaliationColumn}>
          <AffirmationHeroButtonOpinion
            active={affirmationSingle?.opinionAvaliation === 1}
            avaliationValue={1}
            opinionAmount={affirmationSingle?.stronglyAgree ?? 0}
            navigation={navigation}
            affirmationId={affirmationId}
          />
        </View>
        <View style={styles.avaliationColumn}>
          <AffirmationHeroButtonOpinion
            active={affirmationSingle?.opinionAvaliation === 0.5}
            avaliationValue={0.5}
            opinionAmount={affirmationSingle?.agree ?? 0}
            navigation={navigation}
            affirmationId={affirmationId}
          />
        </View>
        <View style={styles.avaliationColumn}>
          <AffirmationHeroButtonOpinion
            active={affirmationSingle?.opinionAvaliation === 0}
            avaliationValue={0}
            opinionAmount={affirmationSingle?.neutral ?? 0}
            navigation={navigation}
            affirmationId={affirmationId}
          />
        </View>
        <View style={styles.avaliationColumn}>
          <AffirmationHeroButtonOpinion
            active={affirmationSingle?.opinionAvaliation === -0.5}
            avaliationValue={-0.5}
            opinionAmount={affirmationSingle?.neutral ?? 0}
            navigation={navigation}
            affirmationId={affirmationId}
          />
        </View>
        <View style={styles.avaliationColumn}>
          <AffirmationHeroButtonOpinion
            active={affirmationSingle?.opinionAvaliation === -1}
            avaliationValue={-1}
            opinionAmount={affirmationSingle?.neutral ?? 0}
            navigation={navigation}
            affirmationId={affirmationId}
          />
        </View>
      </View>
    </View>
  )
}

export default AffirmationHero
