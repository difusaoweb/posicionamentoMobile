import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { useTheme, Appbar, Divider } from 'react-native-paper'
import type { StackNavigationProp } from '@react-navigation/stack'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import ScreenWrapper from '../../ScreenWrapper'
import ListOpinionsAffirmation from '../../components/ecosystems/ListOpinionsAffirmation'
import AffirmationAffirmation from '../../components/ecosystems/AffirmationAffirmation'
import { AffirmationInterface } from '../../redux/types'

type RootStackParamList = {
  AffirmationPage: {
    affirmation: AffirmationInterface
  }
}
type RouteProps = NativeStackScreenProps<RootStackParamList, 'AffirmationPage'>
interface AffirmationProps {
  navigation: StackNavigationProp<{}>
  route: RouteProps['route']
}

const AffirmationPage = ({ navigation, route }: AffirmationProps) => {
  const { affirmation } = route.params
  const { colors } = useTheme()

  return (
    <ScreenWrapper contentContainerStyle={{ flex: 1 }}>
      <Appbar style={{ backgroundColor: colors.background }}>
        <Appbar.Action icon="arrow-left" onPress={() => navigation.goBack()} />
        <Appbar.Content title="Afirmação" />
      </Appbar>
      <ScrollView>
        <View style={styles.affirmationBox}>
          <AffirmationAffirmation affirmation={affirmation} />
        </View>
        <Divider style={{ marginBottom: 12 }}/>
        <View style={styles.opinionsBox}>
          <ListOpinionsAffirmation affirmation={affirmation} />
        </View>
      </ScrollView>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  affirmationBox: {
    width: '100%',
    marginBottom: 12
  },
  opinionsBox: {
    width: '100%',
  }
})

export default AffirmationPage
