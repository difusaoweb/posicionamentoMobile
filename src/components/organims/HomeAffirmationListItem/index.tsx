import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import { Paragraph, Card, useTheme, Caption } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import type { StackNavigationProp } from '@react-navigation/stack'

import { AffirmationHomeInterface } from '../../../redux/types'
import { numberOpinionFormated } from '../../../utils'

interface HomeAffirmationListItemProps {
  navigation: StackNavigationProp<{}>
  affirmation: AffirmationHomeInterface
}
const HomeAffirmationListItem = ({
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
        <Paragraph>{affirmation.message}.</Paragraph>
      </Card.Content>
      <Card.Actions>
        <View style={styles.avaliationColumn}>
          <MaterialCommunityIcons
            name={
              affirmation?.opinionAvaliation == 1
                ? 'thumb-up'
                : 'thumb-up-outline'
            }
            size={12}
            style={[styles.icon, { color: colors.stronglyAgree }]}
          />
          <Caption style={styles.text}>
            {numberOpinionFormated(affirmation.stronglyAgree)}
          </Caption>
        </View>
        <View style={styles.avaliationColumn}>
          <MaterialCommunityIcons
            name={
              affirmation?.opinionAvaliation == 0.5
                ? 'thumb-up'
                : 'thumb-up-outline'
            }
            size={12}
            style={[
              styles.icon,
              { color: colors.agree, transform: [{ rotate: '45deg' }] }
            ]}
          />
          <Caption style={styles.text}>
            {numberOpinionFormated(affirmation.agree)}
          </Caption>
        </View>
        <View style={styles.avaliationColumn}>
          <MaterialCommunityIcons
            name={
              affirmation?.opinionAvaliation == 0.5
                ? 'thumb-up'
                : 'thumb-up-outline'
            }
            size={12}
            style={[
              styles.icon,
              { color: colors.neutral, transform: [{ rotate: '90deg' }] }
            ]}
          />
          <Caption style={styles.text}>
            {numberOpinionFormated(affirmation.neutral)}
          </Caption>
        </View>
        <View style={styles.avaliationColumn}>
          <MaterialCommunityIcons
            name={
              affirmation?.opinionAvaliation == 0.5
                ? 'thumb-up'
                : 'thumb-up-outline'
            }
            size={12}
            style={[
              styles.icon,
              { color: colors.disagree, transform: [{ rotate: '135deg' }] }
            ]}
          />
          <Caption style={styles.text}>
            {numberOpinionFormated(affirmation.disagree)}
          </Caption>
        </View>
        <View style={styles.avaliationColumn}>
          <MaterialCommunityIcons
            name={
              affirmation?.opinionAvaliation == 0.5
                ? 'thumb-up'
                : 'thumb-up-outline'
            }
            size={12}
            style={[
              styles.icon,
              {
                color: colors.stronglyDisagree,
                transform: [{ rotate: '180deg' }]
              }
            ]}
          />
          <Caption style={styles.text}>
            {numberOpinionFormated(affirmation.stronglyDisagree)}
          </Caption>
        </View>
      </Card.Actions>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    margin: 4
  },
  avaliationRow: {
    flex: 5,
    flexDirection: 'row',
    flexWrap: 'nowrap'
  },
  avaliationColumn: {
    flexDirection: 'row',
    flexGrow: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: { marginRight: 3 },
  text: {}
})

export default HomeAffirmationListItem
