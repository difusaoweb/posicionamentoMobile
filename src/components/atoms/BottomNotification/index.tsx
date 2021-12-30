import React from 'react'
import {
  View,
  StyleSheet,
  Text
} from 'react-native'
import {
  Snackbar
} from 'react-native-paper'

interface BottomNotificationProps {
  message: string
}

const BottomNotification = ({ message = 'Salvo!' }: BottomNotificationProps) => {
  const [alertNotification, setAlertNotification] = React.useState<boolean>(false)

  return (
    <Snackbar
    visible={alertNotification}
    onDismiss={() => setAlertNotification(false)}
    duration={Snackbar.DURATION_MEDIUM / 3}
    style={{ elevation: 12 }}
    >
    { message }
    </Snackbar>
  )
}

export default BottomNotification
