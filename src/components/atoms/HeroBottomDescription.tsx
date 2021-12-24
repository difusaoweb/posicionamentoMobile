import React from 'react';
import {
  StyleSheet,
  Text
} from 'react-native';

import { UserProps } from '../../libs/storage';

export function HeroBottomDescription({ description, ...rest} : UserProps) {
  return (
    <Title
      style={styles.heroBottomDescription}
    >
      {description}
    </Title>
  )
}

const styles = StyleSheet.create({
  heroBottomDescription: {
    fontSize: 12
  }
})
