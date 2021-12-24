import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import { UserProps } from '../../libs/storage';
import { HeroTopAvatar } from '../../components/atoms/HeroTopAvatar'
import { HeroTopFollowers } from '../../components/atoms/HeroTopFollowers'
import { HeroTopFollowing } from '../../components/atoms/HeroTopFollowing'

export function HeroTop({ avatar, followers, following, ...rest} : UserProps) {
  return (
    <View style={styles.headerTop}>
      <HeroTopAvatar
        avatar={avatar}
      />
      <HeroTopFollowers
        followers={followers}
      />
      <HeroTopFollowing
        following={following}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  headerTop: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})