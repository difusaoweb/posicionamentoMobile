import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import {
  TextInput,
  Title,
  Button,
  useTheme
} from 'react-native-paper'
import { useDispatch } from 'react-redux'

import { logInAccess } from '../../../redux'
import Loading from '../../atoms/Loading'

const LogInLogInPage = () => {
  const dispatch = useDispatch()
  const { colors } = useTheme()

  const [isLoading, setIsLoading] = useState(false)
  const [userLogin, setUserLogin] = useState('')
  const [userPass, setUserPass] = useState('')
  const [flatTextSecureEntry, setFlatTextSecureEntry] = useState(true)

  async function onLogIn() {
    setIsLoading(true)
    await dispatch(logInAccess({ userLogin, userPass }))
    setIsLoading(false)
  }

  if(isLoading) return <Loading/>

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Title style={{ marginBottom: 24 }}>
          Olá! Digite o seu e-mail ou usuário
        </Title>
      </View>
      <View style={styles.row}>
        <TextInput
          style={styles.inputContainerStyle}
          label="E-mail ou usúario"
          value={userLogin}
          onChangeText={text => setUserLogin(text)}
        />
      </View>
      <View style={[ styles.row, { marginBottom: 30 }]}>
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
      </View>
      <View style={styles.row}>
        <Button
          mode="contained"
          style={styles.button}
          onPress={onLogIn}
          disabled={isLoading || (!userLogin || !userPass)}
          loading={isLoading}
        >
          Entrar
        </Button>
      </View>
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
    width: '100%',
    margin: 8
  },
  button: {
    margin: 4
  },
  row: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
})

export default LogInLogInPage
