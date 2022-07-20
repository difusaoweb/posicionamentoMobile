import * as React from 'react'
import { AdMobBanner } from 'expo-ads-admob'
import * as Device from 'expo-device'
import { View } from 'react-native'
import { useTheme } from 'react-native-paper'

import { styles } from './index.styles'

export const BannerHeader = () => {
  const devAdUnitID = process.env.ADS_DEV_UNIT_ID
  const androidAdUnitID = process.env.ADS_ANDROID_UNIT_ID
  const iosAdUnitID = process.env.ADS_IOS_UNIT_ID

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
