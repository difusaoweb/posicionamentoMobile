import React, { useState } from 'react'
import {
  StyleSheet,
  View
} from 'react-native'
import {
  TextInput,
  Title,
  Button,
  useTheme,
  HelperText
} from 'react-native-paper'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import type { StackNavigationProp } from '@react-navigation/stack'

import { useAppSelector, useAppDispatch } from '../../hooks'
import {
  singInDataType,
  singInAsync,
  errorSingIn as errorSingInRedux,
  currentUser as currentUserRedux
} from '../../redux/reducers/access'

type SignInUpProps = {
  navigation: StackNavigationProp<{}>
}

const SignInUp = ({ navigation }: SignInUpProps) => {
  const errorSingIn = useAppSelector(errorSingInRedux)
  const currentUser = useAppSelector(currentUserRedux)
  const dispatch = useAppDispatch()

  const { colors } = useTheme()

  const [isSubmit, setIsSubmit] = useState<boolean>(false)
  const [userLogin, setUserLogin] = useState<string>('')
  const [userPass, setUserPass] = useState<string>('')

  const [flatTextSecureEntry, setFlatTextSecureEntry] = useState<boolean>(true)

  async function handleSubmit() {
    setIsSubmit(true)

    const singInAsyncData: singInDataType = {
      login: userLogin,
      pass: userPass
    }
    dispatch(singInAsync(singInAsyncData))

    setUserPass('')
    setIsSubmit(false)
  }

  if(currentUser)
    navigation.goBack()

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background }
      ]}
    >
      <View style={[styles.row, { marginTop: 32 }]}>
        <Title>
          Olá! Digite o seu e-mail ou usuário
        </Title>
        <TextInput
          style={styles.inputContainerStyle}
          label="E-mail ou nome de usúario"
          value={userLogin}
          onChangeText={text => setUserLogin(text)}
        />
        <TextInput
          style={styles.inputContainerStyle}
          label="Senha"
          value={userPass}
          onChangeText={text => setUserPass(text)}
          secureTextEntry={flatTextSecureEntry}
          right={
            <TextInput.Icon
              name={flatTextSecureEntry ? 'eye' : 'eye-off'}
              onPress={() => setFlatTextSecureEntry(!flatTextSecureEntry)}
              forceTextInputFocus={false}
            />
          }
        />
        { !!errorSingIn &&
        <HelperText type="error">
          {errorSingIn.message}
        </HelperText>
        }
        <Button
          mode="contained"
          style={styles.button}
          onPress={handleSubmit}
          disabled={isSubmit || (!userLogin || !userPass)}
        >
          Entrar
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: getStatusBarHeight()
  },
  row: {
    paddingHorizontal: 12
  },
  inputContainerStyle: {
    margin: 8
  },
  button: {
    margin: 4
  }
})

export default SignInUp
