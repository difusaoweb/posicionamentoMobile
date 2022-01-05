import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { RootStore } from '../../redux2/index';

import Questions from '../../questions';
import GetQuestionBasedOnLanguage from '../../questionsLocaleFunc';

export function Questionnaire() {
  const QuizState = useSelector((state: RootStore) => state.quiz);

  const [t, i18n] = useTranslation('quiz');

  return (
    <View style={styles.row}>
      {GetQuestionBasedOnLanguage()[QuizState.qn] ? (
        <Text style={styles.h3}>
          {t('question_no', {
            current: QuizState.qn + 1,
            total: Questions.length,
          })}
        </Text>
      ) : (
        <Text>{t('result_text')}</Text>
      )}
      <Text
        style={styles.h2}
      >
        {
          GetQuestionBasedOnLanguage()[QuizState.qn] &&
          GetQuestionBasedOnLanguage()[QuizState.qn].question
        }
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 15,
    marginBottom: 10
  },
  h1: {
    fontSize: 22,
    textAlign: 'center',
    lineHeight: 38,
    marginBottom: 8
  },
  h2: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 8
  },
  h3: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8
  }
})
