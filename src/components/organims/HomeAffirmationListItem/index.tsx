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

  stronglyAgree = 999,
  agree = 999,
  neutral = 999,
  disagree = 999,
  stronglyDisagree = 999

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
          <Caption style={styles.text}>{stronglyAgree} K</Caption>
        </View>
        <View style={styles.avaliationColumn}>
          <FontAwesome5 name="thumbs-up" size={12} style={[styles.icon, { color: colorOpinion.agree, transform: [{ rotate: '45deg' }] }]} />
          <Caption style={styles.text}>{agree} K</Caption>
        </View>
        <View style={styles.avaliationColumn}>
          <FontAwesome5 name="thumbs-up" size={12} style={[styles.icon, { color: colorOpinion.neutral, transform: [{ rotate: '90deg' }] }]} />
          <Caption style={styles.text}>{neutral} K</Caption>
        </View>
        <View style={styles.avaliationColumn}>
          <FontAwesome5 name="thumbs-up" size={12} style={[styles.icon, { color: colorOpinion.disagree, transform: [{ rotate: '135deg' }] }]} />
          <Caption style={styles.text}>{disagree} K</Caption>
        </View>
        <View style={styles.avaliationColumn}>
          <FontAwesome5 name="thumbs-up" size={12} style={[styles.icon, { color: colorOpinion.stronglyDisagree, transform: [{ rotate: '180deg' }] }]} />
          <Caption style={styles.text}>{stronglyDisagree} K</Caption>
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
