import * as React from 'react'
import { TouchableOpacity } from 'react-native'
import { Title } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import type { StackNavigationProp } from '@react-navigation/stack'

import AffirmationHeroButtonOpinionContent from '../AffirmationHeroButtonOpinionContent'
import {
  setOpinionAffirmation,
  deleteOpinionAffirmation,
  RootState
} from '../../../redux'
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
  opinionValue,
  opinionAmount,
  navigation,
  affirmationId
}: AffirmationHeroButtonOpinionProps) => {
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector((state: RootState) => state.access)
  const { affirmationSingle } = useSelector(
    (state: RootState) => state.affirmations
  )
  const {
    affirmationCurrentOpinionValue,
    affirmationBeforeCurrentOpinionValue,
    affirmationDeletedOpinionValue
  } = useSelector((state: RootState) => state.opinions)

  const [isLoading, setIsLoading] = React.useState(false)
  const [currentActive, setCurrentActive] = React.useState(
    opinionValue == affirmationCurrentOpinionValue
  )
  const [currentOpinionAmount, setCurrentOpinionAmount] =
    React.useState(opinionAmount)

  function onSetAvaliationOrSignIn() {
    if (!isAuthenticated) {
      navigation.navigate('AccessRoutes', { screen: 'SignInPage' })
    } else if (currentActive) {
      onDeleteOpinion()
    } else {
      onSetOpinionAffirmation()
    }
  }

  async function onSetOpinionAffirmation() {
    setIsLoading(true)

    await dispatch(setOpinionAffirmation({ affirmationId, opinionValue }))

    setIsLoading(false)
  }

  async function onDeleteOpinion() {
    setIsLoading(true)

    await dispatch(
      deleteOpinionAffirmation({
        opinionId: affirmationSingle?.opinion?.id ?? 0,
        opinionValue
      })
    )

    setIsLoading(false)
  }

  React.useEffect(() => {
    if (affirmationCurrentOpinionValue) {
      if (opinionValue == affirmationCurrentOpinionValue) {
        setCurrentActive(true)
        if (affirmationBeforeCurrentOpinionValue) {
          if (
            affirmationCurrentOpinionValue !=
            affirmationBeforeCurrentOpinionValue
          ) {
            setCurrentOpinionAmount(opinionAmount + 1)
          }
        }
      } else {
        setCurrentActive(false)
        if (affirmationBeforeCurrentOpinionValue) {
          if (opinionValue == affirmationBeforeCurrentOpinionValue) {
            setCurrentOpinionAmount(opinionAmount - 1)
          }
        }
      }
    }
  }, [affirmationCurrentOpinionValue])

  React.useEffect(() => {
    if (affirmationDeletedOpinionValue) {
      setCurrentActive(false)
      if (opinionValue == affirmationDeletedOpinionValue) {
        setCurrentOpinionAmount(opinionAmount - 1)
      }
    }
  }, [affirmationDeletedOpinionValue])

  if (isLoading) return <Loading />

  return (
    <TouchableOpacity
      style={styles.avaliationButton}
      onPress={() => onSetAvaliationOrSignIn()}
      disabled={isLoading}
    >
      <Title style={{ fontSize: 10 }}>
        {opinionValue}/{affirmationCurrentOpinionValue}
      </Title>
      <AffirmationHeroButtonOpinionContent
        active={currentActive}
        opinionValue={opinionValue}
        opinionAmount={currentOpinionAmount}
      />
    </TouchableOpacity>
  )
}

export default AffirmationHeroButtonOpinion
