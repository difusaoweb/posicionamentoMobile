import React from 'react'
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text
} from 'react-native'
import {
  TextInput,
  Title,
  Button,
  useTheme,
  HelperText
} from 'react-native-paper'
import ListAfirmationsHome from '../components/ecosystems/ListAfirmationsHome'
import { useAppSelector } from '../hooks'
import { currnetUser as currnetUserRedux } from '../redux/reducers/access'

export function HomePage() {
  const user = useAppSelector(currnetUserRedux)
  const { colors } = useTheme()

  return (
    <>
      <View
        style={[
          styles.container,
          { backgroundColor: colors.background }
        ]}
      >
        <View style={[styles.row, { marginTop: 32 }]}>
          <Title style={[styles.text, { textAlign: 'center' }]}>
            Home
          </Title>
          <Title style={styles.text}>
            {user.display_name}
          </Title>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // flexWrap: 'wrap',
    paddingHorizontal: 12
  },
  text: {
    marginVertical: 4
  }
})
