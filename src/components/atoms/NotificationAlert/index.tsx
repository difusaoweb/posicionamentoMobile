import * as React from 'react'
import { Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { useTheme, Snackbar } from 'react-native-paper'
import { useTranslation } from 'react-i18next'

import { setNotification, RootState } from '../../../redux'
import { styles } from './index.styles'

const NotificationAlert: React.FC = () => {
  const { message } = useSelector(
    (state: ReturnType<RootState>) => state.notifications
  )
  const dispatch = useDispatch()
  const { colors } = useTheme()
  const [t] = useTranslation('general')
  const [tForgotPassword] = useTranslation('forgotPassword')

  const [alertNotification, setAlertNotification] = React.useState(false)

  async function onDismiss() {
    await dispatch(setNotification(null))
    setAlertNotification(false)
  }

  React.useEffect(() => {
    if (message) {
      setAlertNotification(true)
    }
  }, [message])

  if (message) {
    const translationFile = message.substring(message.indexOf('.'), 0)
    const translationString = message.substring(message.indexOf('.') + 1)

    let theMessage = message
    switch (translationFile) {
      case 'index':
        theMessage = t(translationString)
        break
      case 'forgotPassword':
        theMessage = tForgotPassword(translationString)
        break
    }

    return (
      <Snackbar
        style={[styles.alert, { backgroundColor: colors.primary }]}
        visible={alertNotification}
        onDismiss={onDismiss}
        action={{
          label: t('close'),
          onPress: onDismiss
        }}
        duration={2 * 60 * 1000}
      >
        <Text style={styles.text}>{theMessage}</Text>
      </Snackbar>
    )
  }

  return <></>
}

export default NotificationAlert
