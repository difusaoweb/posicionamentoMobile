import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import { UserProps } from '../../libs/storage';

export function HeroTopFollowing({ following, ...rest} : UserProps) {
  return (
    <View style={styles.heroTopFollowing}>
      <Text
        style={styles.following}
      >
        {following}
      </Text>
      <Text
        style={styles.followingSubTitle}
      >
        Seguindo
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  heroTopFollowing: {
  },
  following: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  followingSubTitle: {
    fontSize: 12
  }
})
