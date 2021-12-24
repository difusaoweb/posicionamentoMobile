import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  Alert,
  TouchableOpacity,
  PixelRatio,
  Dimensions
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { withDecay } from 'react-native-reanimated';

const { fontScale } = Dimensions.get("window");

export function Header() {
  const [searchName, setSearchName] = useState<string>();
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    async function loadStorageSearchName() {
      const searchName = await AsyncStorage.getItem('@plantmanager:searchName');
      setSearchName(searchName || '');
    }

    loadStorageSearchName();
  },[]);

  function handleStart(){
    navigation.navigate('UserIdentification');
  }

  function handleInputBlur(){
    setIsFocused(false);
    setIsFilled(!!searchName);
  }

  function handleInputFocus(){
    setIsFocused(true)
  }

  function handleInputChange(value: string){
    setIsFilled(!!value);
    setSearchName(value);
  }

  async function handleSubmit(){
    if(!searchName)
      return Alert.alert('Me diz como chamar você 😢');

    try {
      await AsyncStorage.setItem('@plantmanager:user', searchName);
      navigation.navigate('Confirmation', {
        title: 'Prontinho',
        subtitle: 'Agora vamos começar a cuidar das suas plantinhas com muito cuidado.',
        buttonTitle: 'Começar',
        icon: 'smile',
        nextScreen: 'PlantSelect',
      });
    }
    catch {
      Alert.alert('Não foi possível salvar o seu nome. 😢');
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        onPress={handleStart}
      >
        <Feather
          name="menu"
          style={styles.buttonIcon}
        />
      </TouchableOpacity>
      <TextInput
        style={[
          styles.input,
          (isFocused || isFilled) &&
          { borderColor: colors.green}
        ]}
        placeholder="Buscar no Gaivos"
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
        onChangeText={handleInputChange}
        value={searchName}
      />
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        onPress={handleStart}
      >
        <Feather
          name="shopping-cart"
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
  input: {
    width: 744 / PixelRatio.get(),
    fontSize: 16,
    textAlign: 'left',
    paddingHorizontal: 37 / PixelRatio.get(),
    paddingVertical: 32 / PixelRatio.get(),
    marginHorizontal: 52 / PixelRatio.get(),
    borderRadius: 999
  }
});
