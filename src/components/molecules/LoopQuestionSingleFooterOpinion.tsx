import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import { LoopQuestionSingleProps } from '../../libs/storage';


export function LoopQuestionSingleFooterOpinion({ opinion, ...rest} : LoopQuestionSingleProps) {
  const [t, i18n] = useTranslation('quiz');

  return (
    <Text
      style={ styles.loopQuestionSingleFooterOpinion }
    >
      {t('buttons.' + opinion)}
    </Text>
  )
}

const styles = StyleSheet.create({
  loopQuestionSingleFooterOpinion: {
    fontSize: 18,
    marginBottom: 2
  }
})
