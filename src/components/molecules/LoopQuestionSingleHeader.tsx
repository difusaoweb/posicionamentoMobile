import React from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';

import { LoopQuestionSingleProps } from '../../libs/storage';
import GetQuestionBasedOnLanguage from '../../questionsLocaleFunc';


export function LoopQuestionSingleHeader({ question, opinion, ...rest} : LoopQuestionSingleProps) {
  return (
    <View
      style={[
        styles.loopQuestionSingleHeader,
        // { backgroundColor: colors[opinion] }
        // { backgroundColor: colors[opinion] }
      ]}
    >
      <Text style={styles.loopQuestionSingleHeaderText }>
        {
          GetQuestionBasedOnLanguage()[question] &&
          GetQuestionBasedOnLanguage()[question].question
        }
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  loopQuestionSingleHeader: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 15
  },
  loopQuestionSingleHeaderText: {
    textAlign: 'center',
    fontSize: 18,
    // color: colors.white
  }
})
