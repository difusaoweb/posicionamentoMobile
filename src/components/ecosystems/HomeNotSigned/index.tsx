import * as React from 'react'
import { View } from 'react-native'
import { Button, Title, Paragraph } from 'react-native-paper'
import type { StackNavigationProp } from '@react-navigation/stack'
import { useTranslation } from 'react-i18next'

import { styles } from './index.style'
import { HomeNotSignedInfoBoxImage } from '../../atoms/HomeNotSignedInfoBoxImage'

interface HomeNotSignedProps {
  navigation: StackNavigationProp<{}>
}
export const HomeNotSigned = ({ navigation }: HomeNotSignedProps) => {
  const [tGeneral] = useTranslation('general')
  const [t] = useTranslation('home')

  function onGoLogIn() {
    navigation.navigate('AccessRoutes', { screen: 'LogInPage' })
  }

  return (
    <View style={styles.container}>
      <HomeNotSignedInfoBoxImage />
      <View style={styles.texts}>
        <Title style={styles.text}>{t('notSigned.title')}</Title>
        <Paragraph style={styles.text}>{t('notSigned.description')}</Paragraph>
      </View>
      <Button
        dark={true}
        mode="contained"
        style={styles.button}
        onPress={onGoLogIn}
      >
        {tGeneral('logIn')}
      </Button>
    </View>
  )
}
