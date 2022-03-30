export const SET_NOTIFICATION = 'SET_NOTIFICATION'

interface SetNotificationAction {
  type: typeof SET_NOTIFICATION
  payload: string | null
}

export interface NotificationState {
  message: string | null
}

export type NotificationActionTypes = SetNotificationAction
