import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Title,
} from 'react-native-paper';

import { LoopQuestionSingleProps } from '../../libs/storage';


export function LoopQuestionSingleFooterName({ name, ...rest} : LoopQuestionSingleProps) {
  return (
    <Title style={styles.loopQuestionSingleFooterName}>
      {name}
    </Title>
  )
}

const styles = StyleSheet.create({
  loopQuestionSingleFooterName: {
    alignSelf: 'center',
  }
})
