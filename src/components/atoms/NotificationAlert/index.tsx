import * as React from 'react'
import { Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { useTheme, Snackbar } from 'react-native-paper'
import { useTranslation } from 'react-i18next'

import { setNotification, RootState } from '../../../redux'
import { styles } from './index.styles'

const NotificationAlert: React.FC = () => {
  const dispatch = useDispatch()
  const { message } = useSelector((state: RootState) => state.notifications)
  const { colors } = useTheme()
  const [t] = useTranslation('general')

  const [alertNotification, setAlertNotification] = React.useState(false)

  function clearNotification() {
    dispatch(setNotification({ message: null }))
  }

  React.useEffect(() => {
    setAlertNotification(!!message)
  }, [message])

  return (
    <Snackbar
      style={{ backgroundColor: colors.primary }}
      visible={alertNotification}
      onDismiss={() => {
        clearNotification()
        setAlertNotification(false)
      }}
      action={{
        label: t('close'),
        onPress: () => clearNotification()
      }}
      duration={1000 * 60 * 60}
    >
      <Text style={styles.text}>{message}</Text>
    </Snackbar>
  )
}

export default NotificationAlert
