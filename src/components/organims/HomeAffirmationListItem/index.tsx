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

import { numberOpinionFormated } from '../../../utils'

interface Affirmation {
  message: string
  stronglyAgree: number | null
  agree: number | null
  neutral: number | null
  disagree: number | null
  stronglyDisagree: number | null
}

const colorOpinion = {
  stronglyAgree: '#519668',
  agree: '#5299e0',
  neutral: '#a7a7a7',
  disagree: '#d5a439',
  stronglyDisagree: '#c77171'
}

const HomeAffirmationListItem = ({
  message,
  stronglyAgree,
  agree,
  neutral,
  disagree,
  stronglyDisagree
}: Affirmation) => {
  const { colors } = useTheme()

  stronglyAgree = stronglyAgree ?? 0,
  agree = agree ?? 0,
  neutral = neutral ?? 0,
  disagree = disagree ?? 0,
  stronglyDisagree = stronglyDisagree ?? 0

  return (
    <Card
      style={styles.card}
      // onPress={() => {
      //   Alert.alert('The Chameleon is Pressed');
      // }}
    >
      <Card.Content>
        <Paragraph>
          {message}.
        </Paragraph>
      </Card.Content>
      <Card.Actions>
        <View style={styles.avaliationColumn}>
          <FontAwesome5 name="thumbs-up" size={12} style={[styles.icon, { color: colorOpinion.stronglyAgree }]} />
          <Caption
            style={styles.text}
          >
            {numberOpinionFormated(stronglyAgree)}
          </Caption>
        </View>
        <View style={styles.avaliationColumn}>
          <FontAwesome5 name="thumbs-up" size={12} style={[styles.icon, { color: colorOpinion.agree, transform: [{ rotate: '45deg' }] }]} />
          <Caption
            style={styles.text}
          >
            {numberOpinionFormated(agree)}
          </Caption>
        </View>
        <View style={styles.avaliationColumn}>
          <FontAwesome5 name="thumbs-up" size={12} style={[styles.icon, { color: colorOpinion.neutral, transform: [{ rotate: '90deg' }] }]} />
          <Caption
            style={styles.text}
          >
            {numberOpinionFormated(neutral)}
          </Caption>
        </View>
        <View style={styles.avaliationColumn}>
          <FontAwesome5 name="thumbs-up" size={12} style={[styles.icon, { color: colorOpinion.disagree, transform: [{ rotate: '135deg' }] }]} />
          <Caption
            style={styles.text}
          >
            {numberOpinionFormated(disagree)}
          </Caption>
        </View>
        <View style={styles.avaliationColumn}>
          <FontAwesome5 name="thumbs-up" size={12} style={[styles.icon, { color: colorOpinion.stronglyDisagree, transform: [{ rotate: '180deg' }] }]} />
          <Caption
            style={styles.text}
          >
            {numberOpinionFormated(stronglyDisagree)}
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
