import * as React from 'react'
import { View } from 'react-native'
import { ActivityIndicator, useTheme } from 'react-native-paper'

import styles from './index.style'

const Loading: React.FC = () => {
  const { colors } = useTheme()

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ActivityIndicator />
    </View>
  )
}

export default Loading
