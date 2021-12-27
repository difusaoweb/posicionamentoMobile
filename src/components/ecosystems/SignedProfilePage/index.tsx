import React from 'react'
import {
  View,
  StyleSheet,
  Text
} from 'react-native'
import {
  TextInput,
  Title,
  Button,
  useTheme,
  HelperText
} from 'react-native-paper'

import { useAppSelector, useAppDispatch } from '../../../hooks'
import {
  currentUser as currentUserRedux
} from '../../../redux/reducers/access'


const SignedProfilePage = () => {
  const curnentUser = useAppSelector(currentUserRedux)
  const { colors } = useTheme()

  function handleGoLogin() {
    console.log('Ir para tela de login')
  }

  return (
    <>
      <TextInput
        mode="outlined"
        label="Escreva sua afirmação"
        multiline
        style={styles.fixedHeight}
      />
      <Button
        mode="contained"
        style={styles.button}
        onPress={handleGoLogin}
      >
        Entrar
      </Button>
    </>
  )
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 12
  },
  text: {
    marginVertical: 4
  },
  inputContainerStyle: {
    margin: 8
  },
  fixedHeight: {
    height: 350
  },
  button: {
    margin: 4
  }
})

export default SignedProfilePage
