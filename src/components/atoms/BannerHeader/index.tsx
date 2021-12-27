import React from 'react'
import { AdMobBanner } from 'expo-ads-admob'
import * as Device from 'expo-device'
import { View, StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper'

const BannerHeader = () => {
  const devAdUnitID = 'ca-app-pub-3940256099942544/6300978111'
  const androidAdUnitID = 'ca-app-pub-8947654147770289/2160324592'
  const iosAdUnitID = 'ca-app-pub-8947654147770289/2876695804'
  const adUnitID = Device.isDevice && !__DEV__ ? (Device.osName === 'Android' ? androidAdUnitID : iosAdUnitID) : devAdUnitID

  const { colors } = useTheme()

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {
        Device.brand ?
        <AdMobBanner
          bannerSize="banner"
          adUnitID={adUnitID}
          servePersonalizedAds={true}
          onDidFailToReceiveAdWithError={(error)=> { console.log(error) }}
          style={styles.banner}
        />
        :
        null
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 54,
    maxHeight: 54,
    width: '100%',
    maxWidth: '100%'
  },
  banner: {
    justifyContent: 'center',
    alignSelf: 'center',
    maxHeight: 54,
    maxWidth: '100%'
  }
})

export default BannerHeader
