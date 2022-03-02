import * as React from 'react'
import { TouchableOpacity } from 'react-native'
import { useTheme, Caption } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useSelector, useDispatch } from 'react-redux'
import type { StackNavigationProp } from '@react-navigation/stack'

import { numberOpinionFormated } from '../../../utils'
import { setOpinionAffirmation, RootState } from '../../../redux'
import Loading from '../../atoms/Loading'
import { styles } from './index.style'

interface AffirmationHeroButtonOpinionProps {
  active: boolean
  avaliationValue: number
  opinionAmount: number
  navigation: StackNavigationProp<{}>
  affirmationId: number
}
const AffirmationHeroButtonOpinion = ({
  active,
  avaliationValue,
  opinionAmount,
  navigation,
  affirmationId
}: AffirmationHeroButtonOpinionProps) => {
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector((state: RootState) => state.access)
  const { colors } = useTheme()

  let colorIcon = ''
  switch (avaliationValue) {
    case 1:
      colorIcon = colors.stronglyAgree
      break
    case 0.5:
      colorIcon = colors.agree
      break
    case 0:
      colorIcon = colors.neutral
      break
    case -0.5:
      colorIcon = colors.disagree
      break
    case -1:
      colorIcon = colors.stronglyDisagree
      break
  }

  const [isLoading, setIsLoading] = React.useState(false)

  function onSetAvaliationOrSignIn() {
    if (!isAuthenticated) {
      navigation.navigate('AccessRoutes', { screen: 'SignInPage' })
    } else {
      onSetAvaliation(avaliationValue)
    }
  }

  async function onSetAvaliation(value: number) {
    setIsLoading(true)
    await dispatch(setOpinionAffirmation({ affirmationId, avaliation: value }))
    setIsLoading(false)
  }

  if (isLoading) return <Loading />

  return (
    <TouchableOpacity
      style={styles.avaliationButton}
      onPress={() => onSetAvaliationOrSignIn()}
      disabled={isLoading}
    >
      <MaterialCommunityIcons
        name={active ? 'thumb-up' : 'thumb-up-outline'}
        size={20}
        style={[styles.icon, { color: colorIcon }]}
      />
      <Caption style={styles.text}>
        {numberOpinionFormated(opinionAmount)}
      </Caption>
    </TouchableOpacity>
  )
}

export default AffirmationHeroButtonOpinion
