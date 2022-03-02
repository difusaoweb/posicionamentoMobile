import * as React from 'react'
import { AdMobBanner } from 'expo-ads-admob'
import * as Device from 'expo-device'
import { View } from 'react-native'
import { useTheme } from 'react-native-paper'

import { styles } from './index.styles'

const BannerHeader = () => {
  const devAdUnitID = 'ca-app-pub-3940256099942544/6300978111'
  const androidAdUnitID = 'ca-app-pub-8947654147770289/2160324592'
  const iosAdUnitID = 'ca-app-pub-8947654147770289/2876695804'
  const adUnitID =
    Device.isDevice && !__DEV__
      ? Device.osName === 'Android'
        ? androidAdUnitID
        : iosAdUnitID
      : devAdUnitID

  const { colors } = useTheme()

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {Device.brand ? (
        <AdMobBanner
          bannerSize="banner"
          adUnitID={adUnitID}
          servePersonalizedAds={true}
          onDidFailToReceiveAdWithError={error => {
            console.log(error)
          }}
          style={styles.banner}
        />
      ) : (
        <View style={styles.bannerWeb}></View>
      )}
    </View>
  )
}

export default BannerHeader
