import * as React from 'react'
import { View } from 'react-native'
import { TextInput, Title, Button } from 'react-native-paper'
import { useDispatch } from 'react-redux'

import { styles } from './index.style'
import { postSignUp } from '../../redux'
import Loading from '../../components/atoms/Loading'

const SignUpPage = () => {
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = React.useState(false)
  const [userEmail, setUserEmail] = React.useState('')
  const [displayName, setDisplayName] = React.useState('')
  const [userLogin, setUserLogin] = React.useState('')
  const [userPass, setUserPass] = React.useState('')
  const [flatTextSecureEntry, setFlatTextSecureEntry] = React.useState(true)

  async function onSignUp() {
    setIsLoading(true)
    await dispatch(postSignUp({ userLogin, userPass, userEmail, displayName }))

    setIsLoading(false)
  }

  if (isLoading) return <Loading />

  return (
    <View style={styles.container}>
      <Title>Register</Title>
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
        disabled={isLoading || !userLogin || !userPass}
      >
        Entrar
      </Button>
    </View>
  )
}

export default SignUpPage
