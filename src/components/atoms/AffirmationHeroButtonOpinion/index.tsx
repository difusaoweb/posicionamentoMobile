import * as React from 'react'
import { TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import type { StackNavigationProp } from '@react-navigation/stack'

import AffirmationHeroButtonOpinionContent from '../AffirmationHeroButtonOpinionContent'
import {
  RootState,
  updateOpinionButtonPressedAffirmation,
  setOpinionAffirmation,
  deleteOpinionAffirmation
} from '../../../redux'
import Loading from '../../atoms/Loading'
import { styles } from './index.style'

interface AffirmationHeroButtonOpinionProps {
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
    affirmationButtonOpinionPressed,
    affirmationCurrentOpinionValue,
    affirmationBeforeCurrentOpinionValue,
    affirmationDeletedOpinionValue
  } = useSelector((state: RootState) => state.opinions)

  const [isLoading, setIsLoading] = React.useState(false)
  const [currentActive, setCurrentActive] = React.useState(false)
  // const [currentActive, setCurrentActive] = React.useState(
  //   opinionValue === affirmationCurrentOpinionValue
  // )
  const [currentOpinionAmount, setCurrentOpinionAmount] =
    React.useState(opinionAmount)
  const [buttonDisabled, setButtonDisabled] = React.useState(
    affirmationButtonOpinionPressed
  )

  async function onButtonPress() {
    if (!isAuthenticated) {
      navigation.navigate('AccessRoutes', { screen: 'LogInPage' })
    } else if (currentActive) {
      onDeleteOpinionAffirmation()
    } else {
      onSetOpinionAffirmation()
    }
  }

  async function onSetOpinionAffirmation() {
    setIsLoading(true)
    await dispatch(updateOpinionButtonPressedAffirmation(true))

    await dispatch(setOpinionAffirmation({ affirmationId, opinionValue }))

    await dispatch(updateOpinionButtonPressedAffirmation(false))
    setIsLoading(false)
  }

  async function onDeleteOpinionAffirmation() {
    setIsLoading(true)
    await dispatch(updateOpinionButtonPressedAffirmation(true))

    await dispatch(
      deleteOpinionAffirmation({
        opinionId: affirmationSingle?.opinion?.id ?? 0
      })
    )

    await dispatch(updateOpinionButtonPressedAffirmation(false))
    setIsLoading(false)
  }

  React.useEffect(() => {
    if (affirmationCurrentOpinionValue != null) {
      if (opinionValue === affirmationCurrentOpinionValue) {
        setCurrentActive(true)
        if (affirmationBeforeCurrentOpinionValue != null) {
          if (
            affirmationCurrentOpinionValue !=
            affirmationBeforeCurrentOpinionValue
          ) {
            setCurrentOpinionAmount(currentOpinionAmount + 1)
          }
        } else {
          setCurrentOpinionAmount(currentOpinionAmount + 1)
        }
      } else {
        setCurrentActive(false)
        if (affirmationBeforeCurrentOpinionValue != null) {
          if (opinionValue == affirmationBeforeCurrentOpinionValue) {
            setCurrentOpinionAmount(currentOpinionAmount - 1)
          }
        }
      }
    }
  }, [affirmationCurrentOpinionValue])

  // React.useEffect(() => {
  //   if (affirmationDeletedOpinionValue) {
  //     setCurrentActive(false)
  //     if (opinionValue == affirmationDeletedOpinionValue) {
  //       setCurrentOpinionAmount(opinionAmount - 1)
  //     }
  //   }
  // }, [affirmationDeletedOpinionValue])

  React.useEffect(() => {
    setButtonDisabled(affirmationButtonOpinionPressed)
  }, [affirmationButtonOpinionPressed])

  if (isLoading) return <Loading />

  return (
    <TouchableOpacity
      style={styles.avaliationButton}
      onPress={() => onButtonPress()}
      disabled={buttonDisabled}
    >
      <AffirmationHeroButtonOpinionContent
        active={currentActive}
        opinionValue={opinionValue}
        opinionAmount={currentOpinionAmount}
      />
    </TouchableOpacity>
  )
}

export default AffirmationHeroButtonOpinion
