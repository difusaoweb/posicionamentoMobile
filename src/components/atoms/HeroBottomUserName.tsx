import React from 'react';
import {
  StyleSheet,
  Text
} from 'react-native';

import { UserProps } from '../../libs/storage';

export function HeroBottomUserName({ userName, ...rest} : UserProps) {
  return (
    <Title
      style={styles.heroBottomUserName}
    >
      {userName}
    </Title>
  )
}

const styles = StyleSheet.create({
  heroBottomUserName: {
    fontSize: 14
  }
})
