import React from 'react';
import {
  StyleSheet,
  PixelRatio,
  Image
} from 'react-native';

import { UserProps } from '../../libs/storage';

export function HeroTopAvatar({ avatar, ...rest} : UserProps) {
  return (
    <Image
      source={{
        uri: avatar
      }}
      style={styles.heroTopAvatar}
    />
  )
}

const styles = StyleSheet.create({
  heroTopAvatar: {
    width: 150 / PixelRatio.get(),
    height: 150 / PixelRatio.get(),
    resizeMode: 'center',
    borderRadius: 999,
    overflow: 'hidden'
  }
});