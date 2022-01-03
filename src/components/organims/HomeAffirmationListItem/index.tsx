import * as React from 'react'
import {
  View,
  StyleSheet
} from 'react-native'
import {
  Paragraph,
  Card,
  useTheme,
  Caption
} from 'react-native-paper'
import { FontAwesome5 } from '@expo/vector-icons'
import type { StackNavigationProp } from '@react-navigation/stack'

import { numberOpinionFormated } from '../../../utils'
import { useAppSelector } from '../../../hooks'
import {
  singleAffirmationInterface
} from '../../../redux/reducers/affirmationPage'

interface HomeAffirmationListItemProps {
  navigation: StackNavigationProp<{}>
  affirmation: singleAffirmationInterface
}

const colorOpinion = {
  stronglyAgree: '#519668',
  agree: '#5299e0',
  neutral: '#a7a7a7',
  disagree: '#d5a439',
  stronglyDisagree: '#c77171'
}

const HomeAffirmationListItem = ({ navigation, affirmation }: HomeAffirmationListItemProps) => {
  const { colors } = useTheme()

  return (
    <Card
      style={styles.card}
      onPress={() => {
        navigation.navigate('AffirmationPage', { affirmation: affirmation })
      }}
    >
      <Card.Content>
        <Paragraph>
          {affirmation.message}.
        </Paragraph>
      </Card.Content>
      <Card.Actions>
        <View style={styles.avaliationColumn}>
          <FontAwesome5 name="thumbs-up" size={12} style={[styles.icon, { color: colorOpinion.stronglyAgree }]} />
          <Caption
            style={styles.text}
          >
            {numberOpinionFormated(affirmation.stronglyAgree)}
          </Caption>
        </View>
        <View style={styles.avaliationColumn}>
          <FontAwesome5 name="thumbs-up" size={12} style={[styles.icon, { color: colorOpinion.agree, transform: [{ rotate: '45deg' }] }]} />
          <Caption
            style={styles.text}
          >
            {numberOpinionFormated(affirmation.agree)}
          </Caption>
        </View>
        <View style={styles.avaliationColumn}>
          <FontAwesome5 name="thumbs-up" size={12} style={[styles.icon, { color: colorOpinion.neutral, transform: [{ rotate: '90deg' }] }]} />
          <Caption
            style={styles.text}
          >
            {numberOpinionFormated(affirmation.neutral)}
          </Caption>
        </View>
        <View style={styles.avaliationColumn}>
          <FontAwesome5 name="thumbs-up" size={12} style={[styles.icon, { color: colorOpinion.disagree, transform: [{ rotate: '135deg' }] }]} />
          <Caption
            style={styles.text}
          >
            {numberOpinionFormated(affirmation.disagree)}
          </Caption>
        </View>
        <View style={styles.avaliationColumn}>
          <FontAwesome5 name="thumbs-up" size={12} style={[styles.icon, { color: colorOpinion.stronglyDisagree, transform: [{ rotate: '180deg' }] }]} />
          <Caption
            style={styles.text}
          >
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
  icon: { marginRight: 3},
  text: {}
})

export default HomeAffirmationListItem
