import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  PixelRatio,
  BackHandler
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';

import { UserProps } from '../../libs/storage';

export function HeaderProfile({ userName, ...rest} : UserProps) {
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
    return true;
  }
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBack);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBack);
    };
  }, []);

  function handleHome() {
    navigation.navigate('Home');
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        onPress={handleBack}
      >
        <Feather
          name="arrow-left"
          style={styles.buttonIcon}
        />
      </TouchableOpacity>
      <Text
        style={styles.userName}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {userName}
      </Text>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        onPress={handleHome}
      >
        <Feather
          name="home"
          style={styles.buttonIcon}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15 / PixelRatio.get()
  },
  button: {
    width: 64 / PixelRatio.get(),
    height: 64 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonIcon:{
    fontSize: 19,
  },
  userName: {
    width: 744 / PixelRatio.get(),
    fontSize: 16,
    textAlign: 'left',
    paddingHorizontal: 37 / PixelRatio.get(),
    paddingVertical: 32 / PixelRatio.get(),
    marginHorizontal: 52 / PixelRatio.get()
  }
});
