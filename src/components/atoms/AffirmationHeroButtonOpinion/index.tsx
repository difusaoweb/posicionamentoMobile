import * as React from 'react'
import { TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import type { StackNavigationProp } from '@react-navigation/stack'

import AffirmationHeroButtonOpinionContent from '../AffirmationHeroButtonOpinionContent'
import { setOpinionAffirmation, RootState } from '../../../redux'
import Loading from '../../atoms/Loading'
import { styles } from './index.style'

interface AffirmationHeroButtonOpinionProps {
  active: boolean
  opinionValue: number
  opinionAmount: number
  navigation: StackNavigationProp<{}>
  affirmationId: number
}
const AffirmationHeroButtonOpinion = ({
  active,
  opinionValue,
  opinionAmount,
  navigation,
  affirmationId
}: AffirmationHeroButtonOpinionProps) => {
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector((state: RootState) => state.access)

  const [isLoading, setIsLoading] = React.useState(false)

  function onSetAvaliationOrSignIn() {
    if (!isAuthenticated) {
      navigation.navigate('AccessRoutes', { screen: 'SignInPage' })
    } else {
      onSetAvaliation(opinionValue)
    }
  }

  async function onSetAvaliation(value: number) {
    setIsLoading(true)
    await dispatch(
      setOpinionAffirmation({ affirmationId, opinionValue: value })
    )
    setIsLoading(false)
  }

  if (isLoading) return <Loading />

  return (
    <TouchableOpacity
      style={styles.avaliationButton}
      onPress={() => onSetAvaliationOrSignIn()}
      disabled={isLoading}
    >
      <AffirmationHeroButtonOpinionContent
        active={active}
        opinionValue={opinionValue}
        opinionAmount={opinionAmount}
      />
    </TouchableOpacity>
  )
}

export default AffirmationHeroButtonOpinion
