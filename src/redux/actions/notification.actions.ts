import { ActionCreator } from 'redux'

import { NotificationActionTypes, SET_NOTIFICATION } from '../types'

const setNotificationAction: ActionCreator<NotificationActionTypes> = (
  message: string | null
) => {
  return { type: SET_NOTIFICATION, payload: message }
}

export const setNotification = (message: string | null) => {
  return dispatch => {
    dispatch(setNotificationAction(message))
  }
}
