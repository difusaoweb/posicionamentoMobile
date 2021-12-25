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

  return (
    // <ScrollView
    //   style={[styles.container, { backgroundColor: background }]}
    //   contentContainerStyle={styles.content}
    // >
      <Card style={styles.card}>
        <Card.Content>
          <Paragraph>
            The Abandoned Ship is a wrecked ship located on Route 108 in Hoenn,
            originally being a ship named the S.S. Cactus. The second part of
            the ship can only be accessed by using Dive and contains the
            Scanner.
          </Paragraph>
        </Card.Content>
      </Card>
    // </ScrollView>
  )
}

// ListAfirmationsHome.title = 'List Afirmations Home'

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
