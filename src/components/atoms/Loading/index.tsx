import React from 'react'
import { View, StyleSheet } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

const Loading: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignContent: 'center' }
})

export default Loading
