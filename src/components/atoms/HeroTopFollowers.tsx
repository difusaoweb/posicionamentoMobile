import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import { UserProps } from '../../libs/storage';

export function HeroTopFollowers({ followers, ...rest} : UserProps) {
  return (
    <View style={styles.heroTopFollowers}>
      <Title
        style={styles.followers}
      >
        {followers}
      </Title>
      <Title
        style={styles.followersSubTitle}
      >
        Seguidores
      </Title>
    </View>
  )
}

const styles = StyleSheet.create({
  heroTopFollowers: {
  },
  followers: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  followersSubTitle: {
    fontSize: 12
  }
})
