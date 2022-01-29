import { ActionCreator } from 'redux'

import {
  NotificationActionTypes,
  SET_NOTIFICATION,
  SetNotificationReturnActionInterface
} from '../types'

const setNotificationSuccess: ActionCreator<NotificationActionTypes> = (set: SetNotificationReturnActionInterface) => {
  return { type: SET_NOTIFICATION, payload: set }
}

export function setNotification(set: SetNotificationReturnActionInterface) {
  return dispatch => {
    dispatch(setNotificationSuccess(set))
  }
}
