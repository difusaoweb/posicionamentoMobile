import * as React from 'react'
import { View } from 'react-native'
import { useTheme, Paragraph, Card } from 'react-native-paper'
import type { StackNavigationProp } from '@react-navigation/stack'

import styles from './index.style'
import { HomeAffirmationListItemFooterOpnion } from '../../atoms/HomeAffirmationListItemFooterOpnion'
import { AffirmationHomeInterface } from '../../../redux/types'

interface HomeAffirmationListItemProps {
  navigation: StackNavigationProp<{}>
  affirmation: AffirmationHomeInterface
}
export const HomeAffirmationListItem = ({
  navigation,
  affirmation
}: HomeAffirmationListItemProps) => {
  const { colors } = useTheme()

  return (
    <Card
      style={styles.card}
      onPress={() => {
        navigation.navigate('AppRoutes', {
          screen: 'AffirmationPage',
          params: { affirmationId: affirmation.id }
        })
      }}
    >
      <Card.Content>
        <Paragraph style={{ color: colors.white }}>
          {affirmation.message}.
        </Paragraph>
      </Card.Content>
      <Card.Actions>
        <View style={styles.avaliationColumn}>
          <HomeAffirmationListItemFooterOpnion
            active={affirmation.opinionValue === 1}
            opinionValue={1}
            opinionAmount={affirmation.stronglyAgree ?? 0}
          />
        </View>
        <View style={styles.avaliationColumn}>
          <HomeAffirmationListItemFooterOpnion
            active={affirmation.opinionValue === 0.5}
            opinionValue={0.5}
            opinionAmount={affirmation.agree ?? 0}
          />
        </View>
        <View style={styles.avaliationColumn}>
          <HomeAffirmationListItemFooterOpnion
            active={affirmation.opinionValue === 0}
            opinionValue={0}
            opinionAmount={affirmation.neutral ?? 0}
          />
        </View>
        <View style={styles.avaliationColumn}>
          <HomeAffirmationListItemFooterOpnion
            active={affirmation.opinionValue === -0.5}
            opinionValue={-0.5}
            opinionAmount={affirmation.disagree ?? 0}
          />
        </View>
        <View style={styles.avaliationColumn}>
          <HomeAffirmationListItemFooterOpnion
            active={affirmation.opinionValue === -1}
            opinionValue={-1}
            opinionAmount={affirmation.stronglyDisagree ?? 0}
          />
        </View>
      </Card.Actions>
    </Card>
  )
}
