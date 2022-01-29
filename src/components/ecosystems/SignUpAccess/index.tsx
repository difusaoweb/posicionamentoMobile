import React, { useState } from 'react'
import {
  StyleSheet,
  View
} from 'react-native'
import {
  TextInput,
  Title,
  Button,
} from 'react-native-paper'
import { useDispatch } from 'react-redux'

import { signUp } from '../../../redux'
import Loading from '../../atoms/Loading'

const SignUpAccess = () => {
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [userLogin, setUserLogin] = useState('')
  const [userPass, setUserPass] = useState('')
  const [flatTextSecureEntry, setFlatTextSecureEntry] = useState(true)

  async function onSignUp() {
    setIsLoading(true)
    await dispatch(signUp({ userLogin, userPass, userEmail, displayName }))

    setIsLoading(false)
  }

  if(isLoading) return <Loading />

  return (
    <View style={styles.container}>
      <Title>
        Olá! Digite o seu e-mail ou usuário
      </Title>
      <TextInput
        style={styles.inputContainerStyle}
        label="E-mail"
        value={userEmail}
        onChangeText={text => setUserEmail(text)}
      />
      <TextInput
        style={styles.inputContainerStyle}
        label="Nome completo"
        value={displayName}
        onChangeText={text => setDisplayName(text)}
      />
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
      <Button
        mode="contained"
        style={styles.button}
        onPress={onSignUp}
        disabled={isLoading || (!userLogin || !userPass)}
      >
        Entrar
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingTop: 24,
    paddingHorizontal: 12
  },
  inputContainerStyle: {
    margin: 8
  },
  button: {
    margin: 4
  }
})

export default SignUpAccess
