import React from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import moment from "moment";
import {
  Title,
} from 'react-native-paper';

import { LoopQuestionSingleProps } from '../../libs/storage';


export function LoopQuestionSingleFooterDate({ date, ...rest} : LoopQuestionSingleProps) {
  const [t, i18n] = useTranslation();
  moment.locale(i18n.language);
  const dateAgo:string = moment(date, 'YYYY-MM-DD HH:mm:ss').fromNow();

  return (
    <Title style={styles.loopQuestionSingleFooterDate}>
      {dateAgo}
    </Title>
  )
}

const styles = StyleSheet.create({
  loopQuestionSingleFooterDate: {
    alignSelf: 'center',
  }
})
