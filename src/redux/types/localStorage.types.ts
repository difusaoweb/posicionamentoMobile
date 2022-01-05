export interface CurrentUserInterface {
  id: number
  user_login: string
  display_name: string
  user_email: string
}
export interface LocalStorageInterface {
  token: string | null
  user: CurrentUserInterface | null
}

export const GET_LOCAL_STORAGE = 'GET_LOCAL_STORAGE'
export const SET_LOCAL_STORAGE = 'SET_LOCAL_STORAGE'

interface GetLocalStorageAction {
  type: typeof GET_LOCAL_STORAGE
  payload: LocalStorageInterface
}

interface SetLocalStorageAction {
  type: typeof SET_LOCAL_STORAGE
  payload: LocalStorageInterface
}

export type LocalStorageActionTypes = GetLocalStorageAction | SetLocalStorageAction
