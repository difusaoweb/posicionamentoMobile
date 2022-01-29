import React from 'react'
import { View, StyleSheet } from 'react-native'
import {
  Paragraph,
  Card,
  useTheme,
  Caption,
} from 'react-native-paper'
import type { StackNavigationProp } from '@react-navigation/stack'

import {
  OpinionInterface
} from '../../../redux/types'
import { avaliationMessage } from '../../../utils'


interface ProfileOpinionItemProps {
  navigation: StackNavigationProp<{}>
  opinion: OpinionInterface
}
const ProfileOpinionItem = ({ navigation, opinion }: ProfileOpinionItemProps) => {
  const { colors } = useTheme()

  return (
    <Card
      style={styles.card}
      onPress={() => {
        navigation.navigate('AppRoutes', { screen: 'OpinionPage', params: { opinion } })
      }}
    >
      <Card.Content>
        <View
          style={[ styles.affirmationMessage, { borderLeftColor: colors.primary }]}
        >
          <Caption
            style={styles.marginZero}
            numberOfLines={2}
          >
            {opinion?.affirmationMessage}
          </Caption>
        </View>
        <Paragraph style={styles.marginZero} >
          {avaliationMessage(opinion?.opinionAvaliation)}.
        </Paragraph>
      </Card.Content>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    margin: 4
  },
  affirmationMessage: {
    borderLeftWidth: 2,
    paddingLeft: 6,
    marginBottom: 6
  },
  marginZero: {
    margin: 0
  }
})

export default ProfileOpinionItem
