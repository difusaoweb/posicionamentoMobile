import {
  NotificationActionTypes,
  SET_NOTIFICATION,
  NotificationState
} from '../types'

const initialState: NotificationState = {
  message: null
}

export function notificationsReducer(
  state: NotificationState = initialState,
  action: NotificationActionTypes
): NotificationState {
  switch (action.type) {
    case SET_NOTIFICATION: {
      return {
        ...state,
        message: action.payload
      }
    }
    default:
      return state
  }
}
