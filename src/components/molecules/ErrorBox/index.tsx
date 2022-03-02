import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import { useTheme, Title } from 'react-native-paper'
import { FontAwesome5 } from '@expo/vector-icons'

interface ErrorBoxProps {
  message: string
}

const ErrorBox = ({ message }: ErrorBoxProps) => {
  const { colors } = useTheme()

  return (
    <View style={styles.row}>
      <FontAwesome5
        name="exclamation-triangle"
        size={48}
        style={[styles.icon, { color: colors.error }]}
      />
      <Title>{message}</Title>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    marginBottom: 3
  }
})

export default ErrorBox
