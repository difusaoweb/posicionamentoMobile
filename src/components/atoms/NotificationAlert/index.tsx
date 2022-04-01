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

  const [alertNotification, setAlertNotification] = React.useState(false)

  async function onDismiss() {
    await dispatch(setNotification(null))
    setAlertNotification(false)
  }

  React.useEffect(() => {
    setAlertNotification(!!message)
  }, [message])

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
      <Text style={styles.text}>{message}</Text>
    </Snackbar>
  )
}

export default NotificationAlert
