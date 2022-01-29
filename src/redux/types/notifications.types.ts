export const SET_NOTIFICATION = 'SET_NOTIFICATION'

export interface SetNotificationReturnActionInterface {
  message: string | null
}

interface SetNotificationAction {
  type: typeof SET_NOTIFICATION
  payload: SetNotificationReturnActionInterface
}

export type NotificationActionTypes = SetNotificationAction
