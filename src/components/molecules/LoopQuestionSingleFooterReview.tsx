import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { LoopQuestionSingleProps } from '../../libs/storage';

export function LoopQuestionSingleFooterReview({ like, dislike, ...rest} : LoopQuestionSingleProps) {
  const [isLike, setIsLike] = useState<boolean>(false);
  const [isDislike, setIsDislike] = useState<boolean>(false);

  async function handleReviewLike() {
    try {
      // await AsyncStorage.setItem('@plantmanager:user', like);
    }
    catch {
      // Alert.alert('Não foi possível salvar o seu nome. 😢');
    }
  }
  async function handleReviewDislike() {
    try {
      // await AsyncStorage.setItem('@plantmanager:user', like);
    }
    catch {
      // Alert.alert('Não foi possível salvar o seu nome. 😢');
    }
  }

  return (
    <View style={styles.loopQuestionSingleFooterReview}>
      <TouchableOpacity
        style={styles.loopQuestionSingleFooterReviewbutton}
        activeOpacity={0.7}
        onPress={handleReviewLike}
      >
        <FontAwesome5
          name="thumbs-up"
          style={[
            styles.loopQuestionSingleFooterReviewbuttonIcon,
            (isLike) &&
            { color: colors.strongly_agree}
          ]}
        />
        <Text
          style={[
            styles.loopQuestionSingleFooterReviewbuttonText,
            (isLike) &&
            { color: colors.strongly_agree}
          ]}
        >
          {like}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loopQuestionSingleFooterReviewbutton}
        activeOpacity={0.7}
        onPress={handleReviewDislike}
      >
        <FontAwesome5
          name="thumbs-down"
          style={[
            styles.loopQuestionSingleFooterReviewbuttonIcon,
            (isDislike) &&
            { color: colors.strongly_disagree}
          ]}
        />
        <Text
          style={[
            styles.loopQuestionSingleFooterReviewbuttonText,
            (isDislike) &&
            { color: colors.strongly_disagree}
          ]}
          >
          {dislike}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  loopQuestionSingleFooterReview: {
    flexDirection: 'row',
  },
  loopQuestionSingleFooterReviewbutton: {
    flexDirection: 'row',
    marginHorizontal: 5
  },
  loopQuestionSingleFooterReviewbuttonIcon: {
    fontSize: 16
  },
  loopQuestionSingleFooterReviewbuttonText: {
    alignSelf: 'center',
    paddingHorizontal: 3,
    fontSize: 12
  }
})
