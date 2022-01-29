import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import {
  useTheme,
  Caption,
  Headline
} from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useDispatch } from 'react-redux'

import { numberOpinionFormated } from '../../../utils'
import { setOpinionAffirmation, RootState } from '../../../redux'
import { AffirmationHomeInterface } from '../../../redux/types'

interface HomeAffirmationListItemProps {
  affirmation: AffirmationHomeInterface
}
const AffirmationAffirmation = ({ affirmation }: HomeAffirmationListItemProps) => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const { colors } = useTheme()

  async function onSetAvaliation(value: number) {
    await dispatch(setOpinionAffirmation({affirmationId: affirmation.id, avaliation: value}))
    setIsLoading(false)
  }

  return (
    <View style={styles.container} >
      <View style={[styles.column, { marginBottom: 10 }]}>
        <Headline>
          {affirmation.message}.
        </Headline>
      </View>
      <View style={[styles.column, styles.avaliationRow]}>
        <View style={styles.avaliationColumn}>
          <TouchableOpacity
            style={styles.avaliationButton}
            onPress={() => onSetAvaliation(1)}
            disabled={isLoading}
          >
            <MaterialCommunityIcons
              name={(affirmation?.opinionAvaliation == 1) ? "thumb-up" : "thumb-up-outline"}
              size={20}
              style={[styles.icon, { color: colors.stronglyAgree }]}
            />
            <Caption
              style={styles.text}
            >
              {numberOpinionFormated(affirmation.stronglyAgree)}
            </Caption>
          </TouchableOpacity>
        </View>
        <View style={styles.avaliationColumn}>
          <TouchableOpacity
            style={styles.avaliationButton}
            onPress={() => onSetAvaliation(0.5)}
            disabled={isLoading}
          >
            <MaterialCommunityIcons
              name={(affirmation?.opinionAvaliation == 0.5) ? "thumb-up" : "thumb-up-outline"}
              size={20}
              style={[styles.icon, { color: colors.agree, transform: [{ rotate: '45deg' }] }]}
            />
            <Caption
              style={styles.text}
            >
              {numberOpinionFormated(affirmation.agree)}
            </Caption>
          </TouchableOpacity>
        </View>
        <View style={styles.avaliationColumn}>
          <TouchableOpacity
            style={styles.avaliationButton}
            onPress={() => onSetAvaliation(0)}
            disabled={isLoading}
          >
            <MaterialCommunityIcons
              name={(affirmation?.opinionAvaliation == 0) ? "thumb-up" : "thumb-up-outline"}
              size={20}
              style={[styles.icon, { color: colors.neutral, transform: [{ rotate: '90deg' }] }]}
            />
            <Caption
              style={styles.text}
            >
              {numberOpinionFormated(affirmation.neutral)}
            </Caption>
          </TouchableOpacity>
        </View>
        <View style={styles.avaliationColumn}>
          <TouchableOpacity
            style={styles.avaliationButton}
            onPress={() => onSetAvaliation(-0.5)}
            disabled={isLoading}
          >
            <MaterialCommunityIcons
              name={(affirmation?.opinionAvaliation == -0.5) ? "thumb-up" : "thumb-up-outline"}
              size={20}
              style={[styles.icon, { color: colors.disagree, transform: [{ rotate: '135deg' }] }]}
            />
            <Caption
              style={styles.text}
            >
              {numberOpinionFormated(affirmation.disagree)}
            </Caption>
          </TouchableOpacity>
        </View>
        <View style={styles.avaliationColumn}>
          <TouchableOpacity
            style={styles.avaliationButton}
            onPress={() => onSetAvaliation(-1)}
            disabled={isLoading}
          >
            <MaterialCommunityIcons
              name={(affirmation?.opinionAvaliation == -1) ? "thumb-up" : "thumb-up-outline"}
              size={20}
              style={[styles.icon, { color: colors.stronglyDisagree, transform: [{ rotate: '180deg' }] }]}
            />
            <Caption
              style={styles.text}
            >
              {numberOpinionFormated(affirmation.stronglyDisagree)}
            </Caption>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 9,
    marginHorizontal: 12
  },
  column: {
    flexDirection: 'column'
  },
  avaliationRow: {
    flex: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  avaliationColumn: {
    // backgroundColor: '#0ff',
    paddingHorizontal: 10
  },
  avaliationButton: {
    // backgroundColor: '#ff0',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8
  },
  icon: { marginRight: 3},
  text: {}
})

export default AffirmationAffirmation
