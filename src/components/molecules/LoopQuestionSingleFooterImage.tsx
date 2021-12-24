import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/core';

import { LoopQuestionSingleProps } from '../../libs/storage';

export function LoopQuestionSingleFooterImage({ userId, avatar, ...rest} : LoopQuestionSingleProps) {
  const navigation = useNavigation();
  function handleProfile() {
    navigation.navigate('Profile', {userId: userId});
  }

  return (
    <View style={styles.loopQuestionSingleFooterColumn}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleProfile}
      >
      <Image
        source={{
          uri: avatar
        }}
        style={styles.loopQuestionSingleFooterAvatar}
      />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  loopQuestionSingleFooterColumn: {
    alignContent: 'flex-start'
  },
  loopQuestionSingleFooterAvatar: {
    width: 40,
    height: 40,
    borderRadius: 999
  }
})