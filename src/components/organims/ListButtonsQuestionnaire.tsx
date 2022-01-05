import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { RootStore } from '../../redux2/index';
import {
  QuizActions,
  NextQuiz,
  PrevQuiz,
  InitQuiz,
} from '../../redux2/actions/quiz';


export function ListButtonsQuestionnaire() {
  const dispatch = useDispatch();
  const QuizState = useSelector((state: RootStore) => state.quiz);

  const [t, i18n] = useTranslation('quiz');

  function nextQuestion(mult: number) {
    dispatch<NextQuiz>({
      type: QuizActions.nextQuiz,
      mult: mult,
    });
  }

  useEffect(() => {
    dispatch<InitQuiz>({
      type: QuizActions.initQuiz,
    });
  }, []);

  return (
    <View style={styles.row}>
      <View style={styles.buttonOptionsList}>
        <TouchableOpacity
          style={[
            styles.buttonOption,
            {
              backgroundColor: '#1b5e20'
            }
          ]}
          onPress={() => nextQuestion(1.0)}
        >
          <Text style={styles.buttonOptionText}>
            {t('buttons.strongly_agree')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.buttonOption,
            { backgroundColor: colors.strongly_agree }
          ]}
          onPress={() => nextQuestion(0.5)}
        >
          <Text style={styles.buttonOptionText}>
            {t('buttons.agree')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.buttonOption,
            { backgroundColor: colors.neutral }
          ]}
          onPress={() => nextQuestion(0.0)}
        >
          <Text style={styles.buttonOptionText}>
            {t('buttons.neutral')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.buttonOption,
            { backgroundColor: colors.disagree }
          ]}
          onPress={() => nextQuestion(-0.5)}
        >
          <Text style={styles.buttonOptionText}>
            {t('buttons.disagree')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.buttonOption,
            { backgroundColor: colors.strongly_disagree }
          ]}
          onPress={() => nextQuestion(-1.0)}
        >
          <Text style={styles.buttonOptionText}>
            {t('buttons.strongly_disagree')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.buttonOption,
            {
              width: '60%',
              marginTop: 10
            },
            (QuizState.qn == 0) ?
            {
              backgroundColor: '#ddd',
              borderWidth: 2,
              borderColor: '#888'
            }
            :
            { backgroundColor: '#333' }
          ]
          }
          onPress={() =>
            dispatch<PrevQuiz>({
              type: QuizActions.prevQuiz,
            })
          }
          disabled={QuizState.qn == 0}
        >
          <Text
            style={[
              styles.buttonOptionText,
              (QuizState.qn == 0) ?
              { color: '#888' }
              :
              { color: '#fff' }
            ]}
          >
            {t('buttons.back')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 15,
    marginBottom: 10
  },
  buttonOptionsList: {
    width: '100%',
    backgroundColor: '#1b1',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonOption: {
    width: '100%',
    textAlign: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 10
  },
  buttonOptionText: {
    fontSize: 18,
  }
})
