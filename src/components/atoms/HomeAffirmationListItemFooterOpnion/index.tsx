import * as React from 'react'
import { View } from 'react-native'
import { useTheme, Caption } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { numberOpinionFormated } from '../../../utils'
import styles from './index.style'

interface HomeAffirmationListItemFooterOpnionProps {
  active: boolean
  opinionValue: number | null
  opinionAmount: number
}
const HomeAffirmationListItemFooterOpnion = ({
  active,
  opinionValue,
  opinionAmount
}: HomeAffirmationListItemFooterOpnionProps) => {
  const { colors } = useTheme()

  let colorIcon = ''
  let rotateIcon = ''
  switch (opinionValue) {
    case 1:
      colorIcon = colors.stronglyAgree
      rotateIcon = '0deg'
      break
    case 0.5:
      colorIcon = colors.agree
      rotateIcon = '45deg'
      break
    case 0:
      colorIcon = colors.neutral
      rotateIcon = '90deg'
      break
    case -0.5:
      colorIcon = colors.disagree
      rotateIcon = '135deg'
      break
    case -1:
      colorIcon = colors.stronglyDisagree
      rotateIcon = '180deg'
      break
  }

  return (
    <>
      <MaterialCommunityIcons
        name={active ? 'thumb-up' : 'thumb-up-outline'}
        size={12}
        style={[
          styles.icon,
          {
            color: colorIcon,
            transform: [{ rotate: rotateIcon }]
          }
        ]}
      />
      <Caption
        style={[styles.text, { color: active ? colors.white : colors.white2 }]}
      >
        {numberOpinionFormated(opinionAmount)}
      </Caption>
    </>
  )
}

export default HomeAffirmationListItemFooterOpnion
