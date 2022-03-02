import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Paragraph, Card, useTheme, Avatar, Caption } from 'react-native-paper'

import avatarDefault from '../../../assets/images/avatar.png'
import { OpinionAffirmationInterface } from '../../../redux/types'
import { avaliationMessage } from '../../../utils'

interface AffirmationOpinionItemProps {
  opinion: OpinionAffirmationInterface
}
const AffirmationOpinionItem = ({ opinion }: AffirmationOpinionItemProps) => {
  const { colors } = useTheme()
  const avatarSource = opinion?.avatar ? { uri: opinion.avatar } : avatarDefault

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.container}>
        <View style={styles.column}>
          <Avatar.Image style={styles.avatar} source={avatarSource} size={28} />
        </View>
        <View style={[styles.column, { flexShrink: 1 }]}>
          <Caption style={styles.textLimit}>{opinion?.userLogin}</Caption>
          <Paragraph style={[styles.textLimit, { margin: 0 }]}>
            {avaliationMessage(opinion.opinionAvaliation)}.
          </Paragraph>
        </View>
      </Card.Content>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    margin: 4
  },
  container: {
    flexDirection: 'row'
  },
  column: {
    flexDirection: 'column'
  },
  avatar: {
    margin: 8
  },
  affirmationMessage: {
    borderLeftWidth: 2,
    paddingLeft: 6,
    marginBottom: 6
  },
  marginZero: {
    margin: 0
  },
  textLimit: {
    overflow: 'hidden'
    // textOverflow: 'ellipsis',
    // whiteSpace: 'nowrap'
  }
})

export default AffirmationOpinionItem
