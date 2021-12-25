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
import {
  AdMobBanner,
  setTestDeviceIDAsync,
} from 'expo-ads-admob'

import ListAfirmationsHome from '../components/ecosystems/ListAfirmationsHome'


export function HomePage() {
  const { colors } = useTheme()

  async () => {
    await setTestDeviceIDAsync('EMULATOR')
  }

  return (
    <>
      <AdMobBanner
        bannerSize="fullBanner"
        adUnitID="ca-app-pub-8947654147770289/2160324592"
        servePersonalizedAds={true}
        onDidFailToReceiveAdWithError={(error)=> { console.log(error) }}
      />
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
          <ListAfirmationsHome />
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
