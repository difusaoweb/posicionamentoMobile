import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import { UserProps } from '../../libs/storage';
import { HeroBottomUserName } from '../../components/atoms/HeroBottomUserName'
import { HeroBottomDescription } from '../../components/atoms/HeroBottomDescription'

export function HeroBottom({ userName, description, ...rest} : UserProps) {
  return (
    <View style={styles.heroBottom}>
      <HeroBottomUserName
        userName={userName}
      />
      <HeroBottomDescription
        description={description}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  heroBottom: {
    flex: 2
  }
})
