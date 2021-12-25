import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import {
  TextInput,
  Title,
  Button,
  useTheme,
  HelperText
} from 'react-native-paper'

import { useAppSelector, useAppDispatch } from '../../hooks'
import {
  singInDataType,
  singInAsync,
  errorSingIn as errorSingInRedux
} from '../../redux/reducers/access'

const SignInUp: React.FC = () => {
  const errorSingIn = useAppSelector(errorSingInRedux)
  const dispatch = useAppDispatch()

  const { colors } = useTheme()

  const [isSubmit, setIsSubmit] = useState<boolean>(false)
  const [userLogin, setUserLogin] = useState<string>('')
  const [userPass, setUserPass] = useState<string>('')

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

  return (
    <>
      <View
        style={[
          styles.container,
          { backgroundColor: colors.background }
        ]}
      >
        <View style={[styles.row, { marginTop: 32 }]}>
          <Title style={[styles.text, { textAlign: 'center' }]}>
            Digite o seu e-mail ou usuário
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
            secureTextEntry={true}
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
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // flexWrap: 'wrap',
    paddingHorizontal: 12
  },
  inputContainerStyle: {
    margin: 8
  },
  text: {
    marginVertical: 4
  },
  button: {
    margin: 4
  }
})

export default SignInUp
