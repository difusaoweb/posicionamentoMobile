import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';

import { LoopQuestionSingleProps } from '../../libs/storage';
import { LoopQuestionSingleHeader } from '../molecules/LoopQuestionSingleHeader';
import { LoopQuestionSingleFooterImage } from '../molecules/LoopQuestionSingleFooterImage';
import { LoopQuestionSingleFooterOpinion } from '../molecules/LoopQuestionSingleFooterOpinion';
import { LoopQuestionSingleFooterName } from '../atoms/LoopQuestionSingleFooterName';
import { LoopQuestionSingleFooterReview } from '../molecules/LoopQuestionSingleFooterReview';
import { LoopQuestionSingleFooterDate } from '../atoms/LoopQuestionSingleFooterDate';

interface LoopQuestionSinglePropsIn {
  data: LoopQuestionSingleProps
}

export function LoopQuestionSingle({ data, ...rest} : LoopQuestionSinglePropsIn) {
  const navigation = useNavigation();

  function openQuestion(id: number) {
    navigation.navigate('Question', { userId: id });
  }

  return (
    <TouchableOpacity onPress={() => openQuestion(data.id)}>
      <View style={styles.loopQuestionSingle}>
        <LoopQuestionSingleHeader
          question={data.question}
          opinion={data.opinion}
        />

        <View style={styles.loopQuestionSingleFooter}>

          <LoopQuestionSingleFooterImage
            avatar={data.avatar}
            userId={data.userId}
          />
          <View style={styles.loopQuestionSingleFooterColumn}>

            <LoopQuestionSingleFooterOpinion opinion={data.opinion} />
            <View style={styles.loopQuestionSingleFooterColumnDown}>

              <LoopQuestionSingleFooterName name={data.name} />
              <LoopQuestionSingleFooterReview like={data.like} dislike={data.dislike} />
              <LoopQuestionSingleFooterDate date={data.date} />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  loopQuestionSingle: {
    flex: 2,
    borderBottomWidth: 2,
    marginBottom: 30
  },
  loopQuestionSingleFooter: {
    flex: 2,
    flexDirection: 'row',
    padding: 5,
    paddingVertical: 15
  },
  loopQuestionSingleFooterColumn: {
    flex: 1,
    marginLeft: 10
  },
  loopQuestionSingleFooterColumnDown: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
