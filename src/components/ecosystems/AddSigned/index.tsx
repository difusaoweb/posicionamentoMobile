import * as React from 'react'
import { View } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { styles } from './index.style'
import { postAffirmationAdd } from '../../../redux'
import { Loading } from '../../atoms/Loading'

export const AddSigned = () => {
  const dispatch = useDispatch()
  const [t] = useTranslation('general')

  const [isLoading, setIsLoading] = React.useState(false)
  const [affirmationMessage, setAffirmationMessage] = React.useState<string>('')

  async function onPostAffirmationAdd() {
    setIsLoading(true)
    await dispatch(postAffirmationAdd({ affirmationMessage }))

    setIsLoading(false)
  }

  if (isLoading) return <Loading />

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
        onPress={onPostAffirmationAdd}
        disabled={isLoading || !affirmationMessage}
      >
        {t('add')}
      </Button>
    </View>
  )
}
