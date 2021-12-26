import React, { useState } from 'react'
import {
  AdMobBanner,
  setTestDeviceIDAsync,
} from 'expo-ads-admob'
import Constants from 'expo-constants'
import * as Device from 'expo-device'
import { View } from 'react-native'

export function BannerHeader() {
  // async () => {
  //   await setTestDeviceIDAsync('EMULATOR')
  // }

  const devAdUnitID = 'ca-app-pub-3940256099942544/6300978111'
  const androidAdUnitID = 'ca-app-pub-8947654147770289/2160324592'
  const iosAdUnitID = 'ca-app-pub-8947654147770289/2876695804'

  // if(Device.osName) {
  //   if(Device.osName === 'Android') {
  //     setMobilePlatform('android')
  //   }
  //   else if(Device.osName == 'iOS') {
  //     setMobilePlatform('iOS')
  //   }
  // }

  const adUnitID = Device.isDevice && !__DEV__ ? (Device.osName === 'Android' ? androidAdUnitID : iosAdUnitID) : devAdUnitID

  return (
    <>
      {
        Device.brand ?
        <AdMobBanner
          bannerSize="fullBanner"
          adUnitID={adUnitID}
          servePersonalizedAds={true}
          onDidFailToReceiveAdWithError={(error)=> { console.log(error) }}
        />
        :
        <View style={{ backgroundColor: '#f00', height: 40, width: '100%' }}></View>
      }
    </>
  )
}
