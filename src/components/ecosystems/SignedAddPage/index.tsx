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
  HelperText,
  Snackbar
} from 'react-native-paper'

import { useAppSelector, useAppDispatch } from '../../../hooks'
import {
  AddAffirmationDataType,
  addAffirmationAsync,
  errorAddAffirmation as errorAddAffirmationRedux
} from '../../../redux/reducers/affirmation'


const SignedAddPage = () => {
  const errorAddAffirmation = useAppSelector(errorAddAffirmationRedux)
  const dispatch = useAppDispatch()

  const [isSubmit, setIsSubmit] = React.useState<boolean>(false)
  const [affirmationMessage, setAffirmationMessage] = React.useState<string>('')

  const [alertNotification, setAlertNotification] = React.useState<boolean>(false)

  async function handleAddAffirmation() {
    setIsSubmit(true)

    const addAffirmationData: AddAffirmationDataType = {
      message: affirmationMessage
    }
    dispatch(addAffirmationAsync(addAffirmationData))

    setAffirmationMessage('')
    setAlertNotification(true)
    setIsSubmit(false)
  }

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        label="Escreva sua afirmação"
        multiline
        style={styles.inputContainerStyle}
        onChangeText={text => setAffirmationMessage(text)}
        value={affirmationMessage}
      />
      <Button
        mode="contained"
        style={styles.button}
        onPress={handleAddAffirmation}
        disabled={isSubmit || !affirmationMessage}
      >
        Adicionar
      </Button>
      <Snackbar
        visible={alertNotification}
        onDismiss={() => setAlertNotification(false)}
        duration={Snackbar.DURATION_MEDIUM / 3}
        style={{ elevation: 12 }}
      >
        { errorAddAffirmation ? errorAddAffirmation.message : 'Salvo!'}
      </Snackbar>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12
  },
  inputContainerStyle: {
    width: '100%',
    height: 355,
    minHeight: 355,
    maxHeight: '100%',
    margin: 8
  },
  button: {
    margin: 4
  }
})

export default SignedAddPage
