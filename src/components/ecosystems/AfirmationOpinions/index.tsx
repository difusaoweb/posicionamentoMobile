import React from 'react'
import { View, Text } from 'react-native'
import {
  AffirmationHomeInterface
} from '../../../redux/types'

interface AfirmationOpinionsProps {
  affirmation: AffirmationHomeInterface
}
const AfirmationOpinions = ({ affirmation }: AfirmationOpinionsProps) => {
  return (
    <View>
      <Text>{affirmation?.id}</Text>
      <Text>{affirmation?.message}</Text>
      <Text>{affirmation?.stronglyAgree}</Text>
      <Text>{affirmation?.agree}</Text>
      <Text>{affirmation?.neutral}</Text>
      <Text>{affirmation?.disagree}</Text>
      <Text>{affirmation?.stronglyDisagree}</Text>
    </View>
  )
}

export default AfirmationOpinions
