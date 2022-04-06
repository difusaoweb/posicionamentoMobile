import * as React from 'react'
import { View, ScrollView } from 'react-native'
import { Appbar, Divider, useTheme } from 'react-native-paper'
import type { StackNavigationProp } from '@react-navigation/stack'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useTranslation } from 'react-i18next'

import ScreenWrapper from '../../ScreenWrapper'
import AffirmationHero from '../../components/ecosystems/AffirmationHero'
import AffirmationListOpinions from '../../components/ecosystems/AffirmationListOpinions'
import { styles } from './index.style'

type RootStackParamList = {
  AffirmationPage: {
    affirmationId: number
  }
}
type RouteProps = NativeStackScreenProps<RootStackParamList, 'AffirmationPage'>
interface AffirmationProps {
  navigation: StackNavigationProp<{}>
  route: RouteProps['route']
}
const AffirmationPage = ({ navigation, route }: AffirmationProps) => {
  const { affirmationId } = route.params
  const [t] = useTranslation('affirmation')
  const { colors } = useTheme()

  return (
    <>
      <Appbar style={{ backgroundColor: colors.background }}>
        <Appbar.Action icon="arrow-left" onPress={() => navigation.goBack()} />
        <Appbar.Content title={t('affirmation')} />
      </Appbar>
      <ScreenWrapper contentContainerStyle={{ flex: 1 }}>
        <View style={styles.affirmationBox}>
          <AffirmationHero
            navigation={navigation}
            affirmationId={affirmationId}
          />
        </View>
        <Divider style={[styles.divider, { borderBottomColor: colors.text }]} />
        <View style={styles.opinionsBox}>
          <AffirmationListOpinions affirmationId={affirmationId} />
        </View>
      </ScreenWrapper>
    </>
  )
}

export default AffirmationPage
