import * as React from 'react'
import { Alert, ScrollView, StyleSheet } from 'react-native'
import {
  Avatar,
  Paragraph,
  Card,
  Button,
  IconButton,
  useTheme,
} from 'react-native-paper'

const ListAfirmationsHome = () => {
  const {
    colors: { background },
  } = useTheme()

  if(true) {
    return (
      <p>Nada...</p>
    )
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: background }]}
      contentContainerStyle={styles.content}
    >
    </ScrollView>
  )
}

ListAfirmationsHome.title = 'List Afirmations Home'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 4,
  },
  card: {
    margin: 4,
  },
})

export default ListAfirmationsHome
