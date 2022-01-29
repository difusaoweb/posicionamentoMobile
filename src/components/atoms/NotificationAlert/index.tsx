import React, { useState, useEffect } from 'react'
import { Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { useTheme, Snackbar } from 'react-native-paper'

import { setNotification, RootState } from '../../../redux'

const NotificationAlert: React.FC = () => {
  const dispatch = useDispatch()
  const { message } = useSelector((state: RootState) => state.notifications)
  const { colors } = useTheme()

  const [alertNotification, setAlertNotification] = useState(false)

  function clearNotification() {
    dispatch(setNotification({ message: null }))
  }

  useEffect(() => {
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
        label: 'Fechar',
        onPress: () => clearNotification()
      }}
      duration={Snackbar.DURATION_LONG}
    >
      <Text style={{ color: '#fff' }}>{message}</Text>
    </Snackbar>
  )
}

export default NotificationAlert
