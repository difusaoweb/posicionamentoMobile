import {
  NotificationActionTypes,
  SET_NOTIFICATION,
} from '../types'

interface NotificationState {
  message: string | null
}
const initialState: NotificationState = {
  message: null
}

export function notificationsReducer(state: NotificationState = initialState, action: NotificationActionTypes): NotificationState {
  switch (action.type) {
    case SET_NOTIFICATION: {
      return {
        ...state,
        message: action.payload.message
      }
    }
    default:
      return state
  }
}
