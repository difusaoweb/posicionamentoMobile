import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  PixelRatio,
  View
} from 'react-native';

import { UserProps } from '../../libs/storage';
import { HeroTop } from '../../components/molecules/HeroTop'
import { HeroBottom } from '../../components/molecules/HeroBottom'

interface DataUserProps {
  user: UserProps;
}

export function Hero({ user, ...rest} : DataUserProps) {
  return (
    <View
      style={styles.hero}
    >
      <HeroTop
        avatar={user.avatar}
        followers={user.followers}
        following={user.following}
      />
      <HeroBottom
        userName={user.userName}
        description={user.description}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  hero: {
    margin: 3
  }
})
